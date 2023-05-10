import { Injectable } from '@angular/core';
import { Contenido, NuevoContenido } from '../Interfaces/ruta-experiencia.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private _contenido: Contenido[]

  get contenido() {
    return this._contenido
  }

  constructor(private http: HttpClient) {
    this._contenido = []
  }

  buscarContenido(idExperiencia: number) {
    const URL = `http://localhost:4040/contenido/experiencia/${idExperiencia}`
    return this.http.get<Contenido[]>(URL)
      .pipe(
        tap(resp => {
          this._contenido = resp
        }),
        catchError(err => of(false))
      )
  }

  subirContenido(nuevoContenido: NuevoContenido) {
    const URL = 'http://localhost:4040/contenido'
    return this.http.post(URL, nuevoContenido)
  }

  editarContenido(idContenido: number, nuevoContenido: NuevoContenido) {
    const URL = `http://localhost:4040/contenido/${idContenido}`
    return this.http.put(URL, nuevoContenido)
  }
}
