import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mdiagnosa',
  templateUrl: './mdiagnosa.component.html',
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
export class MdiagnosaComponent implements OnInit {

  heading = 'Master Diagnosa Dan Tindakan';
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

  
  constructor(public toastr: ToastrService,
    private modalService: NgbModal,
    private authService:ApiserviceService , private fb: FormBuilder) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });



    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
    
  }
kddaignosa:string='';
diagnosa:string='';
freetext:string='';
kdtindakan:string='';
tindakan:string='';

hapus(a){
  let body={
    "kddiagnosa":a,
    "diagnosa":this.diagnosa,
    "freetext":this.freetext,"stssimpan":'2'
  }

  console.log(body)
  this.authService.simpandiagnosa(body)
  .subscribe(response => {


    
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.authService.diagnosa()
      .subscribe(
        data => {
        
  this.diagnos = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )

      this.kddaignosa = '';
      this.diagnosa ='';
      this.freetext = '';

  
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })


}

hapust(a){
  let body={
    "kdtindakan":a,
    "tindakan":this.tindakan,
   "stssimpan":'4'
  }

  console.log(body)
  this.authService.simpandiagnosa(body)
  .subscribe(response => {


    
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.authService.tindakan()
      .subscribe(
        data => {
        
  this.tindak = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )

      this.kddaignosa = '';
      this.diagnosa ='';
      this.freetext = '';

  
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })


}


simpant(){
  let body={
    "kdtindakan":this.kdtindakan,
    "tindakan":this.tindakan,
    "stssimpan":'3'
  }

  this.authService.simpandiagnosa(body)
  .subscribe(response => {


    
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
      this.authService.tindakan()
      .subscribe(
        data => {
        
  this.tindak = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )
  

      this.kdtindakan = '';
      this.tindakan ='';
     

  
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })

}
simpanl(){
  let body={
    "kddiagnosa":this.kddaignosa,
    "diagnosa":this.diagnosa,
    "freetext":this.freetext,"stssimpan":'1'
  }

  this.authService.simpandiagnosa(body)
  .subscribe(response => {


    
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.authService.diagnosa()
      .subscribe(
        data => {
        
  this.diagnos = data;
  
  
      },
        Error => {
      
         console.log(Error)
        }
      )

      this.kddaignosa = '';
      this.diagnosa ='';
      this.freetext = '';

  
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })

}
  type='1';

  ngOnInit() {
    this.klinik()
    this.tmppuser()
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

  simpan(){
   
//     this.authService.simpanuser(this.Username,this.password,this.namal,this.hakakses,this.kdcb,this.kdklinik).then(data =>{
//       this.tmppuser()

//  if(data ){
//   this.toastr.success('Berhasil Login', 'Sukses', {
//     timeOut: 2000,
//   });
 

//   this.Username = '';
//   this.password = '';
//   this.namal = '';
//   this.hakakses = '';
//   this.kdcb = '';

//  }else{
//   this.toastr.error('Simpan User Gagal', 'Eror');

//  }
  
  
//   })




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
console.log(a.target.value)

this.authService.caridiagnosa(a.target.value,this.type)
.subscribe(data => {
  this.diagnos = data;

 
 
})

  }


  caritindak(a){
    console.log(a.target.value)
    
    this.authService.caritindakan(a.target.value,this.type)
    .subscribe(data => {
      this.tindak = data;
    
     
     
    })
    
      }

 edit(){
 
 }

 edituser(){

 }
 opencx(content){
  this.modalService.open(content, {
       
  });
 }

 opencxx(content){
  this.modalService.open(content, {
       
  });
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


}
