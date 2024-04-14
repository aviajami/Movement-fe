import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/users.service';
import { User } from '../services/user.model';

@Injectable()
export class DataStorageServie {

    constructor(private http: HttpClient, private userService: UserService, 
                private authService: AuthService) {
    }

    // storeUsers() {
    //     const users = this.userService.getUsers();
    //     this.http.put('https://ng-course-recipe-book-ec57a.firebaseio.com/recipes.json',
    //                     users).subscribe(x => {
    //                         console.log('users saved');
    //                     });
    // }

    loadData(uri: string) {
            return this.http.get<User[]>('http://localhost:5093/Users/' + uri)
            .pipe(
                map((users: User[]) => {
                return users.map((user: User) => {
                    return {...user
                    };
                });
            }),
            tap((users: User[]) => {
                this.userService.setUsers(users);
            })
        );
    }
}
