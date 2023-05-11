import { Injectable } from '@angular/core';
import { Experiencia, NuevaExperiencia } from '../Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from './experiencia.service';
import { Beneficio } from '../Interfaces/ruta-beneficio.interface';
import { BeneficioService } from './beneficio.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _estadoFormularioExperiencia: boolean = false
  private _funcionFormularioExperiancia: 'agregar' | 'editar' = 'agregar'
  private _estadoTarjetaExperiencia: boolean = false


  private _estadoFormularioBeneficio: boolean = false
  private _funcionFormularioBeneficio: 'agregar' | 'editar' = 'agregar'
  private _estadoTarjetaBeneficio: boolean = false
//Experiencia
  get estadoFormularioExperiencia() {
    return this._estadoFormularioExperiencia
  }

  get funcionFormularioExperiancia() {
    return this._funcionFormularioExperiancia
  }

  get estadoTarjetaExperiencia() {
    return this._estadoTarjetaExperiencia
  }
  //Beneficios
  get estadoFormularioBeneficio() {
    return this._estadoFormularioBeneficio
  }

  get funcionFormularioBeneficio() {
    return this._funcionFormularioBeneficio
  }

  get estadoTarjetaBeneficio() {
    return this._estadoTarjetaBeneficio
  }

  constructor(
    private experienciaService: ExperienciaService,private beneficioService:BeneficioService
  ) { }
//Experiencia
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
  //Beneficio
  abrirFormularioBeneficio(funcion: 'agregar' | 'editar') {
    this._estadoFormularioBeneficio = true
    this._funcionFormularioBeneficio = funcion
  }

  cerrarFormularioBeneficio() {
    this._estadoFormularioBeneficio = false
  }
  mostrarTarjetaBeneficio() {
    this._estadoTarjetaBeneficio = !this._estadoTarjetaBeneficio
  }
}
