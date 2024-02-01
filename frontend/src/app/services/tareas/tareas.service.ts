import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/environment.dev';
import { Observable, catchError, of } from 'rxjs';
import { Tarea, Tareas } from '../../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tareas> {
    const headers = new HttpHeaders({
      'x-token': this.getToken(),
      'Content-Type': 'application/json',
    });

    return this.http.get<Tareas>(env.URL + 'api/tareas').pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  getTareasAsignadasByUsuario(): Observable<Tareas> {
    const headers = new HttpHeaders({
      'x-token': this.getToken(),
      'Content-Type': 'application/json',
    });

    return this.http.get<Tareas>(env.URL + 'api/tareas/usuario/:id').pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  private token: string | number = '';

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | number {
    return this.token;
  }

  clearToken(): void {
    this.token = '';
  }
}
