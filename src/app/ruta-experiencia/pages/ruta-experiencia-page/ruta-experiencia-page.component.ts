import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css'],
})
export class RutaExperienciaPageComponent {
  funcion: 'agregar' | 'editar' = 'agregar';
  datos!: Experiencia;

  get usuario() {
    return this.authService.usuario;
  }
  get formularioExperiencia() {
    return this.modalService.estadoFormularioExperiencia;
  }
  get tarjetaExperiencia() {
    return this.modalService.estadoTarjetaExperiencia;
  }
  get formularioBeneficio() {
    return this.modalService.estadoFormularioBeneficio;
  }

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}
}
