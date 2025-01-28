import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/authservice.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,  ReactiveFormsModule],
    template: `

                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to PrimeLand!</div>
                            <span class="text-muted-color mr-10 font-medium">Sign in to continue...</span>
                            <a href='register'>
                            <span  class="font-medium no-underline ml-10 text-right cursor-pointer text-primary"  >or Register an account ?</span>
                            </a>

                        <div>
                        <form autocomplete="off" [formGroup]="myForm"  (ngSubmit)="login()">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" formControlName="email" placeholder="Email address" class="w-full md:w-[30rem] mb-8"  />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password  id="password1" formControlName="password"  placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox  id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-14 text-right cursor-pointer text-primary">Forgot password?</span>

                            </div>

                            <p-button label="Sign In" styleClass="w-full" type="submit" [disabled]="myForm.invalid"></p-button>
                            </form>
                        </div>


    `
})
export class Login {


    checked: boolean = false;
//mis cosas from here!!!


private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )


  public myForm: FormGroup = this.fb.group({
    email:    ['omargfg@gmail.com', [ Validators.required, Validators.email ]],
    password: ['222222', [ Validators.required, Validators.minLength(6) ]],
  });


  login() {
    console.log(this.myForm.value);
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => {

            this.router.navigateByUrl('main')
        },
        error: (message) => {
          console.log(message);

          //Swal.fire('Error', message, 'error' )
        }
      })

  }


// register(){
// this.authService.register();

// }


}
