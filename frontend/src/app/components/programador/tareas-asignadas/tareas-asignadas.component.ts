import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Tarea, Tareas } from '../../../interfaces/tarea';

@Component({
  selector: 'app-tareas-asignadas',
  standalone: true,
  imports: [],
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css'
})
export class TareasAsignadasComponent implements OnInit {

  tareas: Array<Tarea> = [];

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.tareasAsignadas();
  }

  tareasAsignadas() {
    this.tareasService.getTareasAsignadasByUsuario().subscribe({
      next: (data: Tareas) => {

        this.tareas = data.resultado;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
