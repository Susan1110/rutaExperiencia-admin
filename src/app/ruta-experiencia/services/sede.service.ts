import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/api.constants';
import { Sede } from '../Interfaces/sede.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  private _sede: Sede = {
    IdSede: 0,
    SeNombre: '',
    SeDireccion: '',
    SeReferencia: '',
    SeTelefono: '',
    SeUrlImagen: '',
    SeDescripcion: '',
  };

  get sede() {
    return this._sede;
  }

  constructor(private http: HttpClient) {}

  getSede(id: number) {
    const url = `${API_URL}/sede/${id}`;
    return this.http.get<Sede>(url).pipe(tap(result => (this._sede = result)));
  }
}
