import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContenidoService } from '../../../services/contenido.service';
import { NuevoContenido } from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';

@Component({
  selector: 'app-experiencia-form-paso2',
  templateUrl: './experiencia-form-paso2.component.html',
  styleUrls: ['./experiencia-form-paso2.component.css']
})
export class ExperienciaFormPaso2Component {

  @Output() estadoFormularioEmisor = new EventEmitter<boolean>();

  opcionContenido: 'multimedia' | 'descripcion' = 'multimedia'
  contenidoForm: FormGroup;
  editarContenido: boolean = true
  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/undefined')

  constructor(private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private contenidoService: ContenidoService) {
    this.contenidoForm = this.formBuilder.group({
      tipo: ['video', Validators.required],
      link: ['', Validators.required],
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
    })
  }

  cambiarOpcion(nuevaOpcion: 'multimedia' | 'descripcion') {
    this.opcionContenido = nuevaOpcion
  }

  verContenido() {
    this.editarContenido = !this.editarContenido
  }

  actualizarVideoUrl() {
    const linkControl = this.contenidoForm.get('link')
    if (linkControl) {
      const videoId = linkControl.value.split('=')[1]
      const url = `https://www.youtube.com/embed/${videoId}`
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
  }

  subirContenido() {
    if (this.contenidoForm.valid) {
      const contenido: NuevoContenido = {
        CoTitulo: this.contenidoForm.value.titulo,
        CoDescripcion: this.contenidoForm.value.contenido,
        CoUrlMedia: this.contenidoForm.value.link,
        IdTipoMedia: 2,
        IdExperiencia: 1
      };

      this.contenidoService.postContenido(contenido)
        .subscribe(
          {
            next: response => {
              alert(`Contenido Creado ${response}`)
              this.estadoFormularioEmisor.emit(false)
            },
            error: error => alert(`No se pudo crear contenido ${error}`),
            complete: () => console.log('Observable complete')
          }
        )
    }
  }

}
