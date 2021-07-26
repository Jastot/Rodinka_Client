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
import { DisplayDatePipe } from '../display-date.pipe';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user-interface';
import { Subscription } from 'rxjs';
import { GlvarsService } from '../glvars.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  newMsg(value:any){
    this.glvars.changeMessage(value);
  }
  message?:any;
  subscription?: Subscription;
  constructor( private activatedRouter: ActivatedRoute,
    private ConsultationService: ConsultationService,
    private fileService:fileService,
    private UserService: UserService,
    private glvars: GlvarsService) { 
    
  }
  elid!:string;
  _id:string = this.activatedRouter.snapshot.url[2].path;
  consultation!: any;
  user!:any;
  photos:{id:string,link:string,minimapNum:number, nndata?:any}[]=[];
  activePhoto:{id?:any, link:any,minimapNum:any, nndata?:any}={link:undefined,minimapNum:0};
  showModal:boolean=false;
  banbuttons:Boolean=false;

  async ngOnInit() {
    this.newMsg(true);
    this.elid = this.activatedRouter.snapshot.url[4].path;
    this.consultation = await this.ConsultationService.getConsultation(this.elid);
    this.consultation = this.consultation.consultation;
    this.user = await this.UserService.getUserById(this._id);
    this.user = this.user.data;
    if(this.consultation.photos.length>0){
      for(let photo of this.consultation.photos){
        let resp = await this.fileService.getphoto(photo.id)
        this.photos.push({
          id:photo.id,
          link:`https://moletrainer.xyz/static/${resp.data}`,
          minimapNum:photo.minimapNum
        })
      }
    }
    this.newMsg(false);
  }
  togglePhoto(e:any){
    let target = e.currentTarget;
    let id = target.id;
    let photo = this.photos.find(e=>e.id==id);
    this.activePhoto = {link: target.src,minimapNum:photo?.minimapNum, id:photo?.id, nndata:photo?.nndata||{}};
    this.showModal=!this.showModal;
    console.log(this.showModal)
  }
  toggleModal(){
    this.showModal=!this.showModal;
  }
  async reqcnn(){
    this.newMsg(true);
    this.banbuttons=true;
    let res = await this.fileService.reqcnn(this.activePhoto.id);
    this.activePhoto.nndata = res;
    this.photos.find((e,i)=>{if(e.id==this.activePhoto.id){
      this.photos[i].nndata=res;
    }})
    this.banbuttons=false;
    this.newMsg(false);

  }
  // TODO: сделать (есть ui)
}
