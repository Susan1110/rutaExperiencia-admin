import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit-experiencias',
  templateUrl: './add-edit-experiencias.component.html',
  styleUrls: ['./add-edit-experiencias.component.css']
})
export class AddEditExperienciasComponent {
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
