import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/authservice.service';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,  ReactiveFormsModule],
    template: `

    <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Thanks to join us!!!</div>
    <span class="text-muted-color mt-3 mb-5 mr-10 font-medium">to continue, please enter carefully all necessary data...</span>



<div>
<form autocomplete="off" [formGroup]="UserForm"  (ngSubmit)="registerUser()">
    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
    <input pInputText id="email1" type="text" formControlName="email" placeholder="Email address" class="w-full md:w-[30rem] mb-8"  />
    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
    <input pInputText id="email1" type="text"  placeholder="Name" class="w-full md:w-[30rem] mb-8"  />
    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
    <p-password  id="password1" formControlName="password"  placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirm Password</label>
    <p-password  id="password1" formControlName="cpassword"  placeholder="Confirm Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
        <div class="flex items-center">
            <p-checkbox  id="rememberme1" binary class="mr-2"></p-checkbox>
            <label for="rememberme1">Remember me</label>
        </div>
        <span class="font-medium no-underline ml-14 text-right cursor-pointer text-primary">Forgot password?</span>

    </div>

    <p-button label="Create Acount" styleClass="w-full" type="submit" [disabled]="UserForm.invalid"></p-button>
    </form>
</div>  `
})



export class RegisterPage{


private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )


  public UserForm: FormGroup = this.fb.group({
    email:    ['omargfg@gmail.com', [ Validators.required, Validators.email ]],
    password: ['222222', [ Validators.required, Validators.minLength(6) ]],
  });


  registerUser(){}


}
