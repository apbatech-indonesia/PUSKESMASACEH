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


@Component({
  selector: 'app-kajianperawat',
  templateUrl: './kajianperawat.component.html',
  styleUrls: ['./kajianperawat.component.sass']
})
export class kajianperawatComponent implements OnInit {
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
  constructor(private fb: FormBuilder,private modalService: NgbModal,public toastr:ToastrService,private route: ActivatedRoute,private authService:ApiserviceService) {


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
  ngOnInit(): void {

    this.notrans = this.route.snapshot.paramMap.get('notrans')

    this.norm = this.route.snapshot.paramMap.get('norm')

    this.kddokter = this.route.snapshot.paramMap.get('kddokter')

    this.tglp = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');

    setTimeout(() => {
      this.tmpriwayatno()
      this.tmpriwayatnotransaki()
      
    }, 250);
  }
  listrwt:any;

  tmpriwayatno(){

    this.authService.rwtkajianperawatawal(this.norm,'2')
    .subscribe(
      data => {

        this.listrwt = data;


      }
    )
  }


  tmpriwayatnotransaki(){

    this.authService.rwtkajianperawatawal(this.notrans,'1')
    .subscribe(
      data => {

        for(let x of data){
        this.username = x.kduser
          this.anamnesa= x.anamnesa,
          this.anamnesaket=x.anamnesaket,
          this.keluhanutama=x.keluhanutama,
          this.rps=x.rps,
          this.alergi=x.alergi,
          this.rpd=x.rpd,
          this.rwtlahir=x.rwtlahir.split(','),
          this.rwtvaksi=x.rwtvaksi,
          this.kebiasaan=x.kebiasaan,
          this.td=x.td,
          this.rr=x.rr,
          this.suhu=x.suhu,
          this.nadi=x.nadi,
          this.tb=x.tb,
          this.bb=x.bb,
          this.pengetahuan=x.pengetahuan,
          this.perawatan=x.perawatan,
          this.keyakinan=x.keyakinan.split(','),
          this.komunikasi=x.komunikasi.split(','),
          this.ygmerawat=x.ygmerawat.split(','),
          this.nyeri=x.nyeri,
          this.pencetus=x.pencetus,
          this.kualitas=x.kualitas,
          this.lokasi=x.lokasi,
          this.skala=x.skala,
          this.waktu=x.waktu,
          this.jatuha=x.jatuha,
          this.jatuhb=x.jatuhb,
          this.ketjatuh=x.ketjatuh,
          this.analisa=x.analisa.split(',')
          this.userinput = x.kduser


        }


      }
    )
  }

  userinput:any=''
  lihatresume(a){
    this.notrans = a;

    this.tmpriwayatnotransaki()

  }
  addCustomUser = (term) => (term);

  users = ['Spontan','Operasi','di Rs','Cukup Bulan','Kurang Bulan','BB Lahir...','Panjang Badang lahir ...'];
  listanalisis = ['Bersihkan Jalan Nafas tidak efektif',
  'perubahan nutrisi kurang/lebih cairan','Keseimbangan cairan dan elektrolit','Gangguan komunikasi verbal',
  'Pola Nafas tidak efektif',
'Resiko infkesi','Gangguan integritas kulit atau jaringan','Gangguan pola tidur','Nyeri','Intoleransi aktivitas',
'Konstipasi','cemas','hipertermi','Menganjurkan pasien minum obat teratur','Mengajurkan untuk makan teratur',
'mengajurkan untuk minum hangat','Mengajurkan untuk tidak minum dingin','mengajurkan pasien cukup istirahat','mengajurkan pasien kontrol teratur','mengajurkan untuk membatasi aktivitas'];


simpan(){


  let body={
    "notransaksi":this.notrans,
    "norm":this.norm,
    "kduser":this.username,
    "anamnesa":this.anamnesa,
    "anamnesaket":this.anamnesaket,
    "keluhanutama":this.keluhanutama,
    "rps":this.rps,
    "alergi":this.alergi,
    "rpd":this.rpd,
    "rwtlahir":this.rwtlahir,
    "rwtvaksi":this.rwtvaksi,
    "kebiasaan":this.kebiasaan,
    "td":this.td,
    "rr":this.rr,
    "suhu":this.suhu,
    "nadi":this.nadi,
    "tb":this.tb,
    "bb":this.bb,
    "pengetahuan":this.pengetahuan,
    "perawatan":this.perawatan,
    "keyakinan":this.keyakinan,
    "komunikasi":this.komunikasi,
    "ygmerawat":this.ygmerawat,
    "nyeri":this.nyeri,
    "pencetus":this.pencetus,
    "kualitas":this.kualitas,
    "lokasi":this.lokasi,
    "skala":this.skala,
    "waktu":this.waktu,
    "jatuha":this.jatuha,
    "jatuhb":this.jatuhb,
    "ketjatuh":this.ketjatuh,
    "analisa":this.analisa,
    "stssimpan":'1'
}

let bodyx={
  "notransaksi":this.notrans,
  "norm":this.norm,
  "kduser":this.username,
  "anamnesa":this.anamnesa,
  "anamnesaket":this.anamnesaket,
  "keluhanutama":this.keluhanutama,
  "rps":this.rps,
  "alergi":this.alergi,
  "rpd":this.rpd,
  "rwtlahir":this.rwtlahir,
  "rwtvaksi":this.rwtvaksi,
  "kebiasaan":this.kebiasaan,
  "td":this.td,
  "rr":this.rr,
  "suhu":this.suhu,
  "nadi":this.nadi,
  "tb":this.tb,
  "bb":this.bb,
  "pengetahuan":this.pengetahuan,
  "perawatan":this.perawatan,
  "keyakinan":this.keyakinan,
  "komunikasi":this.komunikasi,
  "ygmerawat":this.ygmerawat,

  "nyeri":this.nyeri,
  "pencetus":this.pencetus,
  "kualitas":this.kualitas,
  "lokasi":this.lokasi,
  "skala":this.skala,
  "waktu":this.waktu,
  "jatuha":this.jatuha,
  "jatuhb":this.jatuhb,
  "ketjatuh":this.ketjatuh,
  "analisa":this.analisa,
  "stssimpan":'2'
}


this.authService.simpankajian(bodyx)
.subscribe(response => {

  console.log(response)


  if(response.kode == 200){


    setTimeout(() => {
         this.authService.simpankajian(body)
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
