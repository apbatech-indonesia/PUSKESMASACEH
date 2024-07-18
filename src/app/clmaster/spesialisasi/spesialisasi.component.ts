import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'app-spesialisasi',
  templateUrl: './spesialisasi.component.html',
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
export class spesialisasiComponent implements OnInit {

  heading = 'Master Dokter';
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
poliklinik:any;
namadokter='';
online:string='';
kddokter='';
kliniks:any;

  constructor(private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });



    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
  this.kdcabang =   this.userDetails.kdcabang;
  }

  cities12 = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];
  selectedCity: any;
  ngOnInit() {
    this.klinik()
this.dafatrdokter()
this.tmpklinik()

  }
  tklinik:any
tmpklinik(){
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
tdokter:any;

dafatrdokter(){
  this.authService.t_spesialisasi(this.kdcabang,'')
  .subscribe(
    data => {
    
   this.tdokter = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )
}




  simpan(){

  
    let body = {"nama":this.namadokter,
    "kdcabang":this.kdcabang,"stssimpan":'1',"kdpoli":this.kliniks
    }

  
  
    this.authService.s_spesialisasi(body)
    .subscribe(response => {
    
     
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
      this.dafatrdokter()
this.batal()
  
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })




   




  }

tmpusers:any;



  cariuserx(a){

this.authService.t_spesialisasi(this.kdcabang,a.target.value)
.subscribe(data => {
  this.tdokter = data;

 
 
})

  }

tdokterperpoli:any;

  dokterpp(a){
    

    this.authService.dokterperpoli(this.kdcabang,a)
    .subscribe(
      data => {
      
     this.tdokterperpoli = data;
    },
      Error => {
    
       console.log(Error)
      }
    )
  }

  edit(kddokter,namdokter,statusonline,aktif){
 
this.kddokter = kddokter;
this.namadokter = namdokter;
this.online = statusonline;
this.aktif = aktif
this.showedit = true;


 }
 aktif:string='';
showedit:boolean;
batal(){
this.dokterform.reset()
this.showedit = false;
}
 edituser(){
  let body = {"nama":this.namadokter,"kdspesial":this.kdspesialisasi,
  "kdcabang":this.kdcabang,"stssimpan":'2',"kdpoli":this.kliniks
  }


  this.authService.s_spesialisasi(body)
  .subscribe(response => {
  
   

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
    this.dafatrdokter()
this.batal()

     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })


 }

 delete(kdspesial,nama){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus Spesialisasi?',
      text: 'Yakin Akan Menghapus Spesialisasi',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {


           
        let body = {"nama":this.namadokter,"kdspesial":kdspesial,
        "kdcabang":this.kdcabang,"stssimpan":'3'
        }
      
      
        this.authService.s_spesialisasi(body)
        .subscribe(response => {
        
         
      
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
          this.dafatrdokter()
      this.batal()
      
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



 deletec(kddokter){
 
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus Spesialisasi?',
    text: 'Yakin Akan Menghapus Spesialisasi Dokter',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {


         
      let body = {"nama":this.namadokter,"kddokter":kddokter,"kdspesial":'-',
      "kdcabang":this.kdcabang,"stssimpan":'5'
      }
    
    
      this.authService.s_spesialisasi(body)
      .subscribe(response => {
      
       
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
          this.polmap()

    
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


  dokterform = this.fb.group({
    namadokter : ['',Validators.required],


     
    })
  



    kdtindakan:any;
    kdspesialisasi:any;
  pilihtindakan(a,b,c){
this.kdspesialisasi = a 
this.namadokter = b;
this.kliniks = c

this.showedit = true;

  }

  pilihklinik(a){
this.kliniks = a;


console.log(this.kliniks)
  }




spesial:any;

  setting(content,a,b) {

this.spesial = b;
this.kdspesialisasi = a;

this.pol()
this.polmap()



 this.modalService.open(content).result.then((result) => {
   
 
    
     
     }, (reason) => {
     
    
     });
   }

   pol(){
    this.authService.dokter(this.kdcabang)
    .subscribe(
      data => {
      
  this.poliklinik = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
   }

tpolmap:any;

   polmap(){
    
    this.authService.t_spesialisasimaping(this.kdcabang,this.kdspesialisasi)
    .subscribe(
      data => {
      
  this.tpolmap = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
   }
  
   simpanc(){

  
    let body = {"nama":this.namadokter,"kdspesial":this.kdspesialisasi,"kddokter":this.selectedCity,
    "kdcabang":this.kdcabang,"stssimpan":'4'
    }
  
  
    this.authService.s_spesialisasi(body)
    .subscribe(response => {
    
     
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });

        this.polmap()

  
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })




   




  }

}
