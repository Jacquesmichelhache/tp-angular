import { Component } from '@angular/core';
import { ServerApiService } from '../app/server-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-angular';

  constructor(private serverApi: ServerApiService){

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
