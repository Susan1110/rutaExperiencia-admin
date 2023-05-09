import { Component, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Experiencia } from 'src/app/ruta-experiencia/Interfaces/ruta-experiencia.interface';
import { Router } from '@angular/router';

interface Opcion {
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-experiencia-form-paso1',
  templateUrl: './experiencia-form-paso1.component.html',
  styleUrls: ['./experiencia-form-paso1.component.css']
})
export class ExperienciaFormPaso1Component {
  @Input() experiencia!: Experiencia;
  @Input() funcion!: 'agregar' | 'editar';
  @Output() paso = new EventEmitter<number>();
  @ViewChild('txtCicloInicio') txtCicloInicio!: ElementRef<HTMLInputElement>
  @ViewChild('selCicloFin') selCicloFin!: ElementRef<HTMLInputElement>
  @ViewChild('txtNombreExperiencia') txtNombreExperiencia!: ElementRef<HTMLInputElement>
  @ViewChild('txtUrlIcono') txtUrlIcono!: ElementRef<HTMLInputElement>
  
  



  constructor(private authService: AuthService,private router: Router) { }
  opciones=[
    {nombre: 'Icono 1',url:"https://cdn1-icons-png.flaticon.com/512/6378/6378141.png"},
    {nombre: 'Icono 2',url:"https://cdn2-icons-png.flaticon.com/512/6378/6378141.png"},
    {nombre: 'Icono 3',url:"https://cdn3-icons-png.flaticon.com/512/6378/6378141.png"},
    {nombre: 'Icono 4',url:"https://cdn4-icons-png.flaticon.com/512/6378/6378141.png"}
  ];
  opcionSeleccionada=this.opciones[0];
  
  get ciclos() {
    return this.authService.usuario.ciclos ?? 0
  }
  
  get opcionesCiclos() {
    return Array.from({ length: this.ciclos - this.experiencia.ExCicloInicio + 1 }, (_, i) => this.experiencia.ExCicloInicio + i);
  }

  siguientePaso() {
    this.paso.emit(2)
  }


  async agregarexper() {
    const data = {
      "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      "ExCicloFin": this.selCicloFin.nativeElement.value,
      "ExFila": this.experiencia.ExFila,
      "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      "IdCarrera": 1
    }
    console.log(data)
    const response = await fetch("http://localhost:4040/experiencia", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.txtNombreExperiencia.nativeElement.value=''
    this.txtUrlIcono.nativeElement.value=''
  }


  async editarExperiencia() {
    const data = {
      "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      "ExCicloFin": this.selCicloFin.nativeElement.value,
      "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      "IdCarrera": 1
    }
    console.log(data)
    const idExperiencia=this.experiencia.IdExperiencia
    const response = await fetch(`http://localhost:4040/experiencia/${idExperiencia}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.txtNombreExperiencia.nativeElement.value=''
    this.txtUrlIcono.nativeElement.value=''
  }

}
