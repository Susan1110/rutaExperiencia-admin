import { Injectable } from '@angular/core';
import { Contenido } from '../Interfaces/ruta-experiencia.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private _contenido: Contenido[]
  get contenido(){
    return this._contenido
  }

  constructor(private http:HttpClient) { 
    this._contenido=[]
  }
  buscarContenido(idExperiencia:number) /* Fucncion*/
  {
    const URL = `http://localhost:4040/contenido/experiencia/${idExperiencia}`
    return this.http.get<Contenido [] > (URL)/*tipo de valor*/
    .pipe(
      tap(respuesta=>this._contenido=respuesta),
      catchError(error=>of(error))
    )
  }

 
    
  

}
