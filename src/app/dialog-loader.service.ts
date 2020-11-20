import { Injectable,Inject,ReflectiveInjector, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { AdDirective } from './ad.directive';


import {DialogComponent} from './shared/dialog/dialog.component'
import { YesNoDialogComponent } from './shared/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogLoaderService {  

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  //host call back defined by the app.module
  getHostCallBack:()=>AdDirective;

  createDialogContainer(){
     let host = this.getHostCallBack();

     //create dialog container
     const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);   
     const viewDialogContainerRef = host.viewContainerRef; 
     viewDialogContainerRef.clear();

     const dialogContainerRef = viewDialogContainerRef.createComponent<DialogComponent>(dialogComponentFactory);

     dialogContainerRef.instance.viewDialogContainerRef = viewDialogContainerRef;

     return dialogContainerRef
  }

  showYesNoDialog(): Subject<any>{
    const dialogContainerRef = this.createDialogContainer()  

    const resultSource = new Subject<any>();       
  
    //set the dialog's content 
    dialogContainerRef.instance.setContent(YesNoDialogComponent,resultSource);

    return resultSource;
  }

  customDialog(component:Type<any>):Subject<any>{
    const dialogContainerRef = this.createDialogContainer()   

    const resultSource = new Subject<any>(); 

     //set the dialog's content 
     dialogContainerRef.instance.setContent(component,resultSource);

     return resultSource;
  }

}
