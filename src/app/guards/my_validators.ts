import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, PatternValidator, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from '../pages/service/authservice.service';




export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';//expresion regular para el campo 'nombre completo'
//export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;//expresion regular para un email.

//funcion para validar que el nuevo usuario q se desea registrar no tenga un nombre reservado para el sistema, como admin por ejemplo
export const cantBeThisUser= ( control: FormControl, userName: string  ): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

  if ( value === userName ) {
    return {
      noStrider: true,
    }
  }

  return null;
}



//funcion para validar q dos campos en un formulario reactivo sean iguales
export function matchingFieldsValidator(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(field1);
      const matchingControl = formGroup.get(field2);

      // Verifica si ambos controles existen
      if (control && matchingControl) {
        // Si los valores no coinciden, devuelve el error
        if (matchingControl.value && control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null); // Limpia cualquier error existente
        }
      }
      return null;
    };
  }


//funcion para validar la sintaxis del email q devuelve la key personalizda { 'email': true }
//se puede usar tb Validator.pattern(expRegular) pero esto siempre devuelve el key del error{'pattern':true} y cuando se nececita usar en el mismo formulario
//varias veces para validar distintas expresiones {'pattern':true} se vuelve confuso si se obtienen todos los errores en una sola funcion como es en este caso'getFieldError'
  export function MyEmailValidator(): ValidatorFn {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !emailPattern.test(control.value)) {
        return { 'email': true };
      }
      return null;
    };
  }


  export function MyFullNameValidator(): ValidatorFn {
    const emailPattern = /([a-zA-Z]+) ([a-zA-Z]+)/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !emailPattern.test(control.value)) {
        return { 'fullname': true };
      }
      return null;
    };
  }


















  //funcion que devuelve los errores de un campo en caso q no sean null
 export function isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

//funcion para obtener el codigo del error en un campo especifico de un form
  export function getFieldError(  form: FormGroup,field: string ): string | null {

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field!].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Please, required field';
        case 'email':
            return 'Please an email format valid is required ';
        case ' fullname':
                return 'Please, a full name it`s required'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;

        case 'mustMatch':
            return `Please make sure you confirmed the password correctly`;
        case 'emailTaken':
                return `The email provided is currently in use, please enter another one...`;
      }
    }

    return null;
  }

