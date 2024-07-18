import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mtamplatelab',
  templateUrl: './mtamplatelab.component.html',
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
export class MtamplatelabComponent implements OnInit {

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

tlisttes:any;

  ngOnInit() {
    this.klinik()

    this.authService.golongan(this.kdcabang,'','1')
  .subscribe(
    data => {
    
this.tgolonganlab = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
   

  
   


    // this.tmppuser()
  }

  onChange(a){
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

  kdmetode:any;
tmetodelab:any;
tgolonganlab:any;
cariuserxx(a){
  this.authService.metode(this.kdcabang,a.target.value,'2')
  .subscribe(
    data => {
    
this.tmetodelab = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}

cariuserxxx(a){
  this.authService.golongan(this.kdcabang,a.target.value,'2')
  .subscribe(
    data => {
    
this.tgolonganlab = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}

pilihsubjek(a,b){
  this.kdmetode = a;
  this.namatamplates = b
  this.showeditg = true;
}
klikmetodelab(){
  this.tmpobjek()
}



  tmpobjek(){
    this.authService.metode(this.kdcabang,'','1')
    .subscribe(
      data => {
      
  this.tmetodelab = data;
  
  
    },
      Error => {
    
       console.log(Error)
      }
    )

    this.authService.golongan(this.kdcabang,'','1')
    .subscribe(
      data => {
      
  this.tgolonganlab = data;
  
  
    },
      Error => {
    
       console.log(Error)
      }
    )


   }

   showgolongan:boolean;
   showmetode:boolean;

   carimetode(a){

    if(this.metode === ''){
      this.showmetode = false;

    }else{
      this.showmetode = true;
      this.authService.metode(this.kdcabang,a.target.value,'2')
      .subscribe(
        data => {
        
    this.tmetodelab = data;
    
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
  
   }

   carigolongan(a){

    if(this.golongan === ''){
      this.showgolongan = false;
    }else{
      this.showgolongan = true;
      this.authService.golongan(this.kdcabang,a.target.value,'2')
      .subscribe(
        data => {
        
    this.tgolonganlab = data;
    
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }

   }

  simpan(){
  let body = {"kdmetode":this.kdmetode,"namatamplates":this.namatamplates,"status":'METODE',
  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
  }


  this.authService.simpantamplatelab(body)
  .subscribe(response => {
  
   

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  
this.tmpobjek()
this.namatamplates = '';
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })
  }


  simpanx(){
    let body = {"kdmetode":this.kdmetode,"namatamplates":this.namatamplates,"status":'GOLONGAN',
    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
    }
  
  
    this.authService.simpantamplatelab(body)
    .subscribe(response => {
    
     
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
  this.tmpobjek()
  this.namatamplates = '';
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })
    }


  batals(){
    this.namatamplates = '';
    this.kdmetode='';
    this.showeditg = false
  }
  edituser(){
    let body = {"kdmetode":this.kdmetode,"namatamplates":this.namatamplates,"status":'METODE',
    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
    }
  
  
    this.authService.simpantamplatelab(body)
    .subscribe(response => {
    
     
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
  this.tmpobjek()
  this.namatamplates = '';
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })
    }



    edituserx(){
      let body = {"kdmetode":this.kdmetode,"namatamplates":this.namatamplates,"status":'GOLONGAN',
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
      }
    
    
      this.authService.simpantamplatelab(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    this.tmpobjek()
    this.namatamplates = '';
    this.showeditg = false;

        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })
      }

    deletesubjek(a,b){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus Metode?',
        text: 'Yakin Akan Menghapus Metode',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {



          let body = {"kdmetode":a,"namatamplates":b,"status":'METODE',
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'
          }
        
        
          this.authService.simpantamplatelab(body)
          .subscribe(response => {
          
           
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
          
        this.tmpobjek()
        this.namatamplates = '';
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })


          swalWithBootstrapButtons.fire(
            'Berhasil Hapus Metode',
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

    hapustes(kdlab,nama,kdgolongan,golongan,
      kdmetode,metode,satuan,reflaki,refperempuan,lmin,lmax,pmin,pmax){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Hapus Tes Laborat?',
          text: 'Hapus Tes Laborat',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
  
            let body={"kdlab":kdlab,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"nama":nama,"kdgolongan":kdgolongan,"golongan":golongan,
            "kdmetode":kdmetode,"metode":metode,"satuan":satuan,"reflaki":reflaki,"refperempuan":refperempuan,"lmin":lmin,
            "lmax":lmax,"pmin":pmin,"pmax":pmax,"stssimpan":'3'}
            
            
            
            
            
            this.authService.simpanmasterlab(body)
            .subscribe(response => {
            
             
            
              if(response ){
                this.toastr.success(''+response, 'Sukses', {
                  timeOut: 2000,
                });
                this.tmplx()
                this.profileForm.reset();
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
    deletesubjekx(a,b){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus Metode?',
        text: 'Yakin Akan Menghapus Metode',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {



          let body = {"kdmetode":a,"namatamplates":b,"status":'GOLONGAN',
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'
          }
        
        
          this.authService.simpantamplatelab(body)
          .subscribe(response => {
          
           
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
          
        this.tmpobjek()
        this.namatamplates = '';
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })


          swalWithBootstrapButtons.fire(
            'Berhasil Hapus Metode',
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

namates:'';
satuan:'';
golongan:'';
kdgolongan:'';
metode:'';
kdmetodex:'';

reflaki:'';
refperempuan:'';
lmin:'';
lmax:'';
pmin:'';
pmax:'';
nourut:'';

profileForm = this.fb.group({
  namates: ['',Validators.required],
  satuan: ['',Validators.required],
  metode: ['',Validators.required],
  golongan: ['',Validators.required],
  reflaki: ['',Validators.required],
  refperempuan: ['',Validators.required],
  lmin: ['',Validators.required],
  lmax: ['',Validators.required],
  pmin: ['',Validators.required],
  pmax: ['',Validators.required],
  nourut: ['',Validators.required],





});

showedit:boolean;
showeditg:boolean;
showeditm:boolean;

golonganform = this.fb.group({
  namatamplates : ['',Validators.required],
})



metodeform = this.fb.group({
  namatamplates : ['',Validators.required],
})





pilihgol(kdmetode,metode){
this.showgolongan = false;
this.golongan = metode;
this.kdgolongan = kdmetode;

}
pilihmetode(kdmetode,metode){
  this.showmetode = false;
  this.kdmetodex = kdmetode;
  this.metode = metode;
}

simpantes(){

  let body={"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"nama":this.namates,"kdgolongan":this.kdgolongan,"golongan":this.golongan,
"kdmetode":this.kdmetodex,"metode":this.metode,"satuan":this.satuan,"reflaki":this.reflaki,"refperempuan":this.refperempuan,"lmin":this.lmin,
"lmax":this.lmax,"pmin":this.pmin,"pmax":this.pmax,"nourut":this.nourut,"stssimpan":'1'}





this.authService.simpanmasterlab(body)
.subscribe(response => {

 

  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });
    this.showedit = false;
    this.tmplx()
    this.profileForm.reset();
   }else{
    this.toastr.error('Simpan  Gagal', 'Eror');
  
   }





})


}

editusertes(){

  let body={"kdlab":this.kdlab,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"nama":this.namates,"kdgolongan":this.kdgolongan,"golongan":this.golongan,
"kdmetode":this.kdmetodex,"metode":this.metode,"satuan":this.satuan,"reflaki":this.reflaki,"refperempuan":this.refperempuan,"lmin":this.lmin,
"lmax":this.lmax,"pmin":this.pmin,"pmax":this.pmax,"nourut":this.nourut,"stssimpan":'2'}





this.authService.simpanmasterlab(body)
.subscribe(response => {

 

  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });
    this.tmplx()
    this.showedit = false;
    this.profileForm.reset();
   }else{
    this.toastr.error('Simpan  Gagal', 'Eror');
  
   }





})


}

tmplx(){
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
bataltes(){
  this.profileForm.reset();
  this.showedit = false;
}
kdlab:any;

jenistc:string='';
pilihtes(kdlab,nama,kdgolongan,golongan,
  kdmetode,metode,satuan,reflaki,refperempuan,lmin,lmax,pmin,pmax,no){

    this.namates = nama
this.satuan = satuan
this.golongan = golongan
this.kdgolongan = kdgolongan
this.metode = metode
this.kdmetodex = kdmetode
this.reflaki=reflaki
this.refperempuan=refperempuan
this.lmin=lmin
this.lmax=lmax
this.pmin=pmin
this.pmax=pmax
this.kdlab = kdlab
this.nourut = no
this.showedit= true;

  }

}
