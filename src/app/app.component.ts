import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ServerApiService } from '../app/server-api.service';
import { RouterOutlet } from '@angular/router';
import { DialogLoaderService } from './dialog-loader.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AdDirective } from './ad.directive';
import {CustomersTableComponent} from './customers/customers-table/customers-table.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-angular';
  showDialog = false;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private serverApi: ServerApiService, public dialogService: DialogLoaderService) {
      dialogService.getHostCallBack = () => this.adHost      
    } 

  onClick(){

    this.dialogService.customDialog(CustomersTableComponent).subscribe();

    // this.dialogService.showYesNoDialog().subscribe((value)=>{
    //   console.log(value);
    // });
  }

  logIn(){
    this.serverApi.logIn({email:"jacques_m16@hotmail.com", password:"123456"}).subscribe();
  }
  logOut(){
    this.serverApi.logOut().subscribe();
  }

  getCustomers(){
    this.serverApi.getCustomers().subscribe(customers=>{
      console.log(customers);
    })
  }
}
