import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { AuthService } from '../authentication/auth.service/auth.service';
// import {button_header_back}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  registrForm!: FormGroup;
  public isButtonVisible = false;
  public isButtonVisiblexite = false;


  currentRout!: string;
  header_top!: string;
  
  button_header_back!: string;
  constructor(private activatedRouter: ActivatedRoute, // хранит url адрес и параметры
    private userService: UserService, public http: HttpClient, private authService: AuthService, private router: Router) {
      if(this.currentRout != 'http://localhost:4200/'){
        this.registrForm = new FormGroup({
          email: new FormControl
      });
        
    }
  }
  someVar: boolean = true;

  ngOnInit(): void {
    
  }
  async onRegistration() {
    var registr = this.registrForm.value;
    console.log(registr);
    try
    {
      await this.userService;
    } 
    catch(err){
      console.log(err);
    };
  }
  ngDoCheck(): void {
    this.currentRout = window.location.href;
    switch(this.currentRout){
      case 'http://localhost:4200/':
        this.header_top = 'Авторизация';
        this.isButtonVisible = false;
        this.isButtonVisiblexite = false;
        break;
        case 'http://localhost:4200/registration':
          this.header_top = 'Регистрация';
          this.isButtonVisible = false;
          this.isButtonVisiblexite = false;
          break;
          case 'http://localhost:4200/doctor':
            this.header_top = 'Добропожаловать в дурку';
            this.isButtonVisible = false;
            this.isButtonVisiblexite = true;
            break;
            case 'http://localhost:4200/doctor/creationOrInput/-1':
              this.header_top = 'Добавления пациента в дурку';
              this.isButtonVisible = true;
              this.isButtonVisiblexite = true;





    }
    
  }
  
  async getUserById(id: string) : Promise<{data:IUser[]}> {
    let params = new HttpParams().set("_id",id);
    return this.http.get<{data:IUser[]}>('http://moletrainer.xyz/api/users',{params}).toPromise();
  }
  async exit()
  {
    this.authService.logout();
    this.router.navigate([`/`]);
  
}
}


