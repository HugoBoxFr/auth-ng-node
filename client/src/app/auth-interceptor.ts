import { AuthService } from './shared/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  /**
   * Intercept HTTP Request and add the token bearer automatically into the header if it exists.
   * @param req request
   * @param next next handle
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer: ${token}`)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}