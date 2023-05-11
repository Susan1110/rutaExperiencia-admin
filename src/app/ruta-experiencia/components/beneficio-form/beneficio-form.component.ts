import { Component,Input,Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { Beneficio, NuevoBeneficio } from '../../Interfaces/ruta-beneficio.interface';
import { ModalService } from '../../services/modal.service';
import { BeneficioService } from '../../services/beneficio.service';
import { AuthService } from './../../../auth/services/auth.service';
import { RegistroService } from './../../services/registro.service';



@Component({
  selector: 'app-beneficio-form',
  templateUrl: './beneficio-form.component.html',
  styleUrls: ['./beneficio-form.component.css']
})
export class BeneficioFormComponent {
  @Output() close: EventEmitter<boolean> = new EventEmitter()
  @ViewChild('txtDescripcionBeneficio') txtDescripcionBeneficio!: ElementRef<HTMLInputElement>

  get funcion() {
    return this.modalService.funcionFormularioBeneficio
  }
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private RegistroService: RegistroService
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
      console.log(data);
      this.RegistroService.asignarBeneficio(data)
      this.RegistroService.registrarBeneficio()

  }
  
}

