import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost:3000/dashboard/';

  constructor(private http: HttpClient) { }

  test() {
    this.http.get(this.url)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

}
