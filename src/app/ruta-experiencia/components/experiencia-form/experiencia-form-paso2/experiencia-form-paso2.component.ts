import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ContenidoService } from '../../../services/contenido.service';
import {
  Contenido,
  NuevoContenido,
} from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from 'src/app/ruta-experiencia/services/experiencia.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../services/modal.service';
import { concat, forkJoin } from 'rxjs';

@Component({
  selector: 'app-experiencia-form-paso2',
  templateUrl: './experiencia-form-paso2.component.html',
  styleUrls: ['./experiencia-form-paso2.component.css'],
})
export class ExperienciaFormPaso2Component implements OnInit {
  media = [
    { id: 1, nombre: 'Imagen' },
    { id: 2, nombre: 'Video' },
    { id: 3, nombre: 'Imagen360' },
  ];

  idExperiencia = 0;
  opcionContenido: ('multimedia' | 'descripcion')[] = [];
  contenidoForms: FormGroup[] = [];
  abrirContenido: boolean[] = [];
  sliderDeshabilitado = false;
  tipoSeleccionado: number[] = [];
  // urlVideo: string[] = [];
  // urlImagen: string[] = [];
  // urlImagen360: string[] = [];

  @Output() paso = new EventEmitter<number>();

  get funcion() {
    return this.modalService.funcionFormularioExperiancia;
  }

  get contenidos() {
    return this.contenidoService.contenido;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private contenidoService: ContenidoService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.idExperiencia = this.contenidoService.idExperiencia;
    if (this.contenidos.length > 0) {
      this.contenidos.forEach(contenido => {
        this.agregarSlide(contenido);
      });
    } else {
      this.agregarSlide();
    }
    this.abrirContenido[0] = true;
  }

  cambiarOpcion(index: number, nuevaOpcion: 'multimedia' | 'descripcion') {
    this.opcionContenido[index] = nuevaOpcion;
  }

  verContenido(id: number) {
    this.abrirContenido.fill(false);
    this.abrirContenido[id] = true;
  }

  // actualizarMedia(index: number, tipo: number) {
  //   const formGroup = this.contenidoForms.at(index);
  //   const inputLink = formGroup?.get('link')?.value;
  //   // this.contenidoForms[index]

  //   if (tipo === 1) {
  //     this.urlImagen[index] = inputLink;
  //   } else if (tipo === 2) {
  //     this.urlVideo[index] = inputLink;
  //   } else if (tipo === 3) {
  //     this.urlImagen360[index] = inputLink;
  //   }
  // }

  convertirAVideoCompartido(url = 'https://www.youtube.com/watch?v=undefined') {
    const queryLink = url.split('?')[1];
    const params = new URLSearchParams(queryLink);
    const videoId = params.get('v');
    const videoCompartido = `https://www.youtube.com/embed/${videoId}`;
    return videoCompartido;
  }

  convertirALinkSeguro(url: string) {
    const linkSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return linkSeguro;
  }

  agregarSlide(contenido?: Contenido) {
    const nuevoFormGroup = this.formBuilder.group({
      idContenido: [contenido?.IdContenido || 0],
      tipo: [contenido?.IdTipoMedia || 1, Validators.required],
      linkImagen: ['', Validators.required],
      linkVideo: ['', Validators.required],
      linkImagen360: ['', Validators.required],
      titulo: [contenido?.CoTitulo || '', Validators.required],
      contenido: [contenido?.CoDescripcion || '', Validators.required],
    });

    const url = contenido?.CoUrlMedia || '';
    if (contenido?.IdTipoMedia === 1) {
      nuevoFormGroup.patchValue({ linkImagen: url });
    } else if (contenido?.IdTipoMedia === 2) {
      nuevoFormGroup.patchValue({ linkVideo: url });
    } else if (contenido?.IdTipoMedia === 3) {
      nuevoFormGroup.patchValue({ linkImagen360: url });
    }
    this.abrirContenido.push(false);
    this.opcionContenido.push('multimedia');
    this.tipoSeleccionado.push(contenido?.IdTipoMedia || 1);

    if (this.contenidoForms.length >= 4) {
      this.sliderDeshabilitado = true;
    } else {
      this.sliderDeshabilitado = false;
    }
    this.contenidoForms.push(nuevoFormGroup);
  }

  anteriorPaso() {
    this.paso.emit(1);
  }

  isFormArrayValid(): boolean {
    return (
      this.contenidoForms.length > 0 &&
      this.contenidoForms.every(form => {
        const tipo = form.get('tipo')?.value;
        if (tipo) {
          switch (tipo) {
            case 1: // Tipo imagen
              return (
                form.get('linkImagen')?.valid &&
                form.get('titulo')?.valid &&
                form.get('contenido')?.valid
              );
            case 2: // Tipo video
              return (
                form.get('linkVideo')?.valid &&
                form.get('titulo')?.valid &&
                form.get('contenido')?.valid
              );
            case 3: // Tipo imagen 360
              return (
                form.get('linkImagen360')?.valid &&
                form.get('titulo')?.valid &&
                form.get('contenido')?.valid
              );
            default:
              return false; // Tipo no válido
          }
        } else {
          return false; // Campo 'tipo' no encontrado
        }
      })
    );
  }

  guardarContenido() {
    if (this.isFormArrayValid()) {
      const contenidoObservables = this.contenidoForms.map(form => {
        const tipo = form.value.tipo;
        let urlMedia = '';
        switch (tipo) {
          case 1: // Tipo imagen
            urlMedia = form.value.linkImagen;
            break;
          case 2: // Tipo video
            urlMedia = form.value.linkVideo;
            break;
          case 3: // Tipo imagen 360
            urlMedia = form.value.linkImagen360;
            break;
        }
        const contenido: NuevoContenido = {
          CoTitulo: form.value.titulo,
          CoDescripcion: form.value.contenido,
          CoUrlMedia: urlMedia,
          IdTipoMedia: form.value.tipo,
          IdExperiencia: this.idExperiencia,
        };

        if (form.value.idContenido === 0) {
          // Agregar nuevo contenido
          return this.contenidoService.subirContenido(contenido);
        } else {
          // Editar contenido existente
          return this.contenidoService.editarContenido(
            form.value.idContenido,
            contenido
          );
        }
      });

      concat(...contenidoObservables).subscribe({
        next: () => {
          this.toastr.success('Contenidos guardados');
          this.modalService.cerrarFormularioExperiencia();
          this.experienciaService.buscarExperiencias().subscribe();
        },
        error: () => this.toastr.error('No se pudieron guardar los contenidos'),
      });
    }
  }

  subirContenido() {
    if (this.isFormArrayValid()) {
      const editarContenidoObservables = this.contenidoForms.map(form => {
        const tipo = form.value.tipo;
        let urlMedia = '';

        switch (tipo) {
          case 1: // Tipo imagen
            urlMedia = form.value.linkImagen;
            break;
          case 2: // Tipo video
            urlMedia = form.value.linkVideo;
            break;
          case 3: // Tipo imagen 360
            urlMedia = form.value.linkImagen360;
            break;
        }
        const contenido: NuevoContenido = {
          CoTitulo: form.value.titulo,
          CoDescripcion: form.value.contenido,
          CoUrlMedia: urlMedia,
          IdTipoMedia: form.value.tipo,
          IdExperiencia: this.idExperiencia,
        };
        return this.contenidoService.subirContenido(contenido);
      });
      forkJoin(editarContenidoObservables).subscribe({
        next: () => {
          this.toastr.success('Contenidos creados');
          this.modalService.cerrarFormularioExperiencia();
          this.experienciaService.buscarExperiencias().subscribe();
        },
        error: () => this.toastr.error('No se pudieron guardar los contenidos'),
      });
    }
  }

  editarContenido() {
    if (this.isFormArrayValid()) {
      const editarContenidoObservables = this.contenidoForms.map(form => {
        const tipo = form.value.tipo;
        let urlMedia = '';
        switch (tipo) {
          case 1: // Tipo imagen
            urlMedia = form.value.linkImagen;
            break;
          case 2: // Tipo video
            urlMedia = form.value.linkVideo;
            break;
          case 3: // Tipo imagen 360
            urlMedia = form.value.linkImagen360;
            break;
        }
        const contenido: NuevoContenido = {
          CoTitulo: form.value.titulo,
          CoDescripcion: form.value.contenido,
          CoUrlMedia: urlMedia,
          IdTipoMedia: form.value.tipo,
          IdExperiencia: this.idExperiencia,
        };

        if (form.value.idContenido === 0) {
          // Agregar nuevo contenido
          return this.contenidoService.subirContenido(contenido);
        } else {
          // Editar contenido existente
          return this.contenidoService.editarContenido(
            form.value.idContenido,
            contenido
          );
        }
      });
      forkJoin(editarContenidoObservables).subscribe({
        next: () => {
          this.toastr.success('Contenidos guardados');
          this.modalService.cerrarFormularioExperiencia();
          this.experienciaService.buscarExperiencias().subscribe();
        },
        error: () => this.toastr.error('No se pudieron guardar los contenidos'),
      });
    }
  }

  // imagenSubida = '';
  // imagenEnlace: string[] = [];

  // subirImagen(event: any, index: number) {
  //   const archivo = event.target.files[0];
  //   this.extraerBase64(archivo).then((imagen: any) => {
  //     this.imagenSubida = imagen.base;
  //     console.log(imagen);
  //   });
  // }

  // extraerBase64 = async ($event: any) =>
  //   new Promise((resolve, reject) => {
  //     try {
  //       const reader = new FileReader();
  //       reader.readAsDataURL($event);
  //       reader.onload = () => {
  //         resolve({
  //           base: reader.result,
  //         });
  //       };
  //       reader.onerror = error => {
  //         resolve({
  //           base: null,
  //           error,
  //         });
  //       };
  //     } catch (e) {
  //       reject({
  //         base: null,
  //         error: e,
  //       });
  //     }
  //   });

  // guardarImagen(index: number) {
  //   // // Aquí debes implementar la lógica para subir la imagen a Oracle Cloud
  //   // // y obtener el enlace correspondiente
  //   // // Una vez obtenido el enlace, puedes asignarlo al formulario
  //   // const enlaceImagen =
  //   //   'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_camara-de-video.png';
  //   // this.imagenEnlace[index] = enlaceImagen;
  //   // this.contenidoForms[index].get('link').setValue(enlaceImagen);
  // }
}
