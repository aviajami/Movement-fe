import { CanActivate, RouterLinkActive, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGurd {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean |
                                                                             Promise<boolean | UrlTree> |
                                                                            Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
        take(1),
        map((user) => {
        const isAuth = !!user;
        if (isAuth) {
        return true;
        }
        return this.router.createUrlTree(['/auth']);
        }));
    }
}

// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//     return inject(AuthService).canActivate(next, state);

