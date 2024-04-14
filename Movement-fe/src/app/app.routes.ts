import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, mapToCanActivate } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGurd } from './auth/auth.gurd';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailedComponent } from './user-detailed/user-detailed.component';
import { CreateUserComponent } from './create-user/create-user.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent},
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    { path: 'getUsers', canActivate: mapToCanActivate([AuthGurd]), component: UserListComponent},
    { path: 'getUsers/:page', canActivate: mapToCanActivate([AuthGurd]), component: UserListComponent},
    { path: 'getUser/:id', canActivate: mapToCanActivate([AuthGurd]), component: UserDetailedComponent},
    { path: 'createUser', canActivate: mapToCanActivate([AuthGurd]), component: CreateUserComponent},
    // { path: 'deleteUser/:id', canActivate: mapToCanActivate([AuthGurd]), component: UserListComponent},    
    { path: '**', pathMatch: 'full', redirectTo: 'getUsers' }
];

@NgModule({
    imports: [        
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}