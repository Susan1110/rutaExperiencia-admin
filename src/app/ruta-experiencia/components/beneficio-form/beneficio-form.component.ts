import { Component } from '@angular/core';
import { NuevoBeneficio } from '../../Interfaces/ruta-beneficio.interface';
import { ModalService } from '../../services/modal.service';
import { BeneficioService } from '../../services/beneficio.service';
import { AuthService } from './../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficio-form',
  templateUrl: './beneficio-form.component.html',
  styleUrls: ['./beneficio-form.component.css'],
})
export class BeneficioFormComponent {
  beneficioForm: FormGroup;

  // @ViewChild('txtDescripcionBeneficio') txtDescripcionBeneficio!: ElementRef<HTMLInputElement>
  get beneficio() {
    return this.beneficioService.beneficio;
  }
  get funcion() {
    return this.modalService.funcionFormularioBeneficio;
  }
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private beneficioService: BeneficioService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.beneficioForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
    });
    if (this.funcion == 'agregar') {
      this.beneficioForm = this.formBuilder.group({
        descripcion: ['', Validators.required],
      });
    }
    if (this.funcion == 'editar') {
      this.beneficioForm = this.formBuilder.group({
        descripcion: [this.beneficio.BeDescripcion || '', Validators.required],
      });
    }
  }
  modal = true;

  cerrarFormulario() {
    this.modalService.cerrarFormularioBeneficio();
  }

  agregarBeneficio() {
    if (this.beneficioForm.valid) {
      const carrera = this.authService.usuario.idCarrera;
      const data: NuevoBeneficio = {
        BeDescripcion: this.beneficioForm.value.descripcion,
        IdCarrera: carrera!,
      };
      this.beneficioService.subirBeneficio(data).subscribe(response => {
        console.log(response);
        this.toastr.success('Contenido registrado exitosamente.');
        this.beneficioService.buscarBeneficios().subscribe();
        this.modalService.cerrarFormularioBeneficio();
      });
      console.log(data);
    }
  }
  editarBeneficio() {
    if (this.beneficioForm.valid) {
      const idBeneficio = this.beneficio.IdBeneficio;
      const carrera = this.authService.usuario.idCarrera;
      const data: NuevoBeneficio = {
        BeDescripcion: this.beneficioForm.value.descripcion,
        IdCarrera: carrera!,
      };
      this.beneficioService.editarBeneficio(idBeneficio, data).subscribe({
        next: () => {
          this.toastr.success('Experiencia Editada');
          this.beneficioService.buscarBeneficios().subscribe();
          this.modalService.cerrarFormularioBeneficio();
        },
        error: () => this.toastr.error('No se pudo editar el beneficio'),
      });
    }
  }
}
