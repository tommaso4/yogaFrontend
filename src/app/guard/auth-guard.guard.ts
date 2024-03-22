import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LogSvcService } from '../services/log-svc.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(
    private logSvc:LogSvcService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.logSvc.authLog$.pipe(map(loggedIn => {
      if (!loggedIn) this.router.navigate(['/notAuthorized']);
      return loggedIn;
    }));
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot,state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute,state)
  }
}
