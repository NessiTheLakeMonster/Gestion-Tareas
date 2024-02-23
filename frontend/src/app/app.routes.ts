import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListaTareasComponent } from './components/admin/lista-tareas/lista-tareas.component';
import { CrearTareaComponent } from './components/admin/crear-tarea/crear-tarea.component';
import { TareasAsignadasComponent } from './components/programador/tareas-asignadas/tareas-asignadas.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home/listatareas', component: ListaTareasComponent },
    { path: 'creartarea', component: CrearTareaComponent },
    { path: 'home/tareasasignadas', component: TareasAsignadasComponent },

];
