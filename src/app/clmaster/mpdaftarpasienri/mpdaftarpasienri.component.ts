import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { SampleService } from 'src/app/services';



@Component({
  selector: 'app-mpdaftarpasienri',
  templateUrl: './mpdaftarpasienri.component.html',
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
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class mpdaftarpasienriComponent implements OnInit {

  heading = 'Pendaftaran Pasien';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  options: FormGroup;
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  cabangarr:any;
  Username:'';
  password:'';
  namal:'';
  hakakses:'';
  kdcb:'';
  cariuser:any;
  kdcabang:any;
  tgllahir:any;
  username:any;
  kelas:string;
  tglp : any;
  myDate = new Date();
  hostName: string;
URLINVOICE:string



  constructor(public hots:SampleService,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
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
this.username = this.userDetails.username;
this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tgllahir = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.pastdate()
  }
  rj:number;
  far:number;
  lab:number;
  rad:number;
  emr:number;
  pcare:number;
  upload:number;
min:any;
pastdate(){
  var tdate:any=new Date();
  var date:any=tdate.getDate();
  if(date < 10){
    date ="0" + date;
  }
  var month:any = tdate.getMonth()+1;
  if(month < 10){
    month ="0" + month
  }

  var year:any=tdate.getFullYear();
  this.min = year + "-" + month + "-" + date;

console.log(this.min)
}
non(a){

  this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

  this.toastr.error('Tidak di ijinkan menulis tanggal manual');
  
}
  hak(){
    this.authService.hakakses(this.kdcabang)
    .subscribe(
      data => {
     for (let x of data ){
  this.rj = x.rj
  this.far = x.farmasi
  this.lab = x.lab
  this.rad = x.rad
  this.emr = x.emr
  this.pcare = x.pcare
  this.upload = x.upload
   }
  
     
  
      },
      Error => {
    
       console.log(Error)
      }
    )
  
  
  }

  spesialis:any;
  kamar:any;
  privasi:any;
  penerimaan:any;

  Keterangan:any;
  pj:any;
  pjnama='.';
  pjalamat='.';
  pjhp='.';
  caramasuk:any;

  profileForm = this.fb.group({
    norm: ['',Validators.required],
    pasienin: ['',Validators.required],
    indetitas: ['',Validators.required],
    noindetitas: ['',Validators.required],
    hp: ['',Validators.required],
    dokter: ['',Validators.required],
    spesialis: ['',Validators.required],

  kamar: ['',Validators.required],
  kelas: ['',Validators.required],
  privasi: ['',Validators.required],
  caramasuk: ['',Validators.required],
  penerimaan: ['',Validators.required],
 

   
    cusi: ['',Validators.required],
    cusid: ['',Validators.required],
    noasuransi: ['',Validators.required],
    pj:['',Validators.required],


  });

 
  selectedCity: any;
  tcariall:any;
  pasienc='';
  caripasienc(a){

this.authService.pasienantrian(this.kdcabang,'3','',a.target.value,'')
.subscribe(
  data => {
  
   this.tcariall = data;

},
  Error => {

   console.log(Error)
  }
)
  }


  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';

    this.klinik()
    this.tmppuser()
    this.hak()
    this.pilihdokter()
   this.lihatpas()
  }

  tmppas:any;
totalpasien:any;
caripasx:any;

caripassd(a){
  this.authService.t_listpasienri(this.kdcabang,a.target.value)
  .subscribe(
    data => {
      this.tmppas = data;
  this.totalpasien = data.length
  },
    Error => {
  
     console.log(Error)
    }
  )
}

pilihk(a){
 

  this.authService.pasiendaftar(this.kdcabang,'',a)
  .subscribe(
    data => {
      this.tmppas = data;
  this.totalpasien = data.length
  },
    Error => {
  
     console.log(Error)
    }
  )
}

tkamar:any;

pilihkelas(a){
  this.authService.t_kamarkelas(this.kdcabang,'',a)
  .subscribe(
    data => {
      this.tkamar = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
tpolidaf:any;

  lihatpas(){

        this.authService.t_listpasienri(this.kdcabang,'')
    .subscribe(
      data => {
        this.tmppas = data;
    this.totalpasien = data.length
    },
      Error => {
    
       console.log(Error)
      }
    )

    
    // this.authService.listpolidaf(this.kdcabang)
    // .subscribe(
    //   data => {

    //     this.tpolidaf = data;
    // },
    //   Error => {
    
    //    console.log(Error)
    //   }
    // )


    
  }
  klinik(){
    // this.authService.klinikper(this.kdklinik)
    // .subscribe(
    //   data => {
      
    //     this.subheading = Array.prototype.map.call(data,s=>s.nama).toString();
    
    
    // },
    //   Error => {
    
    //    console.log(Error)
    //   }
    // )
    
    this.authService.cabangbyid(this.kdklinik,this.kdcabang)
    .subscribe(
      data => {
      
this.cabangarr = Array.prototype.map.call(data,s=>s.nama).toString();

    },
      Error => {
    
       console.log(Error)
      }
    )
    
    


  }


tmpusers:any;

kliniks:string='';
tkelas:any;

tspesialis:any;

  tmppuser(){
    this.authService.t_spesialisasi(this.kdcabang,'')
    .subscribe(
      data => {

        this.tspesialis = data;

    },
      Error => {
    
       console.log(Error)
      }
    )


    this.authService.t_masterkelaskamar(this.kdcabang,'')
    .subscribe(
      data => {

        this.tkelas = data;

    },
      Error => {
    
       console.log(Error)
      }
    )

    

  }


  cariuserx(a){
console.log(a.target.value)

this.authService.cariuser(this.kdcabang,a.target.value)
.subscribe(data => {
  this.tmpusers = data;

 
 
})

  }


  hapusdaftar(notransaksi,norm,kdspesial,kdklas,tglmasuk,
    jammasuk,kdkamar,kddokter,kdkostumer,kdkostumercob,caramasuk,penerimaan,
      keterangan,pj,pjnama,pjhp,pjalamat,namasps,nmkamar,namdokter,
      nmkostumer,kostumercob,pasien,hp,nopengenal,statusjenguk){
    if(notransaksi === ''){
      this.toastr.error('data tidak bisa di edit karena pasien tersebut belum terdaftar', 'Eror');
         
    
     }else{

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Edit Data?',
        text: 'Yakin Akan Edit Data',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
   
    
let body ={
"norm": this.norm,"pasien":this.pasienin,
"tgllahir":this.tgllahir,"indetitas":this.indetitas,"noindetitas":this.noindetitas,
"hp":this.hp,"spesialis":this.spesialis,"kelas":this.kelas,"dokter":this.dokter,"kamar":this.kamar,"privasi":this.privasi,
"caramasuk":this.caramasuk,"penerimaan":this.penerimaan,"keterangan":this.Keterangan,"tglp":this.tglp,
"cusi":this.cusi,"cusid":this.cusid,"noasuransi":this.noasuransi,"pj":this.pj,"pjnama":this.pjnama,
"pjalamat":this.pjalamat,"pjhp":this.pjhp,"kduser":this.username ,"stssimpan":'3',"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":notransaksi}


this.authService.simpandaftarri(body)
  .subscribe(response => {
  
 

    if(response ){

if(response === 201){
  this.toastr.error('Data Tidak Bisa di hapus karena sudah ada transaksi', 'Eror');
    
}else{
this.toastr.success('', 'Sukses', {
        timeOut: 2000,
      });


}

      // this.toastr.success(''+response, 'Sukses', {
      //   timeOut: 2000,
      // });

   

      // this.profileForm.reset()
      // this.pjalamat=''
      // this.pjhp='';
      // this.Keterangan='';
      
      this.lihatpas()
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

  }


 edit(){


 if(this.notransaksi === ''){
  this.toastr.error('data tidak bisa di edit karena pasien tersebut belum terdaftar', 'Eror');
     

 }else{


  const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Edit Data?',
          text: 'Yakin Akan Edit Data',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Edit',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
     
      
 let body ={
  "norm": this.norm,"pasien":this.pasienin,
  "tgllahir":this.tgllahir,"indetitas":this.indetitas,"noindetitas":this.noindetitas,
  "hp":this.hp,"spesialis":this.spesialis,"kelas":this.kelas,"dokter":this.dokter,"kamar":this.kamar,"privasi":this.privasi,
  "caramasuk":this.caramasuk,"penerimaan":this.penerimaan,"keterangan":this.Keterangan,"tglp":this.tglp,
  "cusi":this.cusi,"cusid":this.cusid,"noasuransi":this.noasuransi,"pj":this.pj,"pjnama":this.pjnama,
  "pjalamat":this.pjalamat,"pjhp":this.pjhp,"kduser":this.username ,"stssimpan":'2',"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi}


  this.authService.simpandaftarri(body)
    .subscribe(response => {
    
   
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });

     

        this.profileForm.reset()
        this.pjalamat=''
        this.pjhp='';
        this.Keterangan='';
        
        this.lihatpas()
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
 }

 edituser(){

 }

//  delete(a){
 
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//       },
//       buttonsStyling: false
//     });

//     swalWithBootstrapButtons.fire({
//       title: 'Hapus User?',
//       text: 'Yakin Akan Menghapus User',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Hapus',
//       cancelButtonText: 'Batal',
//       reverseButtons: true
//     }).then((result) => {
//       if (result.value) {
//         swalWithBootstrapButtons.fire(
//           'Berhasil Hapus User',
//           'User Telah Terhapus Dari Database.',
//           'success'
//         );


//         this.authService.deleteuser(a).then(data =>{
//           this.tmppuser()
    

      
//       })


//       } else if (
//         /* Read more about handling dismissals below */
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire(
//           'Cancelled',
//           'Your imaginary file is safe :)',
//           'error'
//         );
//       }
//     });
  
//  }

 indetitas:string='';
 noindetitas:'';
 dokter:string='';
 tdokter:any;
 kdpoli:any='';
 pilihklinik(a){


   console.log(a)

   this.authService.t_spesialisasimaping(this.kdcabang,a)
   .subscribe(
     data => {
     
this.tdokter = data;

this.kdpoli = data[0].kdpoli;



   },
     Error => {
   
      console.log(Error)
     }
   )

   
 }

 tkloter:any;
 kloter='';

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

 tcus:any;
 cusi='';
 tcusid:any;
 cusid='';
dash:string;


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
 

//  tglp: Date = new Date();

 norm:'';
 pasien:'';
 hp:'';
 noasuransi='0';
tpasien:any;

 caripasien(a){
  this.authService.caripasienful(a.target.value)
  .subscribe(
    data => {
    
     this.tpasien = data;
  
  },
    Error => {
  
     console.log(Error)
    }
  )
 }
 pasienin=''

 tantrian:any;
 tgldaftarbpjs:any;
kdpolibpjs:any;
dashx:any;

 pilihpasienc(){
 
 
  this.authService.pasienantrian(this.kdcabang,'2',this.pasienc,'','')
  .subscribe(
    data => {
    
      this.tantrian = data;

      for(let x of data){
        this.noasuransi = x.noasuransi
        this.tgldaftarbpjs = x.tglpriksa
        this.kdpolibpjs = x.kdpolibpjs;
this.dashx = x.dash;

      }
  
  },
    Error => {
  
     console.log(Error)
    }
  )



 }
 bataldaf(){
  // this.norm = ''
  // this.pasienin=''
  // this.indetitas=''
  // this.noindetitas=''
  // this.hp='',
  // // this.kliniks='',
  // // this.dokter='',
  
  // // this.cusi=''
  // // this.cusid=''
  // this.noasuransi='0';

  this.profileForm.reset()
  this.notransaksi=''


 }
notransaksix:any;
notransaksi:string='';

sss(){
  let body ={
    "norm": this.norm,"pasien":this.pasienin,"indetitas":this.indetitas,"noindetitas":this.noindetitas,"kduser":this.username,
    "hp":this.hp,"kdpoli":this.kliniks,"kddokter":this.dokter,"kelas":'1',
       "tgldaftar":this.tglp,"kostumer":this.cusi,"kdkostumer":this.cusid,"noasuransi":this.noasuransi,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
   }


   console.log(body)
}

 simpan(){

 
 let body ={
    "norm": this.norm,"pasien":this.pasienin,
    "tgllahir":this.tgllahir,"indetitas":this.indetitas,"noindetitas":this.noindetitas,
    "hp":this.hp,"spesialis":this.spesialis,"kelas":this.kelas,"dokter":this.dokter,"kamar":this.kamar,"privasi":this.privasi,
    "caramasuk":this.caramasuk,"penerimaan":this.penerimaan,"keterangan":this.Keterangan,"tglp":this.tglp,
    "cusi":this.cusi,"cusid":this.cusid,"noasuransi":this.noasuransi,"pj":this.pj,"pjnama":this.pjnama,
    "pjalamat":this.pjalamat,"pjhp":this.pjhp,"kduser":this.username ,"stssimpan":'1',"kdklinik":this.kdklinik,"kdcabang":this.kdcabang}







   

    this.authService.simpandaftarri(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });

       

          this.profileForm.reset()
          this.pjalamat=''
          this.pjhp='';
          this.Keterangan='';
            
        this.lihatpas()
          
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })






      let bodyx = {
        "norm": this.norm, "pasien": this.pasienin, "indetitas": this.indetitas, "noindetitas": this.noindetitas, 
        "kduser": this.username,
        "hp": this.hp, "kdpoli": this.kdpoli, "kddokter": this.dokter, "kelas": '1',
        "tgldaftar": this.tglp, "kostumer": this.cusi, "kdkostumer": this.cusid, "noasuransi": this.noasuransi, 
        "kdcabang": this.kdcabang, "kdklinik": this.kdklinik, "stssimpan": '3',
        "kdprovider": this.kdprovider, "idhs": '0'
  
      }
  
      // console.log(bodyx)
      this.authService.simpandaftarrj(bodyx)
      .subscribe(response => {
  
  
      })
 
  
  
    }
  

    noref='';

    simpanantrian(a,b){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Cetak Antrian?',
        text: 'Yakin Akan Cetak Antrian User',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cetak',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {




        //   this.authService.panggil(a,this.noref)
        //   .subscribe(
        //     data => {
            
        //  console.log(data)
          
        //   },
        //     Error => {
          
        //      console.log(Error)
        //     }
        //   )





          setTimeout(() => {
            this.authService.waktuTunggucb1(a,'1',b)
            .subscribe(
              data => {
              
           console.log(data)
            
            },
              Error => {
            
               console.log(Error)
              }
            )
  

            alert('1')
          }, 3000);



          

          setTimeout(() => {
            

            this.authService.waktuTunggucb2(a,'2',b)
            .subscribe(
              data => {
              
           console.log(data)
            
            },
              Error => {
            
               console.log(Error)
              }
            )
          }, 4500);



          

          setTimeout(() => {
            

            this.authService.waktuTunggucb3(a,'3')
            .subscribe(
              data => {
              
           console.log(data)
            
            },
              Error => {
            
               console.log(Error)
              }
            )

          }, 5600);

          swalWithBootstrapButtons.fire(
            'Berhasil Cetak ',
            'Cetak Telah Berhasil.',
            'success'
          );
  
  
  
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
    }




    simpanantrianx(a,b){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Cetak Antrian?',
        text: 'Yakin Akan Cetak Antrian User',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cetak',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {




        //   this.authService.panggil(a,this.noref)
        //   .subscribe(
        //     data => {
            
        //  console.log(data)
          
        //   },
        //     Error => {
          
        //      console.log(Error)
        //     }
        //   )





   
setTimeout(() => {
  this.authService.waktuTunggucb3(a,'3')
            .subscribe(
              data => {
              
           console.log(data)
            
            },
              Error => {
            
               console.log(Error)
              }
            )
}, 4000);
            


          swalWithBootstrapButtons.fire(
            'Berhasil Cetak ',
            'Cetak Telah Berhasil.',
            'success'
          );
  
  
  
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
    }



    simpanantrianxX(a,b){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Cetak Antrian?',
        text: 'Yakin Akan Cetak Antrian User',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cetak',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {




      



   

            this.authService.waktuTunggucb3(a,'3')
            .subscribe(
              data => {
              
           console.log(data)
            
            },
              Error => {
            
               console.log(Error)
              }
            )


          swalWithBootstrapButtons.fire(
            'Berhasil Cetak ',
            'Cetak Telah Berhasil.',
            'success'
          );
  
  
  
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
    }
    openLarge(content) {
      this.caripas='2';
      this.profileForm.reset();
      this.notransaksi = ''
      this.authService.pasien(this.kdcabang,'2','')
      .subscribe(
        data => {
        
  this.tpasien = data;
  
      },
        Error => {
      
         console.log(Error)
        }
      )

      

      this.modalService.open(content, {
        size: 'lg'
      });
    }

    caripas:'2';
           onChange(a){
             this.caripas = a;

             console.log(this.caripas)

           }
           caripass(a){

            this.authService.pasien(this.kdcabang,this.caripas,a.target.value)
            .subscribe(
              data => {
              
        this.tpasien = data;
        
            },
              Error => {
            
               console.log(Error)
              }
            )}



            pilihpasien(norm,
              kdkelurahan,
              pasien,
              tgllahir,
              jeniskelamin,
              statusmarital,
              agama,
              alamat,
              alamatsekarang,
              hp,
              kdasuransi,
              noasuransi,
              tandapengenal,
              nopengenal,
              tempatlahir,
              golda, aktif,pendidikan,perkerjaan){
      
                this.noindetitas = nopengenal;
                this.hp = hp;
                this.indetitas = tandapengenal
                this.cusi = kdasuransi
                this.noasuransi = noasuransi
                this.pasienin = pasien
                this.norm = norm
                this.tgllahir = tgllahir
                this.modalService.dismissAll()
         
              
               }

              
               pilihpasienr(notransaksi,norm,kdspesial,kdklas,tglmasuk,
              jammasuk,kdkamar,kddokter,kdkostumer,kdkostumercob,caramasuk,penerimaan,
                keterangan,pj,pjnama,pjhp,pjalamat,namasps,nmkamar,namdokter,
                nmkostumer,kostumercob,pasien,hp,nopengenal,statusjenguk){
                  this.notransaksi = notransaksi;
                  this.norm = norm;
                  this. pasienin = pasien;
                  this.noindetitas = nopengenal;
                  this.hp = hp;
                  this.privasi = statusjenguk;
                  this.caramasuk= caramasuk;
                  this.penerimaan = penerimaan;
                  this.Keterangan = keterangan;
                  this.tglp = tglmasuk;
                  this.pj = pj;
                  this.pjnama = pjnama;
                  this.pjalamat = pjalamat;
                  this.pjhp = pjhp;

                
                    
                }
               
               cetaknoantrian(){
              
                var redirectWindow = window.open(this.URLINVOICE+'clenic/report/cetakantrian.php?kdcabang='+this.kdcabang+'&notransaksi='+this.pasienc, '_blank','location=no,toolbar=no,height=570,width=500,scrollbars=yes,status=yes');
                redirectWindow.location;
           }



           batalpriksa(notransaksi,norm,kddokter,kdpoli){
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });
        
            swalWithBootstrapButtons.fire({
              title: 'Hapus Transaksi?',
              text: 'Yakin Akan Batal Priksa',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Hapus',
              cancelButtonText: 'Batal',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
      
      
 

let body ={
 "kdcabang":this.kdcabang,"notransaksi":notransaksi,"norm":norm,
 "kddokter":kddokter,"kdpoli":kdpoli,"kduser":this.username,"stssimpan":'1'
 }
 


 this.authService.hapustrx(body)
 .subscribe(response => {
 
 
 
   if(response ){
     this.toastr.success(''+response, '-', {
       timeOut: 2000,
     });
 
  setTimeout(() => {
    

    this.authService.pasienantrian(this.kdcabang,'2',this.pasienc,'','')
    .subscribe(
      data => {
      
        this.tantrian = data;
    
    },
      Error => {
    
       console.log(Error)
      }
    )

    
  }, 200);
 



  if(this.dashx === 'BPJS'){
    this.toastr.success('Berhasil Hapus ,Untuk Di pCare Silahkan Hapus lewat Portal', '-', {
      timeOut: 2000,
    });


  }else{


  }
 
 
 
   
    }else{
     this.toastr.error('Simpan  Gagal', 'Eror');
   
    }
 
 
 
 
 
 })
      
      
         
      
               
      
        
        
        
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                );
              }
            });
           }

namabpjs:string;
tglakhirberlaku:string;
jeniskelas:string;
jenispeserta:string;
aktif:string;
ketaktif:string;
kdprovider:string;
namaprovider:string;



           cekbpjs(content){

   
            if(this.pcare <= 0){
              this.toastr.error('Anda Belum Langganan Fitur ini', 'Eror');
            
            }else{

              if(this.noasuransi.length <= 5){
                this.toastr.error('Silahkan Isi No Kartu BPJS', 'Eror');
            
              }else{
                this.authService.tmpbpjs(this.noasuransi,'noka')
                .subscribe(
                  data => {
  
                     
                      if(data){
  
                        console.log(data.metaData.code)
                        if(data.metaData.code == 200){
                          this.namabpjs = data.response.nama
                          this.tglakhirberlaku = data.response.tglAkhirBerlaku
                          this.jeniskelas = data.response.jnsKelas.nama
                          this.jenispeserta =  data.response.jnsPeserta.nama
                          this.aktif = data.response.aktif
                          this.ketaktif=data.response.ketAktif
                          this.kdprovider = data.response.kdProviderPst.kdProvider
                          this.namaprovider = data.response.kdProviderPst.nmProvider
                          this.modalService.open(content, {
                           
                          });
  
  
  
                        }else{
                          this.toastr.error('Gagal Memuat Data BPJS', 'Eror');
            
                        }
  
                      }else{
                        this.toastr.error('Gagal Memuat Data BPJS', 'Eror');
            
  
                      }
                  
                    
                },
                  Error => {
                
                   console.log(Error)
                  }
                )
            
              }
            }


            
         
           }


           daftarbpjs(content){
         
         
            if(this.pcare <= 0){

              this.toastr.error('Belum Langganan Fitur Ini', 'Eror');
        

         

            }else{

           
              this.authService.tmpbpjs(this.noasuransi,this.kdcabang)
              .subscribe(
                data => {
  
                   
                    if(data){
  
                      console.log(data.metaData.code)
                      if(data.metaData.code === 200){
                        this.namabpjs = data.response.nama
                        this.tglakhirberlaku = data.response.tglAkhirBerlaku
                        this.jeniskelas = data.response.jnsKelas.nama
                        this.jenispeserta =  data.response.jnsPeserta.nama
                        this.aktif = data.response.aktif
                        this.ketaktif=data.response.ketAktif
                        this.kdprovider = data.response.kdProviderPst.kdProvider
                        this.namaprovider = data.response.kdProviderPst.nmProvider
                        this.modalService.open(content, {
                         
                        });
  
  
  
                      }else{
                        this.toastr.error('Gagal Memuat Data BPJS', 'Eror');
          
                      }
  
                    }else{
                      this.toastr.error('Gagal Memuat Data BPJS', 'Eror');
          
  
                    }
                
                  
              },
                Error => {
              
                 console.log(Error)
                }
              )
              
            }


           }

           kdtkp:any;

           kirimpcare(){
         

            let body={
                "kdProviderPeserta": this.kdprovider,
            "tglDaftar": this.tgldaftarbpjs,
            "noKartu": this.noasuransi,
            "kdPoli": this.kdpolibpjs,
            "keluhan": null,
            "kunjSakit": true,
            "sistole": 0,
            "diastole": 0,
            "beratBadan": 0,
            "tinggiBadan": 0,
            "respRate": 0,
            "heartRate": 0,
            "rujukBalik": 0,
            "kdTkp": this.kdtkp
            }

           
            this.authService.simpanpcaredaftar(body)
 .subscribe(response => {
 
 
 
   if(response ){
    
    // console.log(response.metaData.code )

    if(response.metaData.code === 201){
    this.toastr.success('Berhasil Kirim PCare', '-', {
       timeOut: 2000,
     });



     this.modalService.dismissAll()
    }else{



    }
    
    //  this.toastr.success(''+response, '-', {
    //    timeOut: 2000,
    //  });

 
 
 
 
   
    }else{
     this.toastr.error('Simpan  Gagal', 'Eror');
   
    }
 
 
 
 
 
 })


           }
}
