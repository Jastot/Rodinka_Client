import { Component } from '@angular/core';
import { GlvarsService } from './glvars.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlvarsService]
})
export class AppComponent {
  title = 'Angular-Base';
  loadscreen?:any;
  message?:any=false;
  subscription?:Subscription;
  constructor(private glvars:GlvarsService){
  
  }
  ngOnInit(){
    this.loadscreen=this.glvars.a;
    this.subscription = this.glvars.currentMessage.subscribe(message => this.message = message)
  }
  
  
}
