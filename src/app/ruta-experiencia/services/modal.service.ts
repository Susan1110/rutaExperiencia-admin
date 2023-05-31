import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _estadoFormularioExperiencia = false;
  private _funcionFormularioExperiancia: 'agregar' | 'editar' = 'agregar';

  private _estadoTarjetaExperiencia = false;

  private _estadoFormularioBeneficio = false;
  private _funcionFormularioBeneficio: 'agregar' | 'editar' = 'agregar';
  private _estadoTarjetaBeneficio = false;
  //Experiencia
  get estadoFormularioExperiencia() {
    return this._estadoFormularioExperiencia;
  }

  get funcionFormularioExperiancia() {
    return this._funcionFormularioExperiancia;
  }

  get estadoTarjetaExperiencia() {
    return this._estadoTarjetaExperiencia;
  }
  //Beneficios
  get estadoFormularioBeneficio() {
    return this._estadoFormularioBeneficio;
  }

  get funcionFormularioBeneficio() {
    return this._funcionFormularioBeneficio;
  }

  get estadoTarjetaBeneficio() {
    return this._estadoTarjetaBeneficio;
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
  //Beneficio
  abrirFormularioBeneficio(funcion: 'agregar' | 'editar') {
    this._estadoFormularioBeneficio = true;
    this._funcionFormularioBeneficio = funcion;
  }

  cerrarFormularioBeneficio() {
    this._estadoFormularioBeneficio = false;
  }
  mostrarTarjetaBeneficio() {
    this._estadoTarjetaBeneficio = !this._estadoTarjetaBeneficio;
  }
}
