import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ThemeOptions } from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  faCalendar = faCalendar;

  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }




  public userDetails: any;
  nama:any;
  akses:any;

  kdcabang:any;
  username:any;

  constructor(public globals: ThemeOptions,public router : Router,private authService:ApiserviceService) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
this.userDetails=data.userData
this.nama = this.userDetails.nama
this.akses = this.userDetails.hakakses
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
  }

  ngOnInit() {

  

  }

  
  keluar() {

    
// $kdcabang=$data->kdcabang;

// $kduser=$data->kduser;

// $stssimpan=$data->stssimpan;
    let body={
      "kdcabang":this.kdcabang,"kduser":this.username,"stssimpan":'1',"status":'1'
    }


    this.authService.keluar(body)
    .subscribe(response => {
    
   
  
  
  
  
  
  
    })



    localStorage.clear();
    

    // localStorage.removeItem('token');
    this.router.navigate(['/masuk']);
  }

}
