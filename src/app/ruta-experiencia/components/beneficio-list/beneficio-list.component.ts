import { Component } from '@angular/core';

interface Beneficio {
  id: string;
  nombre: string;
  descripcion: string;
  cicloInicio: number;
  cicloFin: number;
}

@Component({
  selector: 'app-beneficio-list',
  templateUrl: './beneficio-list.component.html',
  styleUrls: ['./beneficio-list.component.css'],
})
export class BeneficioListComponent {
  beneficios: Beneficio[] = [
    {
      id: '1',
      nombre: 'prueba1',
      descripcion: 'prueba1',
      cicloInicio: 1,
      cicloFin: 10,
    },
    {
      id: '2',
      nombre: 'prueba2',
      descripcion: 'prueba2',
      cicloInicio: 1,
      cicloFin: 10,
    },
  ];

  filas: number = this.beneficios.length + 1;
  ciclos = 10;

  gridLayout() {
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${this.ciclos},1fr)`,
      'grid-template-rows': `repeat(${this.filas},1fr)`,
      gap: '16px 30px',
    };
  }

  posicionBeneficio(cicloInicio = 1, cicloFin = 10) {
    const largo = cicloFin - cicloInicio + 1;
    const color = this.background(cicloInicio, cicloFin, largo);
    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
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
