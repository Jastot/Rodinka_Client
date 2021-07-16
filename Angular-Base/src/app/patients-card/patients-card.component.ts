import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: ['./patients-card.component.css']
})
export class PatientsCardComponent implements OnInit {
  patients!: IUser;
  patientForm: FormGroup;
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

  async ngOnInit() {
    // console.log(this.activatedRouter.snapshot.url[2].path);
    this.id = this.activatedRouter.snapshot.url[2].path;
    let res = await this.userService.getUserById(this.id);
    // console.log(res);
    this.patients = res.data[0];
    this.addSome();
  
  }

  toggleText: string = "Изменить";
  

  testObject: { [key: string]: string|undefined } =
  {
    surname: undefined,
    name: undefined,
    email: undefined,
  };

  addSome()
  {
    this.testObject.surname = this.patients.surname?.toString();
    this.testObject.name = this.patients.name?.toString();
    this.testObject.email = this.patients.email?.toString();
  }

  changeDi()
  {
    if(this.toggleText == "Изменить")
    {
      this.toggleText = "Сохранить";
    }
    else
    {
      this.toggleText = "Изменить";
    }
    
  }
  createCon()
  {
    this.router.navigate([`doctor/workingWithPatient/${this.id}/lookingAtConsultation`]);
  }

  createOp()
  {
    //this.router.navigate([`doctor/workingWithPatient/${this.id}/lookingAtConsultatio`]);
  }
// TODO: написать полностью данный модуль (есть дизайн)

}
