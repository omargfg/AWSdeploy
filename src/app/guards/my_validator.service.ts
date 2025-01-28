import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../pages/service/authservice.service';

@Injectable({
  providedIn: 'root'
})

//mi Validador asincrono para validar si un correo ya esta en uso
export class MyEmailValidatorsService implements AsyncValidator {

constructor(private authservice:AuthService) { }
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;

        return this.authservice.checkByEmail(email).pipe(

                              map((isTaken: boolean) => {
                                           return isTaken ? { emailTaken: true } : null;
                                  })
                               );

    }
}
