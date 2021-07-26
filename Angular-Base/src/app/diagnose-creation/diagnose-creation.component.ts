import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { diagService } from '../services/diag.service';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { GlvarsService } from '../glvars.service';

@Component({
  selector: 'app-diagnose-creation',
  templateUrl: './diagnose-creation.component.html',
  styleUrls: ['./diagnose-creation.component.css']
})
export class DiagnoseCreationComponent implements OnInit {
  diagForm: FormGroup;
  currentRout!: string;
  a!: any;
  gg!: any;
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  message?:any;
  subscription?: Subscription;

  constructor(private router3: Router, private Location: Location,
    private diagService: diagService,
    private glvars:GlvarsService) { 
      this.diagForm = new FormGroup({
        analyzes: new FormControl(null, [Validators.required]),
        diagnosisTLDR: new FormControl(null, [Validators.required]),
        TNMStage: new FormControl(null, [Validators.required]),
        diagnosis: new FormControl(null, [Validators.required])
      })
    }

  ngOnInit(): void {
  }
 onback()
{
  this.Location.back();
}  async onAddDiag() {
    this.newMsg(true);
    var diag = this.diagForm.value;
    var token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
    var _id = window.location.pathname.split('/')[3];
    if (token){
      diag.token = token;
      diag._id = _id;
      try{
        await this.diagService.postDiag(diag);
      }catch(err){
        console.log(err);
      }
      this.Location.back();
    } else {
      alert('WHERE IS TOKEN????????');
    }
    this.newMsg(false);
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
