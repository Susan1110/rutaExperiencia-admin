import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent {
  @Output() close: EventEmitter<boolean> = new EventEmitter()
  modal: boolean = true
  opcionMultimedia: 'video' | 'imagen' = 'video'
  opcionInfo: 'video' | 'descripcion' = 'video'


  selectInfo(opcion: 'video' | 'descripcion') {
    this.opcionInfo = opcion
  }

  selectMultimedia(opcion: 'video' | 'imagen') {
    this.opcionMultimedia = opcion
    this.opcionInfo = 'video'
  }

  cerrarModal() {
    this.modal = false
    this.close.emit(this.modal)
  }


  @ViewChild('txtCicloInicio') txtCicloInicio!: ElementRef<HTMLInputElement>
  @ViewChild('txtCicloFin') txtCicloFin!: ElementRef<HTMLInputElement>
  @ViewChild('txtNombreExperiencia') txtNombreExperiencia!: ElementRef<HTMLInputElement>
  @ViewChild('txtUrlIcono') txtUrlIcono!: ElementRef<HTMLInputElement>
  async agregarexper() {
    const data = {
      "ExNombre": this.txtNombreExperiencia.nativeElement.value,
      "ExCicloInicio": this.txtCicloInicio.nativeElement.value,
      "ExCicloFin": this.txtCicloFin.nativeElement.value,
      "ExFila": 3,
      "ExIconoUrl": this.txtUrlIcono.nativeElement.value,
      "IdCarrera": 1
    }
    const response = await fetch("http://localhost:4040/experiencia", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.txtCicloFin.nativeElement.value='';
    this.txtCicloInicio.nativeElement.value='';
    this.txtNombreExperiencia.nativeElement.value='';
    this.txtUrlIcono.nativeElement.value='';


  }
}
