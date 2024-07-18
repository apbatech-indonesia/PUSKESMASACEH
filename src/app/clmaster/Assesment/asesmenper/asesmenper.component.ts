import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { perminobatComponent } from '../../perminobat/perminobat.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { perminobatriComponent } from '../../perminobatri/perminobatri.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asesmenper',
  templateUrl: './asesmenper.component.html',
  styleUrls: ['./asesmenper.component.sass']
})
export class asesmenperComponent implements OnInit {
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  kduser:any;
  kdcabang:any;
  username:any;
  tglp:any;
  pipe = new DatePipe('en-US');
  myDatelab :any;
  
  progress: boolean | number = false;

  startLoading() {
    this.progress = 0; // starts spinner

    setTimeout(() => {
      this.progress = 0.5; // sets progress bar to 50%

      setTimeout(() => {
        this.progress = 1; // sets progress bar to 100%

        setTimeout(() => {
          this.progress = false; // stops spinner
        }, 200);
      }, 500);
    }, 400);
  }
  constructor(private fb: FormBuilder,private modalService: NgbModal,public toastr:ToastrService,private route: ActivatedRoute,private authService:ApiserviceService) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 
this.tglp = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');
   }

   notrans:any;
   kddokter:any;
   norm:any;


   ku:any='';
   rps:any='';
   bb:any='';
   tb:any='';
   imt:any='';
   lingkarkepala:any='';
   mobil:any='';
   toilet:any='';
   makan:any='';
   mandi:any='';
   berpakaian:any='';
   hasil:any='';
   psikologis:any='';
   sosialekonomi:any='';
   masalah:any='';
   rencana:any='';


  ngOnInit(): void {

    this.notrans = this.route.snapshot.paramMap.get('notrans')

    this.norm = this.route.snapshot.paramMap.get('norm')

    this.kddokter = this.route.snapshot.paramMap.get('kddokter')

    setTimeout(() => {
      this.tmpriwayatno()
      this.tmpriwayatnotransaksi()
    }, 250);


  }
  listrwt:any;

  tmpriwayatno(){

    this.authService.rwtaskep(this.norm,'2')
    .subscribe(
      data => {

        this.listrwt = data;


      }
    )
  }

  lihatresume(a){
    this.notrans = a;
    this.tmpriwayatnotransaksi()
  }
  tmpriwayatnotransaksi(){

    this.authService.rwtaskep(this.notrans,'1')
    .subscribe(
      data => {

     for(let x of data){
      this.ku=x.ku,
      this.rps=x.rps,
      this.bb=x.bb,
      this.tb=x.tb,
      this.imt=x.imt,
      this.lingkarkepala=x.lingkarkepala,
      this.mobil=x.mobil,
      this.toilet=x.toilet,
      this.makan=x.makan,
      this.mandi=x.mandi,
      this.berpakaian=x.berpakaian,
      this.hasil=x.hasil,
      this.psikologis=x.psikologis,
      this.sosialekonomi=x.sosialekonomi,
      this.masalah=x.masalah,
      this. rencana=x.rencana,
   
      this.userperawat=x.username
     }

      }
    )
  }

  userperawat:any=''
  simpan(){
    let body={
      ku:this.ku,
      rps:this.rps,
      bb:this.bb,
      tb:this.tb,
      imt:this.imt,
      lingkarkepala:this.lingkarkepala,
      mobil:this.mobil,
      toilet:this.toilet,
      makan:this.makan,
      mandi:this.mandi,
      berpakaian:this.berpakaian,
      hasil:this.hasil,
      psikologis:this.psikologis,
      sosialekonomi:this.sosialekonomi,
      masalah:this.masalah,
      rencana:this.rencana,
      notransaksi:this.notrans,
     norm:this.norm,
      kduser:this.username,
      stssimpan:'1'
    }

    let bodyx={
      ku:this.ku,
      rps:this.rps,
      bb:this.bb,
      tb:this.tb,
      imt:this.imt,
      lingkarkepala:this.lingkarkepala,
      mobil:this.mobil,
      toilet:this.toilet,
      makan:this.makan,
      mandi:this.mandi,
      berpakaian:this.berpakaian,
      hasil:this.hasil,
      psikologis:this.psikologis,
      sosialekonomi:this.sosialekonomi,
      masalah:this.masalah,
      rencana:this.rencana,
      notransaksi:this.notrans,
     norm:this.norm,
      kduser:this.username,
      stssimpan:'2'
    }



    this.authService.simpanaskep(bodyx)
.subscribe(response => {

  console.log(response)


  if(response.kode == 200){


    setTimeout(() => {
         this.authService.simpanaskep(body)
    .subscribe(response => {

        if(response.kode == 200){

          setTimeout(() => {
          
          }, 250);
          this.toastr.success(response.pesan, '', {
            timeOut: 2000,
          });
        }else{
          this.toastr.error(response.pesan, '', {
            timeOut: 2000,
          });
        }
      

    }
    )
    }, 1000);

 





  }else{

    this.toastr.error(response.pesan, '', {
      timeOut: 2000,
    });
  }

 }
)

  }
}
