import { Injectable } from '@angular/core';
import { Experiencia, NuevaExperiencia } from '../Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from './experiencia.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _estadoFormularioExperiencia: boolean = false
  private _funcionFormularioExperiancia: 'agregar' | 'editar' = 'agregar'
  private _estadoTarjetaExperiencia: boolean = false

  get estadoFormularioExperiencia() {
    return this._estadoFormularioExperiencia
  }

  get funcionFormularioExperiancia() {
    return this._funcionFormularioExperiancia
  }

  get estadoTarjetaExperiencia() {
    return this._estadoTarjetaExperiencia
  }

  constructor(
    private experienciaService: ExperienciaService
  ) { }

  abrirFormularioExperiencia(funcion: 'agregar' | 'editar') {
    this._estadoFormularioExperiencia = true
    this._funcionFormularioExperiancia = funcion    
  }

  cerrarFormularioExperiencia() {
    this._estadoFormularioExperiencia = false
  }

  mostrarTarjetaExperiencia() {
    this._estadoTarjetaExperiencia = !this._estadoTarjetaExperiencia
  }
}
