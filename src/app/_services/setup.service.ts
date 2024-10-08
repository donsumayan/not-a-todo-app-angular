import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageOptions, Setup } from './types.js';
import { BaseService } from './base.service.js';

type QueryOptions = { name?: string } & PageOptions;
@Injectable({
  providedIn: 'root',
})
export class SetupService extends BaseService<Setup, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/setup/');
  }
}
