import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogSvcService } from '../services/log-svc.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private logSvc : LogSvcService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = localStorage.getItem('role')
    if (role) {
      if (role === 'ADMIN') {
        return true;
      } else {
        this.logSvc.logoutLessNavigate()
        this.router.navigate(['/notAuthorized'])
        return false;
      }
    } else {
      this.logSvc.logoutLessNavigate()
      this.router.navigate(['/notAuthorized'])
      return false;
    }

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state)
  }
}
