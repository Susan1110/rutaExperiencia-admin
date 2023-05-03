import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-experiencia-form-paso2',
  templateUrl: './experiencia-form-paso2.component.html',
  styleUrls: ['./experiencia-form-paso2.component.css']
})
export class ExperienciaFormPaso2Component {

  opcion: 'multimedia' | 'descripcion' = 'multimedia'
  contenido: boolean = true
  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/undefined')

  constructor(private sanitizer: DomSanitizer) { }

  cambiarOpcion(nuevaOpcion: 'multimedia' | 'descripcion') {
    this.opcion = nuevaOpcion
  }

  verContenido() {
    this.contenido = !this.contenido
  }

  actualizarVideoUrl(link: string) {
    const videoId = link.split('=')[1]
    const url = `https://www.youtube.com/embed/${videoId}`
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

}
