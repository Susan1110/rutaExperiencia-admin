import { Injectable } from '@angular/core';
import { ExperienciaService } from './experiencia.service';
import { ContenidoService } from './contenido.service';
import { NuevaExperiencia, NuevoContenido } from '../Interfaces/ruta-experiencia.interface';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private experienciaService: ExperienciaService,
    private contenidoService: ContenidoService,
    private toastr: ToastrService
  ) { }

  registrarExperienciaYContenido(nuevaExperiencia: NuevaExperiencia, nuevoContenido: NuevoContenido) {
    this.experienciaService.subirExperiencia(nuevaExperiencia)
      .subscribe({
        next: (idExperienciaRegistrada) => {
          nuevoContenido.IdExperiencia = idExperienciaRegistrada;
          this.contenidoService.subirContenido(nuevoContenido)
            .subscribe({
              next: () => this.toastr.success('Contenido registrado exitosamente.'),
              error: (err) => {
                console.error(err)
                this.toastr.error('Ha ocurrido un error al registrar el contenido.')
              }
            });
        },
        error: (err) => {
          console.error(err)
          this.toastr.error('Ha ocurrido un error al registrar la experiencia.')
        }
      });
  }
}
