import { AuthService } from './shared/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * The user is considered connected if a token is stored.
   * Return true if connected else return false and redirect to the login page
   * @param next 
   * @param state 
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() && localStorage.role) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}