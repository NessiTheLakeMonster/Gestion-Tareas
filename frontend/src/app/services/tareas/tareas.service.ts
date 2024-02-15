import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/environment.dev';
import { Observable, catchError, of } from 'rxjs';
import { AddTarea, Tarea, Tareas } from '../../interfaces/tarea';

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

  crearTarea(tarea: AddTarea): Observable<HttpResponse<Tarea>> {
    /* const headers = new HttpHeaders({
      'x-token': this.getToken(),
      'Content-Type': 'application/json',
    }); */
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };

    return this.http.post<any>(env.URL + 'api/tareas', tarea, httpOptions).pipe(
      catchError((error) => {
        return of(error)
      })
    )

    /* return this.http.post<any>(env.URL + 'api/tareas', tarea, { headers, observe: 'response' }).pipe(
      catchError((error) => {
        return of(error)
      })
    ) */
  }

  borraTarea(id: number): Observable<HttpResponse<Tarea>> {
    const headers = new HttpHeaders({
      'x-token': this.getToken(),
      'Content-Type': 'application/json',
    });

    return this.http.delete<Tarea>(env.URL + 'api/tareas/' + id, { headers, observe: 'response' }).pipe(
      catchError((error) => {
        return of(error)
      })
    )
  }

  getTareasAsignadasByUsuario(id: number): Observable<Tareas> {
    const headers = new HttpHeaders({
      'x-token': this.getToken(),
      'Content-Type': 'application/json',
    });

    return this.http.get<Tareas>(env.URL + 'api/tareas/usuario/' + id).pipe(
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
