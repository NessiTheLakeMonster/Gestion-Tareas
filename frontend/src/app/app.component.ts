import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MatMenuModule } from "@angular/material/menu";
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaTareasComponent } from './components/admin/lista-tareas/lista-tareas.component';
import { CrearTareaComponent } from './components/admin/crear-tarea/crear-tarea.component';
import { TareasAsignadasComponent } from './components/programador/tareas-asignadas/tareas-asignadas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    HomeComponent,
    ListaTareasComponent,
    CrearTareaComponent,
    TareasAsignadasComponent,
    MatMenuModule,
    RouterLink, 
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'gestion-tareas';
}
