import { MessageModule } from 'primeng/message';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/authservice.service';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { matchingFieldsValidator, isValidField, getFieldError, MyEmailValidator, MyFullNameValidator } from '../../../guards/my_validators';
import { CommonModule } from '@angular/common';
import { MyEmailValidatorsService } from '../../../guards/my_validator.service';
import { AuthStatus } from '../../../interfaces/auth-status.interface';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule,ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,  ReactiveFormsModule,MessageModule],
    template: `

    <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Thanks to join us!!!</div>
    <span class="text-muted-color mt-3 mb-5 mr-10 font-medium">to continue, please enter carefully all necessary data...</span>




<form autocomplete="off" [formGroup]="UserForm"  (ngSubmit)="registerUser()">

    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
    <input pInputText id="email1" type="text" formControlName="email" placeholder="Email address" class="w-full md:w-[30rem] "  />
    <div class="flex items-start  justify-end mt-1">
    <p-message *ngIf="checkField(UserForm,'email')"  severity="error" variant="simple" size="small"> {{ FieldError(UserForm,'email') }}</p-message>
    </div>
    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
    <input pInputText id="name1" type="text"  formControlName="name"  placeholder="Full Name" class="w-full md:w-[30rem] "  />
    <div class="flex items-start  justify-end mt-1">
    <p-message *ngIf="checkField(UserForm,'name')"  severity="error" variant="simple" size="small"> {{ FieldError(UserForm,'name') }}</p-message>
    </div>

    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
    <p-password  id="password1" formControlName="password"  placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
    <div class="flex items-start  justify-end mt-1">
    <p-message *ngIf="checkField(UserForm,'password')"  severity="error" variant="simple" size="small"> {{ FieldError(UserForm,'password') }}</p-message>
    </div>

    <label for="password2" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirm Password</label>
    <p-password  formControlName="pass2"  placeholder="Confirm Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
    <div class="flex items-start  justify-end mt-1">
    <p-message *ngIf="checkField(UserForm,'pass2')"  severity="error" variant="simple" size="small"> {{ FieldError(UserForm,'pass2') }}</p-message>
    </div>

    <p-button label="Create Acount" styleClass="w-full mt-8" type="submit" [disabled]="UserForm.invalid"></p-button>

    </form>





`
})



export class RegisterPage{


  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private MyAsincValidator=inject(MyEmailValidatorsService)

  constructor(){
    //this.authService.set_authStatus=AuthStatus.unRegistered;
}

  public UserForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, MyEmailValidator()], [this.MyAsincValidator]],
      name: ['', [Validators.required, MyFullNameValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      // Validador personalizado para comparar los campos 'password' y 'pass2'
      validators: [matchingFieldsValidator('password', 'pass2')],
    }
);


public checkField(myform:FormGroup, field:string){
  return  isValidField(myform,field);

}


FieldError(myform:FormGroup, field:string){

return getFieldError(myform, field);

}


  registerUser() {


    this.router.navigateByUrl('success');
    // console.log(this.UserForm.value);
    // const { email,name, password } = this.UserForm.value;

    // this.authService.registerUser(email, name,password)
    //   .subscribe({
    //     next: () => {
    //        // this.router.navigateByUrl('main')
    //        console.log('registro exitoso');
    //     },
    //     error: (message) => {
    //       console.log(message);

    //       //Swal.fire('Error', message, 'error' )
    //     }
    //   })

  }



}
