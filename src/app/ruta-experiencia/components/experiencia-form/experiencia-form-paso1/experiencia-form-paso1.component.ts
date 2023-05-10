import { Component, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Experiencia } from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from 'src/app/ruta-experiencia/services/experiencia.service';
import { ContenidoService } from '../../../services/contenido.service';

@Component({
  selector: 'app-experiencia-form-paso1',
  templateUrl: './experiencia-form-paso1.component.html',
  styleUrls: ['./experiencia-form-paso1.component.css']
})
export class ExperienciaFormPaso1Component {

  @Output() paso = new EventEmitter<number>();
  @ViewChild('txtCicloInicio') txtCicloInicio!: ElementRef<HTMLInputElement>
  @ViewChild('txtCicloFin') txtCicloFin!: ElementRef<HTMLInputElement>
  @ViewChild('txtNombreExperiencia') txtNombreExperiencia!: ElementRef<HTMLInputElement>
  @ViewChild('txtUrlIcono') txtUrlIcono!: ElementRef<HTMLInputElement>

  get experiencia() {
    return this.experienciaService.experiencia
  }

  get carrera() {
    return this.authService.usuario.idCarrera
  }

  get opcionesCiclos() {
    const ciclos = this.authService.usuario.ciclos ?? 0
    return Array.from({ length: ciclos - this.experiencia.ExCicloInicio + 1 }, (_, i) => this.experiencia.ExCicloInicio + i);
  }

  constructor(
    private authService: AuthService,
    private experienciaService: ExperienciaService,
    private contenidoService: ContenidoService
  ) { }

  



  siguientePaso() {
    if (this.experiencia.IdExperiencia === 0) {
      this.paso.emit(2)
    }
    else {
      this.contenidoService.buscarContenido(this.experiencia.IdExperiencia)
        .subscribe(_ => this.paso.emit(2))
    }
  }


  async agregarexper() {
    const carrera = this.authService.usuario.idCarrera
    const fila = this.experiencia.ExFila
    const data = {
      "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      "ExCicloFin": this.txtCicloFin.nativeElement.value,
      "ExFila": fila,
      "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      "IdCarrera": carrera
    }
    const response = await fetch("http://localhost:4040/experiencia", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
