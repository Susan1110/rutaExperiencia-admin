import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';

@Component({
  selector: 'app-experiencias-nuevas',
  templateUrl: './experiencias-nuevas.component.html',
  styleUrls: ['./experiencias-nuevas.component.css'],
})
export class ExperienciasNuevasComponent {
  @Input() experiencia!: Experiencia;
  constructor(
    private experienciaService: ExperienciaService,
    private modalService: ModalService
  ) {}
  abrirModal(funcion: 'agregar' | 'editar', experiencia: Experiencia) {
    this.modalService.abrirFormularioExperiencia(funcion);
    this.experienciaService.obtenerExperiencia(experiencia);
  }
}
