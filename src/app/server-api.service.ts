import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface UserParams {
  url:string,
  method?:string,
  redirect_url?:string,
  params?:{}
}

interface User {
  email:string,
  password:string,
  remember_me?:string
}

interface Status {
  code:number,
  message:string
}

interface LogInResponse {
  data:User,
  status: Status
}
interface LogOutResponse{
  status:Status
}
interface Customer {
  name:string,
  addresscity:string,
  infoemail:string,
  relationshipstart:string
}
interface CustomersResponse {
  status:Status,
  data:Customer[]
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
}
