import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Posicion {
  fila: number
  ciclo: number
}

interface Experiencia {
  id: string
  nombre: string
  descripcion: string
  contenido: string
  cicloInicio: number
  cicloFin: number
  fila: number
}

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent {
  @Output() open: EventEmitter<boolean> = new EventEmitter()
  modal: boolean = false;
  filas: number = 8
  ciclos: number = 10
  posicion: Posicion[][]

  experiencias: Experiencia[] = [
    {
      "id": "1",
      "nombre": "prueba1",
      "descripcion": "prueba1",
      "contenido": "prueba1",
      "cicloInicio": 1,
      "cicloFin": 1,
      "fila": 4
    },
    {
      "id": "2",
      "nombre": "prueba2",
      "descripcion": "prueba2",
      "contenido": "prueba2",
      "cicloInicio": 2,
      "cicloFin": 3,
      "fila": 7
    },
    {
      "id": "3",
      "nombre": "prueba2",
      "descripcion": "prueba2",
      "contenido": "prueba2",
      "cicloInicio": 8,
      "cicloFin": 10,
      "fila": 2
    }
  ]

  gridLayout() {
    return {
      'display': 'grid',
      'grid-template-columns': `repeat(${this.ciclos},1fr)`,
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

  abrirModal() {
    this.modal = true
    this.open.emit(this.modal)
  }

  constructor() {
    this.posicion = new Array(this.filas).fill(0)
      .map((a, indiceFila) =>
        new Array(this.ciclos).fill(0)
          .map((a, indiceColumna) => (
            {
              'fila': indiceFila + 1,
              'ciclo': indiceColumna + 1,
            })
          )
      )
  }
}