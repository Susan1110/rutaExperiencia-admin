import { Component, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-experiencia-form-paso1',
  templateUrl: './experiencia-form-paso1.component.html',
  styleUrls: ['./experiencia-form-paso1.component.css']
})
export class ExperienciaFormPaso1Component {

  @Input() columna: number = 0;
  @Input() fila: number = 0;
  @Output() paso = new EventEmitter<number>();
  @ViewChild('txtCicloInicio') txtCicloInicio!: ElementRef<HTMLInputElement>
  @ViewChild('txtCicloFin') txtCicloFin!: ElementRef<HTMLInputElement>
  @ViewChild('txtNombreExperiencia') txtNombreExperiencia!: ElementRef<HTMLInputElement>
  @ViewChild('txtUrlIcono') txtUrlIcono!: ElementRef<HTMLInputElement>

  constructor(private authService: AuthService) { }

  get ciclos() {
    return this.authService.usuario.ciclos ?? 0
  }

  get opcionesCiclos() {
    return Array.from({ length: this.ciclos - this.columna + 1 }, (_, i) => this.columna + i);
  }

  siguientePaso() {
    this.paso.emit(2)
  }


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
  }

}
