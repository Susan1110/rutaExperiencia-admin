import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CarreraService } from '../../services/carrera.service';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css']
})
export class RutaExperienciaPageComponent {
  modal: boolean = false

  get idCarrera() {
    return this.authService.idCarrera
  }

  get carrera() {
    return this.carreraService.carrera
  }

  constructor(private authService: AuthService, private carreraService: CarreraService) { }


  abrirPopUp(arg: boolean) {
    this.modal = arg
  }

  cerrarPopUp(arg: boolean) {
    this.modal = arg
  }
  ngOnInit(): void {
    this.carreraService.searchCarrera(this.idCarrera)
      .subscribe()

  }


}
