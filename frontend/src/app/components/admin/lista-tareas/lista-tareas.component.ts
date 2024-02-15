import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Tarea, Tareas } from '../../../interfaces/tarea';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private tareasService: TareasService, private router: Router) { }

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

  borrarTarea(id: number) {
    if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
      this.tareasService.borraTarea(id).subscribe({
        next: (data: HttpResponse<Tarea>) => {
          console.log(data);
          this.obtenerTareas();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  seleccionarTarea(tarea: Tarea) {
    this.tareaSeleccionada = tarea;
    console.log(this.tareaSeleccionada);
  }

  crearTarea() {
    this.router.navigate(['/creartarea']);
  }

}
