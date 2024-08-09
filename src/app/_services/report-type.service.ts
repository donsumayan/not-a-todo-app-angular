import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PageOptions, ReportType } from './types';

type QueryOptions = { name?: string } & PageOptions;

@Injectable({
  providedIn: 'root',
})
export class ReportTypeService extends BaseService<ReportType, QueryOptions> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/report-type/');
  }
}
