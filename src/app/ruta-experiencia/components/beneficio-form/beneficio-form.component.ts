import { Component,Input,Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { Beneficio, NuevoBeneficio } from '../../Interfaces/ruta-beneficio.interface';
import { ModalService } from '../../services/modal.service';
import { BeneficioService } from '../../services/beneficio.service';
import { AuthService } from './../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-beneficio-form',
  templateUrl: './beneficio-form.component.html',
  styleUrls: ['./beneficio-form.component.css']
})
export class BeneficioFormComponent {
  @ViewChild('txtDescripcionBeneficio') txtDescripcionBeneficio!: ElementRef<HTMLInputElement>
  get beneficio(){
    return this.beneficioService.beneficio
  }
  get funcion() {
    return this.modalService.funcionFormularioBeneficio
  }
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private  beneficioService:  BeneficioService,
    private toastr: ToastrService,
  ) { }
  modal: boolean = true

  cerrarFormulario() {
    this.modalService.cerrarFormularioBeneficio()
  }


  agregarBeneficio(){
    const carrera = this.authService.usuario.idCarrera
    const data:NuevoBeneficio = {
      BeDescripcion: this.txtDescripcionBeneficio.nativeElement.value,
      IdCarrera: carrera!};
      this.beneficioService.subirBeneficio(data).subscribe(response=>{
        console.log(response);
        this.toastr.success('Contenido registrado exitosamente.')
        this.modalService.cerrarFormularioBeneficio()
      })
      console.log(data);
  }
  
}

