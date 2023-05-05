import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent {
  @Input() funcion!: 'agregar' | 'editar' 
  @Input() datos!: Experiencia
  @Output() close: EventEmitter<boolean> = new EventEmitter()


  modal: boolean = true
  pasoActual: number = 1

  actualizarPaso(arg: number) {
    this.pasoActual = arg
  }


  cerrarModal() {
    this.modal = false
    this.close.emit(this.modal)
  }

}
