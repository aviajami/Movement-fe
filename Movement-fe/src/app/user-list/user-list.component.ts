import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserItemComponent } from '../user-item/user-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserItemComponent, RouterModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {

  
  users: User[] = [];
  userSubscription = new Subscription();

  constructor(private userService: UserService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }              

  ngOnInit() {
    this.users = this.userService.getUsers('1');
    this.userSubscription = this.userService.UsersChangedSubject.subscribe((newUsers: User[]) => {
      this.users = newUsers;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSubmit(usersPageForm: NgForm) {

    let error = '';
    const page = usersPageForm.value.page;    
    
  
    this.userService.getUsers(page);
        
  }

  onNewUserClick() {
    this.router.navigate(['../createUser'], {relativeTo: this.activatedRouter});
  }

}
