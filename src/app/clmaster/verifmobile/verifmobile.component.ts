import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common'
import { SampleService } from 'src/app/services';


@Component({
  selector: 'app-verifmobile',
  templateUrl: './verifmobile.component.html',
  styles: [
   
  ],
  providers: [
    DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class verifmobileComponent implements OnInit {
  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = 'Master Customer';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  options: FormGroup;
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  cabangarr:any;

  cariuser:any;
  closeResult: string;

  kdparent=''
  coa='';
kdcabang:any;
username:any;

currentJustify = 'start';
currentJustify2 = 'center';
currentJustify3 = 'start';

currentOrientation = 'horizontal';


htmlContent = '';

config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '25rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  uploadUrl:'no',
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ], toolbarHiddenButtons: [
    [
   
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode',
      'strikeThrough',
      'subscript',
      'superscript',
    ]
  
  ]
};
kduser:any;
tglp = '2013-12-12'
tglb = '2013-12-12'
myDate = new Date();
showsimpan:boolean;
tgldari= '2013-12-12'
tglsampai= '2013-12-12'
tglbayar=''
form: FormGroup;
hostName: string;
URLINVOICE:string
  constructor(public hots:SampleService,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 
this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglb = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
this.tglsampai = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
this.tglbayar = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');

}

tsupplier:any;

  ngOnInit() {
    // this.tmplisthutang()
    // this.tmptotal()
    
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';
  this.pilihdokter()
  
  }
  tcus:any;

  pilihdokter(){
    this.authService.kostumer(this.kdcabang,'1','')
    .subscribe(
      data => {
      
  this.tcus = data;
  
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  
   }

  cusi:string='';
  cusid:string='';
  noasuransi:string='';
  tcusid:any;
  dash:any;

   pilkel(a){
console.log(this.cusi)
this.authService.kostumerd(this.kdcabang,'1','',a)
  .subscribe(
    data => {
    
this.tcusid = data;

for(let x of data){
this.dash = x.dash
}



  },
    Error => {
  
     console.log(Error)
    }
  )
 }
  profileForm = this.fb.group({
  

   
    cusi: ['',Validators.required],
    cusid: ['',Validators.required],
    noasuransi: ['',Validators.required],
 


  });



totalpass:number=0;
totalpassbelum:number=0;
totalpasssudah:number=0;
tampilpas:any;

  tmptotal(){
    this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM','','2','')
    .subscribe(
      data => {
this.totalpass = data.length
this.tampilpas = data;

  
    },
      Error => {
    
       console.log(Error)
      }
    )
  
  
    this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM','','1','')
    .subscribe(
      data => {
this.totalpassbelum = data.length
      
  
    },
      Error => {
    
       console.log(Error)
      }
    )



    this.authService.pasienperdokter(this.kdcabang,this.kduser,'SUDAH','','1','')
    .subscribe(
      data => {
this.totalpasssudah = data.length
      
  
    },
      Error => {
    
       console.log(Error)
      }
    )

  
  }
 

  cpasien(a){
    this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM',a.target.value,'2','')
    .subscribe(
      data => {

this.tampilpas = data;

  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
   
  norm :''
  kdpoli:''
  tglpriksa:''
  kddokter:''
  kdkostumerd:''
  notransaksi:''
  pasien:''
  tgllahir:''
  noantrian:''
  nampoli:''
  namdokter:''
  namacus:''
  costumer:''
  alamat:''
  kdtarif:''
  showdata:boolean;
  kelas:string;
totalpiutang:number;
sts:any;

  pilihpasien(notrans,tgl,norm
    ,pasien,nampoli,kdkostumer,nama,total,sts,kdpoli){
          
this.notransaksi = notrans;
this.tglpriksa = tgl;
this.norm = norm;
this.pasien = pasien;
this.nampoli = nampoli;
this.kdkostumerd = kdkostumer;
this.namacus = nama;
this.totalpiutang =total;
this.kdpoli = kdpoli;
this.sts = sts;

this.bayarnom=0;
this.saldosisa =0;

this.showsimpan = true;


      setTimeout(() => {
        
this.tmpbpiutang()
this.modalService.dismissAll()

      }, 200); 


        
       
        }


        pilihpasienx(notrans,tglbayar,norm
          ,pasien,nampoli,kdkostumer,nama,totalbayar,status,kdpoli)
          {
            this.notransaksi = notrans;
            this.tglpriksa = tglbayar;
            this.norm = norm;
            this.pasien = pasien;
            this.nampoli = nampoli;
            this.kdkostumerd = kdkostumer;
            this.namacus = nama;
            this.totalpiutang =0;
            this.kdpoli = kdpoli;
            this.sts = status;
            
            this.bayarnom=0;
            this.saldosisa =0;

            
this.showsimpan = false;


setTimeout(() => {
  
this.tmpbpiutang()
this.modalService.dismissAll()

}, 200); 

          }

        caripas='2';
        tpasienp:any;
        ktglrad(){
          this.tmppasienrj()
        }
        totalpasien:number;
        tmppasienrj(){
          this.authService.listpiutang(this.kdcabang,this.caripas,'',this.tglp)
          .subscribe(
            data => {
      this.totalpasien = data.length
      this.tpasienp = data;
      
        
          },
            Error => {
          
             console.log(Error)
            }
          )
        }

        caripass(a){
          this.authService.listpiutang(this.kdcabang,this.caripas,a.target.value,this.tglp)
          .subscribe(
            data => {
      this.totalpasien = data.length
      this.tpasienp = data;
      
        
          },
            Error => {
          
             console.log(Error)
            }
          )
        }
        openLargemap(content) {
   
          this.tmppasienrj()
                this.modalService.open(content, {
                  size: 'lg'
                });
              }
              openLargemapx(content) {
   
                this.tmpbpiutangh()
                      this.modalService.open(content, {
                        size: 'lg'
                      });
                    }

                    tbayarph:any;
                    caripasx='1';
                    caripassx(a){
                      this.authService.listbayarpiutangh(this.kdcabang,this.caripasx,a.target.value,'')
                      .subscribe(
                        data => {
                    
                    this.tbayarph = data;
                    
                    
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
                    }
                    tmpbpiutangh(){
                      this.authService.listbayarpiutangh(this.kdcabang,this.caripasx,'','')
                      .subscribe(
                        data => {
                    
                    this.tbayarph = data;
                    
                    
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
                    }


  bayarnom:number=0;
  saldosisa:number=0;

tambahadm(a){


  // this.bayarnom = a.target.value

// var x :number=0;
// x =  a.target.value;

var x :number;
x =  parseInt(a.target.value);
// console.log(x,this.totalpiutang);

  if(x > this.totalpiutang){
    this.toastr.error('Melebihi Piutang', 'Eror');
    this.bayarnom = 0;
    this.saldosisa = 0;
  }else{
this.saldosisa =  this.totalpiutang - x;

  }
}

tbayarp:any;
tmpbpiutang(){
  this.authService.listbayarpiutang(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {

this.tbayarp = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}

tlisthutang=[];
kdsup:any;
sudah='0';

carihutangcari(a){
  this.authService.listpasienmobile(this.tgldari,this.kdcabang,this.sudah,a.target.value)
  .subscribe(
    data => {

this.tlisthutang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}
tmplisthutang(){
  
  this.authService.listpasienmobile(this.tgldari,this.kdcabang,this.sudah,'')
  .subscribe(
    data => {

this.tlisthutang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

}

batalbayar(NOFAKTUR,KDSUPPLIER,NETTO){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Batal Bayar',
    text: 'Batal Melunasi Pembayaran',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Batal Bayar',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {

      let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"nofaktur":NOFAKTUR,"kdsup":KDSUPPLIER,"jumlah":NETTO,"kduser":this.username,"tgl":this.tglbayar,"stssimpan":'2'}
      
      this.authService.simpanbayarhutang(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
          setTimeout(() => {
            if(this.getDayDiff(new Date(this.tgldari), new Date(this.tglsampai)) > 7){
   
      
              this.toastr.error('tidak bisa lebih dari 7 hari', 'Eror');
                                  
              
              }else{
                this.tmplisthutang()
              }
        
            
          }, 100);
      
      
      
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
      
      
      
      
      
      })
    
  

   

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
  
    }
  });




}


hapusobat(notrans,norm,kdpoli,kdkostumer,tglbayar,
  totalbayar,status,no ){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus',
      text: 'Hapus Pembayaran',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {



        let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":notrans,
        "norm":norm,"kdkostumer":kdkostumer,"totalbayar":totalbayar,"totalbayara":totalbayar,"status":status,
        "kdpoli":kdpoli,"kduser":this.username,"stssimpan":'2',"no":no}
        
        this.authService.simpanbayarpiutang(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        
            setTimeout(() => {
              this.tmpbpiutang()
              
            }, 100);
        
        
        
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })
      
    

     

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
    
      }
    });


  




  
}

laporan(content){
  this.modalService.open(content, {
       
  });
}


notrans:any;
dokter:any;
nomorantiran:any;
jadwal:any;
statusverif:any;
bayar(content,nomor_transaksi,norm,pasien,poli_id,nampoli,dokter_id,namdokter,nomor_antrian,jadwal_pertemuan,
  statusverif){
    this.notrans = nomor_transaksi
    this.norm = norm
    this.pasien = pasien;
    this.kdpoli = poli_id;
    this.nampoli = nampoli;
    this.kddokter = dokter_id
    this.namdokter = namdokter;
    this.nomorantiran = nomor_antrian;
    this.jadwal = jadwal_pertemuan;


  this.modalService.open(content, {
       size:'lg'
  });
}

// URLINVOICE='https://clenicapp.com/'
cetakfakturp(){
  // var redirectWindow = window.open(this.URLINVOICE+'clenic/report/lappembayaranhutang.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  // redirectWindow.location;
  let body={"notransaksi":this.notrans,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"norm":this.norm,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.cusid,"stssimpan":'1'}


  
  this.authService.simpanverifdaftar(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success('Berhasil', 'Sukses', {
        timeOut: 2000,
      });
  
  setTimeout(() => {
    this.tmplisthutang
  
  }, 200);









  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Cetak Antrian',
    text: 'Cetak Antrian',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Cetak antrian',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      var redirectWindow = window.open(this.URLINVOICE+'clenic/report/cetakantrian.php?kdcabang='+this.kdcabang+'&notransaksi='+response.metadata.message, '_blank','location=no,toolbar=no,height=570,width=500,scrollbars=yes,status=yes');
      redirectWindow.location;

   

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
  
    }
  });










     
  
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


}


	//checkAllCheckBox(ev) { // Angular 9
  checkAllCheckBox(ev: any) { // Angular 13
		this.tlisthutang.forEach(
      x => x.checked = ev.target.checked )
    


	}

	isAllCheckBoxChecked() {
		return this.tlisthutang.every(p => p.checked);

    
	}
  
  checkedItems:any;
  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
  
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }
  
  lihat(){
   
        this.tmplisthutang()
      




  }
  carihutang='1';

}
