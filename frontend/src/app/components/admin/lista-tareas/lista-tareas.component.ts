import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Tarea, Tareas } from '../../../interfaces/tarea';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css'
})
export class ListaTareasComponent implements OnInit {

  tareas: Array<Tarea> = [];
  
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

}
