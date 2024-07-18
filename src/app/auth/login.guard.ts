

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private routes: Router){}

  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    ext: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let dataUserLokal = localStorage.getItem('userDatacl')
      if (dataUserLokal) {
        return true;
      }
    
      this.routes.navigate(['/masuk']);
      return false;
    


      // if(localStorage.getItem('userDatacl')){
      //   console.log("dashboard")
      //   this.router.navigate(['/dashboards/management']);
        
      //  }else{
       
      //   this.router.navigate(['/masuk']);
        
       
      // }


      
  }
  
}
