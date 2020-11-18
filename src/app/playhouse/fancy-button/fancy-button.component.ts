import { Component, OnInit, HostBinding } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition, 
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { Optional } from 'ag-grid-community';





@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
  animations: [
    trigger('buttonTransitions', [
      transition(':enter',[
        query('div',[
          style({opacity:0}),
          stagger(-30, animate('1000ms',style({opacity:1})))
        ],{optional:true})
      ])             
    ])
  ],
})
export class FancyButtonComponent implements OnInit {
  constructor() { }
  @HostBinding('@buttonTransitions')

  stateStrings:string[] = ["submit","inProgress","success", "error"]

  state:string = "submit";
  stateIndex:number = 0;

  toggle(){
    this.stateIndex++
    if(this.stateIndex === 4) this.stateIndex = 0;

    this.state = this.stateStrings[this.stateIndex]
  }

  onSubmit(){
    this.state = "inProgress";

    setTimeout(()=>{
      this.state = "success";

      setTimeout(()=>{
        this.state = "submit";
      },1000)
    },1000)
  }

  ngOnInit(): void {
  }

}
