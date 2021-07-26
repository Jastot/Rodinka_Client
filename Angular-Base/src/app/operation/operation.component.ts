import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation } from '../interfaces/oper.inter';
import { operService } from '../services/oper.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  patients!: IOperation;
  currentRoutt!: any;
  n!: any;
  q!: any;
  _id:string = this.activatedRouter.snapshot.url[2].path;
  user!: any;
  constructor(private userService: UserService, private diagservice: operService,
    private router: Router, 
    private activatedRouter: ActivatedRoute) {
      
     }
  id: string = "";
 
  reverseKeyOrder = (a: KeyValue<string,string | undefined>, b: KeyValue<string,string | undefined>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  async ngOnInit() {
    var und;
    this.id = this.activatedRouter.snapshot.url[4].path;
    this.user = await this.userService.getUserById(this._id);
    this.user = this.user.data;
    und = await this.diagservice.getOperById(this.id)
    if( und != undefined){
    let res =  und;
    // console.log(res.operation, 'top');
    this.patients = res.operation;
    // console.log(this.patients);
    this.addSome(this.patients);
    }
    
    
  
  }

  toggleText: string = "Изменить";
  

  testObject: { [key: string]: string | undefined} =
  {
    
  };

  addSome(patient: IOperation)
  {
    // console.log(patient, 'ship 2.0');
    this.testObject = {
      "Фамилия: ": patient.descriptionTLDR?.toString(),
      "Имя: ": patient.diagnosis?.toString(),
      "Email: ": patient.recommendations.toString(),
      "Дата рождения: ": patient.date?.toString(),
      "Диагноз кратко": patient.description.toString()
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

