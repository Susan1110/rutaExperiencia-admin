import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import {
  Beneficio,
  NuevoBeneficio,
} from '../Interfaces/ruta-beneficio.interface';
import { API_URL } from 'src/app/api.constants';

@Injectable({
  providedIn: 'root',
})
export class BeneficioService {
  private _beneficios: Beneficio[];
  private _beneficio!: Beneficio;

  get beneficios() {
    return [...this._beneficios];
  }
  get beneficio() {
    return this._beneficio;
  }
  constructor(private http: HttpClient, private authService: AuthService) {
    this._beneficios = [];
  }
  subirBeneficio(nuevoBeneficio: NuevoBeneficio) {
    const URL = `${API_URL}/beneficio`;
    return this.http.post(URL, nuevoBeneficio);
  }

  // me obtiene todos los beneficios del IdCarrera
  buscarBeneficio() {
    const IdCarrera = this.authService.usuario.idCarrera;
    const URL = `${API_URL}/beneficio/carrera/${IdCarrera}`;
    return this.http.get<Beneficio[]>(URL).pipe(
      tap(rest => {
        this._beneficios = rest;
      }),
      catchError(() => of(false))
    );
  }
  obtenerBeneficio(beneficio: Beneficio) {
    this._beneficio = beneficio;
    console.log(this._beneficio);
  }
  editarBeneficio(idBeneficio: number, beneficio: NuevoBeneficio) {
    const URL = `${API_URL}/beneficio/${idBeneficio}`;
    return this.http.put(URL, beneficio);
  }
  eliminarBeneficio(idBeneficio: number) {
    const URL = `${API_URL}/beneficio/${idBeneficio}`;
    return this.http.delete(URL);
  }
}
