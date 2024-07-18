import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import { SampleService } from 'src/app/services';
import { mtariflihatComponent } from '../mtariflihat/mtariflihat.component';




@Component({
  selector: 'app-rkasirri',
  templateUrl: './rkasirri.component.html',
  styles: [
   
  ],
  providers: [
    DatePipe,

  ],
})
export class rkasirriComponent implements OnInit {
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

tglp : any;
currentJustify = 'start';
currentJustify2 = 'center';
currentJustify3 = 'start';
tgldari = '2013-12-12'
currentOrientation = 'horizontal';
myDate = new Date();
hostName: string;
URLINVOICE:string
statuscari:string='tanggal';

  constructor(public hots:SampleService,private router: Router,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

  }
  profileForm = this.fb.group({
    politunjangx: ['',Validators.required],
    doktunjangx: ['',Validators.required],
    dokter: ['',Validators.required]
    
    
  });

  // URLINVOICE='https://'+this.hostName+'/'
  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';

  }

  ttarif:any;
ststarif:any;

tmptarif(){
  this.authService.listtarif(this.kdcabang,this.ststarif,'',this.kdtarif)
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
ktglrad(){
  this.authService.t_rwtlistpasienri(this.kdcabang,'',this.tglp)
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


  openLarge(content) {
    
    this.authService.t_rwtlistpasienri(this.kdcabang,'',this.tglp)
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

  openLargex(content) {




    if(this.igdorrj === "igd"){
      this.ststarif='IGD'
    }else{
      this.ststarif='RJ'

    }



    setTimeout(() => {
      this.tmptarif()

    }, 200);
    this.modalService.open(content, {
      size: 'lg'
    });
  }
 
  caripas:'5';
  onChange(a){
    this.caripas = a;

 

  }

  onChangestscari(a){
    this.statuscari = a
    this.authService.pasienantrianppoli(this.kdcabang,this.caripas,'',this.tglp,this.statuscari)
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
  caripass(a){


    this.authService.t_rwtlistpasienri(this.kdcabang,a.target.value,this.tglp)
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
namruang:'';
namdokter:''
namacus:''
costumer:''
costumercob:'';

alamat:''
kdtarif:''
showdata:boolean;
kelas:string;
igdorrj:any;
kdruang:any;




  pilihpasien(notransaksi,norm,kdspesial,kdklas,tglmasuk,
  jammasuk,kdkamar,kddokter,kdkostumer,kdkostumercob,caramasuk,penerimaan,
    keterangan,pj,pjnama,pjhp,pjalamat,namasps,nmkamar,namdokter,
    nmkostumer,kostumercob,pasien,hp,nopengenal,statusjenguk,alamat,namakelas,kdtarif){
          this.showdata = true;

this.notransaksi=  notransaksi;
this.tglpriksa =  tglmasuk;
this.norm = norm;
this.pasien = pasien;
this.alamat = alamat;
this.costumer = nmkostumer;
this.costumercob = kostumercob;
this.namdokter = namdokter;
this.namruang = nmkamar;
this.kelas = namakelas;
this.kdtarif = kdtarif
this.kddokter = kddokter
this.kdruang = kdkamar;
this.kdkostumerd = kdkostumer;


          
         

          setTimeout(() => {
            this.tmptrans()

            this.lihatotfar()
            this.lihatotrj()


            this.modalService.dismissAll()
          }, 100);



       



        
       
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
pembulatanrj:number=0;

tmptrans(){
  


  this.authService.listtrxri(this.kdcabang,this.notransaksi,this.namatrx)
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
this.nettosudahmasuk = bayar;


this.totaltagihan = xyz;
this.totaldisc = totaldisc;

this.ttransaksi = data;



setTimeout(() => {

  totalblm = xyz - bayar

 
  this.netto = totalblm + 0;



  let num = this.netto;
  let text = num.toString()

  var angka = text.substr(-3);
var angka1 = parseInt(angka);



var akhir:number;

if(angka1 <= 0){
  this.pembulatanrj = 0
}else{
  if(angka1 < 499){
    akhir = this.netto - angka1;
    }else{
    akhir = this.netto + (1000 - angka1);
    
    }
    this.pembulatanrj = this.netto-akhir;
this.netto = akhir;

}






}, 150);



if(data.length){

 

  // if(this.totalbayar <= 0 ){

    
  //   this.showtomboltarif = true;

  // }else{

  //   this.showtomboltarif = false;

  // }
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








}
plafonbpjsaman:number;
plafonbpjmedekati:number;

caritarif(a){
  this.authService.listtarif(this.kdcabang,this.ststarif,a.target.value,this.kdtarif)
  .subscribe(
    data => {
    
this.ttarif = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}

pilihperawat(kdperawat,namdokter){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Tambah Jasa Perawat',
    text: 'Menambah Jasa Perawat Ke '+namdokter,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      let body ={"user":this.username,
      "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdruang,"qty":'1',"harga":this.hargaigd,"debet":this.hargaigd,
      "kridit":0,"jenistransaksi":'DB',"tarifasli":this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',kdperawat:kdperawat,"ri":'1'
    }

      
      this.authService.simpantrxri(body)
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
      // swalWithBootstrapButtons.fire(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // );
    }
  });

}
pilihdokter(kddokter,namdokter){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Tambah Jasa Dokter',
    text: 'Menambah Jasa Dokter Ke '+namdokter,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



        let body ={"user":this.username,
        "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdruang,"qty":'1',"harga":  this.hargaigd,"debet":  this.hargaigd,
        "kridit":0,"jenistransaksi":'DB',"tarifasli":  this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":kddokter,"stssimpan":'1',kdperawat:'0',"ri":'1'
      }

      
      this.authService.simpantrxri(body)
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
      // swalWithBootstrapButtons.fire(
      //   'Cancelled',
      //   'Your imaginary file is safe :)',
      //   'error'
      // );
    }
  });
}
kdtarifigd:any;
namaigd:any;
hargaigd:any;
tdokter:any;
tperawat:any;

        tambahtarif(kdtarif,nama,harga,contentdokter,contentperawat){
              
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







                  // if(this.igdorrj === 'igd'){
                  //   this.kdtarifigd = kdtarif;
                  //   this.namaigd = nama;
                  //   this.hargaigd = harga;


                  //   this.authService.dokter(this.kdcabang)
                  //   .subscribe(
                  //     data => {
                     
                        
                  //       if(data.length){

                  //         this.tdokter = data;
                  //         this.modalService.open(contentdokter, {
                  //           size: 'lg'
                  //         });
                  //       }else{

                  //       }

                  
                    
                  //   },
                  //     Error => {
                    
                  //      console.log(Error)
                  //     }
                  //   )
                    



                 
                    
                    
                  // }else{


                    this.authService.listkomponendokter(this.kdcabang,kdtarif)
                    .subscribe(
                      data => {
                      
                        if(data.length){
                          this.kdtarifigd = kdtarif;
                          this.namaigd = nama;
                          this.hargaigd = harga;


                            this.authService.dokter(this.kdcabang)
                    .subscribe(
                      data => {
                     
                        
                        if(data.length){

                          this.tdokter = data;
                          this.modalService.open(contentdokter, {
                            size: 'lg'
                          });
                        }else{

                        }

                  
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )
                    



                      //     this.authService.perawat(this.kdcabang)
                      //     .subscribe(
                      //       data => {
                            
                        
                      // if(data.length){

                      //   this.tperawat = data;
                      //   this.modalService.open(contentperawat, {
                      //     size: 'lg'
                      //   });
                      // }else{
                        
                      // }
                        
                          
                      //     },
                      //       Error => {
                          
                      //        console.log(Error)
                      //       }
                      //     )

                        }else{

   let body ={"user":this.username,
                    "notransaksi":this.notransaksi,"kdproduk":kdtarif,"produk":nama,"kdpoli":this.kdruang,"qty":'1',"harga":harga,"debet":harga,
                    "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":this.notransaksi,
                    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',"kdperawat":'0',"ri":'1'
                  }

                  
                  this.authService.simpantrxri(body)
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






                        }
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )













                  // }


                

                
          
               
          
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
        batalbayarfar(){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Batal Bayar ',
            text: 'Batal Bayar Obat' ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Batal Bayar ',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {



          let body ={"user":this.username,"netto":this.netto,
          "notransaksi":this.notransaksi,"kdproduk":'.',"produk":'.',"kdpoli":this.kdruang,"qty":'1',"harga":0,"debet":0,
          "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"disc":0,"nofaktur":this.notransaksi,
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":1000,"stssimpan":'6',"ri":'1'
        }

        
        this.authService.simpantrxri(body)
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

        hapusproduk(nomor,kdproduk,produk,notransaksi,harga,nofaktur,kridita,kdpoli,debeta){

          if(kdproduk >= 5 && kdproduk <= 9){

            this.toastr.error('Hapus Melalui Kasir Terkait', 'Eror');
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
                "notrans":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":this.kdruang,"qty":'1',"harga":harga,
                "kridit":kridita,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'2',"ri":'1',"norm":this.norm,
                "kdkamar":this.kdruang,"kdkostumerd":this.kdkostumerd,"nomum":harga,"debet":debeta
              }

          

         
              
              this.authService.s_bayarri(body)
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
                  "notransaksi":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":this.kdruang,"qty":value,"harga":harga,"debet":harga,
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'3',"ri":'1'
                }
  
                
                this.authService.simpantrxri(body)
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

          // if(this.totalrjsaja <= 0 ){
          //   this.toastr.error('Tidak bisa diskon karena sudah terbayar', 'Eror');
                    
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
          //           this.toastr.error('Tidak Boleh 100%', 'Eror');
                    
          //         }else{
          //           let body ={"user":this.username,
          //           "notransaksi":this.notransaksi,"kdproduk":'',"produk":'',"kdpoli":this.kdpoli,"qty":value,"harga":'',"debet":'',
          //           "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":this.notransaksi,
          //           "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":'',"stssimpan":'4'
          //         }
    
                  
          //         this.authService.simpantrxrj(body)
          //         .subscribe(response => {
                  
                 
                
          //           if(response ){
          //             this.toastr.success(''+response, 'Sukses', {
          //               timeOut: 2000,
          //             });
                  
          //            setTimeout(() => {
          //             this.tmptrans()
          //            }, 200);
                 
                  
                    
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

          if(kdproduk >= 5 && kdproduk <= 9){

            this.toastr.error('Tidak Bisa diskon karena sudah di transfer', 'Eror');
            return
          }

       
          this.tmpkomp(notransaksi,kdproduk,nomor)

          this.produkdise = produk

          
          this.modalService.open(content).result.then((result) => {


 
  
  
          }, (reason) => {
           
          });

        }
        kemasand:number;

        discpp(nomor,kdproduk,notrans,kdkomponen,nofaktur){
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
                  this.toastr.error('Tidak Boleh 100%', 'Eror');
                  
                }else{
                  let body ={"user":this.username,
                  "notransaksi":notrans,"kdproduk":kdproduk,"produk":'',"kdpoli":this.kdruang,"qty":value,"harga":'',"debet":'',
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":nofaktur,"kdkomponen":kdkomponen,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'5',"ri":'1'
                }
  
                
                this.authService.simpantrxri(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });

setTimeout(() => {
  this.tmpkomp(notrans,kdproduk,nomor)

              
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

          this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')



    if(this.netto <= 0){
      this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar', '', {
        timeOut: 2000,
      });
    }else{



      this.sisanumber = this.netto;
         this.jumlahpasienx1=0
                    this.jumlahpasieni=0
                    this.yangmasuki=0;
                    this.keterangb=''
                    this.kurangbayar=0
                    this.jumlahpasienxi =0
      
      
                    this.showbayarrjasa = false;
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
      // let body={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"totaltagihan":this.netto,"sudahdibayar":0,"sisa":this.netto}



      // this.authService.simpantriger(body)
      // .subscribe(response => {
      
      
      
      // if(response ){
      //   this.toastr.success(''+response, 'Sukses', {
      //     timeOut: 2000,
      //   });
       
      // setTimeout(() => {
      //   this.authService.trigerbayar(this.kdcabang,this.notransaksi)
      //   .subscribe(
      //     data => {
      // var s:number=0;
      // var tottag:number=0;
      //       for(let x of data){
      //         var y = parseInt(x.totaltagihan)
      //         var xy = parseInt(x.sudahdibayar)
      //         s += y;
      //         tottag +=xy;
      //       }
      
      
      
      //       this.sisanumber = s;
      
           
      
      //     },
      //     Error => {
        
      //      console.log(Error)
      //     }
      //     )
      
          
      
      //   this.jumlahpasienx1=0
      //               this.jumlahpasieni=0
      //               this.yangmasuki=0;
      //               this.keterangb=''
      //               this.kurangbayar=0
      //               this.jumlahpasienxi =0
      
      
      //               this.showbayarrjasa = false;
      //               this.authService.jenisbayar('1','')
      //               .subscribe(
      //                 data => {
                      
      //             this.tjenisbayar = data;
                  
      //               },
      //                 Error => {
                    
      //                  console.log(Error)
      //                 }
      //               )
                  
      //               this.modalService.open(content).result.then((result) => {
                  
                  
                  
                  
                  
      //               }, (reason) => {
                     
      //               });
      // }, 200);
     
      
      //  }else{
      //   // this.toastr.error('Simpan  Gagal', 'Eror');
      
      //  }
      
      
      
      
      
      // })
    }   








          
        }    
lstbank:any;
showlstbank:boolean;
produkbayar:any;

totaltagihansetalahdiskon:number=0;

        jbayar(a){
          
console.log(a)

this.kdshowbank = a;

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
this.yangmasuk = 0
this.jumlahpasienx = 0
this.kurangbayar = 0;

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
kdshowbank:any;
jumlahpasienxishow:boolean;

        jbayariix(a){
this.kdshowbank = a;


          console.log(a)

          if(a === '2'){
            this.jumlahpasienxishow = false;


          }else{
this.jumlahpasienxishow = true;
            

          }


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
                      // this.jumlahpasieni = 0
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
        
          // this.yangmasuk = a.target.value
       
          this.kurangbayar = this.totalrjsaja - a.target.value
          if(this.kurangbayar < 0){

this.kembalian = a.target.value - this.totalrjsaja
this.yangmasuk = this.totalrjsaja
this.jumlahpasien=this.totalrjsaja
this.kurangbayar = 0;

console.log('as')

          }else{
            this.kembalian = a.target.value - this.totalrjsaja
            if(this.kembalian < 0){
              this.kembalian = 0
            }


            this.yangmasuk = a.target.value;
            this.jumlahpasien=a.target.value

            
          
          }


          
        }
        jmlui(a){
        
          this.kurangbayari = this.sisanumber - a.target.value

          if(this.kurangbayari < 0){
         
            // this.toastr.error('Nominal Yang Ada masukan melibihi jumlah tagihan', 'Eror');
  
            // this.kurangbayari = 0;
            // this.jumlahpasieni=0;
            // this.yangmasuki = 0;
            // this.kembaliani = 0
            // this.jumlahpasienxi = 0
            this.yangmasuki = this.sisanumber
            this.jumlahpasieni=this.sisanumber
            this.kembaliani = a.target.value - this.sisanumber
            console.log('asx')
            
                    }else{


                      
                      this.kembaliani = a.target.value - this.netto

                      if(this.kembaliani < 0){
                        this.kembaliani = 0
                      }

                      this.yangmasuki = a.target.value;
                      this.jumlahpasieni=a.target.value
                  
                    }


        }




        bayartagihanakhir(){


          if(this.jbayari === 'x'){
            this.toastr.error('Simpan  gagal pilih jenis bayar', 'Eror');
          }else{

          
let body={"user":this.username,"kdprodukbayar":this.kdprodukbayar,
  "produkbayar":this.produkbayar,"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayar,"totalrjsajaasli":this.totalrjsajaasli,
  "jbayari":this.jbayari,"yangmasuk":this.yangmasuk,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasien,"tgldari":this.tgldari,
  "kembalian":this.kembalian,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'1'
,  "bulat":this.pembulatanrj
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



        jbayarii='';
        bayartagihanakhirall(){
console.log(this.jbayarii)

          if(this.jbayarii === ''){

            this.toastr.error('Simpan  gagal pilih jenis bayar', 'Eror');
          return
          }



          let body={
            


"user":this.username,"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kdprodukbayar":this.kdprodukbayar,"kdjenisbayar":this.jbayarii,"tgldari":this.tgldari,
"norm":this.norm,"kdkamar":this.kdruang,"jumlahpasien":this.yangmasuki,"stssimpan":'1',"banklis":this.banklis,"kdkostumerd":this.kdkostumerd,"produkbayar":this.produkbayar,
"sisanumber":this.sisanumber,"totaltagihan":this.totaltagihan ,"sudahmasuk":this.nettosudahmasuk    

}


        


this.authService.s_bayarri(body)
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


        batalpulang(){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Pasien Batal Pulang',
            text: 'Yakin Akan batal Pulangkan Pasien',
         
            showCancelButton: true,
            confirmButtonText: 'Batal Pulang',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
          let body={
            


            "user":this.username,"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kdprodukbayar":this.kdprodukbayar,"kdjenisbayar":this.jbayarii,"tgldari":this.tgldari,
            "norm":this.norm,"kdkamar":this.kdruang,"jumlahpasien":this.yangmasuki,"stssimpan":'5',"banklis":this.banklis,"kdkostumerd":this.kdkostumerd,"produkbayar":this.produkbayar,
            "sisanumber":this.sisanumber,"totaltagihan":this.totaltagihan ,"sudahmasuk":this.nettosudahmasuk  ,"tglpulang":  this.tgldari
            
            }
            
            
                    
            
            
            this.authService.s_bayarri(body)
            .subscribe(response => {
            
            
            
              if(response ){
                this.toastr.success(''+response, 'Sukses', {
                  timeOut: 2000,
                });
                setTimeout(() => {
                  
                  this.showdata = false;
                 

                  this.notransaksi='';
this.tglpriksa='';
this.norm ='';
this.pasien ='';
this.alamat ='';
this.costumer ='';
this.costumercob ='';
this.namdokter='';
this.namruang ='';
this.kelas ='';
this.kdtarif ='';
this.kddokter ='';
this.kdruang ='';
this.kdkostumerd ='';

          
         

  
            this.tmptrans()

            this.lihatotfar()
            this.lihatotrj()
             








                  
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
        ppasienakhir()
        {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Pasien Pulang',
            text: 'Yakin Akan Pulangkan Pasien',
         
            showCancelButton: true,
            confirmButtonText: 'Pulangkan',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
          let body={
            


            "user":this.username,"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kdprodukbayar":this.kdprodukbayar,"kdjenisbayar":this.jbayarii,"tgldari":this.tgldari,
            "norm":this.norm,"kdkamar":this.kdruang,"jumlahpasien":this.yangmasuki,"stssimpan":'4',"banklis":this.banklis,"kdkostumerd":this.kdkostumerd,"produkbayar":this.produkbayar,
            "sisanumber":this.sisanumber,"totaltagihan":this.totaltagihan ,"sudahmasuk":this.nettosudahmasuk  ,"tglpulang":  this.tgldari
            
            }
            
            
                    
            
            
            this.authService.s_bayarri(body)
            .subscribe(response => {
            
            
            
              if(response ){
                this.toastr.success(''+response, 'Sukses', {
                  timeOut: 2000,
                });
                setTimeout(() => {
                  
                  this.showdata = false;
                 

                  this.notransaksi='';
this.tglpriksa='';
this.norm ='';
this.pasien ='';
this.alamat ='';
this.costumer ='';
this.costumercob ='';
this.namdokter='';
this.namruang ='';
this.kelas ='';
this.kdtarif ='';
this.kddokter ='';
this.kdruang ='';
this.kdkostumerd ='';

          
         

  
            this.tmptrans()

            this.lihatotfar()
            this.lihatotrj()
             








                  
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

        jumlahpasienxi:number=0;

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
          this.authService.listtrxri(this.kdcabang,this.notransaksi,a.target.value)
          .subscribe(
            data => {

          
        
        
          this.ttransaksi = data;
        },
        Error => {
        
         console.log(Error)
        }
        )
  
        }


        transaksit(a,b,kdproduk){

          if(a === '1'){
            
            this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses Tidak bisa di hapus silahkan hubungi keuangan', 'Eror');
            return
          }

          this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         

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
        
        
        
                let body={
                  "kdcabang":this.kdcabang,"notrans":this.notransaksi,"norm":this.norm,"kdkamar":this.kdruang,"stssimpan":'3',"user":this.username,"kdkostumerd":this.kdkostumerd,"nomorx":b,
                  "kdproduk":kdproduk
                }
                
                
                this.authService.s_bayarri(body)
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
                
                }
              });
   


        //   if(b === '100'){

        //     if(a === '1'){
        //       this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
        //     }else{
  
        //       this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         
         
        //       const swalWithBootstrapButtons = Swal.mixin({
        //         customClass: {
        //           confirmButton: 'btn btn-success',
        //           cancelButton: 'btn btn-danger'
        //         },
        //         buttonsStyling: false
        //       });
          
        //       swalWithBootstrapButtons.fire({
        //         title: 'Batal Transaksi',
        //         text: 'Yakin Akan Batal Transaksi',
             
        //         showCancelButton: true,
        //         confirmButtonText: 'Batal Transaksi',
        //         cancelButtonText: 'Batal Pop Up',
        //         reverseButtons: true
        //       }).then((result) => {
        //         if (result.value) {
        
        
        
        //           let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
        //           "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
        //           "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
        //           "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
        //           ,"bulat":this.pembulatanrj
        //         }
                
                
                
        //         this.authService.simpanbayar(body)
        //         .subscribe(response => {
                
                
                
        //           if(response ){
        //             this.toastr.success(''+response, 'Sukses', {
        //               timeOut: 2000,
        //             });
    
        //             setTimeout(() => {
        //               this.tmptrans()
        //             }, 200);
                  
                
                
        //             this.modalService.dismissAll()
                  
                  
        //            }else{
        //             this.toastr.error('Simpan  Gagal', 'Eror');
                  
        //            }
                
                
                
                
                
        //         })
        
        
        //           swalWithBootstrapButtons.fire(
        //             'Berhasil Batal ',
        //             'Batal Telah Berhasil.',
        //             'success'
        //           );
          
          
          
          
        //         } else if (
        //           /* Read more about handling dismissals below */
        //           result.dismiss === Swal.DismissReason.cancel
        //         ) {
        //           swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //           );
        //         }
        //       });
  
        //     }
        //   }else if(kdproduk === '1'){
        //     if(a === '1'){
        //       this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
        //     }else{
  
        //       this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         
         
        //       const swalWithBootstrapButtons = Swal.mixin({
        //         customClass: {
        //           confirmButton: 'btn btn-success',
        //           cancelButton: 'btn btn-danger'
        //         },
        //         buttonsStyling: false
        //       });
          
        //       swalWithBootstrapButtons.fire({
        //         title: 'Batal Transaksi',
        //         text: 'Yakin Akan Batal Transaksi',
             
        //         showCancelButton: true,
        //         confirmButtonText: 'Batal Transaksi',
        //         cancelButtonText: 'Batal Pop Up',
        //         reverseButtons: true
        //       }).then((result) => {
        //         if (result.value) {
        
        
        
        //           let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
        //           "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
        //           "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
        //           "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
        //           ,"bulat":this.pembulatanrj
        //         }
                
                
                
        //         this.authService.simpanbayar(body)
        //         .subscribe(response => {
                
                
                
        //           if(response ){
        //             this.toastr.success(''+response, 'Sukses', {
        //               timeOut: 2000,
        //             });
    
        //             setTimeout(() => {
        //               this.tmptrans()
        //             }, 200);
                  
                
                
        //             this.modalService.dismissAll()
                  
                  
        //            }else{
        //             this.toastr.error('Simpan  Gagal', 'Eror');
                  
        //            }
                
                
                
                
                
        //         })
        
        
        //           swalWithBootstrapButtons.fire(
        //             'Berhasil Batal ',
        //             'Batal Telah Berhasil.',
        //             'success'
        //           );
          
          
          
          
        //         } else if (
        //           /* Read more about handling dismissals below */
        //           result.dismiss === Swal.DismissReason.cancel
        //         ) {
        //           swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //           );
        //         }
        //       });
  
        //     }
                
        //   }else if(kdproduk === '2'){
        //     if(a === '1'){
        //       this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
        //     }else{
  
        //       this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         
         
        //       const swalWithBootstrapButtons = Swal.mixin({
        //         customClass: {
        //           confirmButton: 'btn btn-success',
        //           cancelButton: 'btn btn-danger'
        //         },
        //         buttonsStyling: false
        //       });
          
        //       swalWithBootstrapButtons.fire({
        //         title: 'Batal Transaksi',
        //         text: 'Yakin Akan Batal Transaksi',
             
        //         showCancelButton: true,
        //         confirmButtonText: 'Batal Transaksi',
        //         cancelButtonText: 'Batal Pop Up',
        //         reverseButtons: true
        //       }).then((result) => {
        //         if (result.value) {
        
        
        
        //           let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
        //           "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
        //           "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
        //           "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
        //           ,"bulat":this.pembulatanrj
        //         }
                
                
                
        //         this.authService.simpanbayar(body)
        //         .subscribe(response => {
                
                
                
        //           if(response ){
        //             this.toastr.success(''+response, 'Sukses', {
        //               timeOut: 2000,
        //             });
    
        //             setTimeout(() => {
        //               this.tmptrans()
        //             }, 200);
                  
                
                
        //             this.modalService.dismissAll()
                  
                  
        //            }else{
        //             this.toastr.error('Simpan  Gagal', 'Eror');
                  
        //            }
                
                
                
                
                
        //         })
        
        
        //           swalWithBootstrapButtons.fire(
        //             'Berhasil Batal ',
        //             'Batal Telah Berhasil.',
        //             'success'
        //           );
          
          
          
          
        //         } else if (
        //           /* Read more about handling dismissals below */
        //           result.dismiss === Swal.DismissReason.cancel
        //         ) {
        //           swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //           );
        //         }
        //       });
  
        //     }
        //   }else if(kdproduk === '3'){
        //     if(a === '1'){
        //       this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
        //     }else{
  
        //       this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         
         
        //       const swalWithBootstrapButtons = Swal.mixin({
        //         customClass: {
        //           confirmButton: 'btn btn-success',
        //           cancelButton: 'btn btn-danger'
        //         },
        //         buttonsStyling: false
        //       });
          
        //       swalWithBootstrapButtons.fire({
        //         title: 'Batal Transaksi',
        //         text: 'Yakin Akan Batal Transaksi',
             
        //         showCancelButton: true,
        //         confirmButtonText: 'Batal Transaksi',
        //         cancelButtonText: 'Batal Pop Up',
        //         reverseButtons: true
        //       }).then((result) => {
        //         if (result.value) {
        
        
        
        //           let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
        //           "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
        //           "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
        //           "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
        //           ,"bulat":this.pembulatanrj
        //         }
                
                
                
        //         this.authService.simpanbayar(body)
        //         .subscribe(response => {
                
                
                
        //           if(response ){
        //             this.toastr.success(''+response, 'Sukses', {
        //               timeOut: 2000,
        //             });
    
        //             setTimeout(() => {
        //               this.tmptrans()
        //             }, 200);
                  
                
                
        //             this.modalService.dismissAll()
                  
                  
        //            }else{
        //             this.toastr.error('Simpan  Gagal', 'Eror');
                  
        //            }
                
                
                
                
                
        //         })
        
        
        //           swalWithBootstrapButtons.fire(
        //             'Berhasil Batal ',
        //             'Batal Telah Berhasil.',
        //             'success'
        //           );
          
          
          
          
        //         } else if (
        //           /* Read more about handling dismissals below */
        //           result.dismiss === Swal.DismissReason.cancel
        //         ) {
        //           swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //           );
        //         }
        //       });
  
        //     }
        //   }else if(kdproduk === '4'){

        //     if(a === '1'){
        //       this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
        //     }else{
  
        //       this.toastr.error('Transaksi Sudah Di Tutup,Kalo Ingin Hapus Silahkan Batal Transaksi Terlebih Dahulu', 'Eror');
         
         
        //       const swalWithBootstrapButtons = Swal.mixin({
        //         customClass: {
        //           confirmButton: 'btn btn-success',
        //           cancelButton: 'btn btn-danger'
        //         },
        //         buttonsStyling: false
        //       });
          
        //       swalWithBootstrapButtons.fire({
        //         title: 'Batal Transaksi',
        //         text: 'Yakin Akan Batal Transaksi',
             
        //         showCancelButton: true,
        //         confirmButtonText: 'Batal Transaksi',
        //         cancelButtonText: 'Batal Pop Up',
        //         reverseButtons: true
        //       }).then((result) => {
        //         if (result.value) {
        
        
        
        //           let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
        //           "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
        //           "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
        //           "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
        //           ,"bulat":this.pembulatanrj
        //         }
                
                
                
        //         this.authService.simpanbayar(body)
        //         .subscribe(response => {
                
                
                
        //           if(response ){
        //             this.toastr.success(''+response, 'Sukses', {
        //               timeOut: 2000,
        //             });
    
        //             setTimeout(() => {
        //               this.tmptrans()
        //             }, 200);
                  
                
                
        //             this.modalService.dismissAll()
                  
                  
        //            }else{
        //             this.toastr.error('Simpan  Gagal', 'Eror');
                  
        //            }
                
                
                
                
                
        //         })
        
        
        //           swalWithBootstrapButtons.fire(
        //             'Berhasil Batal ',
        //             'Batal Telah Berhasil.',
        //             'success'
        //           );
          
          
          
          
        //         } else if (
        //           /* Read more about handling dismissals below */
        //           result.dismiss === Swal.DismissReason.cancel
        //         ) {
        //           swalWithBootstrapButtons.fire(
        //             'Cancelled',
        //             'Your imaginary file is safe :)',
        //             'error'
        //           );
        //         }
        //       });
  
        //     }
        // }else{
          
        // }
        }
    
        tglpp: Date = new Date();
      
        // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

        cetakinvoice(){
          var redirectWindow = window.open(this.URLINVOICE+'clenic/report/bilingrinci.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username,  '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
          redirectWindow.location;
       }

       cetakikwitansi(){
        var redirectWindow = window.open(this.URLINVOICE+'clenic/report/kwitansi.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
        redirectWindow.location;
     }
     klihats(){
      var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrj.php?kdcabang='+this.kdcabang+'&username='+this.usercetak+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;
     }
     klihatsx(){
      var redirectWindow = window.open(this.URLINVOICE+'clenic/report/pendapatanrjuser.php?kdcabang='+this.kdcabang+'&username='+this.usercetak+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;

    

     }

     lihatbb(){
      var redirectWindow = window.open(this.URLINVOICE+'clenic/report/belumrj.php?kdcabang='+this.kdcabang+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
      redirectWindow.location;

    

     }

     klihatsxx(){
   

      var redirectWindow = window.open(this.URLINVOICE+'clenic/report/rekaptransfer.php?kdcabang='+this.kdcabang+'&username='+this.usercetak+'&tgldari='+this.tglp+'&tglsampai='+this.tglpp+'&status='+this.kliniks+'&kdpoli='+this.kliniks, '_blank','location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes');
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
 trekap:any;

    lihatfarmasi(){
      this.authService.t_listtrxrekap(this.kdcabang,this.notransaksi)
      .subscribe(
        data => {
        
  this.trekap = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )



    }

    politunjang:string='';
    doktunjang:string='';

    tpolitunjang:any;
    tdoktunjang:any;
    tlistrujuk:any;

 klikrujuktunjang(){
  this.authService.politunjang(this.kdcabang)
  .subscribe(
    data => {
    
this.tpolitunjang = data;


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


 cetakantrian(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/cetakantrian.php?kdcabang='+this.kdcabang+'&notransaksi='+this.notransaksi, '_blank','location=no,toolbar=no,height=570,width=500,scrollbars=yes,status=yes');
  redirectWindow.location;

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


      setTimeout(() => {
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
      }, 250);
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


 }
 kbb(content){
  this.modalService.open(content, {
   
  });
 }


 onjenispen(a){
  this.authService.dokterperpolix(this.kdcabang,a)
  .subscribe(
    data => {
    
this.tdoktunjang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

 }
 

 kliktariflihat(){
  this.modalService.open(mtariflihatComponent, {
    size: 'lg'
  });
 }


 tpenunjang:any;
showtunjangd:boolean;
showfarmasi:boolean;
tjual:any;
userinput:any;
waktuinput:any;

kuserinput(a,b){
this.userinput = a;
this.waktuinput = b
}
nott:any;

 kcontentpdetail(content,notransaksi,kdproduk){


  if(kdproduk === '9'){
    this.showtunjangd = false;
    this.showfarmasi = true;

    this.authService.trxjual(this.kdcabang,notransaksi,notransaksi)
    .subscribe(
      data => {
      this.tjual = data
    
    }
    ,
    Error => {
  
     console.log(Error)
    }
  )
  }else{
    this.showtunjangd = true;
    this.showfarmasi = false;

    this.nott = notransaksi
    
    this.authService.t_listtrxpen(this.kdcabang,notransaksi,this.namatrx,'1')
    .subscribe(
      data => {
        this.tpenunjang = data;
  
  
      },
      Error => {
    
       console.log(Error)
      }
    )
  
  }

 


  this.modalService.open(content, {
    size: 'lg'
  });
 }
 showgantidokter:boolean;
 showgantikostumer:boolean;
 tkostumerd:any;

 kgantidokter(contentgantidokter,a){
if(a === 'dokter'){
  this.showgantidokter = true;
  this.showgantikostumer = false;

    this.authService.dokter(this.kdcabang)
                    .subscribe(
                      data => {

                          this.tdokter = data;
        },
      Error => {
      console.log(Error)
      }
      )

}else{
this.showgantidokter = false;
  this.showgantikostumer = true;
  
  this.authService.t_kostumerd(this.kdcabang,'')
  .subscribe(
    data => {

        this.tkostumerd = data;
},
Error => {
console.log(Error)
}
)

}


  this.modalService.open(contentgantidokter, {
    size: 'lg'
  });


 }


 gantidokter(a,b){
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Ganti Dokter',
    text: 'Yakin Akan Ganti Dokter',
 
    showCancelButton: true,
    confirmButtonText: 'Iya',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      let body={"stssimpan":'4',"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kdkostumerd":this.kdkostumerd,"norm":this.norm,
     "kddokter":a,
      "notransaksi":this.notransaksi,"kduser":this.username}
    
    
     
      this.authService.simpandaftarri(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
          this.kddokter = a;
          this.namdokter = b;

        
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








 gantikostumer(a,b,c){
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Ganti Dokter',
    text: 'Yakin Akan Ganti Dokter',
 
    showCancelButton: true,
    confirmButtonText: 'Iya',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      let body={"stssimpan":'5',"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kdkostumerd":a,"norm":this.norm,
     "kddokter":this.kddokter,
      "notransaksi":this.notransaksi,"kduser":this.username}
    
    
     
      this.authService.simpandaftarri(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
    this.kdkostumerd = a;
          this.costumer = b;
          this.kdtarif = c
        
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
 lihathasilfix(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/hasillab.php?notransaksi='+this.nott+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}

toutstanding:any;
toutstandingf:any;
nomt:any;
nomtf:any;

lihatotrj(){
  this.authService.t_outstandingrj(this.kdcabang,this.norm)
  .subscribe(
    data => {

        this.toutstanding = data;
      this.nomt = data.length;



},
Error => {
console.log(Error)
}
)
}

lihatotfar(){
  this.authService.t_outstandingfar(this.kdcabang,this.norm)
  .subscribe(
    data => {

        this.toutstandingf = data;
        this.nomtf = data.length;
      
},
Error => {
console.log(Error)
}
)
}

pulangkanpas(content){
    
  this.modalService.open(content).result.then((result) => {
                  
                  
                  
                  
                  
  }, (reason) => {
   
  });
}
      }
