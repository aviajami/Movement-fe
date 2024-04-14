import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, IAuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import {ViewContainerRef} from '@angular/core';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [FormsModule, CommonModule,
            LoadingSpinnerComponent, PlaceholderDirective]
})
export class AuthComponent implements OnInit, OnDestroy{

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;  
  isLoading = false;
  error: string | null = null;

  componentRefSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
                private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.componentRefSub !== undefined) {
    this.componentRefSub.unsubscribe();
    }
  } 

  onSubmit(authForm: NgForm) {

    this.error = null;
    const email = authForm.value.email;
    const password = authForm.value.password;
    let obsAuth: Observable<IAuthResponseData>;  
  
    obsAuth = this.authService.login(email, password);
  

    obsAuth.subscribe({next: resData => {
      this.isLoading = true;
      console.log(resData);
      //this.isLoading = false;
      this.router.navigate(['/getUsers']);
    }, error: errorMessage => {
      console.log(errorMessage);

      this.error = errorMessage;
      this.onShowAlert(errorMessage);
      this.isLoading = false;
  }});

    authForm.reset();
  }

  onShowAlert(error: string) {
    
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = error;
    this.componentRefSub = componentRef.instance.close.subscribe(() => {
      this.componentRefSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onCloseError() {
    this.error = null;
  }
}
