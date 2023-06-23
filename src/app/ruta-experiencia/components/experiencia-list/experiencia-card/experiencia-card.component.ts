import { Component } from '@angular/core';
import { ContenidoService } from 'src/app/ruta-experiencia/services/contenido.service';
import { ModalService } from '../../../services/modal.service';
import { EquirectProjection } from '@egjs/ngx-view360';

@Component({
  selector: 'app-experiencia-card',
  templateUrl: './experiencia-card.component.html',
  styleUrls: ['./experiencia-card.component.css'],
})
export class ExperienciaCardComponent {
  get contenidos() {
    return this.contenidoService.contenidos;
  }

  constructor(
    private contenidoService: ContenidoService,
    private modalService: ModalService
  ) {}
  cerrarContenido() {
    this.modalService.cerrarTarjetaExperiencia();
  }
  obtenerIdVideo(url: string) {
    if (!url) {
      return 'undefined';
    }

    const queryLink = url.split('?')[1];
    if (!queryLink) {
      return 'undefined';
    }
    const params = new URLSearchParams(queryLink);
    const videoId = params.get('v');
    if (!videoId) {
      return 'undefined';
    }
    console.log(videoId);
    return videoId;
  }
  options(url: string) {
    return {
      gyro: false,
      projection: new EquirectProjection({
        src: url,
      }),
    };
  }
}
