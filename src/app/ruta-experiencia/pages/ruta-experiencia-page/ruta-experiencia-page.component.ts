import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AbrirForm, Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ContenidoService } from '../../services/contenido.service';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css']
})
export class RutaExperienciaPageComponent {

  funcion: 'agregar' | 'editar' = 'agregar'
  datos!: Experiencia
  modal: boolean = false

  get usuario() {
    return this.authService.usuario
  }


  constructor(private authService: AuthService, private contenidoService: ContenidoService) { }


  abrirPopUp(arg: AbrirForm) {
    this.modal = arg.modal
    this.funcion = arg.funcion
    this.datos = arg.experiencia
  }

  cerrarPopUp(arg: boolean) {
    this.modal = arg
  }

}
