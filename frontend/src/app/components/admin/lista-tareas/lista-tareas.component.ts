import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Tarea, Tareas } from '../../../interfaces/tarea';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css'
})
export class ListaTareasComponent implements OnInit {
  tareas: Array<Tarea> = [];
  tareaSeleccionada: Tarea = {
    id: 0,
    descripcion: '',
    dificultad: '',
    horas_previstas: 0,
    horas_realizadas: 0,
    realizacion: '',
    completada: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareasService.getTareas().subscribe({
      next: (data: Tareas) => {

        this.tareas = data.resultado;
        console.log(this.tareas);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  borrarTarea() {
  }

  seleccionarTarea(tarea: Tarea) {
    this.tareaSeleccionada = tarea;
    console.log(this.tareaSeleccionada);
  }

}
