import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../interfaces/user-interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient-creation',
  templateUrl: './patient-creation.component.html',
  styleUrls: ['./patient-creation.component.css']
})
export class PatientCreationComponent implements OnInit {
  patForm: FormGroup;

  constructor(private activatedRouter: ActivatedRoute,
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

  ngOnInit(): void {
  }
  // TODO: сделать данный компонент (дизайн no)
  async addPatient() {
    var registr :IUser = this.patForm.value;
    console.log(registr);
    registr.password = "-------";
    registr.userType = "client"
    try
    {
      await this.userservice.postUser(registr);
    } 
    catch(err){
      console.log(err);
    };
    this.router2.navigate([`/doctor`]);
  }
  onBackToDoctor(){
    this.router2.navigate([`/doctor`]);
  }
}
