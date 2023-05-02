import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent {
  @Input() fila: number = 0;
  @Input() columna: number = 0;
  @Output() close: EventEmitter<boolean> = new EventEmitter()

  modal: boolean = true
  pasoActual: number = 1

  actualizarPaso(arg:number) {
    this.pasoActual = arg
  }


  cerrarModal() {
    this.modal = false
    this.close.emit(this.modal)
  }

}
