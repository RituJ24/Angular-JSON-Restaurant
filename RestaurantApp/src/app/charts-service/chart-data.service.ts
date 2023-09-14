import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor(private httpClientInstance: HttpClient) {}

  getSalaryChartInfo() {
    return this.httpClientInstance.get('http://localhost:3000/posts');
  }

  getInventoryData() {
    return this.httpClientInstance.get('http://localhost:3000/inventory');
  }
}
