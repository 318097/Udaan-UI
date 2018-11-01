import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9090/';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('URL :', baseUrl + request.url);
    request = request.clone({
      url: baseUrl + request.url,
    });
    return next.handle(request);
  }

}
