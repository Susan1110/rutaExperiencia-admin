import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, catchError, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Beneficio, NuevoBeneficio, RetornoBeneficio } from '../Interfaces/ruta-beneficio.interface';
import { ModalService } from './modal.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  private _beneficios: Beneficio[]
  private _beneficio!: Beneficio


  get beneficios() {
    return [...this._beneficios]
  }
  get beneficio() {
    return this._beneficio
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {
    this._beneficios = []
  }
  subirBeneficio(nuevoBeneficio: NuevoBeneficio) {
    const URL = 'http://localhost:4040/beneficio'
    return this.http.post(URL, nuevoBeneficio)
  }
  
  // me obtiene todos los beneficios del IdCarrera
  buscarBeneficio() {
    const IdCarrera=this.authService.usuario.idCarrera
    const URL = `http://localhost:4040/beneficio/carrera/${IdCarrera}`
    return this.http.get<Beneficio[]>(URL)
    .pipe(
      tap(rest=>{
        this._beneficios= rest
      }),
      catchError(err => of(false))
    )    
  }
  obtenerBeneficio(beneficio: Beneficio) {
    this._beneficio = beneficio
    console.log(this._beneficio)
  }
 
 
}
