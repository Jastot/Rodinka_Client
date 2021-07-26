import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiagnose } from '../interfaces/diag.inter';
import { diagService } from '../services/diag.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { GlvarsService } from '../glvars.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css']
})
export class DiagnoseComponent implements OnInit {
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  message?:any;
  subscription?: Subscription;
  patients!: IDiagnose;
  currentRoutt!: any;
  n!: any;
  q!: any;
  constructor(private userService: UserService, private diagservice: diagService,
    private router: Router, 
    private activatedRouter: ActivatedRoute,
    private glvars:GlvarsService) {
      
     }
  id: string = "";
  uid: string = "";
  user: any;
  reverseKeyOrder = (a: KeyValue<string,string | undefined>, b: KeyValue<string,string | undefined>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  async ngOnInit() {
    this.newMsg(true);
    var und;
    this.id = this.activatedRouter.snapshot.url[4].path;
    this.uid = this.activatedRouter.snapshot.url[2].path;
    und = await this.diagservice.getDiagById(this.id)
    if( und != undefined){
    let res =  und;
    console.log(res.diagnosis, 'top');
    this.patients = res.diagnosis;
    this.user = await this.userService.getUserById(this.uid);
    this.user = this.user.data;
    // console.log(this.patients);
    this.addSome(this.patients);
    }
    this.newMsg(false);
    
    
  
  }

  toggleText: string = "Изменить";
  

  testObject: { [key: string]: string | undefined} =
  {
    
  };

  addSome(patient: IDiagnose)
  {
    // console.log(patient, 'ship 2.0');
    this.testObject = {
      "Фамилия: ": patient.TNMStage?.toString(),
      "Имя: ": patient.diagnosis?.toString(),
      "Email: ": patient.analyzes.toString(),
      "Дата рождения: ": patient.date?.toString(),
      "Диагноз кратко": patient.diagnosisTLDR.toString()
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
  
    console.log(this.patients, 'cringe');
  }
}
function getDiagById(id: string) {
  throw new Error('Function not implemented.');
}

