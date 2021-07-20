import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnose-creation',
  templateUrl: './diagnose-creation.component.html',
  styleUrls: ['./diagnose-creation.component.css']
})
export class DiagnoseCreationComponent implements OnInit {

  constructor() { }

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

}
