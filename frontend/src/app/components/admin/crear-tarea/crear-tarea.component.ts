import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TareasService } from '../../../services/tareas/tareas.service';
import { AddTarea, Tarea } from '../../../interfaces/tarea';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css'
})
export class CrearTareaComponent {

  constructor(private tareasService: TareasService, private router: Router) { }

  formCrearTarea = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    dificultad: new FormControl('', [Validators.required]),
    horas_previstas: new FormControl('', [Validators.required]),
    horas_realizadas: new FormControl('', [Validators.required]),
    realizacion: new FormControl('', [Validators.required]),
    completada: new FormControl('', [Validators.required]),
  })

  addTarea() {
    let tarea: AddTarea = {
      descripcion: this.formCrearTarea.value.descripcion || '',
      dificultad: this.formCrearTarea.value.dificultad || '',
      horas_previstas: Number(this.formCrearTarea.value.horas_previstas) || 0,
      horas_realizadas: Number(this.formCrearTarea.value.horas_realizadas) || 0,
      realizacion: this.formCrearTarea.value.realizacion || '',
      completada: Boolean(this.formCrearTarea.value.completada) || false,
    }

    console.log(tarea);

    this.tareasService.crearTarea(tarea).subscribe({
      next: (response: HttpResponse<Tarea>) => {
        if (response.status == 200) {
          console.log(response.body)

        }
      },
      error: (error: any) => {
        console.log("Error en la petición de creación de tarea")
        console.log(error);
      }
    })
  }

}
