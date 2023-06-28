import { Component, Input } from '@angular/core';
import { Beneficio } from '../../Interfaces/ruta-beneficio.interface';
import { BeneficioService } from '../../services/beneficio.service';
import { ModalService } from '../../services/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css'],
})
export class BeneficiosComponent {
  @Input() beneficio!: Beneficio;
  constructor(
    private beneficioService: BeneficioService,
    private modalService: ModalService,
    private toastr: ToastrService
  ) {}
  eliminar(beneficio: Beneficio) {
    this.beneficioService
      .eliminarBeneficio(beneficio.IdBeneficio)
      .subscribe(() => {
        this.toastr.success('Beneficio eliminado exitosamente.');
        this.beneficioService.buscarBeneficios().subscribe();
      });
  }

  abrirModalEditar(funcion: 'editar', beneficio: Beneficio) {
    this.modalService.abrirFormularioBeneficio(funcion);
    this.beneficioService.obtenerBeneficio(beneficio);
  }

  abrirModal(funcion: 'agregar' | 'editar') {
    this.modalService.abrirFormularioBeneficio(funcion);
  }
}
