import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { User } from 'src/app/shared/user';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  user: User = new User();
  verifyAccount: string;
  ifNoAccount: boolean = true;
  ifLoginError: boolean = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private appService: AppService, 
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(){
    this.authService.logout();

    const password = this.loginForm.value.password;
    let email: string = '';
    let role: string = '';

    this.appService.getUser().subscribe((response: any) => {
      const users = response;

      for (let i = 0; i < users.length; i++) {
        if (this.loginForm.value.email === users[i].email) {
          if (users[i].role !== null) {
            role = users[i].role;
          }
          email = this.loginForm.value.email;

          this.authService.login(email, password, role).subscribe(result => {
              this.appService.loadUser().subscribe();
              if(localStorage.role === "admin"){
                this.router.navigate(['/admin'])
              } else {
                this.router.navigate(['/'])
              }
            },
            error => {
              this.ifLoginError = false;
              this.ifNoAccount = true;
              this.verifyAccount = "Votre email ou votre mot de passe est incorrect";
              // console.log("error", error.error.err);
              setTimeout(() => {
                this.ifLoginError = true;
              },4000);
            },
          );
          break;
        } else if (this.loginForm.value.email !== users[i].email) {
          this.ifLoginError = true;
          this.ifNoAccount = false;
          this.verifyAccount = "Votre espace n'existe pas";
          setTimeout(() => {
            this.ifNoAccount = true;
          },4000);
        } else {
          this.ifLoginError = true;
          this.ifNoAccount = true;
        }
      }
    })
  }

}
