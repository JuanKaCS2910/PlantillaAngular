import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginRequest } from '../model/login.request';
import { LoginService } from '../services/login.service';
import { NotificationService } from '@/app/shared/services/notification.service';

@Component({
  selector: 'app-login.component',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator,CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

    private loginService = inject(LoginService);
    private router = inject(Router);
    private notification = inject(NotificationService);

    email: string = '';
    password: string = '';
    checked: boolean = false;

    onLogin() {
        const request: LoginRequest = {
            correo: this.email,
            password: this.password
        };

        this.loginService.login(request).subscribe({
            next: (resp) => {
                 if (resp.exito) {
                    console.log(resp);
                    sessionStorage.setItem('access_token',resp.datos?.access_token)
                    sessionStorage.setItem('refresh_token',resp.datos?.refresh_token)
                    this.notification.success(`Bienvenido ${resp.datos.usuario.nombre}`);
                    this.router.navigate(['/']);
                }
                else  {
                    this.notification.error(resp.mensaje);
                }

             },
            error: (err) => {
                if (err.error.exito) {
                    this.notification.error('No se pudo conectar con el servidor')
                }
                else{
this.notification.error(err.error.mensaje);
                }
                 }
        });
    }

}
