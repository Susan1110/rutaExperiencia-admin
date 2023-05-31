import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { NuevaExperiencia } from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from 'src/app/ruta-experiencia/services/experiencia.service';
import { ContenidoService } from '../../../services/contenido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experiencia-form-paso1',
  templateUrl: './experiencia-form-paso1.component.html',
  styleUrls: ['./experiencia-form-paso1.component.css'],
})
export class ExperienciaFormPaso1Component {
  experienciaForm: FormGroup;
  @Output() paso = new EventEmitter<number>();
  opciones = [
    {
      nombre: 'Análisis Químico',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_analisis-quimico.png',
    },
    {
      nombre: 'Cámara de Video',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_camara-de-video.png',
    },
    {
      nombre: 'Certificación',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_certificacion.png',
    },
    {
      nombre: 'DevApp',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_devApp.png',
    },
    {
      nombre: 'Diseño App',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_diseno-app.png',
    },
    {
      nombre: 'Estadística',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_estadistica.png',
    },
    {
      nombre: 'Física',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_fisica.png',
    },
    {
      nombre: 'Galería de Imágenes',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_galeria-de-imagenes.png',
    },
    {
      nombre: 'Google Docs',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_google-docs.png',
    },
    {
      nombre: 'Libro de Lectura',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_libro-de-lectura.png',
    },
    {
      nombre: 'Libro',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_libro.png',
    },
    {
      nombre: 'Moneda',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_moneda.png',
    },
    {
      nombre: 'Portafolio',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_portafolio.png',
    },
    {
      nombre: 'Simulador',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_simulador.png',
    },
    {
      nombre: 'Vista 360',
      url: 'https://objectstorage.sa-santiago-1.oraclecloud.com/p/uQX9oUnIJfHFnt3Mu9is1SPIv95TulLc0GS_DNTmRKIQrqZuydNm477vBhROHfBp/n/axth4ig2xaeu/b/rutaexperiencia-media/o/icon_vista-360.png',
    },
  ];

  get ciclos() {
    return this.authService.usuario.ciclos ?? 0;
  }

  get opcionesCiclos() {
    const ciclos = this.authService.usuario.ciclos ?? 0;
    return Array.from(
      { length: ciclos - this.experiencia.ExCicloInicio + 1 },
      (_, i) => this.experiencia.ExCicloInicio + i
    );
  }

  get funcion() {
    return this.modalService.funcionFormularioExperiancia;
  }

  get experiencia() {
    return this.experienciaService.experiencia;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    private contenidoService: ContenidoService,
    private modalService: ModalService,
    private toastr: ToastrService
  ) {
    this.experienciaForm = this.formBuilder.group({
      cicloInicio: [this.experiencia.ExCicloInicio || '', Validators.required],
      cicloFin: [this.experiencia.ExCicloFin || '', Validators.required],
      nombre: [this.experiencia.ExNombre || '', Validators.required],
      urlIcon: [
        this.experiencia.ExIconoUrl || this.opciones[0].url,
        Validators.required,
      ],
    });
  }

  actualizarExperiencia(esNuevaExperiencia: boolean) {
    if (this.experienciaForm.valid) {
      const idExperiencia = this.experiencia.IdExperiencia;
      const IdCarrera = this.authService.usuario.idCarrera;
      const fila = this.experiencia.ExFila;
      if (IdCarrera !== null && IdCarrera !== undefined) {
        const data: NuevaExperiencia = {
          ExNombre: this.experienciaForm.value.nombre,
          ExCicloInicio: this.experienciaForm.value.cicloInicio,
          ExCicloFin: this.experienciaForm.value.cicloFin,
          ExFila: fila,
          ExIconoUrl: this.experienciaForm.value.urlIcon,
          IdCarrera,
        };

        const serviceCall = esNuevaExperiencia
          ? this.experienciaService.subirExperiencia(data)
          : this.experienciaService.editarExperiencia(idExperiencia, data);

        serviceCall.subscribe({
          next: (idExperienciaRegistrada: number) => {
            const successMessage = esNuevaExperiencia
              ? 'Experiencia Registrada'
              : 'Experiencia Editada';
            this.toastr.success(successMessage);
            this.experienciaService.buscarExperiencias().subscribe();
            this.contenidoService.asignarExperiencia(idExperienciaRegistrada);
            this.siguientePaso();
          },
          error: err => {
            console.error(err);
            this.toastr.error(
              'Ha ocurrido un error al actualizar la experiencia.'
            );
          },
        });
      } else {
        this.toastr.error('La carrera no está definida.');
      }
    }
  }

  siguientePaso() {
    const idExperiencia = this.experiencia.IdExperiencia;
    if (idExperiencia === 0) {
      this.paso.emit(2);
    } else {
      this.contenidoService.asignarExperiencia(idExperiencia);
      this.contenidoService
        .buscarContenido(idExperiencia)
        .subscribe(() => this.paso.emit(2));
    }
  }
}
