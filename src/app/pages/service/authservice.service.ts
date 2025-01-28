import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../enviroments/env';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../../interfaces/index.interface';
import { ValidationErrors } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //!aki declaramos dos señales cumputadas o de readonly para hacer publicas al _currentUser y _authStatus
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }





  login( email: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/login`;//el baseUrl esta definida el las variables globales
    const body = { email, password };// el body es el objeto q vamos a mandar en la peticion post, en este caso va a tener email y pasword

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => console.log(err.error.message) )
      )

      );
  }
//funcion para guardar la data del usuario logueado en la parte del cliente
//se crea el token y el status de login o no
private setAuthentication(user: User, token:string): boolean {

  this._currentUser.set( user );
  this._authStatus.set( AuthStatus.authenticated );
  localStorage.setItem('token', token);

  return true;
}
  checkAuthStatus():Observable<boolean> {

    const url   = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {//aki validamos si hay algu token guardado en el lado del cliete
      this.logout();
      return of(false);
    }
//si el token existe entonces nos creamos un header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ token }`);


      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setAuthentication( user, token )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );


  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }


registerUser(email:string, name:string, password:string):Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/register`;//el baseUrl esta definida el las variables globales
    const body = { email,name, password };// el body es el objeto q vamos a mandar en la peticion post, en este caso va a tener email y pasword

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => console.log(err.error.message) )
      ));
}


//metodo q devuelve verdadero o falso si encuentra o no un email en el servidor
checkByEmail( email: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/ckeck-email`;//el baseUrl esta definida el las variables globales
    const body = { email};// el body es el objeto q vamos a mandar en la peticion post, en este caso va a tener email y pasword

   return  this.http.post< boolean>( url, body )
    .pipe(
            map( resp => {
                return ( resp)
                   ?  true
                    : false
              }
            ),

        catchError( err => throwError( () => console.log(err.error.message) ) )

      );
  }



}
