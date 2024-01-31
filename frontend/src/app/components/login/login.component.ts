import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AccesoUsuario, UsuarioLogin } from "../../interfaces/usuario";
import { AuthService } from "../../services/auth/auth.service";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService : AuthService, private router: Router) { }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login() {
    let user: UsuarioLogin = {
      email: this.formLogin.value.email || '',
      password: this.formLogin.value.password || ''
    }

    this.authService.peticionLogin(user).subscribe({
      next: (response: HttpResponse<AccesoUsuario>) => {
        if (response.status == 200) {
          alert("Login correcto");
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.log("Error en la petición de login")
        console.log(error);
      }
    })
  }

}
