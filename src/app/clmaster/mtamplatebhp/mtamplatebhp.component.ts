import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mtamplatebhp',
  templateUrl: './mtamplatebhp.component.html',
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
  ]
})
export class mtamplatebhpComponent implements OnInit {

  heading = 'Master Tamplate';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  currentJustify = 'start';
  currentJustify2 = 'center';
  currentJustify3 = 'start';

  currentOrientation = 'horizontal';

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
  crtindak:any;
  namatamplates:''
  details:''
  

  namatamplatess:''
  detailss:''


  kduser:any;
kdcabang:any;

    
body = 'This is example. \none\ntwo';
  constructor(public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });



    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
   this.kduser = this.userDetails.kduser;
   this.kdcabang = this.userDetails.kdcabang;
    
  }

showedit:boolean;

  ngOnInit() {
    this.klinik()
    this.tmpsubjek()
    this.authService.nomorobat(this.kdcabang,this.kduser)
    .subscribe(
      data => {
      
       this.nomorobat = data;
       
   console.log(this.nomorobat)
    
    },
      Error => {
    
       console.log(Error)
      }
    )  

    this.authService.hasiltamplateobat(this.kdcabang,this.kduser,'')
    .subscribe(
      data => {
      
       this.tobattaml = data;
  
    
    },
      Error => {
    
       console.log(Error)
      }
    )  


    setTimeout(() => {
      this.authService.obatr(this.kdcabang,this.kduser,this.nomorobat)
      .subscribe(
        data => {
        
         this.tobatr = data;
    
      
      },
        Error => {
      
         console.log(Error)
        }
      )  
  
    }, 200);
  

    // this.tmppuser()
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
    

    


  }



tmpusers:any;
diagnos:any;
tindak:any;

  tmppuser(){
    this.authService.diagnosa()
    .subscribe(
      data => {
      
this.diagnos = data;


    },
      Error => {
    
       console.log(Error)
      }
    )


    this.authService.tindakan()
    .subscribe(
      data => {
      
this.tindak = data;


    },
      Error => {
    
       console.log(Error)
      }
    )


  }


  cariuserx(a){

this.authService.caridiagnosa(a.target.value,'1')
.subscribe(data => {
  this.diagnos = data;

 
 
})

  }


  caritindak(a){
    console.log(a.target.value)
    
    this.authService.caritindakan(a.target.value,'1')
    .subscribe(data => {
      this.tindak = data;
    
     
     
    })
    
      }

 edit(){
 
 }


 deletesubjek(kdtamplate,nama,detail,kddokter){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus Tamplate?',
    text: 'Yakin Akan Menghapus Tamplate',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {


      let body = {"kddokter":this.kduser,"nama":nama,
      "detail": detail,"status":'1',"kdtamplate":kdtamplate,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'}
    
    
      this.authService.simpantamplate(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tmpsubjek()
    
    this.kdtamplate = '';
    this.namatamplates = '';
    this.details = '';
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
    



      swalWithBootstrapButtons.fire(
        'Berhasil Hapus Tamplate',
        'Tamplate Telah Terhapus Dari Database.',
        'success'
      );



    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {


      swalWithBootstrapButtons.fire(
        'Batal',
        'Batal ',
        'error'
      );
    }
  });



}




deletesubjeks(kdtamplate,nama,detail,kddokter){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus Tamplate?',
    text: 'Yakin Akan Menghapus Tamplate',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {


      let body = {"kddokter":this.kduser,"nama":nama,
      "detail": detail,"status":'1',"kdtamplate":kdtamplate,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'}
    
    
      this.authService.simpantamplate(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.lihatpf()
    
    this.kdtamplate = '';
    this.namatamplates = '';
    this.details = '';
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
    



      swalWithBootstrapButtons.fire(
        'Berhasil Hapus Tamplate',
        'Tamplate Telah Terhapus Dari Database.',
        'success'
      );



    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {


      swalWithBootstrapButtons.fire(
        'Batal',
        'Batal ',
        'error'
      );
    }
  });



}



 kdtamplate='';
 tsubjek:any;

 kdtamplates='';
 tobjek:any;
 lihatpf(){
  this.authService.tamplateos(this.kdcabang,this.kduser,'2','')
  .subscribe(
    data => {
    
this.tobjek = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
 }
 tmpsubjek(){
  this.authService.tamplateos(this.kdcabang,this.kduser,'1','')
  .subscribe(
    data => {
    
this.tsubjek = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
 }


 tmpobjek(){
  this.authService.tamplateos(this.kdcabang,this.kduser,'2','')
  .subscribe(
    data => {
    
this.tobjek = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
 }


 simpan(){

  let body = {"kddokter":this.kduser,"nama":this.namatamplates,"detail":this.details,"status":'1',"kdtamplate":this.kdtamplate,
  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
  }


  this.authService.simpantamplate(body)
  .subscribe(response => {
  
   

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tmpsubjek()

this.kdtamplate = '';
this.namatamplates = '';
this.details = '';
this.showedit = false;
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })



    }


    simpans(){

      let body = {"kddokter":this.kduser,"nama":this.namatamplatess,"detail":this.detailss,"status":'2',"kdtamplate":this.kdtamplates,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
      }
    
    
      this.authService.simpantamplate(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tmpobjek()
    
    this.kdtamplates = '';
    this.namatamplatess = '';
    this.detailss = '';
        this.showeditpf = false;
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
    
    
    
        }

    edituser(){
      let body = {"kddokter":this.kduser,"nama":this.namatamplates,"detail":this.details,"status":'1',"kdtamplate":this.kdtamplate,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
      }
    
    
      this.authService.simpantamplate(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tmpsubjek()
    
    this.kdtamplate = '';
    this.namatamplates = '';
    this.details = '';
    this.showedit = false;

        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
    }


    editusers(){
      let body = {"kddokter":this.kduser,"nama":this.namatamplatess,"detail":this.detailss,"status":'2',"kdtamplate":this.kdtamplates,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
      }
    
    
      this.authService.simpantamplate(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tmpobjek()
    
    this.kdtamplates = '';
    this.namatamplatess = '';
    this.detailss = '';
    this.showeditpf = false;
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
    }
    cariuserxx(a){
     
       this.authService.tamplateos(this.kdcabang,this.kduser,'1',a.target.value)
      .subscribe(
        data => {
        
         this.tsubjek = data;
         
     
      
      },
        Error => {
      
         console.log(Error)
        }
      )  
    
        }


        cariuserxxx(a){
     
          this.authService.tamplateos(this.kdcabang,this.kduser,'2',a.target.value)
         .subscribe(
           data => {
           
            this.tobjek = data;
            
        
         
         },
           Error => {
         
            console.log(Error)
           }
         )  
       
           }

        pilihsubjek(kdtamplate,nama,detail,kddokter){


          this.kdtamplate=kdtamplate;
          this.namatamplates = nama;
          this.details = detail;
          this.showedit= true;

        }

        
        pilihsubjeks(kdtamplate,nama,detail,kddokter){


          this.kdtamplates=kdtamplate;
          this.namatamplatess = nama;
          this.detailss = detail;
          this.showeditpf = true

        }

        subjekform = this.fb.group({
          namatamplates : ['',Validators.required],
          details : ['',Validators.required],
  
           
          })


          
        subjekformx = this.fb.group({
          namatamplatess : ['',Validators.required],
          detailss : ['',Validators.required],
  
           
          })



          showeditpf:boolean;


        batals(){
          this.kdtamplate = '';
          this.namatamplates = '';
          this.details = '';
          this.showedit = false;
        }

        batalss(){
          this.kdtamplates = '';
          this.namatamplatess = '';
          this.detailss = '';
          this.showeditpf = false;
        }



        jenisx='Umum';
        tobat:any;



        cariobat(a){
          this.authService.obat(this.kdcabang,'2',a.target.value)
          .subscribe(
            data => {
            
             this.tobat = data;
             
         
          
          },
            Error => {
          
             console.log(Error)
            }
          )  
        }
nomorobat:any;
tobattam:any;

        klikobat(){

          this.authService.nomorobat(this.kdcabang,this.kduser)
          .subscribe(
            data => {
            
             this.nomorobat = data;
             
         console.log(this.nomorobat)
          
          },
            Error => {
          
             console.log(Error)
            }
          )  


          

          setTimeout(() => {
            this.authService.tamplateobat(this.kdcabang,this.kduser,'','',this.nomorobat)
            .subscribe(
              data => {
              
               this.tobattam = data;
          
            
            },
              Error => {
            
               console.log(Error)
              }
            )  
  
  
            
            this.authService.hasiltamplateobat(this.kdcabang,this.kduser,'')
            .subscribe(
              data => {
              
               this.tobattaml = data;
          
            
            },
              Error => {
            
               console.log(Error)
              }
            )  
  
          }, 200);

          this.authService.obatr(this.kdcabang,this.kduser,this.nomorobat)
          .subscribe(
            data => {
            
             this.tobatr = data;
        
          
          },
            Error => {
          
             console.log(Error)
            }
          )  


        }

        ran:any;
pilihobattam(kdtamplated,nama){


  this.ran = '1';

  this.namatamplatess = nama;
  this.nomorobat = kdtamplated;

  this.authService.tamplateobat(this.kdcabang,this.kduser,'','',kdtamplated)
  .subscribe(
    data => {
    
     this.tobattam = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )  



}
        tobattaml:any;

nmobat='';
aturan='';
qtyk:number=0;
keterangan='';

        tambahobat(){
         
          let body = {
            "kdtamplate":this.nomorobat,
          "kddokter":this.kduser,
          "obat":this.nmobat,
          "aturan":this.aturan,
          "nama":this.namatamplatess,
          "qty":this.qtyk,
          "kdcabang":this.kdcabang,
          "kdklinik":this.kdklinik,
          "status":this.jenisx,
          "keterangan":this.keterangan,"stssimpan":'1'
          }
        
          console.log(body)

          this.authService.simpantamplateobat(body)
          .subscribe(response => {
          
           
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
          
         
              this.authService.tamplateobat(this.kdcabang,this.kduser,'','',this.nomorobat)
              .subscribe(
                data => {
                
                 this.tobattam = data;
            
              
              },
                Error => {
              
                 console.log(Error)
                }
              )   
            this.nmobat = '',
              this.aturan='',
        
            this.qtyk=0
          
 
              this.keterangan=''
        
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })



        }
        metode='';
showpilioracik:boolean;

        tambahobatr(){
          let body = {
            "kdtamplate":this.nomorobat,
          "kddokter":this.kduser,
          "obat":this.namaracik,
          "aturan":this.aturan,
          "nama":this.namatamplatess,
          "qty":this.qtyk,
          "kdcabang":this.kdcabang,
          "kdklinik":this.kdklinik,
          "status":this.jenisx,
          "satuan" :this.metode,
          "keterangan":this.keterangan,"stssimpan":'1'
          }
        
          console.log(body)

          this.authService.simpantamplateobatr(body)
          .subscribe(response => {
          
           
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });

              this.authService.obatr(this.kdcabang,this.kduser,this.nomorobat)
              .subscribe(
                data => {
                
                 this.tobatr = data;
            
              
              },
                Error => {
              
                 console.log(Error)
                }
              )  

              this.showpilioracik = true;
              this.showtab = true;
         
          
            this.nmobat = '',
              this.aturan='',
        
            this.qtyk=0
          
 
              this.keterangan=''
              this.namaracik ='';
        
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })

        }
        tambahobatv(){


if (this.ran === '1'){

  this.nmobat = '',
  this.aturan='',

this.qtyk=0


  this.keterangan=''
  this.namatamplatess='';
  
  this.nomorobat = '';

  this.ran = '2';

  this.toastr.success('Berhasil', 'Sukses', {
    timeOut: 2000,
  });

    setTimeout(() => {
  
      this.klikobat()
    }, 250);


}else{
  let body = {
    "kdtamplate":this.nomorobat,
  "kddokter":this.kduser,
  "obat":this.nmobat,
  "aturan":this.aturan,
  "nama":this.namatamplatess,
  "qty":this.qtyk,
  "kdcabang":this.kdcabang,
  "kdklinik":this.kdklinik,
  "status":this.jenisx,
  "keterangan":this.keterangan,"stssimpan":'4'
  }



  this.authService.simpantamplateobat(body)
  .subscribe(response => {
  
   

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

              
    this.nmobat = '',
    this.aturan='',

  this.qtyk=0


    this.keterangan=''
    this.namatamplatess='';
    
    this.nomorobat = '';



      setTimeout(() => {
    
        this.klikobat()
      }, 250);
  
 

    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })
}

        
        }



        deletelistobat(a){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Hapus Obat?',
            text: 'Yakin Akan Menghapus Obat',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {




              let body = {
                "kdtamplate":this.nomorobat,
                "kdtamplatex":a,
              "kddokter":this.kduser,
              "obat":this.nmobat,
              "aturan":this.aturan,
              "nama":this.namatamplatess,
              "qty":this.qtyk,
              "kdcabang":this.kdcabang,
              "kdklinik":this.kdklinik,
              "status":this.jenisx,
              "keterangan":this.keterangan,"stssimpan":'3'
              }
            
              console.log(body)
    
              this.authService.simpantamplateobat(body)
              .subscribe(response => {
              
               
            
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
    
                          
          
    
    
                  setTimeout(() => {
                    this.authService.tamplateobat(this.kdcabang,this.kduser,'','',this.nomorobat)
                    .subscribe(
                      data => {
                      
                       this.tobattam = data;
                  
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )  
                  }, 250);
              
             
            
                
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
            
            
            
            
            
              })




              swalWithBootstrapButtons.fire(
                'Berhasil Hapus Obat',
                'User Telah Terhapus Dari Database.',
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



        deletelistobatx(a,b){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Hapus Tamplate?',
            text: 'Yakin Akan Semua Tamplate '+b,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {




              let body = {
                "kdtamplate":a,
                "kdtamplatex":a,
              "kddokter":this.kduser,
              "obat":this.nmobat,
              "aturan":this.aturan,
              "nama":this.namatamplatess,
              "qty":this.qtyk,
              "kdcabang":this.kdcabang,
              "kdklinik":this.kdklinik,
              "status":this.jenisx,
             
              "keterangan":this.keterangan,"stssimpan":'5'
              }
            
  
    
              this.authService.simpantamplateobat(body)
              .subscribe(response => {
              
               
            
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
    
                          
          
    
    
                  setTimeout(() => {
                    this.authService.hasiltamplateobat(this.kdcabang,this.kduser,'')
                    .subscribe(
                      data => {
                      
                       this.tobattaml = data;
                  
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )  
          
                  }, 250);
              
             
            
                
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
            
            
            
            
            
              })




              swalWithBootstrapButtons.fire(
                'Berhasil Hapus Obat',
                'User Telah Terhapus Dari Database.',
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

showtab:boolean=true;
namaracik='';
tobatr:any;

        pindah(a){
          console.log(a)
       
          if(a === 'Umum' ){
            this.showtab = true;
          }else if(a === 'Racik'){
           
           
            this.authService.obatr(this.kdcabang,this.kduser,this.nomorobat)
            .subscribe(
              data => {
              

                if(data.length){

                  this.tobatr = data;
                  this.showtab = true;

                }else{
                  this.showtab = false;
                }




          
            
            },
              Error => {
            
               console.log(Error)
              }
            )  


          }
        }

        kapasitas:number;
        satuanstnd:number;

        jmlracik(a){

if(this.jenisx == 'Racik'){

console.log(this.nmobat,a.target.value)





this.authService.obatbyid(this.kdcabang,this.nmobat)
.subscribe(
  data => {
  
    this.kapasitas = Array.prototype.map.call(data,s=>s.zakaktif).toString();
  
    this.satuanstnd = Array.prototype.map.call(data,s=>s.standartd).toString();
  

},
  Error => {

   console.log(Error)
  }
)


setTimeout(() => {
  // console.log(this.kapasitas,this.satuanstnd)

var hnx:number;
var hny:number;
hnx = this.kapasitas / a.target.value;

// console.log(Math.round(hnx))

hny =  Math.round(hnx) * this.satuanstnd ;

// console.log(Math.ceil(hny/this.kapasitas))

var qty:number;
var s:any;

qty   = hny/this.kapasitas;


console.log(qty.toFixed(2))
s = qty.toFixed(1)

this.qtyk = s;

console.log(hny/this.kapasitas)



}, 200);

}else{


}

        }





        aturannonracik(kdtamplated,kdtamplate,kddokter,kdobat,aturan,a,c){
        
        
          Swal.fire({
            title: 'Masukan Aturan Terbaru',
            input: 'text',
            inputValue:c, 
            customClass: {
              validationMessage: 'my-validation-message'
            },
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
              if (!value) {
                Swal.showValidationMessage(
                  
                  '<i class="fa fa-info-circle"></i> Aturan Belum disi'
                )
              }else{
        
               

        
                let body={
                  "aturan":value,"kdtamplate":kdtamplate,"kdtamplated":kdtamplated,"kddokter":kddokter,
                  "kdobat":kdobat,"field":a,"kdcabang":this.kdcabang,"stssimpan":'1'
                }
        
                this.authService.editaturantam(body)
                .subscribe(response => {
                
                
                
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
              
             

                      setTimeout(() => {
                        
                        this.pilihobattam(kdtamplated,this.namatamplatess)
                      }, 200);
                   
                   }else{
                    this.toastr.error('Simpan  Gagal', 'Eror');
                  
                   }
                
                
                
                
                
                })
        
        
                
                
              }
            }
          })
        
        }







}
