import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHeaders, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  private cache: Map<string, any> = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (this.cache.has(url)) {
      const data = this.cache.get(url);
      const response = new HttpResponse({
        url,
        headers: new HttpHeaders(),
        status: 200,
        statusText: 'ok',
        body: data
      });
      return of(response);
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response && !this.cache.has(url)) {
          this.cache.set(url, event.body);
        }
      })
    );
  }

}
