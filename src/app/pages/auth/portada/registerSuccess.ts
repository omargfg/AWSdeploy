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

@Component({
    selector: 'app-registerSuccess',
    standalone: true,
    imports: [CommonModule,ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,  ReactiveFormsModule,MessageModule],
    template: `

    <div class="text-surface-600 dark:text-surface-0 text-3xl font-medium mb-4">Thanks to join us!!!</div>


    <div >
        <h1>¡Registro Exitoso!</h1>
        <p>Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión y disfrutar de nuestros servicios.</p>
        <a href="/login">Ir a Iniciar Sesión</a>
    </div>




`
})



export class RegisterSuccess{


  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private MyAsincValidator=inject(MyEmailValidatorsService)




}








