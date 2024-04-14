import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../services/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  myForm: FormGroup;
  
  message = '';
  user: User;
  userSub: Subscription;


  


  constructor(private userService: UserService, private formBuilder: FormBuilder){        
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
  }

  createUser(event: Event){
    event.preventDefault();
    let newUser: User = {
      // In reality id should increment in DB...
      id: (Math.floor(Math.random() * (1000 - 200 + 1)) + 200),
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      avatar: this.myForm.value.avatar,
      email: this.myForm.value.email,
    }
    this.userSub = this.userService.addUser(newUser).subscribe(x => {
      this.message = 'Created';
    }
    )
  }
}
