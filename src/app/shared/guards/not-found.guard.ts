import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@services/auth';

@Injectable({
  providedIn: 'root'
})
export class NotFoundGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.url);
    console.log(route.parent);
    console.log(route.data);
    console.log(state.url);
    return this.checkRoute();
  }

  private checkRoute(): boolean {
    return true;
  }
}
