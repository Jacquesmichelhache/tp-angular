import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, LayoutModule} from '@angular/cdk/layout';

import {trigger,state,style,animate,transition,keyframes,query,stagger} from '@angular/animations';


interface Sizes {
  
}



@Component({
  selector: 'app-responsive-button',
  templateUrl: './responsive-button.component.html',
  styleUrls: ['./responsive-button.component.scss'],
  animations:[
    trigger('responsiveButton',[
      state('xs',style({width:'200px',color:'lightgreen'})),
      state('sm',style({width:'300px',color:'green'})),
      state('md',style({width:'400px',color:'lightyellow'})),
      state('lg',style({width:'500px',color:'yellow'})),
      state('xl',style({width:'600px',color:'lightred'}))

    ])
  ]
})
export class ResponsiveButtonComponent implements OnInit {

  constructor(public breakpointObserver:BreakpointObserver) { }

  //initial values
  buttonSize:string = 'xs';
  buttonText:string = "I am a xs button"

  //possible value sizes
  sizes = {
    '(min-width: 0px)':'xs',
    '(min-width: 576px)':'sm',
    '(min-width: 768px)':'md',
    '(min-width: 992px)':'lg',
    '(min-width: 1200px)':'xl'
  }

  layoutChanges$ = this.breakpointObserver.observe(Object.keys(this.sizes));

  ngOnInit(): void {

    this.layoutChanges$.subscribe(result=>{
      let ss = this.getScreenSize(result.breakpoints);
      this.buttonText = `I am a ${ss} button`;     
    });
  }

  getScreenSize(breakpoints):string{   
    let screenSize:string = '';
    for(const [key, value] of Object.entries(breakpoints).reverse()){
      if(value === true){
        screenSize = this.sizes[key]
        break;
      }
    }
    this.buttonSize = screenSize;
    return screenSize;
  }

}
