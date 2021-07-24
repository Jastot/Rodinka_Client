import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IConsultation } from '../interfaces/consultation-interface';
import { ConsultationService } from '../services/consultation.servise';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SomeImage } from '../interfaces/some-image';
import { fileService } from '../services/file-upload.service';

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
    private activatedRouter: ActivatedRoute,
    private fileService : fileService
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
 
  fileToUpload: File | null = null;
  handleFileInput(event: Event) {
    this.fileToUpload = (<HTMLInputElement>event.target)?.files![0];
   // this.creatingImage();
  }
  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload);
  // }
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
      let a = await this.ConsultationService.postConsultation(this.id,registr);

      console.log(this.fileToUpload);
      var fd = new FormData();
      fd.append('id',`${a.data._id}`)
      fd.append('token',localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      fd.append('img',<File> this.fileToUpload, this.fileToUpload?.name);
      
      // formData.append('userpic[]', myFileInput1.files[0], 'chris1.jpg');
      // formData.append('userpic[]', myFileInput2.files[0], 'chris2.jpg');
      console.log(fd.get('id'));
      console.log(fd.get('token'));
      console.log(fd.get('img'));
      
      await this.fileService.postphoto(fd);

      this.Location.back();
    } 
    catch(err){
      console.log(err);
    };
  
  }
  
  // creatingImage()
  // {
  //   // for (let i = 0; i < 50; i++) {
  //   //   const url = 'https://loremflickr.com/640/480?random=' + (i + 1);
  //   //   this.imagesList[i] = {
  //   //     url: url,
  //   //     show: true
  //   //   };
  //   // }
  //   console.log(this.imagesList);
  //   var r = this.imagesList[0];
  //   var downloadingImage = new Image();
  //   downloadingImage.onload = ()=>{
  //     URL.revokeObjectURL(downloadingImage.src);   
  // };
  // downloadingImage.src = URL.createObjectURL(r.url);
  // }

  goBack()
  {
    
  }
}
