import { Component, Output, EventEmitter } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { AuthService } from '../../../auth/services/auth.service';

interface Posicion {
  fila: number
  ciclo: number
}

interface Experiencia {
  IdExperiencia: number;
  ExNombre: string;
  ExDescripcion: string;
  ExCicloInicio: number;
  ExCicloFin: number;
  ExFila: number;
  ExIconoUrl: string;
  IdCarrera: number;
}

@Component({
  selector: 'app-experiencia-list',
  templateUrl: './experiencia-list.component.html',
  styleUrls: ['./experiencia-list.component.css']
})
export class ExperienciaListComponent {
  @Output() open: EventEmitter<{ modal: boolean, fila: number, columna: number, experiencia?:Experiencia }> = new EventEmitter()
  modal: boolean = false;
  filas: number = 8;


  constructor(private experienciaService: ExperienciaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.experienciaService.searchExperiencia(this.usuario.idCarrera!)
      .subscribe()
  }

  get usuario() {
    return this.authService.usuario
  }

  get experiencias(): Experiencia[] {
    return this.experienciaService.experiencias
  }

  get lista(): Posicion[][] {
    return new Array(this.filas).fill(0)
      .map((_, indiceFila) =>
        new Array(this.usuario.ciclos).fill(0)
          .map((_, indiceColumna) => (
            {
              'fila': indiceFila + 1,
              'ciclo': indiceColumna + 1,
            })
          )
      )
  }

  gridLayout() {
    return {
      'display': 'grid',
      'grid-template-columns': `repeat(${this.usuario.ciclos},1fr)`,
      'grid-template-rows': `repeat(${this.filas},1fr)`,
      'gap': '16px 30px'
    }
  }

  posicionExperiencia(cicloInicio: number, cicloFin: number, fila: number) {
    const largo = cicloFin - cicloInicio + 1
    let color = this.background(cicloInicio, cicloFin, largo)
    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
      'grid-row': `${fila} / span 1`,
      'background': color
    }
  }

  background(inicio: number, fin: number, expansion: number) {
    let color = ''
    if (expansion > 1) {
      let gradient = ''
      for (let index = inicio; index <= fin; index++) {
        gradient += `, var(--carrera-color-${index})`
      }
      color = `linear-gradient(90deg ${gradient})`
    }

    else {
      color = `var(--carrera-color-${inicio})`
    }
    return color
  }

  abrirModal(fila: number, columna: number, experiencia?:Experiencia) {
    this.modal = true
    console.log(fila,columna,experiencia);
    this.open.emit({ modal: this.modal, fila, columna,experiencia})
  }
  



}
