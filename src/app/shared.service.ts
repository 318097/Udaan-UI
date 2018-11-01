import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const routes = {
  screens: 'screens'
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(public http: HttpClient) { }
  getScreenList() {
    return this.http.get(routes.screens)
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return response;
          }
        })
      );
  }

  bookSeats(screenName, data) {
    return this.http.post(`${routes.screens}/${screenName}/reserve`, data)
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return response;
          }
        })
      );
  }

  addScreen(data) {
    return this.http.post(`${routes.screens}`, data)
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return response;
          }
        })
      );
  }


}
