import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { IDiagnose } from '../interfaces/diag.inter';

import { DisplayDatePipe } from '../display-date.pipe';


@Component({
  selector: 'app-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: ['./patients-card.component.css']
})
export class PatientsCardComponent implements OnInit {
  patients!: IUser;
  patientForm: FormGroup;
  currentRoutt!: any;
  n!: any;
  q!: any;
  constructor(private userService: UserService,
    private router: Router, 
    private activatedRouter: ActivatedRoute) {
      this.patientForm = new FormGroup({
        diagnoz: new FormControl(null,[Validators.required]),
        password: new FormControl(null,[Validators.required]),
        rmbME: new FormControl(null, [Validators.required])
      });
     }
  id: string = "";
 
  reverseKeyOrder = (a: KeyValue<string,string | undefined>, b: KeyValue<string,string | undefined>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  
  displayDate (num:number){
    return  new Date(num*1000);
  }
  async ngOnInit() {
    this.id = this.activatedRouter.snapshot.url[2].path;
    let res = await this.userService.getUserById(this.id);
    this.patients = await res.data;
    this.addSome(this.patients);
    console.log(this.patients.consultations)
  }

  toggleText: string = "Изменить";
  

  testObject: { [key: string]: string | undefined} =
  {
    
  };

  addSome(patient: IUser)
  {
    this.testObject = {
      "Фамилия: ": patient.surname?.toString(),
      "Имя: ": patient.name?.toString(),
      "Email: ": patient.email?.toString(),
      "Дата рождения: ": patient.dateOfBirth?.slice(0,10).toString()
    }
  }

  changeDi()
  {
    this.router.navigate([`doctor/workingWithPatient/${this.id}/creationDiagnose`]);
  }
  createCon()
  {
    this.router.navigate([`doctor/workingWithPatient/${this.id}/creationConsultation`]);
  }

  createOp()
  {
    //this.router.navigate([`doctor/workingWithPatient/${this.id}/lookingAtConsultatio`]);
  }
  ngDoCheck(): void {
    this.currentRoutt = window.location.pathname;
    this.n = window.location.href.split("/");
    // console.log(this.n[5]);
    this.q = this.n[5];
  }
  
}
