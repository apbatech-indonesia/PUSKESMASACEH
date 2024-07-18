import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mcabang',
  templateUrl: './mcabang.component.html',
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
export class McabangComponent implements OnInit {

  heading = 'Master Cabang';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  options: FormGroup;
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  cabangarr:any;

  cariuser:any;
  cabang='';
  alamat='';
  hp='';
  kdcabang='';
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
    
  }

showedit:boolean;
masterform = this.fb.group({
  cabang : ['',Validators.required],
  alamat : ['',Validators.required],
  hp : ['',Validators.required],




  })

  ngOnInit() {
    this.klinik()
    this.tmppuser()
    this.tmx()
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

  tmx(){
    this.authService.cabangper(this.kdklinik)
    .subscribe(
      data => {
      
this.cabangarr = data;

    },
      Error => {
    
       console.log(Error)
      }
    )
    
  }

  simpan(){


// console.log(this.cabang,this.alamat,this.hp,this.kdcabang,'1')


   
    this.authService.simpancabang(this.cabang,this.alamat,this.hp,this.kdcabang,'1',this.kdklinik).then(data =>{


            this.tmx()

 if(data ){
  this.toastr.success(''+data, 'Sukses', {
    timeOut: 2000,
  });
 

  this.cabang='';
  this.alamat='';
  this.hp='';
  this.kdcabang='';

 }else{
  this.toastr.error('Simpan  Gagal', 'Eror');

 }
  
  
  })




  }

tmpusers:any;
  tmppuser(){
    this.authService.tampiluser(this.kdcabang)
    .subscribe(
      data => {
      
this.tmpusers = data;


    },
      Error => {
    
       console.log(Error)
      }
    )
  }


  cariuserx(a){
console.log(a.target.value)

this.authService.caricabang(this.kdklinik,a.target.value)
.subscribe(data => {
  this.cabangarr = data;

 
 
})

  }

 edit(kdcabang,nama,alamat,hp,kdklinik){
  console.log(kdcabang,nama,alamat,hp,kdklinik)
this.cabang = nama;
this.kdcabang = kdcabang;
this.alamat = alamat;
this.hp = hp
this.kdklinik = kdklinik;
this.showedit = true;


 }

 edituser(){
 
  this.authService.simpancabang(this.cabang,this.alamat,this.hp,this.kdcabang,'2',this.kdklinik).then(data =>{


    this.tmx()


    console.log(data);

if(data ){
this.toastr.success(''+data, '-', {
timeOut: 2000,
});


this.cabang='';
this.alamat='';
this.hp='';
this.kdcabang='';
this.showedit = false

}else{
this.toastr.error('Simpan  Gagal', 'Eror');

}


})
 }

 hapususer(){
 
  this.authService.simpancabang(this.cabang,this.alamat,this.hp,this.kdcabang,'3',this.kdklinik).then(data =>{


 

    
if(data ){

if(data == 201){
  this.toastr.error('Tidak bisa di hapus karena sudah ada transaksi', 'Error');
  this.cabang='';
  this.alamat='';
  this.hp='';
  this.kdcabang='';

  this.showedit = false
}else{

 this.toastr.success('Berhasil Hapus', '-', {
timeOut: 2000,
});

this.tmx()

this.cabang='';
this.alamat='';
this.hp='';
this.kdcabang='';

this.showedit = false
}

 

}else{
this.toastr.error('Simpan  Gagal', 'Eror');

}


})
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
