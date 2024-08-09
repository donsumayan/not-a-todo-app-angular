import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Fund, PageOptions } from './types';

type QueryOptions = { name?: string } & PageOptions;

@Injectable({
  providedIn: 'root',
})
export class FundService extends BaseService<Fund, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/fund/');
  }
}
