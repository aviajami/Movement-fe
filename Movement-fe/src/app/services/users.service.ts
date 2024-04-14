import { Subject, map, tap } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';


@Injectable()
export class UserService {

    UsersChangedSubject: Subject<User[]> = new Subject<User[]>();

    constructor(private CrudService: CrudService) {
    }

    private users: User[] = [];


     getUsers(page: string): User[] {
        this.CrudService.get('getUsers/' + page).subscribe(users=> {
            console.log('2223');
            console.log(users);
            this.setUsers(users as User[]);
        });
        

        return this.users.slice();
    }

    getUser(id: number) {
        return this.CrudService.get('getUser/' + id);        
    }

    addUser(newUser: User) {
        console.log('kjdfsn');
       return this.CrudService.post('createUser/', newUser).pipe(
            tap(x =>{
                this.users.push(newUser);
                this.UsersChangedSubject.next(this.users.slice());
            }));
    }

    updateUser(newUser: User) {
        return this.CrudService.put('updateUser/' + newUser.id, newUser).pipe(
            tap(user => {
                this.users[this.users.findIndex(x => x.id == (user as User).id)] = user as User;
                this.UsersChangedSubject.next(this.users.slice());
            })
        
        );
        //this.users[index] = newUser;
        this.UsersChangedSubject.next(this.users.slice());
      }

      deleteUser(id: number) {
        console.log('gdf');
        return this.CrudService.delete('deleteUser/' + id).pipe(
            tap(user => {     
                let index = this.users.findIndex(x => x.id == (user as User).id);
                if (index !== -1){
                    this.users.splice(index, 1);
                    this.UsersChangedSubject.next(this.users.slice());
                }
            }));            
      }

      setUsers(users: User[]) {
          this.users = users;
          this.UsersChangedSubject.next(this.users.slice());
      }
      
}