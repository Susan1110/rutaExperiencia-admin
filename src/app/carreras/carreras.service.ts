import { Injectable } from '@angular/core';

export interface Carrera {
  IdCarrera: number;
  CaNombre: string;
  CaDescripcion: null;
  CaPlanEstudiosUrl: string;
  CaCantidadCiclos: number;
  IdSede: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private _carreras :Carrera[]= []

  get carreras() {
    return this._carreras
  }

  constructor() {
    this.getCarreras()
  }

  async getCarreras() {
    const resp = await fetch('http://localhost:4040/carrera');
    const data = await resp.json()
    this._carreras = data
  }
}
