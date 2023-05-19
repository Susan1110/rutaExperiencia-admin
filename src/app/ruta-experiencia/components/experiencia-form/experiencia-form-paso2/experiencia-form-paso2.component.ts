import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContenidoService } from '../../../services/contenido.service';
import {
  Contenido,
  NuevoContenido,
} from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from 'src/app/ruta-experiencia/services/experiencia.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../services/modal.service';
import { RegistroService } from 'src/app/ruta-experiencia/services/registro.service';

@Component({
  selector: 'app-experiencia-form-paso2',
  templateUrl: './experiencia-form-paso2.component.html',
  styleUrls: ['./experiencia-form-paso2.component.css'],
})
export class ExperienciaFormPaso2Component {
  opcionContenido: 'multimedia' | 'descripcion' = 'multimedia';
  contenidoForms: FormGroup[] = [];
  abrirContenido: boolean[] = [];
  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/undefined'
  );

  @Output() paso = new EventEmitter<number>();

  get funcion() {
    return this.modalService.funcionFormularioExperiancia;
  }

  get contenido() {
    return this.contenidoService.contenido[0];
  }

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private contenidoService: ContenidoService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private registroService: RegistroService,
    private experienciaService: ExperienciaService
  ) {
    this.agregarSlide()
  }

  ngOnInit(): void {
    // if (this.contenido) {
    //   this.contenidoForm.patchValue({
    //     tipo: 'video',
    //     link: this.contenido.CoUrlMedia,
    //     titulo: this.contenido.CoTitulo,
    //     contenido: this.contenido.CoDescripcion,
    //   });
    //   this.actualizarVideoUrl();
    // }
  }

  cambiarOpcion(nuevaOpcion: 'multimedia' | 'descripcion') {
    this.opcionContenido = nuevaOpcion;
  }

  verContenido(id: number) {
    this.abrirContenido[id] = !this.abrirContenido[id];
  }

  actualizarVideoUrl() {
    // const linkControl = this.contenidoForm.get('link');
    // if (linkControl) {
    //   const url = this.obtenerVideo(linkControl.value);
    //   this.videoUrl = url;
    // }
  }

  obtenerVideo(url: string) {
    const queryLink = url.split('?')[1];
    const params = new URLSearchParams(queryLink);
    const videoId = params.get('v');
    const videoCompartido = `https://www.youtube.com/embed/${videoId}`;
    const linkSeguro =
      this.sanitizer.bypassSecurityTrustResourceUrl(videoCompartido);
    return linkSeguro;
  }

  subirContenido() {
    // if (this.contenidoForm.valid) {
    //   const contenido: NuevoContenido = {
    //     CoTitulo: this.contenidoForm.value.titulo,
    //     CoDescripcion: this.contenidoForm.value.contenido,
    //     CoUrlMedia: this.contenidoForm.value.link,
    //     IdTipoMedia: 2,
    //     IdExperiencia: 0,
    //   };
    //   this.registroService.asignarCotnenido(contenido);
    //   this.registroService.registrarExperienciaYContenido();
    // }
  }
  editarContenido() {
    // if (this.contenidoForm.valid) {
    //   const contenido: NuevoContenido = {
    //     CoTitulo: this.contenidoForm.value.titulo,
    //     CoDescripcion: this.contenidoForm.value.contenido,
    //     CoUrlMedia: this.contenidoForm.value.link,
    //     IdTipoMedia: 2,
    //     IdExperiencia: this.contenido.IdExperiencia,
    //   };
    //   this.contenidoService
    //     .editarContenido(this.contenido.IdContenido, contenido)
    //     .subscribe({
    //       next: () => {
    //         this.toastr.success('Contenido Editado');
    //         this.modalService.cerrarFormularioExperiencia();
    //         this.experienciaService.buscarExperiencias().subscribe();
    //       },
    //       error: () => this.toastr.error('No se pudo editar el contenido'),
    //     });
    // }
  }

  anteriorPaso() {
    this.paso.emit(1);
  }

  agregarSlide() {
    const nuevoFormGroup = this.formBuilder.group({
      tipo: ['video', Validators.required],
      link: ['', Validators.required],
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  
    this.contenidoForms.push(nuevoFormGroup);
  }

  isFormArrayValid(): boolean {
    return this.contenidoForms.every(form => form.valid);
  }
}
