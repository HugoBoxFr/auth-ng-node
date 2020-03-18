import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { AppService } from 'src/app/shared/app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[];
  createUser: User = new User();

  ifMailError: boolean = false;
  placeholderMail: string = "Adresse email";
  
  ifPwdError: boolean = false;
  placeholderPwd: string = "Confirmer votre mot de passe";

  registerForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private authService: AuthService,
    private appService: AppService, 
    private fb: FormBuilder, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let users: User[] = [];
    let user: User = new User();

    this.appService.getUser().subscribe((res: any) => {
      users = res;
      
      if (users.length > 0) {
        for (let i = 0; i < users.length; i ++) {
          if (this.registerForm.value.email === users[i].email) {
            this.registerForm.controls['email'].reset();
            this.ifMailError = true;
            this.placeholderMail = "Cette adresse mail a déjà été utilisé";
            setTimeout(() => {
              this.placeholderMail = "Entrer une autre adresse email";
              this.ifMailError = false;
            },4000);
          } 
        }
      }

      if (this.registerForm.value.password !== this.registerForm.value.password2) {
        this.ifPwdError = true;
        this.ifPwdError = true;
        this.placeholderPwd = "Vos mots de passe doivent être identiques.";
        setTimeout(() => {
          this.placeholderPwd = "Entrer à nouveau votre mot de passe.";
          this.ifPwdError = false;
        },4000);

        this.registerForm.controls['password2'].reset();
      } else {
        user.email = this.registerForm.value.email;
        user.password = this.registerForm.value.password;
      }

      if (user.email !== undefined && user.password !== undefined) {
        this.authService.createUser(user).subscribe((res: any) => {
          this.router.navigate(['/login']);
        });
      }
    })
  }

}
