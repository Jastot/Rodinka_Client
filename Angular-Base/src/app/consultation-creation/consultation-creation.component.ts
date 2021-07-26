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
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GlvarsService } from '../glvars.service';

@Component({
  selector: 'app-consultation-creation',
  templateUrl: './consultation-creation.component.html',
  styleUrls: ['./consultation-creation.component.css']
})
export class ConsultationCreationComponent implements OnInit {
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  message?:any;
  subscription?: Subscription;

  image: HTMLCollectionOf<HTMLImageElement>; 
  imagesList:SomeImage[];
  consultationForm: FormGroup;
  baza: string = 'https://moletrainer.xyz'
  constructor(private ConsultationService: ConsultationService,
    private Location: Location,
    private activatedRouter: ActivatedRoute,
    private fileService : fileService,
    private DomSanitizer : DomSanitizer,
    private glvars:GlvarsService
    ) {
      this.fileToUpload=null;
      this.imagesList = [];
      this.image = document.images;
      this.consultationForm = new FormGroup({
        diagnosis: new FormControl(null,[Validators.required]),
        complaints: new FormControl(null,[Validators.required]),
        // anamnesis: new FormControl(null, [Validators.required]),
        // dermatoscopy: new FormControl(null,[Validators.required]),
        plans: new FormControl(null, [Validators.required]),
        recommendations: new FormControl(null,[Validators.required]),
        examination: new FormControl(null,[Validators.required]),
        // histology: new FormControl(null, [Validators.required]),
        photos: new FormControl(null, [Validators.required])
      });
  }
  _id: string = this.activatedRouter.snapshot.url[2].path;
  photos: {id:string, link?:string, minimapNum?:number}[] = [];
  photosQueue: Array<File>=[];
  halt: boolean = false;
  ngOnInit(): void {
    
  }

  fileToUpload: File | null = null;
  handleFileInput(e: Event) {
    this.newMsg(true);
    this.halt=!this.halt;
    let target = <any>e.target;
    if(target.files[0].length>1){
      this.photosQueue.push(target.files);
      
    } else {
      this.photosQueue.push(target.files[0]);
    }
    this.sendPhotos().then((d)=>{
      this.halt=!this.halt;
      target.value="";
    }).catch((err)=>{
      this.halt=!this.halt;
      alert(`Err: ${err.toString()}`);
    })
    this.newMsg(false);
  }
  async sendPhotos(){
    this.newMsg(true);
    for (let queueMember of this.photosQueue){
      var fd = new FormData();
      fd.append('_id', this._id);
      fd.append('token', localStorage.getItem("token") as string || sessionStorage.getItem("token") as string);
      fd.append('img', <File>queueMember);        
      let photo = await this.fileService.postphoto(fd);
      this.photos.push({
        id:photo.id,
        link:`${this.baza}/static/${photo.filename}`,
        minimapNum: this.photos.length+1
      })
    }
    this.photosQueue=[];
    this.newMsg(false);
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
  async create(){
    this.newMsg(true);
    var registr: IConsultation = this.consultationForm.value;
    this._id = this.activatedRouter.snapshot.url[2].path;
    registr._id=this._id;
    registr.photos=this.photos;
    await this.ConsultationService.addConsultation(registr);
    this.Location.back();  
    this.newMsg(false);
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
    this.Location.back();
  }
}
