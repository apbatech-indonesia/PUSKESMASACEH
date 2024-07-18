import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'app-assperawat',
  templateUrl: './assperawat.component.html',
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
export class assperawatComponent implements OnInit {

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
  this.authService.t_mperawat(this.kdcabang,'')
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

  
    let body = {"nama":this.namadokter,"jenis":this.online,
    "kdcabang":this.kdcabang,"stssimpan":'1'
    }
  
  
    this.authService.s_mperawat(body)
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

this.authService.t_mperawat(this.kdcabang,a.target.value)
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
  let body = {"nama":this.namadokter,"jenis":this.online,"kdperawat":this.kdtindakan,
  "kdcabang":this.kdcabang,"stssimpan":'2'
  }


  this.authService.s_mperawat(body)
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

 delete(kdtindakan,nama,jenis){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus Tindakan?',
      text: 'Yakin Akan Menghapus Tindakan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {


           

        let body = {"nama":nama,"jenis":jenis,"kdperawat":kdtindakan,
        "kdcabang":this.kdcabang,"stssimpan":'3'
        }
      
      
        this.authService.s_mperawat(body)
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


  dokterform = this.fb.group({
    namadokter : ['',Validators.required],
    online : ['',Validators.required],

     
    })
  



    kdtindakan:any;

  pilihtindakan(a,b,c){
this.kdtindakan = a;
this.namadokter = b;
this.online = c;
this.showedit = true;

  }
}
