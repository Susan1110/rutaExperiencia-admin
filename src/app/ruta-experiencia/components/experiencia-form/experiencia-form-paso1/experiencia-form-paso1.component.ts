import { Component, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Experiencia } from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { ExperienciaService } from 'src/app/ruta-experiencia/services/experiencia.service';
import { ContenidoService } from '../../../services/contenido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-experiencia-form-paso1',
  templateUrl: './experiencia-form-paso1.component.html',
  styleUrls: ['./experiencia-form-paso1.component.css']
})
export class ExperienciaFormPaso1Component {

  experienciaForm: FormGroup;
  @Input() funcion!: 'agregar' | 'editar';
  @Output() paso = new EventEmitter<number>();
  @Output() nuevaExperiencia = new EventEmitter<any>();


  get experiencia() {
    return this.experienciaService.experiencia
  }

  get carrera() {
    return this.authService.usuario.idCarrera
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    private contenidoService: ContenidoService) {
    this.experienciaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
    })
    if (this.experiencia) {
      this.experienciaForm.patchValue({
        nombre: this.experiencia.ExNombre,
        url: this.experiencia.ExIconoUrl
      })
    }
    console.log(this.experiencia)
  }


  opciones = [
    { nombre: 'Icono 1', url: "https://cdn1-icons-png.flaticon.com/512/6378/6378141.png" },
    { nombre: 'Icono 2', url: "https://cdn2-icons-png.flaticon.com/512/6378/6378141.png" },
    { nombre: 'Icono 3', url: "https://cdn3-icons-png.flaticon.com/512/6378/6378141.png" },
    { nombre: 'Icono 4', url: "https://cdn4-icons-png.flaticon.com/512/6378/6378141.png" }
  ];
  opcionSeleccionada = this.opciones[0];
  agregarExperiencia() {
    console.log(this.experienciaForm);
  }
  get ciclos() {
    return this.authService.usuario.ciclos ?? 0
  }

  get opcionesCiclos() {
    const ciclos = this.authService.usuario.ciclos ?? 0
    return Array.from({ length: ciclos - this.experiencia.ExCicloInicio + 1 }, (_, i) => this.experiencia.ExCicloInicio + i);
  }







  siguientePaso() {
    if (this.experiencia.IdExperiencia === 0) {
      this.paso.emit(2)
    }
    else {
      this.contenidoService.buscarContenido(this.experiencia.IdExperiencia)
        .subscribe(_ => this.paso.emit(2))
    }
  }


  async agregarexper() {
    const carrera = this.authService.usuario.idCarrera
    const fila = this.experiencia.ExFila
    const data = {
      // "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      // "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      // "ExCicloFin": this.txtCicloFin.nativeElement.value,
      // "ExFila": fila,
      // "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      // "IdCarrera": carrera
    }
    // this.nuevaExperiencia.emit(data);
    // const response = await fetch("http://localhost:4040/experiencia", {
    //   method: "post",
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // this.txtNombreExperiencia.nativeElement.value=''
    // this.txtUrlIcono.nativeElement.value=''
  }


  async editarExperiencia() {
    const data = {
      // "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      // "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      // "ExCicloFin": this.selCicloFin.nativeElement.value,
      // "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      // "IdCarrera": 1
    }
    // console.log(this.experiencia)
    // const idExperiencia = this.experiencia.IdExperiencia
    // const response = await fetch(`http://localhost:4040/experiencia/${idExperiencia}`, {
    //   method: "put",
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  }

}
