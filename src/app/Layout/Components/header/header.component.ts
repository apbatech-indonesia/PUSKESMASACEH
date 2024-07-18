import { Component, HostBinding } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ThemeOptions } from '../../../theme-options';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  faEllipsisV = faEllipsisV;
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  kdcabang:any;
  kdcb:string='';

  constructor(public globals: ThemeOptions,private authService:ApiserviceService) {
  
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.kdcb = this.userDetails.kdcabang;

  }
  ngOnInit() {
    this.klinik()
  
  }
  subheading :any;
  klinik(){
    this.authService.klinikper(this.kdklinik)
    .subscribe(
      data => {
      
        this.subheading = Array.prototype.map.call(data,s=>s.nama).toString();
    
    
    },
      Error => {
    
       console.log(Error)
      }
    )
    
//     this.authService.cabangper(this.kdklinik)
//     .subscribe(
//       data => {
      
// this.cabangarr = data;

//     },
//       Error => {
    
//        console.log(Error)
//       }
//     )
    
    


  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
