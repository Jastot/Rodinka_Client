import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  registrForm: FormGroup;

  constructor(private activatedRouter: ActivatedRoute, // хранит url адрес и параметры
    private router: Router,
    private userService: UserService) {
      this.registrForm = new FormGroup({
        email: new FormControl(null,[Validators.required]),
        password: new FormControl(null,[Validators.required]),
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        additional_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        userType: new FormControl(null, [Validators.required]),
        dateOfBirth: new FormControl(null, [Validators.required, Validators.minLength(8)])
   });
  }

  ngOnInit(): void {
  }

  async onRegistration() {
    var registr = this.registrForm.value;
    console.log(registr);
    try
    {
      await this.userService.postUser(registr);
    } 
    catch(err){
      console.log(err);
    };
  }

  onBackToLogin()
  {
    this.router.navigate([`/`]);
  }

}
