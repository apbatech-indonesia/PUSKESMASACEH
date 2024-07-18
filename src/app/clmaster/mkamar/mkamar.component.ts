import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mkamar',
  templateUrl: './mkamar.component.html',
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
export class mkamarComponent implements OnInit {

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

  this.tmplx()

  
   


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

  kdmetode:any;
tmetodelab:any;
tgolonganlab:any;
tmpkamar(){
  this.authService.t_kamar(this.kdcabang,'')
  .subscribe(
    data => {
    
this.tmetodelab = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}

carikamar(a){
  this.authService.t_kamar(this.kdcabang,a.target.value)
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
  this.authService.t_masterkamarinduk(this.kdcabang,a.target.value)
  .subscribe(
    data => {
    
this.tgolonganlab = data;


  },
    Error => {
  
     console.log(Error)
    }
  )
}
kdkmrinduk:string='';

pilihsubjek(a,b){
  this.kdkmrinduk = a;
  this.namatamplates = b
  this.showeditg = true;
}
klikmetodelab(){
  this.tmpobjek()
}
klikkamar(){
  this.tmpobjek()
  this.tmplx()
  this.tmpkamar()
}


  tmpobjek(){
 

    this.authService.t_masterkamarinduk(this.kdcabang,'')
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


   kamari:string=''
   jmlbed:any;

  simpan(){
  let body = {"kdkelas":this.kelaskamari,"kdinduk":this.kamarinduki,"nama":this.kamari,"jmlbed":this.jmlbed,
  "kdcabang":this.kdcabang,"stssimpan":'1'
  }


  this.authService.s_kamar(body)
  .subscribe(response => {
  
   

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.tmpkamar()
  

     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })
  }


  simpanx(){
    let body = {"indukkamar":this.namatamplates,
    "kdcabang":this.kdcabang,"stssimpan":'1'
    }
  
  
    this.authService.s_masterkamarinduk(body)
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

  batalkamar(){
    this.metodeform.reset()
    this.showeditg = false
  }
  edituser(){
    let body = {"kdkelas":this.kelaskamari,"kdkamar":this.kdkamar,"kdinduk":this.kamarinduki,"nama":this.kamari,"jmlbed":this.jmlbed,
    "kdcabang":this.kdcabang,"stssimpan":'2'
    }
  
  
    this.authService.s_kamar(body)
    .subscribe(response => {
    
     
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
  
        this.tmpkamar()
        this.showeditg = false
    
  
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })
    }



    edituserx(){
      let body = {"indukkamar":this.namatamplates,"kdindukkamar":this.kdkmrinduk,
      "kdcabang":this.kdcabang,"stssimpan":'2'
      }
    
    
      this.authService.s_masterkamarinduk(body)
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

    deletesubjek(kdkamar,kdkelas,kdinduk,nama,jmlbed,kdindukkamar,indukkamar,namakelas){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus Kamar?',
        text: 'Yakin Akan Menghapus Kamar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {



          let body = {"kdkelas":kdkelas,"kdkamar":kdkamar,"kdinduk":kdindukkamar,"nama":nama,"jmlbed":jmlbed,
          "kdcabang":this.kdcabang,"stssimpan":'3'
          }
        
        
          this.authService.s_kamar(body)
          .subscribe(response => {
          
           
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
        
              this.tmpkamar()
              this.showeditg = false
          
        
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

    hapustes(kdkelas,nama){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Hapus Kelas Kamar?',
          text: 'Hapus  Kelas Kamar',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
  
      

  let body={"kdcabang":this.kdcabang,"namakelas":this.kelas,"kdkelas":kdkelas,"stssimpan":'3'}





  this.authService.s_masterkelaskamar(body)
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
        title: 'Hapus Kamar Induk?',
        text: 'Yakin Akan Menghapus Kamar Induk',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {



          let body = {"indukkamar":this.namatamplates,"kdindukkamar":a,
      "kdcabang":this.kdcabang,"stssimpan":'3'
      }
    
    
      this.authService.s_masterkamarinduk(body)
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


          // swalWithBootstrapButtons.fire(
          //   'Berhasil Hapus Metode',
          //   'User Telah Terhapus Dari Database.',
          //   'success'
          // );
  
  
  
  
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

kelas:string='';


profileForm = this.fb.group({
  kelas: ['',Validators.required],





});

showedit:boolean;
showeditg:boolean;
showeditm:boolean;

golonganform = this.fb.group({
  namatamplates : ['',Validators.required],

})



metodeform = this.fb.group({

  kamarinduki : ['',Validators.required],
  kamari : ['',Validators.required],
  kelaskamari : ['',Validators.required],
  jmlbed : ['',Validators.required],


})





pilihgol(kdmetode,metode){
this.showgolongan = false;


}
pilihmetode(kdmetode,metode){
  this.showmetode = false;

}

simpantes(){




  let body={"kdcabang":this.kdcabang,"namakelas":this.kelas,"stssimpan":'1'}





this.authService.s_masterkelaskamar(body)
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


  let body={"kdcabang":this.kdcabang,"namakelas":this.kelas,"kdkelas":this.kdKelas,"stssimpan":'2'}





this.authService.s_masterkelaskamar(body)
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

tmplx(){
  this.authService.t_masterkelaskamar(this.kdcabang,'')
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
  this.authService.t_masterkelaskamar(this.kdcabang,a.target.value)
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


kdKelas:string='';

pilihtes(kdKelas,nama){


this.kdKelas = kdKelas
this.kelas = nama;

this.showedit= true;

  }

  kamarinduki:string=''
  kelaskamari:string=''
  kdkamar:any;
  pilihkamar(kdkamar,kdkelas,kdinduk,nama,jmlbed,kdindukkamar,indukkamar,namakelas){
    this.kdkamar = kdkamar
    this.kelaskamari = kdkelas
    this.kamarinduki = kdinduk
    this.kamari = nama;
    this.jmlbed = jmlbed
    this.showeditg = true;


  }
}
