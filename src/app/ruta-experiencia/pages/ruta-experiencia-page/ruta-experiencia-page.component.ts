import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css']
})
export class RutaExperienciaPageComponent {

  fila: number = 0;
  columna: number = 0;
  modal: boolean = false

  get usuario() {
    return this.authService.usuario
  }


  constructor(private authService: AuthService) { }


  abrirPopUp(arg: { modal: boolean, fila: number, columna: number }) {
    this.modal = arg.modal
    this.fila = arg.fila
    this.columna = arg.columna
  }

  cerrarPopUp(arg: boolean) {
    this.modal = arg
  }

}
