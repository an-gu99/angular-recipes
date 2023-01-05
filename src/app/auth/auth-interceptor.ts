import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    //  Store not working with SSR
    //
    //  return this.store.select('auth').pipe(
    //    take(1),
    //     map((authState) => authState.user),
    //     exhaustMap((user) => {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationdate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return next.handle(req);
    }
    const modifiedReq = req.clone({
      params: new HttpParams().set('auth', user._token),
    });

    return next.handle(modifiedReq);
    //    })
    //  );
  }
}
