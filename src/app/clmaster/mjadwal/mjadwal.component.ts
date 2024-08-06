import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mjadwal',
  templateUrl: './mjadwal.component.html',
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
export class mjadwalComponent implements OnInit {

  heading = 'Master User';
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
  hakakses:string='';
  kdcb:string='';
  cariuser:any;

  form: FormGroup;
kdcabang:any;

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
this.kdcabang = this.userDetails.kdcabang;
this.kdcb = this.userDetails.kdcabang;
this.tmppuserx()
this.tmpjadwal()

}
tklinik:any;
kliniks:string='';
kdantrian:any=''
  tmppuserx(){
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
  pilihklinik(a){


   

    this.authService.dokterperpolix(this.kdcabang,a)
    .subscribe(
      data => {
      
 this.tdokter = data;
 
 
    },
      Error => {
    
       console.log(Error)
      }
    )
 
    
  }

profileForm = this.fb.group({
  poli: ['',Validators.required],

  kddokter: ['',Validators.required],
  kuota: ['',Validators.required],


});
poli:string='';
kddokter:string='';
senin:string='';
selasa:string='';
rabu:string='';
kamis:string='';
jumat:string='';
sabtu:string='';
minggu:string='';
kuota:string='';

// batal(){
//   this.profileForm.reset()
// }
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);

  this.profileForm.reset()
  // this.profileForm.controls.firstName.setValue('abc');
}
// submitForm() {
//   var formData: any = new FormData();
//   formData.append('name', this.form.get('name').value);
//   formData.append('avatar', this.form.get('avatar').value);

// }

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //       '';
  // }

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
  tlisthutang:any;

tmpjadwal(){
  this.authService.jadwaldokter(this.kdcabang)
  .subscribe(
    data => {
    
this.tlisthutang = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
  
}

  simpan(){
  
  
   

    let body={
      "poli":this.poli,"kddokter":this.kddokter,"senin":this.senin,"selasa":this.selasa,"rabu":this.rabu,"kamis":this.kamis,"jumat":this.jumat,"sabtu":this.sabtu,"minggu":this.minggu,"kuota":this.kuota,
      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1',"kodeantrian":this.kdantrian
 
    }


  
    this.authService.simpanjadwal(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
  
       
  
   
       setTimeout(() => {
        this.tmpjadwal()
       }, 200);
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })




  }

  showedit:boolean;

batal(){
  // this.poli = ""

  // this.kddokter =""
  
  
  this.senin=""
  this.selasa=""
  this.rabu=""
  this.kamis=""
  this.jumat=""
  this.sabtu=""
  this.minggu=""
  this.kuota=""
    this.showedit = false;
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

this.authService.cariuser(this.kdcabang,a.target.value)
.subscribe(data => {
  this.tmpusers = data;

 
 
})

  }
kduserlogin:any;

 edit(kduser,username,nama,hakakses,kdcabang){
   console.log(kduser,username,nama,hakakses,kdcabang)

   this.Username = username;
   this.namal = nama;
   this.hakakses = hakakses;
   this.kdcb = kdcabang;
   this.showedit = true;
  
this.kduserlogin = kduser
   //  this.profileForm.setValue({firstName: this.Username})
 }

 edituser(){


  let body={
    "poli":this.poli,"kddokter":this.kddokter,"senin":this.senin,"selasa":this.selasa,"rabu":this.rabu,"kamis":this.kamis,"jumat":this.jumat,"sabtu":this.sabtu,"minggu":this.minggu,"kuota":this.kuota,
    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1',"kodeantrian":this.kdantrian

  }



  this.authService.simpanjadwal(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

     

 
     setTimeout(() => {
      this.tmpjadwal()
      this.batal()
     }, 200);
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })




 }

 delete(a,b){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus User?',
      text: 'Yakin Akan Menghapus User',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
     

        this.authService.deleteuser(a,b,this.kdcabang).then(data =>{
         

          if(data === 201){

             this.toastr.error('Hapus Gagal Karena User Sudah Di buat Untuk Transaksi', 'Eror');


          }else{
setTimeout(() => {
   this.tmppuser()

}, 200);

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

 setting(a,b,c){

//   $kddokter  = $_POST["kddokter"];
// $kdklinik  = $_POST["kdklinik"];
// $username  = $_POST["username"];
// $kdcabang  = $_POST["kdcabang"];
// username,kddokter,kdcabang,kdklinik,stssimpan

console.log(this.user,a,c,this.kdklinik,'3')

  this.authService.simpanuserx(this.user,a,c,this.kdklinik,'3').then(data =>{
 

if(data ){
this.toastr.success('Berhasil', 'Sukses', {
  timeOut: 2000,
});

this.tmppuser()
this.modalService.dismissAll()


}else{
this.toastr.error('Simpan User Gagal', 'Eror');

}


})
 }


user:any;
 open(content,a,c){


  if(a === 'Dokter'){
    this.dafatrdokter()
    this.user = c
    this.modalService.open(content, {
      
    });
  }else{

  }
 
 }

 caripass(a){

  this.authService.caridokter(this.kdcabang,a.target.value)
  .subscribe(data => {
    this.tdokter = data;
  
   
   
  })
  
    }
 tdokter:any;

dafatrdokter(){
  this.authService.dokter(this.kdcabang)
  .subscribe(
    data => {
    
   this.tdokter = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )
}


kddokterb:any;
polib:any;

pilihobat(kddokter,kdpoli,senin,selasa,rabu,kamis,jumat,sabtu,minggu,kuota,nampoli,namdokter,kdantrian){


this.poli = kdpoli
this.pilihklinik(kdpoli)

this.kddokter = kddokter


this.senin=senin
this.selasa=selasa
this.rabu=rabu
this.kamis=kamis
this.jumat=jumat
this.sabtu=sabtu
this.minggu=minggu
this.kuota=kuota
this.kdantrian = kdantrian

this.showedit = true;


}

hapus(kddokter,kdpoli,senin,selasa,rabu,kamis,jumat,sabtu,minggu,kuota,nampoli,namdokter){
 
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus User?',
    text: 'Yakin Akan Menghapus User',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
   

      let body={
        "poli":kdpoli,"kddokter":kddokter,"senin":senin,"selasa":selasa,"rabu":rabu,"kamis":kamis,"jumat":jumat,"sabtu":sabtu,"minggu":minggu,"kuota":kuota,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
    
      }
    
    
    
      this.authService.simpanjadwal(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
    
         
    
     
         setTimeout(() => {
          this.tmpjadwal()
          this.batal()
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


}
