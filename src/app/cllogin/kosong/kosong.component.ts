import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kosong',
  templateUrl: './kosong.component.html',
  styleUrls: ['./kosong.component.sass']
})
export class KosongComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userDatacl')){
   
      this.router.navigate(['/dashboards/management']);
      
     }

  }

}
