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
import { TreeNode } from 'primeng/api';
import { FarmasijualService } from '../kasirfarmasijual/farmasijual.service';


@Component({
  selector: 'app-kasirrj',
  templateUrl: './kasirrj.component.html',
  styles: [
   
  ],
  providers: [
    DatePipe,

  ],
})
export class kasirrjComponent implements OnInit {
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
files1: TreeNode[];
selectedFile: TreeNode;
  constructor(
    public FarmasijualService:FarmasijualService,
    public hots:SampleService,private router: Router,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

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

  



  this.authService.listtariftree(this.kdcabang,this.ststarif,this.kdtarif)
  .subscribe(
    data => {
    
      this.files1 = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
  
  tpasien:any;
totalpasien:any;
ktglrad(){
  this.authService.pasienantrian(this.kdcabang,'4','','',this.tglp)
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
    this.caripas='5';
    this.statuscari='tanggal'
    this.authService.pasienantrian(this.kdcabang,'4','','',this.tglp)
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


    this.authService.pasienantrianppoli(this.kdcabang,this.caripas,a.target.value,this.tglp,this.statuscari)
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
igdorrj:any;
nokunjungan:any='';

  pilihpasien(norm,kdpoli
        ,tglpriksa
        ,kddokter
        ,kdkostumerd
        ,notransaksi
        ,pasien
        ,tgllahir
        ,noantrian
        ,nampoli
        ,namdokter
        ,nama
        ,costumer
        ,alamat,kdtarif,kelas,sts){
          this.showdata = true;
          this.norm =norm
          this.kdpoli = kdpoli
          this.tglpriksa = tglpriksa
          this.kddokter = kddokter
          this.kdkostumerd = kdkostumerd
          this.notransaksi = notransaksi
          this.pasien = pasien
          this.tgllahir = tgllahir
          this.noantrian = noantrian
          this.nampoli = nampoli
          this.namdokter = namdokter
          this.namacus = nama
          this.costumer = costumer
          this.alamat = alamat
          this.kdtarif = kdtarif
          this.kelas = kelas;
          this.igdorrj = sts;
          this.authService.ceknokunjungan(notransaksi)
          .subscribe(
            data => {
            
              for(let x of data){
                this.nokunjungan = x.nokunjungan
              }
        
          },
            Error => {
          
             console.log(Error)
            }
          )
          setTimeout(() => {
            this.tmptrans()
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
  
  this.authService.totalfarmasi(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {
      var farjml=0;
      var sudahbyr=0;
      var fixfar:number;


      if(data.length){
        for (let x of data )
        {
          var y = parseInt(x.totalbayar)
          var xy = parseInt(x.sudahbayar)
          farjml += y;
          sudahbyr +=xy;
        
        
        fixfar=farjml-sudahbyr;
        
        
        
        }
        this.totalbayartagihanfarmasi = fixfar;
      }else{
        this.totalbayartagihanfarmasi = 0;
      }
  

    },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.listtrxrj(this.kdcabang,this.notransaksi,this.namatrx,'1')
  .subscribe(
    data => {


      this.verifeditdokter = data.length


var xyz=0;
var totaldisc=0;
var bayar = 0;
var totalblm=0;
      for (let product of data )
{


  for(let x of product.detail){


          var y = parseInt(x.debeta)
          var n = parseInt(x.disc)
          var b = parseInt(x.kridita)
        


          xyz += y;
          totaldisc += n;
          bayar += b;
        }






}
this.totalbayar = bayar;

this.totaltagihan = xyz;
this.totaldisc = totaldisc;

this.ttransaksi = data;
setTimeout(() => {
  // totalblm = xyz - (totaldisc + bayar)
  totalblm = xyz - bayar

 
  this.netto = totalblm + this.totalbayartagihanfarmasi;



  let num = this.netto;
  let text = num.toString()

  var angka = text.substr(-3);
var angka1 = parseInt(angka);



var akhir:number;

if(angka1 <= 0){
  this.pembulatanrj = 0
}else{
  if(angka1 > 499){

    akhir = this.netto - Math.round(angka1);

    }else{
    akhir = this.netto + Math.round(angka1)+1000;

    
    }
    this.pembulatanrj = this.netto-akhir;
this.netto = akhir;

}





// console.log("pspds"+akhir)


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




  this.authService.listtrxrj(this.kdcabang,this.notransaksi,this.namatrx,'2')
  .subscribe(
    data => {

      var xyzx=0;
      var kridit=0
      for (let productx of data )
      {



        for(let x of productx.detail){
        var yx = parseInt(x.debeta)
        var kriditx =  parseInt(x.kridita)
        xyzx += yx;
        kridit +=kriditx;
        }
        
      }

      this.totalrjsajaasli = xyzx;

      

this.totaldebetrj = xyzx;
this.totalkriditrj = kridit


this.totalrjsaja = xyzx - kridit

  },
    Error => {
  
     console.log(Error)
    }
  )



  this.authService.trigerbayar(this.kdcabang,this.notransaksi)
  .subscribe(
    data => {
var s:number=0;

      for(let x of data){
        var y = parseInt(x.sudahdibayar)
        s += y;
      }

      this.nettosudahmasuk = s;

      console.log(this.nettosudahmasuk)

    },
    Error => {
  
     console.log(Error)
    }
    )




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
  
  //   this.authService.plafonbpjs(this.kdcabang,this.kelas)
  //   .subscribe(
  //     data => {

  //       for(let x of data){
  //         var y = parseInt(x.int)
     
          
  //       }
  // this.plafonbpjs = y;
  
  // this.plafonbpjsaman = y - 30000;
  // this.plafonbpjmedekati = y - 10000;
  //     },
  //     Error => {
    
  //      console.log(Error)
  //     }
  //     )




}

verifeditdokter:any;

showtransfer:boolean;
notransaksiri:any;
kamarri:any;

plafonbpjsaman:number;
plafonbpjmedekati:number;

caritarif(a){
  this.authService.tarifdetail(this.kdcabang,'2',a.target.value,this.kdbapak,this.ststarif)
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
      "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdpoli,"qty":'1',"harga":this.hargaigd,"debet":this.hargaigd,
      "kridit":0,"jenistransaksi":'DB',"tarifasli":this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',kdperawat:kdperawat,"ri":'0'
    }

      
      this.authService.simpantrxrj(body)
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
        "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdpoli,"qty":'1',"harga":  this.hargaigd,"debet":  this.hargaigd,
        "kridit":0,"jenistransaksi":'DB',"tarifasli":  this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":kddokter,"stssimpan":'1',kdperawat:'0',"ri":'0'
      }

      
      this.authService.simpantrxrj(body)
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

        tambahtarif(kdtarif,nama,harga,contentdokter,contentperawat,kdTindakanSK){
              var kdTindakanin='';

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







                  if(this.igdorrj === 'igd'){
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
                    



                 
                    
                    
                  }else{


                    this.authService.listkomponen(this.kdcabang,kdtarif)
                    .subscribe(
                      data => {
                      
                        if(data.length){
                          this.kdtarifigd = kdtarif;
                          this.namaigd = nama;
                          this.hargaigd = harga;


                          this.authService.perawat(this.kdcabang)
                          .subscribe(
                            data => {
                            
                        
                      if(data.length){

                        this.tperawat = data;
                        this.modalService.open(contentperawat, {
                          size: 'lg'
                        });
                      }else{
                        
                      }
                        
                          
                          },
                            Error => {
                          
                             console.log(Error)
                            }
                          )

                        }else{

                          
                      let bodytindakaan ={
                        "data" :{
                          "kdTindakanSK": 0,
                          "noKunjungan": this.nokunjungan,
                          "kdTindakan": kdTindakanSK,
                          "biaya": harga,
                          "keterangan": null,
                          "hasil": harga
                        }
                      }
                      this.authService.addtindakan(bodytindakaan)
                      .subscribe(response => {


                        if(response.metaData.code == 201){
                       
                          kdTindakanin = response.response.message

                          // alert(response.message)
                          setTimeout(() => {
                            let body ={"user":this.username,
                            "notransaksi":this.notransaksi,"kdproduk":kdtarif,"produk":nama,"kdpoli":this.kdpoli,"qty":'1',"harga":harga,"debet":harga,
                            "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":this.notransaksi,
                            "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',
                            kdperawat:'0',"ri":'0',"kdTindakanSK":response.response.message
                          }
                          
                          
                          this.authService.simpantrxrj(body)
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
                          }, 500);
                    
                        }else{
                          kdTindakanin = '';
                          this.toastr.error('BPJS : '+response.metaData.message, 'Sukses', {
                            timeOut: 2000,
                          });
                        }

                        
                  
                      }
                      )


        
             


 



                        }
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )


                  }


                

                
          
               
          
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
          "notransaksi":this.notransaksi,"kdproduk":'.',"produk":'.',"kdpoli":this.kdpoli,"qty":'1',"harga":0,"debet":0,
          "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"disc":0,"nofaktur":this.notransaksi,
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":1000,"stssimpan":'6',"ri":'0'
        }

        
        this.authService.simpantrxrj(body)
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
        kdTindakandel:any=''
        
        hapusproduk(nomor,kdproduk,produk,notransaksi,harga,nofaktur,kridita,kdpoli,kdTindakanSK){
          this.kdTindakandel = kdTindakanSK
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



          
              this.authService.deletetindakan(this.nokunjungan,kdTindakanSK)
              .subscribe(response => {


                if(response.metaData.code == 200){
               
                  this.toastr.success('BPJS : '+response.metaData.message, 'Sukses', {
                    timeOut: 2000,
                  });
                 
            
                }else{
               
                 
                  this.toastr.success('BPJS : '+response.response[0].message, 'Sukses', {
                    timeOut: 2000,
                  });
                }

                
          
              }
              )



              let body ={"user":this.username,"netto":this.netto,
                "notransaksi":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":kdpoli,"qty":'1',"harga":harga,"debet":harga,
                "kridit":kridita,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'2',"ri":'0'
              }

              
              this.authService.simpantrxrj(body)
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
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'3',"ri":'0'
                }
  
                
                this.authService.simpantrxrj(body)
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
                  "notransaksi":notrans,"kdproduk":kdproduk,"produk":'',"kdpoli":this.kdpoli,"qty":value,"harga":'',"debet":'',
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":nofaktur,"kdkomponen":kdkomponen,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'5',"ri":'0'
                }
  
                
                this.authService.simpantrxrj(body)
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
      this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar Rawat Jalan', '', {
        timeOut: 2000,
      });
    }else{

      let body={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"totaltagihan":this.netto,"sudahdibayar":0,"sisa":this.netto}



      this.authService.simpantriger(body)
      .subscribe(response => {
      
      
      
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
       
      setTimeout(() => {
        this.authService.trigerbayar(this.kdcabang,this.notransaksi)
        .subscribe(
          data => {
      var s:number=0;
      var tottag:number=0;
            for(let x of data){
              var y = parseInt(x.totaltagihan)
              var xy = parseInt(x.sudahdibayar)
              s += y;
              tottag +=xy;
            }
      
      
      
            this.sisanumber = s - tottag;
      
           
      
          },
          Error => {
        
           console.log(Error)
          }
          )
      
          
      
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
      }, 200);
     
      
       }else{
        // this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
      
      
      
      
      
      })
    }   










//           const swalWithBootstrapButtons = Swal.mixin({
//             customClass: {
//               confirmButton: 'btn btn-success',
//               cancelButton: 'btn btn-danger'
//             },
//             buttonsStyling: false
//           });
      
//           swalWithBootstrapButtons.fire({
//             title: 'Bayar Tagihan',
//             text: 'Bayar Tagihan Rawat Jalan',
    
//             showCancelButton: true,
//             confirmButtonText: 'Rawat Jalan All',
//             cancelButtonText: 'Rawat Jalan Saja',
//             reverseButtons: true
//           }).then((result) => {
//             if (result.value) {

           


            
//     if(this.netto <= 0){
//       this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar Rawat Jalan', '', {
//         timeOut: 2000,
//       });
//     }else{

//       let body={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"totaltagihan":this.netto,"sudahdibayar":0,"sisa":this.netto}



//       this.authService.simpantriger(body)
//       .subscribe(response => {
      
      
      
//       if(response ){
//         this.toastr.success(''+response, 'Sukses', {
//           timeOut: 2000,
//         });
       
//       setTimeout(() => {
//         this.authService.trigerbayar(this.kdcabang,this.notransaksi)
//         .subscribe(
//           data => {
//       var s:number=0;
//       var tottag:number=0;
//             for(let x of data){
//               var y = parseInt(x.totaltagihan)
//               var xy = parseInt(x.sudahdibayar)
//               s += y;
//               tottag +=xy;
//             }
      
      
      
//             this.sisanumber = s - tottag;
      
           
      
//           },
//           Error => {
        
//            console.log(Error)
//           }
//           )
      
          
      
//         this.jumlahpasienx1=0
//                     this.jumlahpasieni=0
//                     this.yangmasuki=0;
//                     this.keterangb=''
//                     this.kurangbayar=0
//                     this.jumlahpasienxi =0
      
      
//                     this.showbayarrjasa = false;
//                     this.authService.jenisbayar('1','')
//                     .subscribe(
//                       data => {
                      
//                   this.tjenisbayar = data;
                  
//                     },
//                       Error => {
                    
//                        console.log(Error)
//                       }
//                     )
                  
//                     this.modalService.open(content).result.then((result) => {
                  
                  
                  
                  
                  
//                     }, (reason) => {
                     
//                     });
//       }, 200);
     
      
//        }else{
//         // this.toastr.error('Simpan  Gagal', 'Eror');
      
//        }
      
      
      
      
      
//       })
//     }   







            
           
      
//             } else if (
//               /* Read more about handling dismissals below */
//               result.dismiss === Swal.DismissReason.cancel
//             ) {

//               this.showbayarrjasa = true;

// if(this.totalrjsaja <= 0){
//   this.toastr.error('Tidak Bisa Di klik Karena Sudah Terbayar Rawat Jalan', '', {
//     timeOut: 2000,
//   });
// }else{

//   this.authService.trigerbayar(this.kdcabang,this.notransaksi)
//   .subscribe(
//     data => {


//       if(data.length){
//         this.toastr.error('Tidak bisa bayar rawat jalan karena sebelumnya sudah bayar all tagihan,hapus di all tagihan agar bisa bayar per kasir', 'Sukses', {
//           timeOut: 2000,
//         });
//       }else{
//         this.jumlahpasienx=0
//         this.jumlahpasien=0
//         this.yangmasuk=0;
//         this.keterangb=''
//         this.kurangbayar=0
//         this.banklis=''
//         this.authService.jenisbayar('1','')
//         .subscribe(
//           data => {
          
//       this.tjenisbayar = data;
      
//         },
//           Error => {
        
//            console.log(Error)
//           }
//         )
      
//         this.modalService.open(content).result.then((result) => {
      
      
      
      
      
//         }, (reason) => {
         
//         });
//       }
    


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )

 


 
// }
              

              

        
//             }
//           });
          
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

        jbayariix(a){
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


          if(this.jbayarii === ''){
            this.toastr.error('Simpan  gagal pilih jenis bayar', 'Eror');
          }else{

          
let body={"user":this.username,"kdprodukbayar":this.kdprodukbayar,"netto":this.netto,
  "produkbayar":this.produkbayar,"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'2',
  "bulat":this.pembulatanrj
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


        transaksit(a,b,kdproduk){


          if(b === '100'){

            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }
          }else if(kdproduk === '1'){
            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }
                
          }else if(kdproduk === '2'){
            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }
          }else if(kdproduk === '3'){
            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }
          }else if(kdproduk === '4'){

            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }

        }else if(kdproduk === '6'){
          if(a === '1'){
            this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
       
          }else{

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
      
      
      
                let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                ,"bulat":this.pembulatanrj
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
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                );
              }
            });

          }

        }else if(kdproduk === '7'){
            if(a === '1'){
              this.toastr.error('Tidak Bisa Di batal Karena Sudah Di proses', 'Eror');
         
            }else{
  
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
        
        
        
                  let body={"user":this.username,"kdprodukbayar":'1',"netto":this.netto,
                  "produkbayar":'1',"totalrjsaja":this.totalrjsaja,"norm":this.norm,"kurangbayar":this.kurangbayari,"totalrjsajaasli":this.totaltagihan,"tgldari":this.tgldari,
                  "jbayari":this.jbayarii,"yangmasuk":this.yangmasuki,"banklis":this.banklis,"keterangb":this.keterangb,"jumlahpasien":this.jumlahpasieni,
                  "kembalian":this.kembaliani,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kdkostumerd":this.kdkostumerd,"notrans":this.notransaksi,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"stssimpan":'3'
                  ,"bulat":this.pembulatanrj
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
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
  
            }


        }else{
          
        }
        }
    
        tglpp: Date = new Date();
      
        // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

        cetakinvoice(){
          var redirectWindow = window.open(this.URLINVOICE+'clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username, '_blank','location=no,toolbar=no,height=570,width=520,scrollbars=yes,status=yes');
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
    lihatfarmasi(){
      this.authService.listtrxfarrj(this.kdcabang,this.notransaksi,'1','')
      .subscribe(
        data => {
        
  this.tfarmasi = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )

      this.authService.listtrxfarrja(this.kdcabang,this.notransaksi)
      .subscribe(
        data => {
        

          var totaltagihanfar:number=0;
          var terbayarfar:number=0;
          var discallafar:number=0;

          var adminresep:number=0;
          var tuslah:number=0;
          var pembulatan:number=0;
                for(let x of data){
                  var a = parseInt(x.totalbayar)
                  var b = parseInt(x.sudahbayar)
                  var c = parseInt(x.totaldisc)

                  var d = parseInt(x.adminresep)
                  var e = parseInt(x.tuslah)
                  var f = parseInt(x.pembulatan)

                  totaltagihanfar += a;
                  terbayarfar += b;
                  discallafar += c;
                  adminresep += d;
                  tuslah += e;
                  pembulatan +=f;
                }
      
                this.totaltagihanfar = totaltagihanfar
                this.terbayarfar = terbayarfar
                this.discallafar = discallafar
            
                this.adminresep = adminresep
                this.tuslah = tuslah
                this.pembulatan =pembulatan

  
  
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

tdokx:any;
tkostumer:any;

openjenis(content){
  if(this.verifeditdokter > 0){
    this.toastr.error('Silahkan Hapus Transaksi Biling dulu baru bisa ganti Kostumer', 'Eror');
    return
  }

  this.authService.listkostumer(this.kdcabang,'')
  .subscribe(
    data => {
    this.tkostumer = data;


  },
    Error => {
  
     console.log(Error)
    }
  )



  this.modalService.open(content, {
   
  });

}
opendok(content){
console.log(this.verifeditdokter)

if(this.verifeditdokter > 0){
  this.toastr.error('Silahkan Hapus Transaksi Biling dulu baru bisa ganti dokter', 'Eror');
  return
}

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


pilihkus(kdkostumerd,nama,content6){
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

  

      let body ={"kdcabang":this.kdcabang,"notrans":this.notransaksi,"kdkostumerd":kdkostumerd
    }

    
    this.authService.gantikostumer(body)
    .subscribe(response => {
    
   
  
      if(response){
        this.toastr.success('', 'Sukses', {
          timeOut: 2000,
        });
    

     

        this.modalService.open(content6, {
          size: 'lg'
        });
      

        

      
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


pilihdokx(kddokter,namdokter){
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
  
        var kdtf:string;
        var nmtf:string;
        
        if(this.igdorrj === 'igd'){
          kdtf ='7';
          nmtf = 'Transfer IGD';

        }else{
          kdtf ='6';
          nmtf = 'Transfer Rawat Jalan';
          
        }
  
        let body ={"user":this.username,
          "notrans":this.notransaksi,"notransri":this.notransaksiri,"kdtf":kdtf,"nmtf":nmtf,"kdpoli":this.kdpoli,"qty":'1',"harga":this.totalrjsaja,"debet":0,
          "kridit":this.totalrjsaja,"jenistransaksi":'KR',"tarifasli":this.totalrjsaja,"disc":0,"nofaktur":this.notransaksi,
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3',"kdkostumerd":this.kdkostumerd,"norm":this.norm
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

  
  kdbapak:any;

  nodeSelect(a){
  this.kdbapak = a.node.key
    this.authService.tarifdetail(this.kdcabang,'2','',a.node.key,this.ststarif)
    .subscribe(
      data => {
      
   this.ttarif = data;
   
   
    },
      Error => {
    
       console.log(Error)
      }
    )



  }

      }
