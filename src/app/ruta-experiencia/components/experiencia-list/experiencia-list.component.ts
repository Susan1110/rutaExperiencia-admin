import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ContenidoService } from '../../services/contenido.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-experiencia-list',
  templateUrl: './experiencia-list.component.html',
  styleUrls: ['./experiencia-list.component.css'],
})
export class ExperienciaListComponent implements OnInit {
  filas = 8;

  get usuario() {
    return this.authService.usuario;
  }

  get experiencias(): Experiencia[] {
    return this.experienciaService.experiencias;
  }

  constructor(
    private experienciaService: ExperienciaService,
    private authService: AuthService,
    private contenidoService: ContenidoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.experienciaService.buscarExperiencias().subscribe();
  }

  get nuevasExperiencias(): Experiencia[][] {
    return new Array(this.filas).fill(0).map((_, indiceFila) =>
      new Array(this.usuario.ciclos).fill(0).map((_, indiceColumna) => ({
        IdExperiencia: 0,
        ExNombre: '',
        ExDescripcion: '',
        ExCicloInicio: indiceColumna + 1,
        ExCicloFin: indiceColumna + 1,
        ExFila: indiceFila + 1,
        ExIconoUrl: '',
        IdCarrera: this.usuario.idCarrera!,
      }))
    );
  }

  abrirModal(funcion: 'agregar' | 'editar', experiencia: Experiencia) {
    this.modalService.abrirFormularioExperiencia(funcion);
    this.experienciaService.obtenerExperiencia(experiencia);
  }

  verContenido(idExperiencia: number) {
    this.contenidoService.buscarContenido(idExperiencia).subscribe({
      next: () => this.modalService.abrirTarjetaExperiencia(),
    });
  }

  gridLayout() {
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${this.usuario.ciclos},1fr)`,
      'grid-template-rows': `repeat(${this.filas},1fr)`,
      gap: '16px 30px',
    };
  }

  posicionExperiencia(
    cicloInicio: number,
    cicloFin: number,
    fila: number,
    nuevo = false
  ) {
    const largo = cicloFin - cicloInicio + 1;
    let color = `white`;
    if (!nuevo) {
      color = this.background(cicloInicio, cicloFin, largo);
    }

    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
      'grid-row': `${fila} / span 1`,
      background: color,
    };
  }

  background(inicio: number, fin: number, expansion: number) {
    let color = '';
    if (expansion > 1) {
      let gradient = '';
      for (let index = inicio; index <= fin; index++) {
        gradient += `, var(--carrera-color-${index})`;
      }
      color = `linear-gradient(90deg ${gradient})`;
    } else {
      color = `var(--carrera-color-${inicio})`;
    }
    return color;
  }
}
