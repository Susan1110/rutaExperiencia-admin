import { Injectable } from '@angular/core';
import {
  Contenido,
  NuevoContenido,
} from '../Interfaces/ruta-experiencia.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { API_URL } from 'src/app/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ContenidoService {
  private _contenido: Contenido[] = [];
  private _idExperiencia = 0;

  get contenido() {
    return this._contenido;
  }

  get idExperiencia() {
    return this._idExperiencia;
  }

  constructor(private http: HttpClient) {}

  buscarContenido(idExperiencia: number) {
    const URL = `${API_URL}/contenido/experiencia/${idExperiencia}`;
    return this.http.get<Contenido[]>(URL).pipe(
      tap(resp => {
        this._contenido = resp;
      }),
      catchError(() => of(false))
    );
  }

  subirContenido(nuevoContenido: NuevoContenido) {
    const URL = `${API_URL}/contenido`;
    return this.http.post(URL, nuevoContenido);
  }

  editarContenido(idContenido: number, nuevoContenido: NuevoContenido) {
    const URL = `${API_URL}/contenido/${idContenido}`;
    return this.http.put(URL, nuevoContenido);
  }

  asignarExperiencia(id: number) {
    this._idExperiencia = id;
  }
}
