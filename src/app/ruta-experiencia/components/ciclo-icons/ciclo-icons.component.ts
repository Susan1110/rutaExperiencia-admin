import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-ciclo-icons',
  templateUrl: './ciclo-icons.component.html',
  styleUrls: ['./ciclo-icons.component.css'],
})
export class CicloIconsComponent implements OnInit {
  arrayCiclos: number[] = [];

  get ciclos() {
    return this.authService.usuario.ciclos;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.arrayCiclos = Array(this.ciclos)
      .fill(0)
      .map((x, i) => i + 1);
  }

  gridCiclos() {
    return {
      display: 'grid',
      'grid-template-rows': '50px',
      'grid-template-columns': `repeat(${this.ciclos},1fr)`,
      gap: '30px',
    };
  }
}
