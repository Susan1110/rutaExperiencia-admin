import { Component } from '@angular/core';
import { CarrerasService } from '../carreras.service';

@Component({
  selector: 'app-carreras-page',
  templateUrl: './carreras-page.component.html',
  styleUrls: ['./carreras-page.component.css']
})
export class CarrerasPageComponent {
  
  get carreras(){
    return this.carrerasService.carreras
  }

  constructor(private carrerasService:CarrerasService){ }
  
}
