import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Experiencia } from '../../Interfaces/ruta-experiencia.interface';
import { ModalService } from '../../services/modal.service';
import { CarreraService } from '../../services/carrera.service';
import { SedeService } from '../../services/sede.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  selector: 'app-ruta-experiencia-page',
  templateUrl: './ruta-experiencia-page.component.html',
  styleUrls: ['./ruta-experiencia-page.component.css'],
})
export class RutaExperienciaPageComponent implements OnInit {
  funcion: 'agregar' | 'editar' = 'agregar';
  datos!: Experiencia;
  carrera = '';
  sede = '';
  ciclo = 0;
  ciclos: number[] = [];
  nuevasExperiencias: Experiencia[][] = [];

  get experiencias() {
    return this.experienciaService.experiencias;
  }
  get beneficios() {
    return this.beneficioService.beneficios;
  }
  get formularioExperiencia() {
    return this.modalService.estadoFormularioExperiencia;
  }
  get tarjetaExperiencia() {
    return this.modalService.estadoTarjetaExperiencia;
  }
  get formularioBeneficio() {
    return this.modalService.estadoFormularioBeneficio;
  }

  constructor(
    private authService: AuthService,
    private carreraService: CarreraService,
    private sedeService: SedeService,
    private experienciaService: ExperienciaService,
    private beneficioService: BeneficioService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getCarrera();
    this.getExperiencias();
    this.getBeneficios();
  }

  getCarrera() {
    const idCarrera = this.authService.usuario.idCarrera;
    if (idCarrera !== undefined) {
      return this.carreraService.getCarrera(idCarrera).subscribe({
        next: result => {
          this.carrera = result.CaNombre;
          this.ciclo = result.CaCantidadCiclos;
          this.getSede(result.IdSede);
          this.updateCiclos(this.ciclo);
          this.updateNuevasExperiencias(this.ciclo, result.IdCarrera);
        },
        error: error => console.log(error, 'No se obtuvo carrera'),
      });
    } else {
      console.log('El idCarrera es undefined');
      return;
    }
  }

  getSede(id: number) {
    this.sedeService.getSede(id).subscribe({
      next: result => (this.sede = result.SeNombre),
      error: error => console.log(error, 'No se obtuvo sede'),
    });
  }

  getExperiencias() {
    this.experienciaService.buscarExperiencias().subscribe();
  }

  getBeneficios() {
    this.beneficioService.buscarBeneficios().subscribe();
  }

  tabla() {
    return {
      'grid-template-rows': `50px repeat(8,1fr)`,
      'grid-template-columns': `repeat(${this.ciclo},1fr)`,
      gap: '15px',
    };
  }

  updateCiclos(ciclos: number): void {
    this.ciclos = Array(ciclos)
      .fill(0)
      .map((x, i) => i + 1);
  }

  updateNuevasExperiencias(ciclos: number, idCarrera: number) {
    this.nuevasExperiencias = new Array(8).fill(0).map((_, indiceFila) =>
      new Array(ciclos).fill(0).map((_, indiceColumna) => ({
        IdExperiencia: 0,
        ExNombre: '',
        ExDescripcion: '',
        ExCicloInicio: indiceColumna + 1,
        ExCicloFin: indiceColumna + 1,
        ExFila: indiceFila + 1,
        ExIconoUrl: '',
        IdCarrera: idCarrera,
      }))
    );
  }

  posicionExperiencia(
    cicloInicio: number,
    cicloFin: number,
    fila: number,
    nuevo = false
  ) {
    const largo = cicloFin - cicloInicio + 1;
    let color = `white`;
    if (!nuevo) {
      color = this.background(cicloInicio, cicloFin, largo);
    }

    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
      'grid-row': `${fila} / span 1`,
      background: color,
    };
  }

  posicionBeneficio(cicloInicio = 1, cicloFin = 10) {
    const largo = cicloFin - cicloInicio + 1;
    const color = this.background(cicloInicio, cicloFin, largo);
    return {
      'grid-column': `${cicloInicio} / span ${largo}`,
      background: color,
    };
  }

  background(inicio: number, fin: number, expansion: number) {
    let color = '';
    if (expansion > 1) {
      let gradient = '';
      for (let index = inicio; index <= fin; index++) {
        gradient += `, var(--carrera-color-${index})`;
      }
      color = `linear-gradient(90deg ${gradient})`;
    } else {
      color = `var(--carrera-color-${inicio})`;
    }
    return color;
  }
}
