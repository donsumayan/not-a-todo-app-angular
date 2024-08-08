import { HttpClient } from '@angular/common/http';
import { stringify } from 'qs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Setup, SetupQueryOptions, SetupResponse } from './types';

export class BaseService {
  public url = 'http://localhost:3000/';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  private _page = new BehaviorSubject(0);
  private _pageSize = new BehaviorSubject(10);
  private _data = new BehaviorSubject<Setup[]>([]);
  private _count = new BehaviorSubject(0);

  get data$(): Observable<Setup[]> {
    return this._data.asObservable();
  }

  set data$(value: Setup[]) {
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

  private query<T>(options?: SetupQueryOptions) {
    let url = this.url;
    if (options) {
      const obj = options as object;
      const query = '?' + stringify(obj, { encode: false });
      url = url + query;
    }

    return this.httpClient.get<T>(url);
  }

  loadData(options?: SetupQueryOptions) {
    return this.query<SetupResponse>(options).subscribe(
      ({ data, count, page, pageSize }) => {
        this.data$ = data;
        this.count$ = count;
        this.page$ = page;
        this.pageSize$ = pageSize;
      }
    );
  }

  create(setup: Partial<Setup>) {
    return this.httpClient.post(this.url, setup);
  }
}
