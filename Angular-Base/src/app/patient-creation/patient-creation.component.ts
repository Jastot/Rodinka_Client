import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GlvarsService } from '../glvars.service';

@Component({
  selector: 'app-patient-creation',
  templateUrl: './patient-creation.component.html',
  styleUrls: ['./patient-creation.component.css']
})
export class PatientCreationComponent implements OnInit {
  patForm: FormGroup;
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  message?:any;
  subscription?: Subscription;

  constructor(private activatedRouter: ActivatedRoute,
    private glvars:GlvarsService,
    private http: HttpClient,
    private router2: Router,
    private userservice: UserService) {
      this.patForm = new FormGroup({
        name: new FormControl(null,[Validators.required]),
        surname: new FormControl(null,[Validators.required]),
        additional_name: new FormControl(null,[Validators.required]),
        dateOfBirth: new FormControl(null,[Validators.required]),
        email: new FormControl(null,[Validators.required])
      })
     }
    _id:string="";
    patients:any[]=[];

  async ngOnInit() {
    this.newMsg(true);
    let params =  new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
    let result = await this.http.get<any>(`https://moletrainer.xyz/api/auth/me`,{params}).toPromise();
    this._id=result.data._id;
    this.patients = result.data.patients;
    this.newMsg(false);
  }
  // TODO: сделать данный компонент (дизайн no)
  async addPatient() {
    this.newMsg(true);
    var registr :IUser = this.patForm.value;
    console.log(registr);
    registr.password = "-------";
    registr.userType = "client"
    registr.doctor = this._id;
    let dob:any = registr.dateOfBirth;
    registr.dateOfBirth = new Date(dob).getTime();
    try
    {
      let ans:any = await this.userservice.postUser(registr);
      ans = ans.data;
      this.patients.push({id:ans._id});
      let payload = {
        token: localStorage.getItem('token') || sessionStorage.getItem('token'),
        patients: this.patients,
        _id:this._id
      }
        new HttpParams().set("token",localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      await this.http.put<any>(`https://moletrainer.xyz/api/users/user`,payload).toPromise();

    } 
    catch(err){
      console.log(err);
    };
    this.newMsg(false);
    this.router2.navigate([`/doctor`]);
  }
  onBackToDoctor(){
    this.router2.navigate([`/doctor`]);
  }
}
