import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { AuthService } from '../authentication/auth.service/auth.service';
import {Location} from '@angular/common';

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
  a!: any;
  button_header_back!: string;
  constructor(private activatedRouter: ActivatedRoute, private Location: Location, // хранит url адрес и параметры
    private userService: UserService, public http: HttpClient, private authService: AuthService, private router: Router) {
      if(this.currentRout != '/'){
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
    this.currentRout = window.location.pathname;
    this.a = window.location.href.split("/");
    // console.log(this.a[6], 'ff');
    
    switch(this.a[4]){
      case 'workingWithPatient':
        this.header_top = 'Информация о пациенте';
        this.isButtonVisible = true;
        this.isButtonVisiblexite = true; 
        break; 
    };
    switch(this.a[6]){
      case 'creationDiagnose':
        this.header_top = 'Диагноз';
        this.isButtonVisible = true;
        this.isButtonVisiblexite = true;  
        break;
        case 'lookingAtDiagnose':
        this.header_top = 'Информация о диагнозе';
        this.isButtonVisible = true;
        this.isButtonVisiblexite = true;  
        break;
          
    }
    switch(this.currentRout){
      case '/':
        this.header_top = 'Авторизация';
        this.isButtonVisible = false;
        this.isButtonVisiblexite = false;
        break;
        case '/registration':
          this.header_top = 'Регистрация';
          this.isButtonVisible = false;
          this.isButtonVisiblexite = false;
          break;
          case '/doctor':
            this.header_top = 'Здравствуйте, доктор';
            this.isButtonVisible = false;
            this.isButtonVisiblexite = true;
            break;
            case '/doctor/creationOrInput/-1':
              this.header_top = 'Добавления пациента';
              this.isButtonVisible = true;
              this.isButtonVisiblexite = true;
              break;
              





    };
    
  }
  btnOnBack(){
    this.Location.back();
  }
  
  async getUserById(id: string) : Promise<{data:IUser[]}> {
    let params = new HttpParams().set("_id",id);
    return this.http.get<{data:IUser[]}>('https://moletrainer.xyz/api/users',{params}).toPromise();
  }
  async exit()
  {
    this.authService.logout();
    this.router.navigate([`/`]);
  
}
}


