import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogDirective } from 'src/app/dialog.directive';
import { DialogBase } from './dialogBase';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit { 
  @ViewChild(DialogDirective, {static: true}) dialogHost: DialogDirective;
 
  
  viewDialogContainerRef:ViewContainerRef = null

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {   

  }

  setContent(component:Type<any>, resultSource: Subject<any>){

    const ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component); 

    const viewContainerRef = this.dialogHost.viewContainerRef; 
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DialogBase>(ComponentFactory);
    
    componentRef.instance.closeDialog = (value:any)=>{
      this.viewDialogContainerRef.clear();
      resultSource.next(value);   
      resultSource.complete();     
    }   


  }

  onClose(event){
    if(event.target.className === "dialog-modal"){
      if(this.viewDialogContainerRef) this.viewDialogContainerRef.clear();
    }    
  }

}
