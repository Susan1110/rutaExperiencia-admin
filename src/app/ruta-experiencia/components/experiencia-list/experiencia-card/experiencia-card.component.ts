
import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContenidoService } from 'src/app/ruta-experiencia/services/contenido.service';


@Component({
  selector: 'app-experiencia-card',
  templateUrl: './experiencia-card.component.html',
  styleUrls: ['./experiencia-card.component.css']
})
export class ExperienciaCardComponent {

  @Output() close: EventEmitter<boolean> = new EventEmitter()
  verContenido: boolean = true
  get contenido() {
    return this.contenidoService.contenido[0]
  }

  get URL(){
    const URL = this.contenido.CoUrlMedia //https://www.youtube.com/watch?v=s9XvSeRsdzg
    const videoId = URL.split('=')[1] //
    const url = `https://www.youtube.com/embed/${videoId}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  constructor(
    private contenidoService: ContenidoService,
    private sanitizer: DomSanitizer
  ) {
  }
  cerrarContenido() {
    this.verContenido = false
    this.close.emit(this.verContenido)
    console.log(URL)
  }

}
