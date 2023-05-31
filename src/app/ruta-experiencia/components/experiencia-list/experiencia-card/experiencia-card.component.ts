import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContenidoService } from 'src/app/ruta-experiencia/services/contenido.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-experiencia-card',
  templateUrl: './experiencia-card.component.html',
  styleUrls: ['./experiencia-card.component.css'],
})
export class ExperienciaCardComponent {
  verContenido = true;
  get contenido() {
    return this.contenidoService.contenido[0];
  }

  get URL() {
    const URL = this.contenido.CoUrlMedia; //https://www.youtube.com/watch?v=s9XvSeRsdzg
    const videoId = URL.split('=')[1]; //
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  constructor(
    private contenidoService: ContenidoService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService
  ) {}
  cerrarContenido() {
    this.modalService.cerrarTarjetaExperiencia();
  }
}
