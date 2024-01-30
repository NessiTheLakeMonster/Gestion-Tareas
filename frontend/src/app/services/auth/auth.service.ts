import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { AccesoUsuario, UsuarioLogin } from '../../interfaces/usuario';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  peticionLogin(body: UsuarioLogin): Observable<HttpResponse<AccesoUsuario>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };

    return this.http.post<any>(env.URL + 'api/auth/login', body, httpOptions);
  }
}
