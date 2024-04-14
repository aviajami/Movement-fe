import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { DataStorageServie } from './shared/data-storage.service';
import { UserService } from './services/users.service';
import { AuthGurd } from './auth/auth.gurd';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { CrudService } from './services/crud.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    DataStorageServie,
    CrudService,
    UserService,
    AuthGurd
    
  ]
};
