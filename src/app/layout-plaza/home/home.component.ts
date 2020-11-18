import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BreakpointObserver, LayoutModule} from '@angular/cdk/layout';

import {trigger,group, state,style,animate,transition,keyframes,query,stagger, animateChild} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('panelOpenClose',[
      state('true',style({width:"150px"})),
      state('false',style({width:"25px"})),
      transition('true => false',[
        group([
          animate('0.1s ease-out',style({width:"25px"})), 
          query('@listFadeInOut',animateChild())
        ])        
      ]),
      transition('false => true',[
        group([
          animate('0.3s ease-out',style({width:"150px"})), 
          query('@listFadeInOut',animateChild())
        ])        
      ]),     
    ]),
    trigger('listFadeInOut',[
      state('true',style({opacity:1})),
      state('false',style({opacity:0})),
      transition('true => false',animate('0.1s ease-out')),
      transition('false => true',animate('0.3s ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(public breakpointObserver:BreakpointObserver) { }

  //initial values
  screenSize:string = 'xs';
  showSidePanelOpener:boolean = false;
  sidePanelIsOpen:boolean = false;

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
      this.screenSize = this.getScreenSize(result.breakpoints); 
      this.setSidePanel(this.screenSize);
      console.log(this.screenSize);  
    });
  }

  setSidePanel(screenSize:string){
    if(screenSize === "xs"){
      this.showSidePanelOpener = true;   
      this.sidePanelIsOpen = false;  
    }else{
      this.sidePanelIsOpen = true;
      this.showSidePanelOpener = false;
    } 
  }

  getScreenSize(breakpoints):string{   
    let screenSize:string = '';
    for(const [key, value] of Object.entries(breakpoints).reverse()){
      if(value === true){
        screenSize = this.sizes[key]
        break;
      }
    }   
    return screenSize;
  }

  toggleSidePanel(){
    this.sidePanelIsOpen = !this.sidePanelIsOpen;
  }
}
