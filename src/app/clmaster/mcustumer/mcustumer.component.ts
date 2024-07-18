import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-mcustumer',
  templateUrl: './mcustumer.component.html',
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
export class McustumerComponent implements OnInit {

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
    
  }


  ngOnInit() {
    this.klinik()
    this.tmppuser()
    this.tampilkelompok()
    this.authService.tarifm(this.kdcabang,'1','')
    .subscribe(
      data => {
      
  this.tcus = data;
  
  
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

  simpanc(){
   
    this.authService.nocoa(this.kdklinik,this.kdcabang,this.kdparent,this.coa).then(data =>{


 if(data ){
  this.toastr.success('Berhasil Login', 'Sukses', {
    timeOut: 2000,
  });
  this.lihatcoa(this.kdparent);
 this.coa=''

 }else{
  this.toastr.error('Simpan User Gagal', 'Eror');

 }
  
  
  })




  }

tmpusers:any;
  tmppuser(){
    this.authService.coa(this.kdcabang)
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

this.authService.kostumer(this.kdcabang,'2',a.target.value)
.subscribe(
  data => {
  
this.tkelompok = data;


},
  Error => {

   console.log(Error)
  }
)
  }

 edit(){
 
 }

 edituser(){

 }

 kelompokform = this.fb.group({
  kelompok : ['',Validators.required],
  cusi : ['',Validators.required],
})


kostumerform = this.fb.group({
  Kostumerd : ['',Validators.required],
  alamatd : ['',Validators.required],
  hpd : ['',Validators.required],
})




 Aktif(a,b){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Status?',
    text: 'Apakah Ingin Merubah Status Kelompok',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aktif',
    cancelButtonText: 'Non Aktif',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
     


      let body = {"statusaktif":'1',"keltarif":'',
      "kdkelompok":a,"kelompok":b,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'4'
      }
    
    
    
      // console.log(body)
    
      this.authService.simpankelompok(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tampilkelompok()
          this.kdkelompok = '';
          this.statusaktif = '';
          this.kelompok = '';
    
        
          this.modalService.dismissAll()
      
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })

      swalWithBootstrapButtons.fire(
        'Aktif',
        'Kelompok Pasien '+ b + ' Aktif',
        'success'
      );



    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {

      let body = {"statusaktif":'0',"keltarif":'',
      "kdkelompok":a,"kelompok":b,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'
      }
    
    
    
      // console.log(body)
    
      this.authService.simpankelompok(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
      
    
          this.tampilkelompok()
          this.kdkelompok = '';
          this.statusaktif = '';
          this.kelompok = '';
    
        
          this.modalService.dismissAll()
      
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
    
    
    
    
    
      })

      
      swalWithBootstrapButtons.fire(
        'Non Aktif',
        'Kelompok Pasien '+b+' Non Aktif',
        'error'
      );
    }
  });
 }

coadetail:any;

 lihatcoa(a){


 }





cosshowd:boolean;
 open(content,a,c,kdkostumerd,nama,alamat,hp) {
  // open(content,x.kdkostumer,'2',x.kdkostumerd,
  // x.nama,x.alamat,x.hp)"
this.cosshowd = c;


this.kdkelompok  = a;

if(c == '2'){
  this.Kostumerd = nama;
  this.alamatd = alamat;
  this.hpd = hp;
  this.kdKostumerd = kdkostumerd
}else{
  this.Kostumerd = "";
  this.alamatd = "";
  this.hpd = "";
  this.kdKostumerd = ""




}


  this.modalService.open(content).result.then((result) => {


 
  
  
  }, (reason) => {
   
  });
}

cusi:string='';
tcus:any;


editshow:boolean;
openc(contentc,sts,a,b,c) {


this.editshow = sts;
  if(sts === '1'){
    this.kdkelompok = '';
    this.kelompok = '';
    this.cusi = ''
  }else if(sts === '2'){
this.kdkelompok = a;
this.kelompok = b;
this.cusi = c


  }else{

  }

    this.modalService.open(contentc).result.then((result) => {
  

      
    
    }, (reason) => {
   
    
    });
  }




private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}




kdkelompok='';
kelompok='';
kdcustomer=''
statusaktif='';

tkelompok
tampilkelompok(){
  this.authService.kostumer(this.kdcabang,'1','')
  .subscribe(
    data => {
    
this.tkelompok = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

}


editkel(){
  let body = {"statusaktif":this.statusaktif,"keltarif":this.cusi,
  "kdkelompok":this.kdkelompok,"kelompok":this.kelompok,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
  }



  // console.log(body)

  this.authService.simpankelompok(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tampilkelompok()
      this.kdkelompok = '';
      this.statusaktif = '';
      this.kelompok = '';

    
      this.modalService.dismissAll()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })

 
}

simpankelompok(){
  

  let body = {"statusaktif":this.statusaktif,"keltarif":this.cusi,
  "kdkelompok":this.kdkelompok,"kelompok":this.kelompok,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
  }



  // console.log(body)

  this.authService.simpankelompok(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tampilkelompok()
      this.kdkelompok = '';
      this.statusaktif = '';
      this.kelompok = '';

    
      this.modalService.dismissAll()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })



}

tcusd:any;
lihat(a){

  this.kdkelompok = a;
  this.tmpcusd()
}
tmpcusd(){


 this.authService.kostumerd(this.kdcabang,'1','',this.kdkelompok)
 .subscribe(
   data => {
   
this.tcusd = data;


 },
   Error => {
 
    console.log(Error)
   }
 )


}



Kostumerd='';
alamatd='';
hpd='';
kdKostumerd='';
simpankd(){
  let body = {"statusaktif":'',
  "kdkelompok":this.kdkelompok,"kdkostumerd":this.kdKostumerd,
  "nama":this.Kostumerd,"alamat":this.alamatd,"hp":this.hpd,
  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
  }


  console.log(body)
  this.authService.simpancustomerd(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tmpcusd()


      this.Kostumerd='';
      this.alamatd='';
      this.hpd='';
      this.kdKostumerd='';
      this.modalService.dismissAll()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })





}


editkd(){
  let body = {"statusaktif":'',
  "kdkelompok":this.kdkelompok,"kdkostumerd":this.kdKostumerd,
  "nama":this.Kostumerd,"alamat":this.alamatd,"hp":this.hpd,
  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
  }


  console.log(body)
  this.authService.simpancustomerd(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tmpcusd()


      this.Kostumerd='';
      this.alamatd='';
      this.hpd='';
      this.kdKostumerd='';
      this.modalService.dismissAll()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })

}


cariuserxx(a){
  this.authService.kostumerd(this.kdcabang,'2',a.target.value,this.kdkelompok)
  .subscribe(
    data => {
    
 this.tcusd = data;
 
 
  },
    Error => {
  
     console.log(Error)
    }
  )
}

Aktifx(kdkostumer,kdkostumerd,
  nama,alamat,hp){

    this.kdkelompok = kdkostumer
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Status?',
      text: 'Apakah Ingin Merubah Status Costumer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aktif',
      cancelButtonText: 'Non Aktif',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
       
  
        let body = {"statusaktif":'1',
        "kdkelompok":this.kdkelompok,"kdkostumerd":kdkostumerd,
        "nama":this.Kostumerd,"alamat":this.alamatd,"hp":this.hpd,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'
        }
      
    
        this.authService.simpancustomerd(body)
        .subscribe(response => {
        
         
      
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        
      


          

            this.tmpcusd()
      
      
            this.Kostumerd='';
            this.alamatd='';
            this.hpd='';
            this.kdKostumerd='';
          
        
          
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
      
      
      
      
      
        })

        

      
  
        swalWithBootstrapButtons.fire(
          'Aktif',
          'Kelompok Pasien '+ nama + ' Aktif',
          'success'
        );
  
  
  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
  
      
        let body = {"statusaktif":'0',
        "kdkelompok":this.kdkelompok,"kdkostumerd":kdkostumerd,
        "nama":this.Kostumerd,"alamat":this.alamatd,"hp":this.hpd,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3'
        }
      
      
        console.log(body)
        this.authService.simpancustomerd(body)
        .subscribe(response => {
        
       
      
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        
      
            this.tmpcusd()
      
      
            this.Kostumerd='';
            this.alamatd='';
            this.hpd='';
            this.kdKostumerd='';
        
        
          
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
      
      
      
      
      
        })
  
        
        swalWithBootstrapButtons.fire(
          'Non Aktif',
          'Kelompok Pasien '+nama+' Non Aktif',
          'error'
        );
      }
    });
  }
}
