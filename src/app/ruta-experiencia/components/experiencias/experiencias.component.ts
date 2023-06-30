import { Component, Input } from '@angular/core';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from '../../services/experiencia.service';
import { ContenidoService } from '../../services/contenido.service';
import { ModalService } from '../../services/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css'],
})
export class ExperienciasComponent {
  @Input() experiencia!: Experiencia;
  constructor(
    private toastr: ToastrService,
    private experienciaService: ExperienciaService,
    private contenidoService: ContenidoService,
    private modalService: ModalService
  ) {}
  abrirModal(funcion: 'agregar' | 'editar', experiencia: Experiencia) {
    this.modalService.abrirFormularioExperiencia(funcion);
    this.experienciaService.obtenerExperiencia(experiencia);
  }

  verContenido(idExperiencia: number) {
    this.contenidoService.buscarContenido(idExperiencia).subscribe({
      next: () => this.modalService.abrirTarjetaExperiencia(),
    });
  }
  deleteExperiencia(idExperiencia: number) {
    this.experienciaService.deleteExperiencia(idExperiencia).subscribe({
      next: result => {
        this.experienciaService.buscarExperiencias().subscribe();
        this.toastr.success(result.msg);
      },
      error: error => this.toastr.error(error),
    });
  }
}
