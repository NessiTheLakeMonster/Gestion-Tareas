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

  /*   getTareas():Observable<Tarea> {
      let httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response' as 'response'
      };
      return this.http.get<Tareas>(env.URL + 'api/tareas', httpOptions)
    } */

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
