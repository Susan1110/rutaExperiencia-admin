import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  nombres = '';
  apellidos = '';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.getNombres();
    this.getApellidos();
  }
  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logout();
  }
  getNombres() {
    this.nombres = this.authService.usuario.usNombres || '';
  }
  getApellidos() {
    this.apellidos = this.authService.usuario.usApellidos || '';
  }
}
