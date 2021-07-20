import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-consultation-creation',
  templateUrl: './consultation-creation.component.html',
  styleUrls: ['./consultation-creation.component.css']
})
export class ConsultationCreationComponent implements OnInit {
consultationForm: FormGroup
  constructor() {
    this.consultationForm = new FormGroup({
      diagnose: new FormControl(null,[Validators.required]),
      complaints: new FormControl(null,[Validators.required]),
      anamnesis: new FormControl(null, [Validators.required]),
      dermatoscopy: new FormControl(null,[Validators.required]),
      survey: new FormControl(null, [Validators.required]),
      recommendations: new FormControl(null,[Validators.required]),
      histology: new FormControl(null, [Validators.required]),
    });
   }

  ngOnInit(): void {
  }

  isShowns: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  toggleShow(id:number) {
  this.isShowns[id] = ! this.isShowns[id];
  }
  create()
  {
    
  }
  goBack()
  {
    
  }
}
