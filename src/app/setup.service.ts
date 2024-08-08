import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  isEmpty,
  merge,
  mergeAll,
  Observable,
  Subject,
} from 'rxjs';
import { stringify } from 'qs';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  constructor(private http: HttpClient) {}

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

  loadData(options?: SetupQueryOptions) {
    let url = 'http://localhost:3000/setup';

    if (options) {
      const obj = options as object;
      const query = '?' + stringify(obj, { encode: false });
      url = url + query;
    }

    console.log('load data', options);
    return this.http
      .get<SetupResponse>(url)
      .subscribe(({ data, count, page, pageSize }) => {
        this.data$ = data;
        this.count$ = count;
        this.page$ = page;
        this.pageSize$ = pageSize;
      });
  }

  createSetup(setup: Partial<Setup>) {
    console.log(setup);
  }
}

export type SetupQueryOptions = Partial<
  { name: string } & Omit<SetupResponse, 'data'>
>;

export interface SetupResponse {
  data: Setup[];
  page: number;
  pageSize: number;
  count: number;
}

export interface Setup {
  id: number;
  name: string;
  description: string;
  plannerType: PlannerType;
  externalSystemConfig: ExternalSystemConfig;
  triggers: Trigger[];
  funds: Fund[];
  sources: Run[];
  runs: Run[];
  reports: Report[];
}

export enum ExternalSystemConfig {
  ConfigA = 'config-a',
  ConfigB = 'config-b',
}

export interface Fund {
  id: number;
  name: string;
  alias: string;
}

export enum PlannerType {
  NonSpecific = 'non-specific',
  Specific = 'specific',
}

export interface Report {
  id: number;
  name: string;
  type: Run;
}

export interface Run {
  id: number;
  name: string;
}

export enum Trigger {
  Reports = 'reports',
  Runs = 'runs',
  Sources = 'sources',
}
