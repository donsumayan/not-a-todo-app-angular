import { HttpClient } from '@angular/common/http';
import { stringify } from 'qs';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageOptions, Response } from './types';

export class BaseService<Entity, QueryOption extends PageOptions> {
  public url = 'http://localhost:3000/';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  private _page = new BehaviorSubject(0);
  private _pageSize = new BehaviorSubject(10);
  private _data = new BehaviorSubject<Entity[]>([]);
  private _count = new BehaviorSubject(0);

  get data$(): Observable<Entity[]> {
    return this._data.asObservable();
  }

  set data$(value: Entity[]) {
    this._data.next(value);
  }

  get count$(): Observable<number> {
    return this._count.asObservable();
  }

  set count$(value: number) {
    this._count.next(value);
  }

  get page$(): Observable<number> {
    return this._page.asObservable();
  }

  set page$(value: number) {
    this._page.next(value);
  }

  get pageSize$(): Observable<number> {
    return this._pageSize.asObservable();
  }

  set pageSize$(value: number) {
    this._pageSize.next(value);
  }

  query<T>(options?: Partial<QueryOption>) {
    let url = this.url;
    if (options) {
      const obj = options as object;
      const query = '?' + stringify(obj, { encode: false });
      url = url + query;
    }

    return this.httpClient.get<T>(url);
  }

  loadData(options?: Partial<QueryOption>) {
    return this.query<Response<Entity>>(options).subscribe(
      ({ data, count, page, pageSize }) => {
        this.data$ = data;
        this.count$ = count;
        this.page$ = page;
        this.pageSize$ = pageSize;
      }
    );
  }

  loadNextBatch() {
    return this.loadData({
      page: this._page.value + 1,
      count: this._count.value,
      pageSize: this._pageSize.value,
    } as QueryOption);
  }

  refreshBatch() {
    return this.loadData({
      page: this._page.value,
      count: this._count.value,
      pageSize: this._pageSize.value,
    } as QueryOption);
  }

  create(obj: Partial<Entity>) {
    return this.httpClient.post(this.url, obj);
  }

  delete(obj: { id: number }) {
    console.log(this.url + obj.id);
    return this.httpClient.delete(this.url + obj.id);
  }
}
