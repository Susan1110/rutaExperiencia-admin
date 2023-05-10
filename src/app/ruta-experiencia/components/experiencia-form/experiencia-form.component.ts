import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ModalService } from '../../services/modal.service';
import { ExperienciaService } from '../../services/experiencia.service';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent {
  get funcion() {
    return this.modalService.funcionFormularioExperiancia
  }
  
  get datos() {
    return this.experienciaService.experiencia
  }


  modal: boolean = true
  pasoActual: number = 1

  constructor(
    private modalService: ModalService,
    private experienciaService: ExperienciaService
  ) { }

  actualizarPaso(arg: number) {
    this.pasoActual = arg
  }

  cerrarFormulario() {
    this.modalService.cerrarFormularioExperiencia()
  }

}
