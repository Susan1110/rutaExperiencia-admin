import { Component } from '@angular/core';
import { EquirectProjection } from '@egjs/ngx-view360';
import { API_URL } from 'src/app/api.constants';
import { ContenidoService } from '../../services/contenido.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  apiUrl = API_URL;

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
