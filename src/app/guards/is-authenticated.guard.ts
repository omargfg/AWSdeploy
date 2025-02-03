import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/service/authservice.service';
import { AuthStatus } from '../interfaces/index.interface';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  console.log(authService.authStatus());
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
   // router.navigateByUrl('main');
   console.log(authService.authStatus());
    return true;
  }

  console.log(authService.authStatus());
  router.navigateByUrl('');
  return false;
  // if ( authService.authStatus() === AuthStatus.checking ) {
  //   return false;
  // }

  // const url = state.url;
  // localStorage.setItem('url', url);

};
