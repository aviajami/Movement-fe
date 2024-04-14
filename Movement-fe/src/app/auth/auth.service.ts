import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

export interface IAuthResponseData {
    id: number;
    token: string;
    email: string;
    refreshToken: string;
    firstName: string;
    lastName: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User | null >(null);    

    constructor(private http: HttpClient, private router: Router) {

    }

    login(username: string, password: string, ) {
        return this.http.post<IAuthResponseData>('http://localhost:5093/Users/Login/',
        {
            username: username,
            password: password,
        }).pipe(catchError(this.errorHandle),
        tap(response => {            
            this.handleAuthentication(response.email, response.token);
        }));
    }   
    
    logout() {
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem('userData');        
    }

    private errorHandle(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (!errorRes.error || !errorRes.error.error) {
                return throwError(() => new Error(errorMessage));
            }

        return throwError(() => new Error(errorMessage));
    }

    private handleAuthentication(email: string, token: string) {
        const loginUser = new User(email, token);
        this.user.next(loginUser);        
        localStorage.setItem('userData', JSON.stringify(loginUser));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _experationTokenDate: string
        } = JSON.parse(localStorage.getItem('userData') as string);

        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,userData._token);

        if (loadedUser.token) {
            this.user.next(loadedUser);         
        }
    }    
}
