import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { SampleService } from 'src/app/services';


@Component({
  selector: 'app-laporanrad',
  templateUrl: './laporanrad.component.html',
  styles: [
    `.example-container {
      display: flex;
      flex-direction: column;
    }

    .example-container > * {
      width: 100%;
    }

    .example-container form {
      margin-bottom: 20px;
    }

    .example-container form > * {
      margin: 5px 0;
    }

    .example-container .mat-radio-button {
      margin: 0 5px;
    }`
  ],

  providers: [
    DatePipe,

  ],
})
export class laporanradComponent implements OnInit {

  heading = 'Master Gudang';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  options: FormGroup;
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  cabangarr:any;
 
  cariuser:any;
kdcabang:any;

gudang='';
kdgudang='';

hakakses:any;
tgldari = '2013-12-12'
tglsampai = '2013-12-12'
myDate = new Date();
hostName: string;
URLINVOICE:string
  constructor(public hots:SampleService,private datepipe: DatePipe,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

    
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
   this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
    this.tglsampai = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

  }


  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';

    this.klinik()
   
  }

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
    
    this.authService.cabangper(this.kdklinik)
    .subscribe(
      data => {
      
this.cabangarr = data;

    },
      Error => {
    
       console.log(Error)
      }
    )
    
    


  }

judul:any;
tklinik:any;
kdcus:any;

tmp(){
  this.authService.poli(this.kdcabang)
.subscribe(
  data => {
  
this.tklinik = data;


},
  Error => {

   console.log(Error)
  }
)
}
tkostumer:any;

tmpkonsumen(){
  this.authService.kostumerdt(this.kdcabang)
  .subscribe(
    data => {
    
  this.tkostumer = data;
  
  
  },
    Error => {
  
     console.log(Error)
    }
  )
}

tdokter:any;

dafatrdokter(){
  this.authService.dokter(this.kdcabang)
  .subscribe(
    data => {
    
   this.tdokter = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )
}
tkom:any;
tmpkom(){
  this.authService.komponen()
  .subscribe(
    data => {
    
   this.tkom = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )
  
}


  laprj(a){
this.judul = a;


if(a === 'Kunjungan Rawat Jalan'){
  this.tmp()
}else if(a === 'Pendapatan Rawat Jalan'){
  this.tmp()
}else if(a === 'Pendapatan RJ/Konsumen'){
  this.tmp()
  this.tmpkonsumen()

}else if(a === 'Jasa Dokter'){
  this.tmp()
  this.dafatrdokter()
}else if(a === 'Per Komponen'){
  this.tmp()
  this.tmpkom()
}else{


}


  }
  kddokter:any;
  kdkom:any;


  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

  lihatkunjungan(){
    var redirectWindow = window.open(this.URLINVOICE+'clenic/report/kunjungan.php?tgldari='+this.tgldari+'&kdcabang='+this.kdcabang+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
    redirectWindow.location;
 }
 lihatkunjunganexcel(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/kunjunganexcel.php?tgldari='+this.tgldari+'&kdcabang='+this.kdcabang+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
}

lihatrj(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrj.php?kdcabang='+this.kdcabang+'&username='+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik+'&kdpoli='+this.kdklinik, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }

 lihatrjkon(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrjkonsumen.php?kdcabang='+this.kdcabang+'&username='+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik+'&kdpoli='+this.kdklinik+'&kdcus='+this.kdcus, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }

 lihatrjexcel(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrjexcel.php?kdcabang='+this.kdcabang+'&username='+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik+'&kdpoli='+this.kdklinik, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }

 lihatrjkonexcel(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrjkonsumenexcel.php?kdcabang='+this.kdcabang+'&username='+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kdklinik+'&kdpoli='+this.kdklinik+'&kdcus='+this.kdcus, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }


 lihatrjkondok(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/jasadokterpenunjang.php?kdcabang='+this.kdcabang+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kddokter+'&kdpoli='+this.kdklinik, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }

 lihatrjkondokexcel(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/jasadokterrjexcel.php?kdcabang='+this.kdcabang+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&status='+this.kddokter, '_blank','location=no,toolbar=noheight='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location;
 }


  getDayDiff(startDate: Date, endDate: Date): number {
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
}


 
 
 lihatrjkom(){

if(this.getDayDiff(new Date(this.tgldari), new Date(this.tglsampai)) > 7){
// console.log("tidak bisa lebih dari 7 hari")

// alert("tidak bisa lebih dari 7 hari")

this.toastr.error('tidak bisa lebih dari 7 hari', 'Eror');
                    

}else{
 var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanprodukrad.php?kdcabang='+this.kdcabang+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}

 
 }

 lihatrjkomexcel(){

  if(this.getDayDiff(new Date(this.tgldari), new Date(this.tglsampai)) > 7){
    // console.log("tidak bisa lebih dari 7 hari")
    
    // alert("tidak bisa lebih dari 7 hari")
    
    this.toastr.error('tidak bisa lebih dari 7 hari', 'Eror');
                        
    
    }else{
     var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanprodukradexcel.php?kdcabang='+this.kdcabang+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;
    }
    
 }

}
