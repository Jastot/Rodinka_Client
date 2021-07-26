import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlvarsService {
  data:any=true;
  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  public get a(){
    return this.data;
  }
  public set a(value:any){
    this.data = value;
    console.log(this.data);
  }
  changeMessage(message: boolean) {
    this.messageSource.next(message)
  }
}
