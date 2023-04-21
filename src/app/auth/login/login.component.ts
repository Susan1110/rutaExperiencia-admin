import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('txtUser') txtUser!: ElementRef<HTMLInputElement>
  @ViewChild('txtPassword') txtPassword!: ElementRef<HTMLInputElement>

  async login() {
    const data = {
      "user": this.txtUser.nativeElement.value,
      "password": this.txtPassword.nativeElement.value
    }
    const response = await fetch("http://localhost:4040/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json();
    if (jsonData.log) {
      this.router.navigate(['/main'])
    }
    else {
      alert('Usuario o Contraseña incorrecta')
    }

    // if (this.txtUser.nativeElement.value === "admin" && this.txtPassword.nativeElement.value === "admin") {
    //   this.router.navigate(['/main'])
    // }
    // else {
    //   alert('Usuario o Contraseña incorrecta')
    // }
  }

  constructor(public router: Router) { }

}
