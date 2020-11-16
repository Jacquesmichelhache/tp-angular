import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot)
      : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const url: string = state.url;  

    return this.checkLogin(url);
  }




  checkLogin(url:string):boolean{
    if(this.auth.isLoggedIn) return true;
  

    this.auth.redirectUrl = url;

    // Navigate to the login page
    this.router.navigate(['/auth']);
    return false;

  }
  
}
