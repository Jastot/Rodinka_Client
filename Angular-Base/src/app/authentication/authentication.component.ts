import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../interfaces/user-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from './auth.service/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authForm: FormGroup;

  constructor(private activatedRouter: ActivatedRoute, // хранит url адрес и параметры
    private router: Router,
    private authService: AuthService) {
      this.authForm = new FormGroup({
        login: new FormControl(null,[Validators.required]),
        password: new FormControl(null,[Validators.required]),
        rmbME: new FormControl(null, [Validators.required])
   });
  }
    
     
  ngOnInit() {

     if(this.authService.token == null)
        return;
     else
     this.authService.setUser();
  }
  
  isEmptyStorage()
  {
    
  }

  onLogin() {
    // if (this.authForm.invalid) {
    //   return;
    // }
    
    const user: IUser = {
      email: this.authForm.value.login,
      password: this.authForm.value.password,
      rmbMe: this.authForm.value.rmbME
    };
    console.log(user);
    this.authService.login(user);
  }

  onRegistration()
  {
    this.router.navigate([`/registration`]);
  }
}
