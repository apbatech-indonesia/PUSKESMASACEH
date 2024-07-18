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
  selector: 'app-bayarpiutangrj',
  templateUrl: './bayarpiutangrj.component.html',
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
export class bayarpiutangrjComponent implements OnInit {
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
tglpx='2013-12-12';
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
this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';
    // this.tmptotal()
    
  
  }
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
          console.log(this.tglp)
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
                      this.authService.listbayarpiutangh(this.kdcabang,this.caripasx,a.target.value,this.tglpx)
                      .subscribe(
                        data => {
                          this.totalpasbayar = data.length
                    this.tbayarph = data;
                    
                    
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
                    }
                    klis(){
                      this.tmpbpiutangh()
                    }
                    totalpasbayar:any;

                    tmpbpiutangh(){
                      this.authService.listbayarpiutangh(this.kdcabang,this.caripasx,'',this.tglpx)
                      .subscribe(
                        data => {
                    this.totalpasbayar = data.length
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
    this.toastr.error('Melebihi Piutang', 'Error');
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

simpan(){

  if(this.bayarnom <= 0){
    this.toastr.error('tidak boleh 0', 'Error');
      
  }else{
    let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,"tgl":this.tglb,"totalpiutang":this.totalpiutang,
    "norm":this.norm,"kdkostumer":this.kdkostumerd,"totalbayar":this.bayarnom,"status":this.sts,"kdpoli":this.kdpoli,"kduser":this.username,"stssimpan":'1'}
    
    this.authService.simpanbayarpiutang(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
        setTimeout(() => {
          this.tmpbpiutang()
          this.totalpiutang = this.saldosisa;
          this.bayarnom = 0;
  
        }, 100);
    
    
    
       }else{
        this.toastr.error('Simpan  Gagal', 'Error');
      
       }
    
    
    
    
    
    })
  }

  

}
grap(){
 
  this.authService.bpjsdashbord('05','2022','rs')
  .subscribe(
    data => {
console.log(data)

  },
    Error => {
  
     console.log(Error)
    }
  )

// let body=
//   {
//     "data" :{
//    "bulan": "05",
//    "tahun": "2022",
//     "waktu": "rs"
//     }

// }

// this.authService.bpjsdashbord(body)
//   .subscribe(response => {
  
  
  
//     if(response ){
   
//   console.log(response)
  
//      }else{
//       this.toastr.error('Simpan  Gagal', 'Error');
    
//      }
  
  
  
  
  
//   })





// console.log(body)
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



        let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":notrans,"totalpiutang":this.totalpiutang,
        "norm":norm,"kdkostumer":kdkostumer,"totalbayar":totalbayar,"totalbayara":totalbayar,"status":status,
        "kdpoli":kdpoli,"kduser":this.username,"stssimpan":'2',"no":no}
        
        this.authService.simpanbayarpiutang(body)
        .subscribe(response => {
        
        
        
          if(response ){
          

            if(response === 201){
              this.toastr.error('Sudah di kunci', 'Error');
          
            }else if(response === 200){

  this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        


                setTimeout(() => {
              this.tmpbpiutang()
              
            }, 100);
        
            this.showsimpan = false
            // this.openLargemap('content6')
            }
          
        
        
           }else{
            this.toastr.error('Simpan  Gagal', 'Error');
          
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
laporanp(content){
  this.modalService.open(content, {
       
  });
}

cetakfakturp(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/lappembayaranpiutang.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}

cetakfakturpp(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/laporanpiutang.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}



}
