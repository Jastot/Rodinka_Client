import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service/auth.service';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DisplayDatePipe } from '../display-date.pipe';
import { GlvarsService } from '../glvars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors-account',
  templateUrl: './doctors-account.component.html',
  styleUrls: ['./doctors-account.component.css']
})
export class DoctorsAccountComponent implements OnInit {
  // @Output() loaderEmitter = new EventEmitter<boolean> ();
  message?:any;
  subscription?: Subscription;
  patients: IUser[] = [];
  load:boolean = true;
  constructor(private userService: UserService,
    private glvars:GlvarsService,
    private router: Router, private authService: AuthService, private http:HttpClient) { }

  async ngOnInit() {
    this.subscription = this.glvars.currentMessage.subscribe(message => this.message = message)
    this.newMsg(true);
    this.glvars.a=true;
    let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
    let result = await this.http.get<any>(`https://moletrainer.xyz/api/auth/me`,{params}).toPromise();
    for (let patient of result.data.patients){
      let user = await this.userService.getUserById(patient.id);
      this.patients.push(user.data);
    }
    console.log(this.patients)
    this.load = ! this.load;
    // this.loaderEmitter.emit(this.load);
    this.glvars.a=false;
    this.newMsg(false);
  }
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  async exit()
  {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

  async addNewPatient()
  {
    this.router.navigate([`/doctor/creationOrInput/-1`]);
  }

}
