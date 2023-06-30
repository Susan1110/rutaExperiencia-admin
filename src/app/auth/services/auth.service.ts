import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { API_URL } from 'src/app/api.constants';

interface Usuario {
  ok: boolean;
  usNombres?: string;
  usApellidos?: string;
  idCarrera?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _usuario: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this._usuario = JSON.parse(usuarioString);
    } else {
      this._usuario = {
        ok: false,
      };
    }
  }

  login(user: string, password: string) {
    const URL = `${API_URL}/auth/login`;
    const body = { user, password };
    return this.http.post<Usuario>(URL, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('usuario', JSON.stringify(resp));
          this._usuario = resp;
        }
      }),
      map(resp => resp.ok),
      catchError(() => of(false))
    );
  }
  logout() {
    localStorage.removeItem('usuario');
    this._usuario = {
      ok: false,
    };
  }
}
