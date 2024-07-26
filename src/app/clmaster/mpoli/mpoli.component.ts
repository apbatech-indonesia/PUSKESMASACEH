import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FarmasijualService } from '../kasirfarmasijual/farmasijual.service';
@Component({
  selector: 'app-mpoli',
  templateUrl: './mpoli.component.html',
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
export class MpoliComponent implements OnInit {

  heading = 'Master Poliklinik';
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
nampoli='';
kdpoli='';
polibpjs:any='';
  constructor(
    public FarmasijualService:FarmasijualService,
    private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
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
  poliform = this.fb.group({
    nampoli : ['',Validators.required],
    hakakses : ['',Validators.required],


    })

tpolibpjs:any;

  ngOnInit() {
    this.klinik()
    // this.tmppuser()
    this.kl()

    this.authService.cekpoli()
    .subscribe(
      data => {
        this.tpolibpjs = data.response.list;
      },
      Error => {
        console.log(Error)
      }
    )

  }

  kodeorg:any='';
  diskripsipoli:any='';
  hp:any='';
  email:any='';
  kodepos:any=''
  longtitude:number;
  latitude:number;

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

for(let x of data){
  this.kodeorg=x.kodeorg

}


    },
      Error => {
    
       console.log(Error)
      }
    )


  

    
    


  }

  kl(){
    this.authService.poli(this.kdcabang)
    .subscribe(
      data => {
      
this.poliklinik = data;

    },
      Error => {
    
       console.log(Error)
      }
    )

  }
  hakakses:string='';

  simpan(){
   

    // console.log(this.kdklinik,this.kdcabang,this.kdpoli,this.nampoli,'1')
    this.authService.simpanpoli(this.kdklinik,this.kdcabang,this.kdpoli,this.nampoli,'1',this.hakakses,this.polibpjs).then(data =>{
    

 if(data ){
  this.toastr.success(''+data, 'Sukses', {
    timeOut: 2000,
  });
  this.kdpoli='';
  this.nampoli = '';

  setTimeout(() => {
    this.batal()
    this.kl()
  }, 200);

  
 }else{
  this.toastr.error('Simpan User Gagal', 'Eror');

 }
  
  
  })




  }

tmpusers:any;
  tmppuser(){
    this.authService.gudang(this.kdklinik)
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

this.authService.caripoli(this.kdcabang,a.target.value)
.subscribe(data => {
  this.poliklinik = data;

 
 
})

  }
  showedit:boolean;
 edit(a,b,c,d){

  this.kdpoli=a;
  this.nampoli = b;
  this.hakakses = c;
  this.polibpjs = d;
  this.showedit= true;
 
 }
batal(){
  this.kdpoli='';
this.nampoli = '';
  this.showedit = false;
}
 edituser(){
  this.authService.simpanpoli(this.kdklinik,this.kdcabang,this.kdpoli,this.nampoli,'2',this.hakakses,this.polibpjs).then(data =>{


if(data ){
this.toastr.success(''+data, 'Sukses', {
  timeOut: 2000,
});
this.kdpoli='';
this.nampoli = '';
setTimeout(() => {
  this.batal()
  this.kl()
}, 200);
}else{
this.toastr.error('Simpan User Gagal', 'Eror');

}


})

 }

 delete(a){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus Poliklinik?',
      text: 'Yakin Akan Menghapus Poliklinik',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {



        this.authService.simpanpoli(this.kdklinik,this.kdcabang,a,this.nampoli,'3',this.hakakses,this.polibpjs).then(data =>{
        
        
          if(data === 200){
            this.toastr.success('Berhasil', 'Sukses', {
              timeOut: 2000,
            });
                setTimeout(() => {
            this.kl()
              
          }, 200);
         
          }else if(data === 201){
            this.toastr.error('Poli ini sudah ada transaksi', 'Error');
          }
        
    
      
      })
    
// setTimeout(() => {
//   this.kl()
    
// }, 200);

        // swalWithBootstrapButtons.fire(
        //   'Berhasil Hapus Poliklinik',
        //   'Poliklinik Telah Terhapus Dari Database.',
        //   'success'
        // );




      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       
      }
    });
  
 }
 kodepoli:any=''
 idsatusehat:any='';

 maping(content,a,b,c,idsatusehat,kodepos,hp,
  email,diskripsipoli,longtitude,latitude) {

  this.kodepoli=a;
  this.nampoli = b;

  this.idsatusehat = idsatusehat;
  this.kodepos = kodepos;
  this.hp = hp;
  this.email = email;
  this.diskripsipoli = diskripsipoli;
  this.longtitude = longtitude;
  this.latitude = latitude;
  
 
 

   this.modalService.open(content).result.then((result) => {
 

    

   
   }, (reason) => {
   
    
   });
 }

 simpanlokasi(){
//   $idlokas = $data->idlokas;
// $kodepos = $data->kodepos;
// $hp = $data->hp;
// $email = $data->email;
// $diskripsipoli = $data->diskripsipoli;
// $longtitude = $data->longtitude;
// $latitude = $data->latitude;
// $kdpoli = $data->kdpoli;
// $kdcabang = $data->kdcabang;
const headers = new HttpHeaders({
  'kd-cabang': this.kdcabang

});

var idlokasi=0  
console.log(headers)

let bodyss={
"data":{

        "organizationId": this.kodeorg,
        "identifierValue": this.kodepoli,
        "status": "active",
        "name": this.nampoli,
        "description": this.diskripsipoli ,
        "mode": "instance",
        "telecom": [
            {
                "system": "phone",
                "value": this.hp,
                "use": "work"
            },
            {
                "system": "fax",
                "value": "2329",
                "use": "work"
            },
            {
                "system": "email",
                "value": this.email
            },
            {
                "system": "url",
                "value": "http://sampleorg.com/southwing",
                "use": "work"
            }
        ],
        "address": {
            "use": "work",
            "line": "Gd. Prof. Dr. Sujudi Lt.5, Jl. H.R. Rasuna Said Blok X5 Kav. 4-9 Kuningan",
            "city": "Jakarta",
            "postalCode": this.kodepos,
            "country": "ID",
            "extension": [
                {
                    "url": "province",
                    "valueCode": "10"
                },
                {
                    "url": "city",
                    "valueCode": "1010"
                },
                {
                    "url": "district",
                    "valueCode": "1010101"
                },
                {
                    "url": "village",
                    "valueCode": "1010101101"
                },
                {
                    "url": "rt",
                    "valueCode": "1"
                },
                {
                    "url": "rw",
                    "valueCode": "2"
                }
            ]
        },
        "physicalType": {
            "code": "ro",
            "display": "Room"
        },
        "longitude": this.longtitude,
        "latitude": this.latitude,
        "altitude": 0

}
}

console.log(this.idsatusehat)
if(this.idsatusehat.length > 10){
  this.authService.editlokasiss(bodyss,headers,this.idsatusehat)
  .subscribe(response => {
  
   console.log(response);
  
  
    let body={
      idlokas : response.id,
      kodepos: this.kodepos,
      hp:this.hp,
      email:this.email,
      diskripsipoli:this.diskripsipoli,
      longtitude :this.longtitude,
      latitude :this.latitude,
      kdcabang:this.kdcabang,
      kdpoli:this.kodepoli
  
    }
  
       
  this.authService.simpanlokasi(body)
  .subscribe(response => {
  
    this.toastr.success('Berhasil', 'Sukses', {
      timeOut: 2000,
    });
  
  })
  
  
  }
  )

}else{

  this.authService.simpanlokasiss(bodyss,headers)
  .subscribe(response => {
  
   console.log(response);
  
  
    let body={
      idlokas : response.id,
      kodepos: this.kodepos,
      hp:this.hp,
      email:this.email,
      diskripsipoli:this.diskripsipoli,
      longtitude :this.longtitude,
      latitude :this.latitude,
      kdcabang:this.kdcabang,
      kdpoli:this.kodepoli
  
    }
  
       
  this.authService.simpanlokasi(body)
  .subscribe(response => {
  
    this.toastr.success('Berhasil', 'Sukses', {
      timeOut: 2000,
    });
  
  })
  
  
  }
  )
}
   



 }

}
