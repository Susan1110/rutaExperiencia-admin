import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

interface AuthRespone {
  ok: boolean
  carrera?: number
  msg?: string
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  private _idCarrera: number = parseInt(localStorage.getItem('idCarrera') ?? '0')

  get idCarrera() {
    return this._idCarrera
  }

  constructor(private http: HttpClient) {}

  login(user: string, password: string) {
    const URL = 'http://localhost:4040/auth/login'
    const body = { user, password }
    return this.http.post<AuthRespone>(URL, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('idCarrera', resp.carrera!.toString())
            this._idCarrera = resp.carrera!
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(false))
      )
  }
}
