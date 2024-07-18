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
import { TreeNode } from 'primeng/api';
import { FarmasijualService } from '../../kasirfarmasijual/farmasijual.service';

@Component({
  selector: 'app-riwayatkunjungan',
  templateUrl: './riwayatkunjungan.component.html',
  styleUrls: ['./riwayatkunjungan.component.sass']
})
export class riwayatkunjunganComponent implements OnInit {
  toggleMobileSidebar: any;
  pipe = new DatePipe('en-US');
  tglp:any;

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
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  kduser:any;
  kdcabang:any;
  username:any;
  constructor(
    public FarmasijualService :FarmasijualService,
    private fb: FormBuilder,private modalService: NgbModal,public toastr:ToastrService,private route: ActivatedRoute,private authService:ApiserviceService) {


    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 


   }

   notrans:any;
   kddokter:any;
   norm:any;
   anamnesa:any='';
   anamnesaket:any='';
   keluhanutama:any=''
   rwtvaksi:any='';
   kebiasaan:any='';
   td:any='';
   nadi:any=''
   rr:any='';
   tb:any='';
   suhu:any='';
   bb:any=''
   pengetahuan:any=''
   perawatan:any=''
   keyakinan:any=''
   komunikasi:any=''
   ygmerawat:any=''
   userskeyakinan=['Tidak Ada','Ada'];
   nyeri:any='';
   pencetus:any='';
   kualitas:any=''
   lokasi:any=''
   skala:any='';
   waktu:any=''
   jatuha:any='';
   jatuhb:any='';
   ketjatuh:any=''
   analisa:any=''
   rwtlahir:any='';
   rps:any=''
   alergi:any=''
   rpd:any=''
  cities3 = [
    { id: 1, name: 'Tidak Ada Nyeri', avatar: './assets/images/nyeri/0.png' },
    { id: 2, name: 'Nyeri Ringan', avatar: './assets/images/nyeri/2.png' },
    { id: 3, name: 'Nyeri Ringan Sedang', avatar: './assets/images/nyeri/4.png' },
    { id: 4, name: 'Nyeri Sedang', avatar: './assets/images/nyeri/6.png' },
    { id: 5, name: 'Nyeri Hebat', avatar: './assets/images/nyeri/8.png' },
    { id: 6, name: 'Nyeri Sangat Hebat', avatar: './assets/images/nyeri/10.png' },
    
  ];
  noasuransi:any='';
  tdata:any;
  
  ngOnInit(): void {

    // this.notrans = this.route.snapshot.paramMap.get('noTransaksi')

    // this.norm = this.route.snapshot.paramMap.get('noRM')

    // this.kddokter = this.route.snapshot.paramMap.get('kddokter')

    this.norm = localStorage.getItem('noRM')

    this.tglp = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');


    this.authService.pasien(this.kdcabang,'3',this.norm)
    .subscribe(
      data => {


  
        for(let x of data){
          this.noasuransi = x.noasuransi
        }


      },
      Error => {

        console.log(Error)
      }
    )


    setTimeout(() => {
      this.FarmasijualService.getriwayatkunjungan(this.noasuransi)
      .subscribe(
        data => {


     

         
            if (data.metaData.code == 200) {

    
          this.tdata = data.response.list


            } else {
              this.toastr.error('Gagal Memuat Data BPJS', 'Eror');

            }

   


        },
        Error => {

          console.log(Error)
        }
      )
    }, 500);


   
  }
 

}
