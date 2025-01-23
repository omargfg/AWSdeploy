import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './app/pages/service/authservice.service';
import { AuthStatus } from './app/interfaces/index.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,CommonModule],
    template: `
    <h1 *ngIf="!finishedAuthCheck()" >
  Loading.....
  </h1>

    <router-outlet *ngIf="finishedAuthCheck()"></router-outlet>
    `
})
export class AppComponent {



    private authService = inject( AuthService );
    private router = inject( Router );

    public finishedAuthCheck = computed<boolean>( () => {//señal computada para mostrar el loading si es
      //console.log(this.authService.authStatus() )
      if ( this.authService.authStatus() === AuthStatus.checking ) {
        return false;
      }

      return true;
    });


    // public authStatusChangedEffect = effect(() => {

    //   switch( this.authService.authStatus() ) {

    //     case AuthStatus.checking:
    //       break;

    //     case AuthStatus.authenticated:
    //       this.router.navigateByUrl('main');
    //       break;

    //     case AuthStatus.notAuthenticated:
    //       this.router.navigateByUrl('');
    //       break;

    //     case AuthStatus.unRegistered:
    //         this.router.navigateByUrl('register');
    //         break;
    //   }




    // });


}
