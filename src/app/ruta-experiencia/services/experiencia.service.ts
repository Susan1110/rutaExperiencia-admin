import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Experiencia, NuevaExperiencia, RetornoExperiencia } from '../Interfaces/ruta-experiencia.interface';


@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private _experiencias: Experiencia[]
  private _experiencia!: Experiencia

  get experiencias() {
    return [...this._experiencias]
  }

  get experiencia() {
    return this._experiencia
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    this._experiencias = []
  }

  subirExperiencia(nuevaExperiencia: NuevaExperiencia) {
    const URL = 'http://localhost:4040/experiencia'
    return this.http.post<RetornoExperiencia>(URL, nuevaExperiencia)
      .pipe(
        map(res => { return res.id }),
        catchError(err => of(err))
      )
  }

  buscarExperiencias() {
    const idCarrera = this.authService.usuario.idCarrera
    const URL = `http://localhost:4040/experiencia/carrera/${idCarrera}`
    return this.http.get<Experiencia[]>(URL)
      .pipe(
        tap(resp => {
          this._experiencias = resp
        }),
        catchError(err => of(false))
      )
  }

  obtenerExperiencia(experiencia: Experiencia) {
    this._experiencia = experiencia
  }


}
