import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';


export interface UserParams {
  url:string,
  method?:string,
  redirect_url?:string,
  params?:{}
}

export interface SignUpInfo {
  email:string,
  password:string,
  confirm_password:string
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
  status:"error" | "success",
  data: {
    message:string,
    value:User}
}
export interface LogOutResponse{
  status:"error" | "success",
  data: {
    message:string,
    value:any}
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
  status:"error" | "success",
  data: {
    message:string,
    value:Contact[]
  }
}

export interface successSignup {
  status:"success"
  data:{
    message:string,
    value:{
      email:string,
      id:number
    }
  }

}
export interface failSignup{
  status:"error",
  data:{
    message:string,
    value:{}
  }
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


  //Login/signup
  logIn(user:User):Observable<boolean | User>{

    return this.http.post<LogInResponse>(this.BASE_URL + "login",{user},{observe: 'response'}).pipe(
      map(response=>{
      
        //if successfully logged in, set the auth_token and return true to client
        if(response.body.status === "success"){
          let auth_token = response.headers.get("authorization")
          this.AUTHORIZATION_TOKEN = auth_token   
      
          console.log(response.body.data.value.email + " has logged in")         
          return response.body.data.value
        }else return false   

      }),
      catchError(error =>{      
        return of(false)
      })    
    )
  }

  logOut():Observable<boolean>{
    let options =  this.generateRequestOptions()
    
    return this.http.delete<LogOutResponse>(this.BASE_URL + "logout",options).pipe(
      map(response=>{
        if(response.status === "success"){
          console.log("User has logged out")
          return true;
        }else return false;
      })
    )     
  }

  signup(signupInfo:SignUpInfo):Observable<successSignup | failSignup>{
   
    return this.http.post<successSignup | failSignup>(this.BASE_URL + "signup",{user:signupInfo},{observe: 'response'}).pipe(
      map(response=>{ 

        let returnValue = response.body

        if(returnValue.status === "success"){
          let auth_token = response.headers.get("authorization")
          this.AUTHORIZATION_TOKEN = auth_token         
          console.log(returnValue.data.value.email + " has logged in")          
          return returnValue
        }else{
          return returnValue
        }       
        
      }),
      catchError(error =>{        
        return of({status:"error",data:{message:"",value:{}}} as failSignup)
      })        
    );
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
  getContacts(customer_id:number):Observable<getContactsResponse>{    
    let options =  this.generateRequestOptions()

    let params = new HttpParams().set("customer_id",customer_id.toString());  
    options["params"] = params;   

    return this.http.get<getContactsResponse>(this.BASE_URL + "contacts",options).pipe(
      map(response=>{ 

        return response;
      })
    );      
  } 

  createContact(customer_id:number,contact:Contact):Observable<serverResponse>{
    let options =  this.generateRequestOptions()

    let params = new HttpParams().set("customer_id",customer_id.toString());  
    options["params"] = params;   

    return this.http.post<serverResponse>(this.BASE_URL + "contacts",contact,options).pipe(
      map(response=>{        
        return response; 
      })
    ); 
  }

  deleteContact(customer_id:number,contact_id:number){
    let options =  this.generateRequestOptions()   

    let params = new HttpParams().set("customer_id",customer_id.toString()).set("contact_id",contact_id.toString());  
    options["params"] = params; 

    return this.http.delete<serverResponse>(this.BASE_URL + `contacts/${contact_id}`,options).pipe(
      map(response=>{      
        return response;     
      })     
    ); 
  }

  getContactInformation(customer_id:number,contact_id:number){
    let options =  this.generateRequestOptions()

    let params = new HttpParams().set("customer_id",customer_id.toString()).set("contact_id",contact_id.toString());  
    options["params"] = params; 

    return this.http.get<serverResponse>(this.BASE_URL + `contacts/${contact_id}`,options).pipe(
      map(response=>{       
        return response;
      })
    )
  }

  updateContactInformation(customer_id:number,contact_id:number, contactInformation:{}){
    let options =  this.generateRequestOptions()

    let params = new HttpParams().set("customer_id",customer_id.toString()).set("contact_id",contact_id.toString());  
    options["params"] = params; 

    return this.http.patch<serverResponse>(this.BASE_URL + `contacts/${contact_id}`,contactInformation,options).pipe(
      map(response=>{      
        return response;
      })
    )
  }
}
