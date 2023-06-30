import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo-icons',
  templateUrl: './ciclo-icons.component.html',
  styleUrls: ['./ciclo-icons.component.css'],
})
export class CicloIconsComponent {
  @Input() ciclo = 0;
}
