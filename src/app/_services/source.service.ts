import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Source, PageOptions } from './types';

type QueryOptions = {} & PageOptions;

@Injectable({
  providedIn: 'root',
})
export class SourceService extends BaseService<Source, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/source/');
  }
}
