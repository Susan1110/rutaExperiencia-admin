import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css']
})
export class RutaExperienciaPageComponent {
  carrera: string = "Ingeniería Industrial"
  modal: boolean = false

  abrirPopUp(arg: boolean) {
    this.modal = arg
  }

  cerrarPopUp(arg: boolean) {
    this.modal = arg
  }

}
