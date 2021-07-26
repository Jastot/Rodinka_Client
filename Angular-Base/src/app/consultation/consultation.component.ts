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

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  constructor( private activatedRouter: ActivatedRoute,
    private ConsultationService: ConsultationService,
    private fileService:fileService,
    private UserService: UserService) { 
    
  }
  elid!:string;
  _id:string = this.activatedRouter.snapshot.url[2].path;
  consultation!: any;
  user!:any;
  photos:{id:string,link:string,minimapNum:number}[]=[];

  async ngOnInit() {
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

  }
  // TODO: сделать (есть ui)
}
