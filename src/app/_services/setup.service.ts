import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service.ts';

@Injectable({
  providedIn: 'root',
})
export class SetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/setup');
  }
}
