import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _estadoFormularioExperiencia = false;
  private _funcionFormularioExperiancia: 'agregar' | 'editar' = 'agregar';

  private _estadoTarjetaExperiencia = false;

  get estadoFormularioExperiencia() {
    return this._estadoFormularioExperiencia;
  }

  get funcionFormularioExperiancia() {
    return this._funcionFormularioExperiancia;
  }

  get estadoTarjetaExperiencia() {
    return this._estadoTarjetaExperiencia;
  }

  abrirFormularioExperiencia(funcion: 'agregar' | 'editar') {
    this._estadoFormularioExperiencia = true;
    this._funcionFormularioExperiancia = funcion;
  }

  cerrarFormularioExperiencia() {
    this._estadoFormularioExperiencia = false;
  }

  mostrarTarjetaExperiencia() {
    this._estadoTarjetaExperiencia = !this._estadoTarjetaExperiencia;
  }

  abrirTarjetaExperiencia() {
    this._estadoTarjetaExperiencia = true;
  }

  cerrarTarjetaExperiencia() {
    this._estadoTarjetaExperiencia = false;
  }
}
