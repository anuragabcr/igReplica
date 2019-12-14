import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:3000/dashboard/';

  constructor(private http: HttpClient) { }

  allUsers() {
    return this.http.get(this.url + 'accounts');
  }
  

}
