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
import { DatePipe } from '@angular/common';
import { SampleService } from 'src/app/services';
import { TreeNode } from 'primeng/api';






@Component({
  selector: 'app-kasirrad',
  templateUrl: './kasirrad.component.html',
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
export class kasirradComponent implements OnInit {
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
tglp : String = new Date().toISOString();
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

tgldari = '2013-12-12'

myDate = new Date();
hostName: string;
URLINVOICE:string
files1: TreeNode[];
selectedFile: TreeNode;
  constructor(public hots:SampleService,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
  
}
  profileForm = this.fb.group({
    jbayari: ['',Validators.required]
    
    
  });
thasillab:any;

  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE =localStorage.getItem('baseUrx');

    // this.tmptarif()
    
  
  }

  ttarif:any;

tmptarif(){

  

  this.authService.listtariftree(this.kdcabang,'RAD',this.kdtarif)
  .subscribe(
    data => {
    
      this.files1 = data;

  },
    Error => {
  
     console.log(Error)
    }
  )


//   this.authService.listtarif(this.kdcabang,'RAD','',this.kdtarif)
//   .subscribe(
//     data => {
    
// this.ttarif = data;

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )


 

}
kdbapak:any;

nodeSelect(a){
this.kdbapak = a.node.key
  this.authService.tarifdetail(this.kdcabang,'2','',a.node.key,'RAD')
  .subscribe(
    data => {
    
 this.ttarif = data;
 
 
  },
    Error => {
  
     console.log(Error)
    }
  )



}
  tpasien:any;
totalpasien:any;
  openLarge(content) {
    console.log(this.tglp)
    this.caripas='9';

    this.authService.pasienantrian(this.kdcabang,'9','','',this.tglp)
    .subscribe(
      data => {
      
this.tpasien = data;
this.totalpasien = data.length
    },
      Error => {
    
       console.log(Error)
      }
    )


    this.modalService.open(content, {
      size: 'lg'
    });
  }
  tdokx:any;

  caridokx(a){
    this.authService.caridokter(this.kdcabang,a.target.value)
    .subscribe(
      data => {
      this.tdokx = data;


    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  openLargex(content) {

    this.tmptarif()

    this.modalService.open(content, {
      size: 'lg'
    });
  }
  tlisttes:any;
  jenistc:any;
  tgolonganlab:any;
  onChangex(a){
    console.log(a)
    this.authService.teslab(this.kdcabang,this.jenistc,'','1')
      .subscribe(
        data => {
        
    this.tlisttes = data;
    
    
      },
        Error => {
      
         console.log(Error)
        }
      )
      }

      kdprod:any;
      prod:any;
tlistmaping:any;

  openLargemap(kdproduk,produk) {
this.kdprod = kdproduk;
this.prod = produk;


this.lihathasil()




//     this.authService.golongan(this.kdcabang,'','1')
//   .subscribe(
//     data => {
    
// this.tgolonganlab = data;


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )


//   this.authService.mapinglab(this.kdcabang,kdproduk)
//   .subscribe(
//     data => {
    
// this.tlistmaping = data;


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )



//     this.authService.teslab(this.kdcabang,this.jenistc,'','1')
//     .subscribe(
//       data => {
      
//   this.tlisttes = data;
  
  
//     },
//       Error => {
    
//        console.log(Error)
//       }
//     )


//     this.modalService.open(content, {
//       size: 'lg'
//     });
  }


 
  caripas:'9';
  onChange(a){
    this.caripas = a;

 

  }
  caripass(a){


    this.authService.pasienantrian(this.kdcabang,this.caripas,'',a.target.value,this.tglp)
    .subscribe(
      data => {
      
this.tpasien = data;
this.totalpasien = data.length
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
dokterkirim:string;
nofaktur:any;
jeniskelamin:any;
showverif:boolean;
statusverif:any;

tlistrad:any;



kddokterpengirim:any;
keteranganakhirrad:string='';
tdok:any;
kdcppt:any;

  pilihpasien(norm,kdpoli
        ,tglpriksa
        ,kddokter
        ,kdkostumerd
        ,notransaksi
        ,pasien
        ,tgllahir
  
        ,nampoli
        ,namdokter
        ,nama
        ,costumer
        ,alamat,kdtarif,kelas,dokterkirim,nofaktur,jeniskelamin,statusverif,kddokterpengirim,kdcppt){
          this.showdata = true;
          this.norm =norm
          this.kdpoli = kdpoli
          this.tglpriksa = tglpriksa
          this.kddokter = kddokter
          this.kdkostumerd = kdkostumerd
          this.notransaksi = notransaksi
          this.pasien = pasien
          this.tgllahir = tgllahir
          this.dokterkirim = dokterkirim
          this.nampoli = nampoli
          this.namdokter = namdokter
          this.namacus = nama
          this.costumer = costumer
          this.alamat = alamat
          this.kdtarif = kdtarif
          this.kelas = kelas;
          this.nofaktur = nofaktur
          this.jeniskelamin =  jeniskelamin
          this.statusverif = statusverif
          this.kddokterpengirim = kddokterpengirim
          this.kdcppt = kdcppt
          if(statusverif === '1'  ){
            this.statusverif = false;
            this.shotombol = true
            setTimeout(() => {
              this.tmptrans()
              // this.lihathasil()
           
            }, 100);
  
  

          }else if(statusverif === '0'){
          this.statusverif = true;
          this.shotombol = true
          this.authService.listintruksilab(this.kdcabang,this.notransaksi,'RADIOLOGI',this.kdcppt)
          .subscribe(
           data => {
           
          this.tlistrad = data;
          
          },
           Error => {
          
            console.log(Error)
           })



           this.authService.keteranganklinis(this.kdcabang,this.notransaksi,'RADIOLOGI',this.kdcppt)
           .subscribe(
             data => {
            
              for (let x of data )
              {
 
 this.keteranganakhirrad = x.keterangan
              }
 
 
      
         
           },
             Error => {
           
              console.log(Error)
             }
           )
 

           this.authService.doktertunjang(this.kdcabang,'rad')
    .subscribe(
      data => {
      
this.tdok = data
    },
      Error => {
    
       console.log(Error)
      }
    )

            
          }else{

          }


      

       setTimeout(() => {
        this.modalService.dismissAll()

       }, 200);
         

        
       
        }


      


ttransaksi:any;
namatrx='';
totaltagihan:number;
totaldisc:number;
totalbayar:number;
totalrjsaja:number;
netto:number;
totalkriditrj:number;
totaldebetrj:number;
totalrjsajaasli:number;
totalbayartagihanfarmasi:number;
nettosudahmasuk:number=0;
plafonbpjs:number=0
showtomboltarif:boolean;
showstatus:boolean;
tmptrans(){
  
  // this.authService.totalfarmasi(this.kdcabang,this.notransaksi)
  // .subscribe(
  //   data => {
  //     var farjml=0;
  //     var sudahbyr=0;
  //     var fixfar:number;


  //     if(data.length){
  //       for (let x of data )
  //       {
  //         var y = parseInt(x.totalbayar)
  //         var xy = parseInt(x.sudahbayar)
  //         farjml += y;
  //         sudahbyr +=xy;
        
        
  //       fixfar=farjml-sudahbyr;
        
        
        
  //       }
  //       this.totalbayartagihanfarmasi = fixfar;
  //     }else{
  //       this.totalbayartagihanfarmasi = 0;
  //     }
  

  //   },
  //   Error => {
  
  //    console.log(Error)
  //   }
  // )

  this.authService.listtrxrjpenunjang(this.kdcabang,this.notransaksi,this.namatrx,'2')
  .subscribe(
    data => {


    



var xyz=0;
var totaldisc=0;
var bayar = 0;
var totalblm=0;
      for (let x of data )
{



          var y = parseInt(x.debeta)
          var n = parseInt(x.disc)
          var b = parseInt(x.kridita)
        


          xyz += y;
          totaldisc += n;
          bayar += b;
        






}
this.totalbayar = bayar;

this.totaltagihan = xyz;
this.totaldisc = totaldisc;

this.ttransaksi = data;
setTimeout(() => {
  // totalblm = xyz - (totaldisc + bayar)
  totalblm = xyz - bayar
  this.netto = totalblm ;
  this.totalrjsaja = totalblm;
  this.totalrjsajaasli = totalblm;
}, 150);

if(data.length){

  if(this.totalbayar <= 0 ){


    this.showtomboltarif = true;

  }else{
    this.showtomboltarif = false;

  }
this.showstatus = true;

}else{
  this.showtomboltarif = true;
  this.showstatus = false;

}


  },
    Error => {
  
     console.log(Error)
    }
  )




//   this.authService.listtrxrj(this.kdcabang,this.notransaksi,this.namatrx,'2')
//   .subscribe(
//     data => {

//       var xyzx=0;
//       var kridit=0
//       for (let productx of data )
//       {



//         for(let x of productx.detail){
//         var yx = parseInt(x.debeta)
//         var kriditx =  parseInt(x.kridita)
//         xyzx += yx;
//         kridit +=kriditx;
//         }
        
//       }

//       this.totalrjsajaasli = xyzx;

      

// this.totaldebetrj = xyzx;
// this.totalkriditrj = kridit


// this.totalrjsaja = xyzx - kridit

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )



//   this.authService.trigerbayar(this.kdcabang,this.notransaksi)
//   .subscribe(
//     data => {
// var s:number=0;

//       for(let x of data){
//         var y = parseInt(x.sudahdibayar)
//         s += y;
//       }

//       this.nettosudahmasuk = s;

//       console.log(this.nettosudahmasuk)

//     },
//     Error => {
  
//      console.log(Error)
//     }
//     )




this.authService.t_ceknorm(this.kdcabang,this.norm)
.subscribe(
  data => {


    if(data.length){
      this.showtransfer = true;

      for(let x of data){
        this.notransaksiri = x.notransaksi
        this.kamarri = x.nama

      }

    }else{
      this.showtransfer = false;
      
    }

  },
  Error => {

   console.log(Error)
  }
  )

   




}
showtransfer:boolean;
notransaksiri:any;
kamarri:any;

plafonbpjsaman:number;
plafonbpjmedekati:number;

caritarif(a){
  this.authService.tarifdetail(this.kdcabang,'2',a.target.value,this.kdbapak,'RAD')
  .subscribe(
    data => {
    
 this.ttarif = data;
 
 
  },
    Error => {
  
     console.log(Error)
    }
  )



//   this.authService.listtarif(this.kdcabang,'LAB',a.target.value,this.kdtarif)
//   .subscribe(
//     data => {
    
// this.ttarif = data;

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
}

opendok(content){


  this.authService.dokter(this.kdcabang)
  .subscribe(
    data => {
    this.tdokx = data;


  },
    Error => {
  
     console.log(Error)
    }
  )




  this.modalService.open(content, {
   
  });
}



        tambahtarif(kdtarif,nama,harga){
              
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              });
          
              swalWithBootstrapButtons.fire({
                title: 'Tambah Tarif',
                text: 'Menambah Tarif '+nama,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Batal',
                reverseButtons: true
              }).then((result) => {
                if (result.value) {


                  let body ={"user":this.username,
                    "notransaksi":this.notransaksi,"kdproduk":kdtarif,"produk":nama,"kdpoli":this.kdpoli,"qty":'1',"harga":harga,"debet":harga,
                    "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":this.nofaktur,
                    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',"kddokterkirim":this.kddokterpengirim
                  }

                  
                  this.authService.simpantrxrjtunjang(body)
                  .subscribe(response => {
                  
                 
                
                    if(response ){
                      this.toastr.success(''+response, 'Sukses', {
                        timeOut: 2000,
                      });
                  
                      
setTimeout(() => {
  this.tmptrans()
}, 200);

                   
                  
                    
                     }else{
                      this.toastr.error('Simpan  Gagal', 'Eror');
                    
                     }
                
                
                
                
                
                  })

                  // swalWithBootstrapButtons.fire(
                  //   'Berhasil Hapus User',
                  //   'User Telah Terhapus Dari Database.',
                  //   'success'
                  // );
          
          
               
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  // swalWithBootstrapButtons.fire(
                  //   'Cancelled',
                  //   'Your imaginary file is safe :)',
                  //   'error'
                  // );
                }
              });
  
              

        }

pilihdokx(a,b){
              
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Pilih Dokter',
    text: 'Dokter Pengirim',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      let body ={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kddokter":a,"dokter":b
    }

    
    this.authService.gantidoktert(body)
    .subscribe(response => {
    
   
  
      if(response.code = 1 ){
        this.toastr.success('', 'Sukses', {
          timeOut: 2000,
        });
    

        this.kddokterpengirim = response.kddokter;
        this.dokterkirim = response.dokter;
        

      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })

   

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      // swalWithBootstrapButtons.fire(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // );
    }
  });

  

}

        hapusproduk(nomor,kdproduk,produk,notransaksi,harga,nofaktur,kridita,kdpoli){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Hapus',
            text: 'Hapus Tarif '+produk,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {


              let body ={"user":this.username,"netto":this.netto,
                "notransaksi":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":kdpoli,"qty":'1',"harga":harga,"debet":harga,
                "kridit":kridita,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'2'
              }

              
              this.authService.simpantrxrjtunjang(body)
              .subscribe(response => {
              
             
            
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
              
                  
                                   
setTimeout(() => {
  this.tmptrans()
}, 200);
              
                
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
            
            
            
            
            
              })

              // swalWithBootstrapButtons.fire(
              //   'Berhasil Hapus User',
              //   'User Telah Terhapus Dari Database.',
              //   'success'
              // );
      
      
           
      
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              // swalWithBootstrapButtons.fire(
              //   'Cancelled',
              //   'Your imaginary file is safe :)',
              //   'error'
              // );
            }
          });
          


        }

        qtyproduk(nomor,kdproduk,produk,notransaksi,harga,nofaktur){

          Swal.fire({
            title: 'Masukan Qty',
            input: 'number',
            customClass: {
              validationMessage: 'my-validation-message'
            },
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
              if (!value) {
                Swal.showValidationMessage(
                  
                  '<i class="fa fa-info-circle"></i> Qty Belum di isi'
                )
              }else{
              
      


                let body ={"user":this.username,
                  "notransaksi":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":this.kdpoli,"qty":value,"harga":harga,"debet":harga,
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'3'
                }
  
                
                this.authService.simpantrxrjtunjang(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
                
                 
                                   
setTimeout(() => {
  this.tmptrans()
}, 200);
                
                  
                   }else{
                    this.toastr.error('Simpan  Gagal', 'Eror');
                  
                   }
              
              
              
              
              
                })


           
                //   Swal.isLoading()
              
              
                // console.log(value)
              }
            }
          })

        }


        diskonproduk(){

          // if(this.totalrjsaja <= 0){
          //   this.toastr.error('Tidak bisa diskon karena sudah lunas', 'Eror');
                    
          // }else{
          //   Swal.fire({
          //     title: 'Masukan Presentase diskon %',
          //     input: 'number',
          //     customClass: {
          //       validationMessage: 'my-validation-message'
          //     },
          //     showLoaderOnConfirm: true,
          //     preConfirm: (value) => {
          //       if (!value) {
          //         Swal.showValidationMessage(
                    
          //           '<i class="fa fa-info-circle"></i> Qty Belum di isi'
          //         )
          //       }else{
                
        

          //         if(value > 100){
          //           this.toastr.error('Tidak Boleh lebih dari 100%', 'Eror');
                    
          //         }else{
          //           let body ={"user":this.username,
          //           "notransaksi":this.notransaksi,"kdproduk":'',"produk":'',"kdpoli":this.kdpoli,"qty":value,"harga":'',"debet":'',
          //           "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":this.nofaktur,
          //           "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":'',"stssimpan":'4'
          //         }
    
                  
          //         this.authService.simpantrxrjtunjang(body)
          //         .subscribe(response => {
                  
                 
                
          //           if(response ){
          //             this.toastr.success(''+response, 'Sukses', {
          //               timeOut: 2000,
          //             });
                  
                  
          //             this.tmptrans()
                  
                    
          //            }else{
          //             this.toastr.error('Simpan  Gagal', 'Eror');
                    
          //            }
                
                
                
                
                
          //         })
          //         }
              
  
          //       }
          //     }
          //   })
          // }
         

        }

produkdise:any;
tkomp:any;
totaljasakom:number;
totaldiscnom:number;
tmpkomp(a,b,c){
  this.authService.listkomponentrx(this.kdcabang,a,b,c)
  .subscribe(
    data => {
    
this.tkomp = data;

var xyz:number=0;
var xyzx:number=0;
for (let product of data )
{
  var y = parseInt(product.jasa)
  xyz += y;

  var x = parseInt(product.nominal)
  xyzx += x;
}

this.totaljasakom = xyz;
this.totaldiscnom = xyzx

  },
    Error => {
  
     console.log(Error)
    }
  )
}
        diskonprodukp(content,nomor,kdproduk,produk,notransaksi,harga,nofaktur){


          // console.log(content,nomor,kdproduk,produk,notransaksi,harga,nofaktur)

          this.tmpkomp(notransaksi,kdproduk,nomor)

          this.produkdise = produk

          
          this.modalService.open(content).result.then((result) => {


 
  
  
          }, (reason) => {
           
          });

        }
        kemasand:number;

        discpp(nomor,kdproduk,notrans,kdkomponen){
          console.log(nomor,kdproduk,notrans,kdkomponen)


          Swal.fire({
            title: 'Masukan Presentase diskon %',
            input: 'number',
            customClass: {
              validationMessage: 'my-validation-message'
            },
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
              if (!value) {
                Swal.showValidationMessage(
                  
                  '<i class="fa fa-info-circle"></i> Qty Belum di isi'
                )
              }else{
              
      

                if(value > 100){
                  this.toastr.error('Tidak Boleh dari  100%', 'Error');
                  
                }else{
                  let body ={"user":this.username,
                  "notransaksi":notrans,"kdproduk":kdproduk,"produk":'',"kdpoli":this.kdpoli,"qty":value,"harga":'',"debet":'',
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":this.nofaktur,"kdkomponen":kdkomponen,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'5'
                }
  
                
                this.authService.simpantrxrjtunjang(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });

                    this.tmpkomp(notrans,kdproduk,nomor)

                                  
setTimeout(() => {
  this.tmptrans()
}, 200);
                
                  
                   }else{
                    this.toastr.error('Simpan  Gagal', 'Eror');
                  
                   }
              
              
              
              
              
                })
                }
              

              }
            }
          })



        }
        tjenisbayar:any;
showbayarrjasa:boolean;
sisanumber:number=0
        bayartagihan(content){


       
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Bayar Tagihan',
            text: 'Bayar Tagihan Laborat',
    
            showCancelButton: true,
            confirmButtonText: 'Cancel',
            cancelButtonText: 'Rawat Jalan Saja',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {

              // this.toastr.error('Tidak Bisa Bayar ALL di kasir Laborat', '', {
              //       timeOut: 2000,
              //     });
           
              // swalWithBootstrapButtons.fire(
              //   'Berhasil Hapus User',
              //   'User Telah Terhapus Dari Database.',
              //   'success'
              // );

            
    // if(this.netto <= 0){
    //   this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar Rawat Jalan', '', {
    //     timeOut: 2000,
    //   });
    // }else{

    //   let body={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"totaltagihan":this.netto,"sudahdibayar":0,"sisa":this.netto}



    //   this.authService.simpantriger(body)
    //   .subscribe(response => {
      
      
      
    //   if(response ){
    //     this.toastr.success(''+response, 'Sukses', {
    //       timeOut: 2000,
    //     });
       
      
    //     this.authService.trigerbayar(this.kdcabang,this.notransaksi)
    //     .subscribe(
    //       data => {
    //   var s:number=0;
    //   var tottag:number=0;
    //         for(let x of data){
    //           var y = parseInt(x.totaltagihan)
    //           var xy = parseInt(x.sudahdibayar)
    //           s += y;
    //           tottag +=xy;
    //         }
      
      
      
    //         this.sisanumber = s - tottag;
      
           
      
    //       },
    //       Error => {
        
    //        console.log(Error)
    //       }
    //       )
      
          
      
    //     this.jumlahpasienx1=0
    //                 this.jumlahpasieni=0
    //                 this.yangmasuki=0;
    //                 this.keterangb=''
    //                 this.kurangbayar=0
      
      
    //                 this.showbayarrjasa = false;
    //                 this.authService.jenisbayar('1','')
    //                 .subscribe(
    //                   data => {
                      
    //               this.tjenisbayar = data;
                  
    //                 },
    //                   Error => {
                    
    //                    console.log(Error)
    //                   }
    //                 )
                  
    //                 this.modalService.open(content).result.then((result) => {
                  
                  
                  
                  
                  
    //                 }, (reason) => {
                     
    //                 });
      
    //    }else{
    //     // this.toastr.error('Simpan  Gagal', 'Eror');
      
    //    }
      
      
      
      
      
    //   })
    // }   







            
           
      
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {

              this.showbayarrjasa = true;

if(this.totalrjsaja <= 0){
  this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar Rawat Jalan', '', {
    timeOut: 2000,
  });
}else{

  this.authService.trigerbayar(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {


      if(data.length){
        this.toastr.error('Tidak bisa bayar rawat jalan karena sebelumnya sudah bayar all tagihan,hapus di all tagihan agar bisa bayar per kasir', 'Sukses', {
          timeOut: 2000,
        });
      }else{
        this.jumlahpasienx=0
        this.jumlahpasien=0
        this.yangmasuk=0;
        this.keterangb=''
        this.kurangbayar=0
        this.banklis=''
        this.authService.jenisbayar('1','')
        .subscribe(
          data => {
          
      this.tjenisbayar = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      
        this.modalService.open(content).result.then((result) => {
      
      
      
      
      
        }, (reason) => {
         
        });
      }
    


  },
    Error => {
  
     console.log(Error)
    }
  )

 


 
}
              

              

        
            }
          });
          
        }    
lstbank:any;
showlstbank:boolean;
produkbayar:any;

totaltagihansetalahdiskon:number=0;
kdshowbank:any;

        jbayar(a){
this.kdshowbank = a;

console.log(a)


this.authService.jenisbayar('2',a)
.subscribe(
  data => {
  
    for (let productx of data )
    {
      this.produkbayar= productx.bayar
this.kdprodukbayar = productx.kdakhir
    }

},
  Error => {

   console.log(Error)
  }
  )



          if(a === '2'){
            this.showlstbank = false

            this.jumlahpasien = this.totalrjsaja;
this.kembalian = 0
this.kurangbayar = 0
          }else{
            this.showlstbank = true
            this.jumlahpasien = 0
            this.kembalian = 0
            this.yangmasuk = 0
            this.jumlahpasienx = 0
            this.authService.listbank(this.kdcabang)
            .subscribe(
              data => {
              
          this.lstbank = data;
          
            },
              Error => {
            
               console.log(Error)
              }
            )
          }
      
        }
        kdprodukbayar:any;

        jbayariix(a){


          console.log(a)


          this.authService.jenisbayar('2',a)
          .subscribe(
            data => {
            
              for (let productx of data )
              {
                this.produkbayar= productx.bayar
          this.kdprodukbayar = productx.kdakhir
          
              }
          
          },
            Error => {
          
             console.log(Error)
            }
            )
          
          
          
                    if(a === '2'){
                      this.showlstbank = false
          
                      this.jumlahpasieni = this.sisanumber;
          this.kembaliani = 0
          this.kurangbayari =0;
                    }else{
                      this.showlstbank = true
                      this.jumlahpasieni = 0
                      this.kembaliani = 0
                      this.authService.listbank(this.kdcabang)
                      .subscribe(
                        data => {
                        
                    this.lstbank = data;
                    
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
                    }


        }
        jbayari='';
        yangmasuk:number=0;
        yangmasuki:number=0;
        banklis='';
        keterangb='';
        jumlahpasien:number=0;
        jumlahpasieni:number=0;
        jumlahpasienx:number=0;
        jumlahpasienx1:number=0;
        kembalian:number=0;
        kembaliani:number=0;
        jmlu(a){
          console.log(a)
         
          this.kurangbayar = this.totalrjsaja - a.target.value
        
          if(this.kurangbayar < 0){

// this.toastr.error('Nominal Yang Ada masukan melibihi jumlah tagihan', 'Eror');
// this.kurangbayar = 0;
// this.jumlahpasien=0;
// this.yangmasuk = 0;
// this.jumlahpasienx = 0;
// this.kembalian = 0
this.yangmasuk = this.totalrjsaja
this.kembalian = a.target.value - this.totalrjsaja

this.jumlahpasien= this.totalrjsaja
this.kurangbayar = 0

          }else{
            this.yangmasuk = a.target.value
            this.kembalian = a.target.value - this.totalrjsaja
            if(this.kembalian < 0){
              this.kembalian = 0
            }

            this.jumlahpasien=a.target.value
          }


        }
        jmlui(a){
          console.log(a)
          this.kembaliani = a.target.value - this.netto
        }

        bayartagihanakhir(){


          if(this.jbayari === 'x'){
            this.toastr.error('Simpan  gagal pilih jenis bayar', 'Eror');
          }else{

          
let body={"user":this.username,"kdprodukbayar":this.kdprodukbayar,"nofaktur":this.nofaktur,
  "produkbayar":this.produkbayar,"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayar,"totalrjsajaasli":this.totalrjsajaasli,
  "jbayari":this.jbayari,"yangmasuk":this.yangmasuk,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasien,
  "kembalian":this.kembalian,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'1',
  "tgldari":this.tgldari
}

console.log(body)

this.authService.simpanbayart(body)
.subscribe(response => {



  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });
                      
    setTimeout(() => {
      this.tmptrans()
    }, 200);


    this.modalService.dismissAll()
  
  
   }else{
    this.toastr.error('Simpan  Gagal', 'Eror');
  
   }





})

          }
        }



        jbayarii='';
        pembulatanrj:number=0;
        
        bayartagihanakhirall(){


          if(this.jbayarii === ''){
            this.toastr.error('Simpan  gagal pilih jenis bayar', 'Eror');
          }else{

          
let body={"user":this.username,"kdprodukbayar":this.kdprodukbayar,"netto":this.netto,
  "produkbayar":this.produkbayar,"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'2'
, "bulat":this.pembulatanrj
}



this.authService.simpanbayar(body)
.subscribe(response => {



  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });
                      
    setTimeout(() => {
      this.tmptrans()
    }, 200);


    this.modalService.dismissAll()
  
  
   }else{
    this.toastr.error('Simpan  Gagal', 'Eror');
  
   }





})

          }
        }

kurangbayar:number=0;
kurangbayari:number=0;

        jmlym(a){

          
          this.jumlahpasien=a.target.value
          this.kurangbayar = this.totalrjsaja - a.target.value
          if(this.kurangbayar < 0){
alert('Nominal Yang Ada masukan melibihi jumlah tagihan')
this.kurangbayar = 0;
this.jumlahpasien=0;
this.yangmasuk = 0;

          }else{

          }

        }


        jmlymi(a){

          
          this.jumlahpasieni=a.target.value
          this.kurangbayari = this.sisanumber - a.target.value
          if(this.kurangbayari < 0){
alert('Nominal Yang Ada masukan melibihi jumlah tagihan')
this.kurangbayari = 0;
this.jumlahpasieni=0;
this.yangmasuki = 0;

          }else{

          }

        }


        jmlymx(a){
          this.kurangbayar=this.totalrjsaja - a.target.value

          if(this.kurangbayar < 0){
            alert('Nominal Yang Ada masukan melibihi jumlah tagihan')
            this.kurangbayar = 0;
            this.jumlahpasien=0;
       
            
                      }else{
            
                      }


        }



        jmlymxi(a){
          this.kurangbayari=this.sisanumber - a.target.value

          if(this.kurangbayari < 0){
            alert('Nominal Yang Ada masukan melibihi jumlah tagihan')
            this.kurangbayari = 0;
            this.jumlahpasien=0;
       
            
                      }else{
            
                      }


        }

        cproduk(a){
          this.authService.lst(this.kdcabang,this.notransaksi,a.target.value,'1')
          .subscribe(
            data => {
        
        
          this.ttransaksi = data;
        },
        Error => {
        
         console.log(Error)
        }
        )
  
        }
        transaksitx(){
          this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu di Kasir Rj', 'Eror');
       
        }

        transaksit(a,b){
console.log(a);



          if(a === 'KR'){




            if(b === '1'){
   this.toastr.error('Transaksi Sudah Di proses tidak bisa di batal', 'Eror');
       
       
            }else{
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              });
          
              swalWithBootstrapButtons.fire({
                title: 'Batal Transaksi',
                text: 'Yakin Akan Batal Transaksi',
             
                showCancelButton: true,
                confirmButtonText: 'Batal Transaksi',
                cancelButtonText: 'Batal Pop Up',
                reverseButtons: true
              }).then((result) => {
                if (result.value) {
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,"tgldari":this.tgldari,"bulat":0,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                }
                
                
                
                this.authService.simpanbayar(body)
                .subscribe(response => {
                
                
                
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
                              
setTimeout(() => {
  this.tmptrans()
}, 200);
                
                
                    this.modalService.dismissAll()
                  
                  
                   }else{
                    this.toastr.error('Simpan  Gagal', 'Eror');
                  
                   }
                
                
                
                
                
                })
        
        
                  swalWithBootstrapButtons.fire(
                    'Berhasil Batal ',
                    'Batal Telah Berhasil.',
                    'success'
                  );
          
          
          
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  // swalWithBootstrapButtons.fire(
                  //   'Cancelled',
                  //   'Your imaginary file is safe :)',
                  //   'error'
                  // );
                }
              });
            }


         
          
          }else{
            this.toastr.error('Batal Transaksi klik angka pada pembayaran', 'Eror');
                
          }
      

       
        }
    
        tglpp: Date = new Date();
      
        // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

        cetakinvoice(){
          var redirectWindow = window.open(this.URLINVOICE+'/report/invoicealllab.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username, '_blank','location=no,toolbar=no,height=570,width=520,scrollbars=yes,status=yes');
          redirectWindow.location;
       }

       cetakikwitansi(){
        var redirectWindow = window.open(this.URLINVOICE+'/report/kwitansilab.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
        redirectWindow.location;
     }

     lihathasilfix(){
      var redirectWindow = window.open(this.URLINVOICE+'/report/hasilrad.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&kdproduk='+this.kdprod, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;
   }

   cetakhasil(){
    var redirectWindow = window.open(this.URLINVOICE+'/report/hasilradprint.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&kdproduk='+this.kdprod, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
    redirectWindow.location;
 }



     klihats(){
      var redirectWindow = window.open(this.URLINVOICE+'/report/pendapatanrj.php?kdcabang='+this.kdcabang+'&username='+this.username+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;
     }
     klihatsx(){
      var redirectWindow = window.open(this.URLINVOICE+'/report/pendapatanrjuser.php?kdcabang='+this.kdcabang+'&username='+this.username+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;

    

     }

     klihatsxx(){
   

      var redirectWindow = window.open(this.URLINVOICE+'/report/rekaptransfer.php?kdcabang='+this.kdcabang+'&username='+this.username+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;

     }



     tmpusers:any;
     usercetak='';

     showuser:boolean;
     kpendapatan(content,a) {
      if(a === '1'){
        this.showuser = false;
      }else if(a === '2'){
        this.showuser = true;
      }


      this.authService.poli(this.kdcabang)
      .subscribe(
        data => {
        
  this.tklinik = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )


      this.authService.tampiluser(this.kdcabang)
      .subscribe(
        data => {
        
  this.tmpusers = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )



      this.modalService.open(content, {
       
      });
    }


    tklinik:any;
    kliniks:'';
    tfarmasi:any;
    tfarmasia:any;
    cprodukobat(a){
      this.authService.listtrxfarrj(this.kdcabang,this.notransaksi,'2',a.target.value)
      .subscribe(
        data => {
        
  this.tfarmasi = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      ) 
    }
    totaltagihanfar:number;
    terbayarfar:number;
    discallafar:number;

adminresep:number;
  tuslah:number;
 pembulatan:number;
  //   lihatfarmasi(){
  //     this.authService.listtrxfarrj(this.kdcabang,this.notransaksi,'1','')
  //     .subscribe(
  //       data => {
        
  // this.tfarmasi = data;
  
  
  //     },
  //       Error => {
      
  //        console.log(Error)
  //       }
  //     )

  //     this.authService.listtrxfarrja(this.kdcabang,this.notransaksi)
  //     .subscribe(
  //       data => {
        

  //         var totaltagihanfar:number=0;
  //         var terbayarfar:number=0;
  //         var discallafar:number=0;

  //         var adminresep:number=0;
  //         var tuslah:number=0;
  //         var pembulatan:number=0;
  //               for(let x of data){
  //                 var a = parseInt(x.totalbayar)
  //                 var b = parseInt(x.sudahbayar)
  //                 var c = parseInt(x.totaldisc)

  //                 var d = parseInt(x.adminresep)
  //                 var e = parseInt(x.tuslah)
  //                 var f = parseInt(x.pembulatan)

  //                 totaltagihanfar += a;
  //                 terbayarfar += b;
  //                 discallafar += c;
  //                 adminresep += d;
  //                 tuslah += e;
  //                 pembulatan +=f;
  //               }
      
  //               this.totaltagihanfar = totaltagihanfar
  //               this.terbayarfar = terbayarfar
  //               this.discallafar = discallafar
            
  //               this.adminresep = adminresep
  //               this.tuslah = tuslah
  //               this.pembulatan =pembulatan

  
  
  //     },
  //       Error => {
      
  //        console.log(Error)
  //       }
  //     )


     



  //   }

    politunjang:any;
    doktunjang:any;

    tpolitunjang:any;
    tdoktunjang:any;
    tlistrujuk:any;

 klikrujuktunjang(){
  this.authService.poli(this.kdcabang)
  .subscribe(
    data => {
    
this.tpolitunjang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )


  this.authService.dokter(this.kdcabang)
  .subscribe(
    data => {
    
this.tdoktunjang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.listdaftartunjang(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {
    
this.tlistrujuk = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

 }


 bataltunjang(){
  this.politunjang =''
  this.doktunjang=''
 }

 simpan(){
   let body={"stssimpan":'1',"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kdkostumerd":this.kdkostumerd,"norm":this.norm,"kdpoli":this.politunjang,"kddokter":this.doktunjang,"kddokterkirim":this.kddokter,
  "nofaktur":this.notransaksi,"kduser":this.username}

 
  this.authService.simpandaftarrjrujuk(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  
      this.authService.listdaftartunjang(this.kdcabang,this.notransaksi)
      .subscribe(
        data => {
        
    this.tlistrujuk = data;
    
    
      },
        Error => {
      
         console.log(Error)
        }
      )
     
    this.bataltunjang()
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


 }
showsimpan:boolean=false;

 lihathasil(){
  this.authService.hasilradiologi(this.kdcabang,this.notransaksi,this.kdprod)
  .subscribe(
    data => {
    
// this.thasillab = data;


if(data.length){
  for (let x of data )
  {
  
  
  
    this.htmlContent = x.hasil
    this.showsimpan = false;  
  }
  
}else{
  this.htmlContent=''
  this.showsimpan = true;
}


  },
    Error => {
  
     console.log(Error)
    }
  )
 }
 checkedItems:any;
keteranganakhir:string='-';
showloading:boolean;

 hasilalb(){

this.showloading= true
  setTimeout(() => {
    let body = {"status":'1',
      "notrans":this.notransaksi,"norm":this.norm,"kdproduk":this.kdprod,"klinis":this.keteranganakhir,"kdcabang":this.kdcabang,"stssimpan":'1',"hasil":this.htmlContent}
  
  

      console.log(body)
  
    this.authService.simpanhasilrad(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
        this.showloading= false


        
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
  
  }, 1000);


 
 }


 
 hasilalbx(){

  this.showloading= true
    setTimeout(() => {
      let body = {
        "notrans":this.notransaksi,"norm":this.norm,"kdproduk":this.kdprod,"klinis":this.keteranganakhir,"kdcabang":this.kdcabang,"stssimpan":'2',"hasil":this.htmlContent}
    
    
  
        console.log(body)
    
      this.authService.simpanhasilrad(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
          this.showloading= false
  
  
          
         
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
      
      
      
      
      
      })
    
    }, 1000);
  
  
   
   }


 cariteslab(a){
  this.authService.teslab(this.kdcabang,this.jenistc,a.target.value,'1')
.subscribe(
  data => {
  
this.tlisttes = data;


},
  Error => {

   console.log(Error)
  }
)
}

// pilihteshapus(kdlab,kdproduk)
// {

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
//   });

//   swalWithBootstrapButtons.fire({
//     title: 'Maping',
//     text: 'Yakin Akan Maping Produk ini',
 
//     showCancelButton: true,
//     confirmButtonText: 'Hapus',
//     cancelButtonText: 'Batal',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.value) {



//       let body={"kdproduk":kdproduk,"kdtes":kdlab,"kdcabang":this.kdcabang,"stssimpan":'2'
//     }
    

//     console.log(body)
    
    
//     this.authService.simpanmaping(body)
//     .subscribe(response => {
    
    
    
//       if(response ){
//         this.toastr.success(''+response, 'Sukses', {
//           timeOut: 2000,
//         });

//         this.lihathasil()
//         this.authService.mapinglab(this.kdcabang,this.kdprod)
//   .subscribe(
//     data => {
    
// this.tlistmaping = data;


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
      
//        }else{
//         this.toastr.error('Simpan  Gagal', 'Eror');
      
//        }
    
    
    
    
    
//     })


//       swalWithBootstrapButtons.fire(
//         'Berhasil Batal ',
//         'Batal Telah Berhasil.',
//         'success'
//       );




//     } else if (
//       /* Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
     
//     }
//   });
// }
// pilihtes(kdlab){

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
//   });

//   swalWithBootstrapButtons.fire({
//     title: 'Maping',
//     text: 'Yakin Akan Maping Produk ini',
 
//     showCancelButton: true,
//     confirmButtonText: 'Maping',
//     cancelButtonText: 'Batal',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.value) {



//       let body={"kdproduk":this.kdprod,"kdtes":kdlab,"kdcabang":this.kdcabang,"stssimpan":'1'
//     }
    
    
    
//     this.authService.simpanmaping(body)
//     .subscribe(response => {
    
    
    
//       if(response ){
//         this.toastr.success(''+response, 'Sukses', {
//           timeOut: 2000,
//         });
//         this.authService.mapinglab(this.kdcabang,this.kdprod)
//   .subscribe(
//     data => {
    
// this.tlistmaping = data;


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
      
//        }else{
//         this.toastr.error('Simpan  Gagal', 'Eror');
      
//        }
    
    
    
    
    
//     })


//       swalWithBootstrapButtons.fire(
//         'Berhasil Batal ',
//         'Batal Telah Berhasil.',
//         'success'
//       );




//     } else if (
//       /* Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire(
//         'Cancelled',
//         'Your imaginary file is safe :)',
//         'error'
//       );
//     }
//   });
// }

ktglrad(){
console.log(this.tglp)
this.authService.pasienantrian(this.kdcabang,'9','','',this.tglp)
    .subscribe(
      data => {
      
this.tpasien = data;
this.totalpasien = data.length
    },
      Error => {
    
       console.log(Error)
      }
    )
    
}
drradd:any;
profileFormx = this.fb.group({
  drradd: ['',Validators.required]




});
shotombol:boolean= true;
shotombolx:boolean;

tkk:any;
shotombolxl:boolean;
pilihdokxx(kddokter,namdokter){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Ganti Dokter',
    text: 'Ganti Dokter ',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ganti',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {

  

      let body ={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kddokter":kddokter
    }

    
    this.authService.gantidokterrj(body)
    .subscribe(response => {
    
   
  
      if(response){
        this.toastr.success('', 'Sukses', {
          timeOut: 2000,
        });
    

        this.kddokter = kddokter;
        this.namdokter = namdokter;
        

      
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
opendokx(content){


  this.authService.dokter(this.kdcabang)
  .subscribe(
    data => {
    this.tdokx = data;


  },
    Error => {
  
     console.log(Error)
    }
  )




  this.modalService.open(content, {
   
  });
}

verifpermintaanx(){
   

  // this.shotombol= false;
  // this.shotombolx = true;
  
  let body={"kdklinik":this.kdklinik,"nofaktur":this.nofaktur,"kduser":this.username,"norm":this.norm,
  "kdpoli":this.kdpoli,"kddokter":this.drradd,"kddokterkirim":this.kddokterpengirim,"kdkostumerd":this.kdkostumerd,
  "kdcabang":this.kdcabang,"stssimpan":'1',"kdcppt":this.kdcppt
      }
    


          this.authService.verifpermintaan(body)
    .subscribe(response => {
    
    
    
      if(response){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
        this.notransaksi = response;
        
    
        setTimeout(() => {
 
          

          this.authService.selesaiverif(this.kdcabang,response,'2')
          .subscribe(
            data => {

              if(data.length){
                this.tkk = data;
                // this.shotombolx = true;
                this.shotombol= false;
  
  
                // this.shotombolxl = true
  
                this.statusverif = false;

              }else{

              }
            
     
          },
            Error => {
          
             console.log(Error)
            }
          )

       
        }, 200);

        setTimeout(() => {
          this.tmptrans()
       this.lihathasil()
      
       }, 1000);

      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })



  


}

batalpriksa(){
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
"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,"norm":this.norm,
"kddokter":this.kddokter,"kdpoli":this.kdpoli,"kduser":this.username,"stssimpan":'2'
}



this.authService.hapustrx(body)
.subscribe(response => {



if(response ){
this.toastr.success(''+response, '-', {
timeOut: 2000,
});


this.showdata = false;




}else{
this.toastr.error('Simpan  Gagal', 'Eror');

}





})




     




    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      // swalWithBootstrapButtons.fire(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // );
    }
  });
 }

 bayartransfer(content){

  this.authService.trigerbayar(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {


      if(data.length){
        this.toastr.error('Tidak bisa bayar rawat jalan karena sebelumnya sudah bayar all tagihan,hapus di all tagihan agar bisa bayar per kasir', 'Sukses', {
          timeOut: 2000,
        });
      }else{
    
      
        this.modalService.open(content).result.then((result) => {
      
      
      
      
      
        }, (reason) => {
         
        });
      }
    


  },
    Error => {
  
     console.log(Error)
    }
  )




}


kliktransfer(){



  if(this.totalrjsaja <= 0){
    this.toastr.error('Sudah Di Transfer', 'Eror');
    return
  }
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Transfer Tagihan',
      text: 'Transfer Tagihan Ke Rawat Inap ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Transfer',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
  
  
    
  
        let body ={"user":this.username,
          "notrans":this.notransaksi,"notransri":this.notransaksiri,"kdtf":'8',"nmtf":'Transfer Radiologi',"kdpoli":this.kdpoli,"qty":'1',"harga":this.totalrjsaja,"debet":0,
          "kridit":this.totalrjsaja,"jenistransaksi":'KR',"tarifasli":this.totalrjsaja,"disc":0,"nofaktur":this.nofaktur,
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2',"kdkostumerd":this.kdkostumerd,"norm":this.norm
        }
  
        
        this.authService.s_transferpenunjang(body)
        .subscribe(response => {
        
       
      
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        
                            
  setTimeout(() => {
  this.tmptrans()
  }, 200);
  
  
  
  
  
  this.modalService.dismissAll()
        
          
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
