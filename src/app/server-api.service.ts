import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface UserParams {
  url:string,
  method?:string,
  redirect_url?:string,
  params?:{}
}

export interface User {
  id?:number,
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
  id:number,
  name:string,
  addresscity:string,
  infoemail:string,
  relationshipstart:string,
  activitytype:string
}

export interface Contact {
  id:number,
  name:string,
  firstname:string,
  email:string,
  tel:string,
  ext:string
}

export interface CustomersResponse {
  status:Status,
  data:Customer[]
}
export interface getContactsResponse {
  status:Status,
  data:Contact[]
}

export interface CustomerInformation{
  data:{
    attributes:{},
    id:string,
    type:"customer"
  } 
}

export interface getCustomerResponse {
  status:"error" | "success",
  data: {
    message:string,
    value:CustomerInformation
  }
}

export interface serverResponse {
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


  logIn(user:User):Observable<boolean | User>{

    return this.http.post<LogInResponse>(this.BASE_URL + "login",{user},{observe: 'response'}).pipe(
      map(response=>{

        //if successfully logged in, set the auth_token and return true to client
        if(response.body.status.code === 200){
          let auth_token = response.headers.get("authorization")
          this.AUTHORIZATION_TOKEN = auth_token   
      
          console.log(response.body.data.email + " has logged in") 
          console.log(response.body.data)
          return response.body.data
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


  //Customers API 
  getCustomers():Observable<Customer[]>{    
    let options =  this.generateRequestOptions()
    return this.http.get<CustomersResponse>(this.BASE_URL + "customers",options).pipe(
      map(response=>{
        return response.data;
      })
    );      
  } 
  
  
  createCustomer(customer:createCustomerRequest):Observable<serverResponse>{
    let options =  this.generateRequestOptions()
    return this.http.post<serverResponse>(this.BASE_URL + "customers",customer,options).pipe(
      map(response=>{
        return response; 
      })
    ); 
  }
  deleteCustomer(customerId:string){
    let options =  this.generateRequestOptions()   
    return this.http.delete<serverResponse>(this.BASE_URL + `customers/${customerId}`,options).pipe(
      map(response=>{
        return response;     
      })     
    ); 
  }

  getCustomerInformation(customerId:string){
    let options =  this.generateRequestOptions()
    return this.http.get<getCustomerResponse>(this.BASE_URL + `customers/${customerId}`,options).pipe(
      map(response=>{

        console.log(response)
        return response;
      })
    )
  }

  updateCustomerInformation(id:number, customerInformation:{}){
    let options =  this.generateRequestOptions()
    return this.http.patch<serverResponse>(this.BASE_URL + `customers/${id}`,customerInformation,options).pipe(
      map(response=>{
        return response;
      })
    )
  }

  getActivityTypes():Observable<{}>{
    let options =  this.generateRequestOptions()
    
    return this.http.get<serverResponse>(this.BASE_URL + "customers/activityTypes",options).pipe(
      map(response=>{
        if(response.status === "success"){
          return response.data.value as {}
        }else{
          return {};
        }
      })      
    );
  }


  //Contacts API
  getContacts():Observable<Contact[]>{    
    let options =  this.generateRequestOptions()
    return this.http.get<getContactsResponse>(this.BASE_URL + "customers",options).pipe(
      map(response=>{
        return response.data;
      })
    );      
  } 
}
