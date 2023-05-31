import { Component, EventEmitter, Output } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { Beneficio } from '../../Interfaces/ruta-beneficio.interface';

@Component({
  selector: 'app-beneficio-list',
  templateUrl: './beneficio-list.component.html',
  styleUrls: ['./beneficio-list.component.css']
})
export class BeneficioListComponent {

  filas: number = this.beneficios.length + 1
  ciclos: number = 10
  
  get beneficios(): Beneficio[]{
    console.log(this.beneficioService.beneficios)
    return this.beneficioService.beneficios
  }
  
  ngOnInit(): void {
    this.beneficioService.buscarBeneficio().subscribe()
  }
  constructor(
    private beneficioService: BeneficioService, 
    private authService: AuthService,
    private modalService: ModalService,
    ) { }

  get usuario() {
    return this.authService.usuario
  }
 eliminar(beneficio: Beneficio){
  this.beneficioService.eliminarBeneficio(beneficio.IdBeneficio).subscribe()
 }
  
  abrirModalEditar(funcion:'editar',beneficio: Beneficio){
    this.modalService.abrirFormularioBeneficio(funcion)
    this.beneficioService.obtenerBeneficio(beneficio)
  }
  
  abrirModal(funcion: 'agregar' | 'editar') {
    this.modalService.abrirFormularioBeneficio(funcion)
  }
  gridLayout() {
    return {
      'display': 'grid',
      'grid-template-columns': `repeat(${this.ciclos},1fr)`,
      'grid-template-rows': `repeat(${this.filas},1fr)`,
      'gap': '16px 30px'
    }
  }

  posicionBeneficio(cicloInicio: number = 1, cicloFin: number = 10) {
    const largo = cicloFin - cicloInicio + 1
    const color = this.background(cicloInicio, cicloFin, largo)
    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
      'background': color,
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
}
