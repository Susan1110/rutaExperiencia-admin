import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-beneficios-nuevo',
  templateUrl: './beneficios-nuevo.component.html',
  styleUrls: ['./beneficios-nuevo.component.css'],
})
export class BeneficiosNuevoComponent {
  constructor(private modalService: ModalService) {}
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
  abrirModal(funcion: 'agregar' | 'editar') {
    this.modalService.abrirFormularioBeneficio(funcion);
  }
}
