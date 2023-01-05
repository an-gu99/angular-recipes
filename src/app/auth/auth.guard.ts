import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //
    //  Store not working with SSR
    //
    // return new Promise(function (resolve, reject) {
    //   this.store.select('auth').pipe(
    //     tap((authState) => console.log(authState)),
    //     take(1),
    //     //  map((authState) => authState.user),
    //     map((user) => {
    //       const isAuth = !!user;
    //       if (isAuth) {
    //         resolve(true);
    //       }
    //       resolve(this.router.createUrlTree(['/auth']));
    //     })
    //   );
    // });

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationdate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    const isAuth = !!userData;

    if (isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/auth']);
  }
}
