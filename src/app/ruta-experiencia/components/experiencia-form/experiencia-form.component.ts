import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent {
  @Output() close: EventEmitter<boolean> = new EventEmitter()
  modal: boolean = true
  opcionMultimedia: 'video' | 'imagen' = 'video'
  opcionInfo: 'video' | 'descripcion' = 'video'


  selectInfo(opcion: 'video' | 'descripcion') {
    this.opcionInfo = opcion
  }

  selectMultimedia(opcion: 'video' | 'imagen') {
    this.opcionMultimedia = opcion
    this.opcionInfo = 'video'
  }

  cerrarModal() {
    this.modal = false
    this.close.emit(this.modal)
  }
}
