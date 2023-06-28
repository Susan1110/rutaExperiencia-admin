import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/api.constants';
import { Carrera } from '../Interfaces/carrera.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private _carrera: Carrera = {
    IdCarrera: 0,
    CaNombre: '',
    CaDescripcion: '',
    CaPlanEstudiosUrl: '',
    CaCantidadCiclos: 0,
    IdSede: 0,
    CaEstado: 0,
    CaUrlImagen: '',
  };

  get carrera() {
    return this._carrera;
  }

  constructor(private http: HttpClient) {}
  getCarrera(id: number) {
    const url = `${API_URL}/carrera/${id}`;
    return this.http
      .get<Carrera>(url)
      .pipe(tap(result => (this._carrera = result)));
  }
}
