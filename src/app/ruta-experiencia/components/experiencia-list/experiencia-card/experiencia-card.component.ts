
import { Component,Output,EventEmitter } from '@angular/core';
import { ContenidoService } from 'src/app/ruta-experiencia/services/contenido.service';


@Component({
  selector: 'app-experiencia-card',
  templateUrl: './experiencia-card.component.html',
  styleUrls: ['./experiencia-card.component.css']
})
export class ExperienciaCardComponent {

  @Output()close:EventEmitter<boolean>=new EventEmitter()
  verContenido:boolean=true
  get contenido(){
    return this.contenidoService.contenido[0]
  }
  
  constructor(private contenidoService:ContenidoService){
    
  }
  cerrarContenido(){
    this.verContenido=false
    this.close.emit(this.verContenido)
  }

}
