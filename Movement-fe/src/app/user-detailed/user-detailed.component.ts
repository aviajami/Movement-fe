import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../services/user.model';

@Component({
  selector: 'app-user-detailed',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.css'
})
export class UserDetailedComponent implements OnInit, OnDestroy{
    

  myForm: FormGroup;
  id: string;
  user: User;
  userSub: Subscription;
  updateSub: Subscription;
  deleteSub: Subscription;


  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder){
    route.params.subscribe(x => this.id = x['id']);
    this.getUser();
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required,]],
      'email': [null, [Validators.email, Validators.required]],
      'avatar': ''
  });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.deleteSub.unsubscribe();
  }

  getUser(){
    this.userSub = this.userService.getUser(+this.id).subscribe(user => {
      this.user = user as User;

      this.myForm.setValue({
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'email': this.user.email,
        'avatar': this.user.avatar
      });
      console.log(this.user);
      console.log(this.myForm);
    });
  }

  updateUser(event: Event){
    event.preventDefault();
    let updatedUser: User = {
      id: this.user.id,
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      avatar: this.myForm.value.avatar,
      email: this.myForm.value.email,
    }
    this.updateSub = this.userService.updateUser(updatedUser).subscribe(user =>
      {
        this.user = user as User;
      });
  }

  deleteUser(event: Event){
    event.preventDefault();
    this.deleteSub = this.userService.deleteUser(this.user.id).subscribe(user => {
      this.myForm.setValue({
        'firstName': '',
        'lastName': '',
        'email': '',
        'avatar': ''
      });      
    });
  }
}

