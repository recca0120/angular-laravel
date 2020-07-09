import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "./storage.service";
import {filter, tap} from "rxjs/operators";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.storage.get('token')) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.storage.get('token')}`}
      })
    }

    return next.handle(request).pipe(tap(
      (response: HttpResponse<any>) => {
        if (response.type === 4 && response.url.match('/api/auth/login') && response.ok) {
          this.storage.set('token', response.body.access_token)
        }
      })
    );
  }
}
