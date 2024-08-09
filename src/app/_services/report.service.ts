import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PageOptions, Report } from './types';

type QueryOptions = { name?: string } & PageOptions;

@Injectable({
  providedIn: 'root',
})
export class ReportService extends BaseService<Report, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/report');
  }
}
