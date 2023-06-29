import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import {
  DeleteExperienciaResponse,
  Experiencia,
  NuevaExperiencia,
  RetornoExperiencia,
} from '../Interfaces/ruta-experiencia.interface';
import { API_URL } from 'src/app/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private _experiencias: Experiencia[];
  private _experiencia!: Experiencia;

  get experiencias() {
    return [...this._experiencias];
  }

  get experiencia() {
    return this._experiencia;
  }

  constructor(private http: HttpClient, private authService: AuthService) {
    this._experiencias = [];
  }

  buscarExperiencias() {
    const idCarrera = this.authService.usuario.idCarrera;
    const URL = `${API_URL}/experiencia/carrera/${idCarrera}`;
    return this.http.get<Experiencia[]>(URL).pipe(
      tap(resp => {
        this._experiencias = resp;
      }),
      catchError(() => of(false))
    );
  }

  subirExperiencia(nuevaExperiencia: NuevaExperiencia) {
    const URL = `${API_URL}/experiencia`;
    return this.http.post<RetornoExperiencia>(URL, nuevaExperiencia).pipe(
      map(res => {
        return res.id;
      }),
      catchError(err => of(err))
    );
  }

  editarExperiencia(idExperiencia: number, experiencia: NuevaExperiencia) {
    const URL = `${API_URL}/experiencia/${idExperiencia}`;
    return this.http.put(URL, experiencia).pipe(
      map(() => {
        return idExperiencia;
      }),
      catchError(err => of(err))
    );
  }

  deleteExperiencia(idExperiencia: number) {
    const URL = `${API_URL}/experiencia/${idExperiencia}`;
    return this.http.delete<DeleteExperienciaResponse>(URL);
  }

  obtenerExperiencia(experiencia: Experiencia) {
    this._experiencia = experiencia;
  }
}
