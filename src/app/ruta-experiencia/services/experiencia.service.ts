import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError } from 'rxjs';

interface Experiencia {
  IdExperiencia: number;
  ExNombre: string;
  ExDescripcion: string;
  ExCicloInicio: number;
  ExCicloFin: number;
  ExFila: number;
  ExIconoUrl: string;
  IdCarrera: number;
}


@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private _experiencias: Experiencia[]

  get experiencias() {
    return [...this._experiencias]
  }
  constructor(private http: HttpClient) {
    this._experiencias = []
  }



  searchExperiencia(idCarrera: number) {
    const URL = `http://localhost:4040/experiencia/carrera/${idCarrera}`
    return this.http.get<Experiencia[]>(URL)
      .pipe(
        tap(resp => {
          this._experiencias = resp
        }),
        catchError(err => of(false))
      )
  }

}
