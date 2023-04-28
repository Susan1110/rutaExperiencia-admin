import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('txtUser') txtUser!: ElementRef<HTMLInputElement>
  @ViewChild('txtPassword') txtPassword!: ElementRef<HTMLInputElement>

  constructor(public router: Router, private authService: AuthService) { }

  async login() {
    const user = this.txtUser.nativeElement.value
    const password = this.txtPassword.nativeElement.value

    this.authService.login(user, password)
      .subscribe(ok => {
        if (ok) {
          this.router.navigate(['/main'])
        }
        else {
          alert('Usuario o Contraseña incorrecta')
        }
      })


    // if (this.txtUser.nativeElement.value === "admin" && this.txtPassword.nativeElement.value === "admin") {
    //   this.router.navigate(['/main'])
    // }
    // else {
    //   alert('Usuario o Contraseña incorrecta')
    // }
  }



}
