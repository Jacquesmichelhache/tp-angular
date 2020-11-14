import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface UserParams {
  url:string,
  method?:string,
  redirect_url?:string,
  params?:{}
}

export interface User {
  email:string,
  password:string,
  remember_me?:string
}

export interface Status {
  code:number,
  message:string
}

export interface LogInResponse {
  data:User,
  status: Status
}
export interface LogOutResponse{
  status:Status
}
export interface Customer {
  name:string,
  addresscity:string,
  infoemail:string,
  relationshipstart:string
}
export interface CustomersResponse {
  status:Status,
  data:Customer[]
}

export interface createCustomerResponse {
  status: "error" | "success",
  data:{value:any,message:string}
}
export interface createCustomerRequest{
  name:string,
  relationshipstart:string,
  infoemail:string,
  activitytype:string,
  addressapt?:string,
  addressstreet?:string,
  addresspostalcode?:string,
  addresscity?:string
}





@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  CSRF_TOKEN:string = ""
  BASE_URL:string = "http://localhost:3000/"

  AUTHORIZATION_TOKEN:string = ""
  EMAIL:string = ""

  constructor(private http: HttpClient) { }


  logIn(user:User):Observable<boolean>{

    return this.http.post<LogInResponse>(this.BASE_URL + "login",{user},{observe: 'response'}).pipe(
      map(response=>{

        //if successfully logged in, set the auth_token and return true to client
        if(response.body.status.code === 200){
          let auth_token = response.headers.get("authorization")
          this.AUTHORIZATION_TOKEN = auth_token   
      
          console.log(response.body.data.email + " has logged in") 
          return true
        }else return false        
      })     
    )
  }

  logOut():Observable<boolean>{
    let options =  this.generateRequestOptions()

    return this.http.delete<LogOutResponse>(this.BASE_URL + "logout",options).pipe(
      map(response=>{
        if(response.status.code === 200){
          console.log("User has logged out")
          return true;
        }else return false;
      })
    )     
  }

  //helper method
  generateRequestOptions():{}{
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "authorization": this.AUTHORIZATION_TOKEN
      })
    } 
  }

  getCustomers():Observable<Customer[]>{    
    let options =  this.generateRequestOptions()
    return this.http.get<CustomersResponse>(this.BASE_URL + "customers",options).pipe(
      map(response=>{
        return response.data;
      })
    );      
  } 

  createCustomer(customer:createCustomerRequest):Observable<createCustomerResponse>{
    let options =  this.generateRequestOptions()
    return this.http.post<createCustomerResponse>(this.BASE_URL + "customers",customer,options).pipe(
      map(response=>{
        return response; 
      })
    ); 
  }

  getActivityTypes():Observable<{}>{
    let options =  this.generateRequestOptions()
    return this.http.get<createCustomerResponse>(this.BASE_URL + "customers/activityTypes",options).pipe(
      map(response=>{
        if(response.status === "success"){
          return response.data.value as {}
        }else{
          return {};
        }
      })
    );
  }
}
