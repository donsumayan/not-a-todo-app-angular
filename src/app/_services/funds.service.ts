import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetupService } from './setup.service';
import { BaseService } from './base.service.ts';

@Injectable({
  providedIn: 'root',
})
export class FundsService extends BaseService {
  constructor(private http: HttpClient) {
    super(http, 'http://localhost:3000/funds');
  }
}
