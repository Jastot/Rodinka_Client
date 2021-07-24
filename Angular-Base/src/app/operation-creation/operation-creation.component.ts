import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { operService } from '../services/oper.service';

@Component({
  selector: 'app-operation-creation',
  templateUrl: './operation-creation.component.html',
  styleUrls: ['./operation-creation.component.css']
})
export class OperationCreationComponent implements OnInit {

  operForm: FormGroup;
  currentRout!: string;
  a!: any;
  gg!: any;

  constructor(private router3: Router, private Location: Location,
    private operService: operService ) { 
      this.operForm = new FormGroup({
        recommendations: new FormControl(null, [Validators.required]),
        descriptionTLDR: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        diagnosis: new FormControl(null, [Validators.required])
      })
    }

  ngOnInit(): void {
  }
 onback()
{
  this.Location.back();
}  async onAddOper() {
    var diag = this.operForm.value;
    var token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
    var _id = window.location.pathname.split('/')[3];
    if (token){
      diag.token = token;
      diag._id = _id;
      try{
        await this.operService.postOper(diag);
      }catch(err){
        console.log(err);
      }
      this.Location.back();
    } else {
      alert('WHERE IS TOKEN????????');
    }
    
  }

  isShowns: boolean[] = [
    false,
    false,
    false,
    false
  ];

  toggleShow(id:number) {
    console.log(id);
  this.isShowns[id] = ! this.isShowns[id];
  }

}
