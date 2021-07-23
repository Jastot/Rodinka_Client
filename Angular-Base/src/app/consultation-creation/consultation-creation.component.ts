import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IConsultation } from '../interfaces/consultation-interface';
import { ConsultationService } from '../services/consultation.servise';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SomeImage } from '../interfaces/some-image';

@Component({
  selector: 'app-consultation-creation',
  templateUrl: './consultation-creation.component.html',
  styleUrls: ['./consultation-creation.component.css']
})
export class ConsultationCreationComponent implements OnInit {
  image: HTMLCollectionOf<HTMLImageElement>; 
  imagesList:SomeImage[];

  

consultationForm: FormGroup
  constructor(private ConsultationService: ConsultationService,
    private Location: Location,
    private activatedRouter: ActivatedRoute
    ) {
      this.imagesList = [];
      this.image = document.images;
    this.consultationForm = new FormGroup({
      diagnose: new FormControl(null,[Validators.required]),
      complaints: new FormControl(null,[Validators.required]),
      anamnesis: new FormControl(null, [Validators.required]),
      dermatoscopy: new FormControl(null,[Validators.required]),
      survey: new FormControl(null, [Validators.required]),
      recommendations: new FormControl(null,[Validators.required]),
      histology: new FormControl(null, [Validators.required]),
      photoes: new FormControl(null, [Validators.required])
    });
    
   }



   id: string = "";
 
   ngOnInit(): void {
  }

  ngOnChanges(): void {
    // do something with this.someInput
    // creatingImage();
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
  async create()
  {
    var registr: IConsultation = this.consultationForm.value;
    console.log(registr);
    this.id = this.activatedRouter.snapshot.url[2].path;
    console.log("id: ", this.id);
    try
    {
      await this.ConsultationService.postConsultation(this.id,registr);
      this.Location.back();
    } 
    catch(err){
      console.log(err);
    };
  
  }
  
  creatingImage(id:number)
  {
    for (let i = 0; i < 50; i++) {
      const url = 'https://loremflickr.com/640/480?random=' + (i + 1);
      this.imagesList[i] = {
        url: url,
        show: true
      };
    }
    console.log(this.imagesList);
    var r = this.imagesList[id];
    var downloadingImage = new Image();
    downloadingImage.onload = ()=>{
      URL.revokeObjectURL(downloadingImage.src);   
  };
  downloadingImage.src = URL.createObjectURL(r.url);
  }

  goBack()
  {
    
  }
}
