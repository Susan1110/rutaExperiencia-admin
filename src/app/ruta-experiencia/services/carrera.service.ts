import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, of } from 'rxjs';

interface Carrera {
  IdCarrera: number
  CaNombre: string,
  CaDescripcion: string,
  CaPlanEstudiosUrl: string,
  CaCantidadCiclos: number,
  IdFacultad: number,
  IdSede: number,
  ok?: boolean,
  msg?: string
}

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private _carrera!: Carrera

  get carrera() {
    return { ...this._carrera }
  }

  constructor(private http: HttpClient) { }

  searchCarrera(idCarrera: number) {
    const URL = `http://localhost:4040/carrera/${idCarrera}`
    return this.http.get<Carrera>(URL)
      .pipe(
        tap(resp => {
          this._carrera = resp
        }),
        catchError(err => of(false))
      )      
  }
}
