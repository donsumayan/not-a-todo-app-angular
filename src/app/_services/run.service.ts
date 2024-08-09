import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Run, PageOptions } from './types';

type QueryOptions = { name?: string } & PageOptions;

@Injectable({
  providedIn: 'root',
})
export class RunService extends BaseService<Run, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/run/');
  }
}
