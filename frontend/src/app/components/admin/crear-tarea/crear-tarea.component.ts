import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css'
})
export class CrearTareaComponent {

  formCrearTarea = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    dificultad: new FormControl('', [Validators.required]),
    horas_previstas: new FormControl('', [Validators.required]),
    horas_realizadas: new FormControl('', [Validators.required]),
    realizacion: new FormControl('', [Validators.required]),
    completada: new FormControl('', [Validators.required]),
  })

  crearTarea() {
  }

}
