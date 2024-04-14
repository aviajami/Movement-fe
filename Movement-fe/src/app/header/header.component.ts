import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageServie } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { UrlSerializer } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule],
    styleUrls: ['./header.component.css']    
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    authSubscription: Subscription;
    constructor(
        private dataStorageServie: DataStorageServie, 
        private authService: AuthService) {

    }

    ngOnInit() {
        this.authSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    onSavedData() {
        //this.dataStorageServie.storeUsers();
    }
    onLoadData() {
       this.dataStorageServie.loadData('getUsers/1').subscribe();
    }
    onLogout() {
        this.authService.logout();
    }
}
