import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,private router: Router) {  


  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
   this.authService.logout().subscribe(val=>{
    this.router.navigate(['/logout'])
   });
  }


  ngOnInit(): void {
  }

}
