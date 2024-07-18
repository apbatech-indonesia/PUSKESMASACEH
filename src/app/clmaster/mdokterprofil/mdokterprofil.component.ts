import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-mdokterprofil',
  templateUrl: './mdokterprofil.component.html',
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
export class mdokterprofilComponent implements OnInit {

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

  constructor(private router: Router,private route: ActivatedRoute,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
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
//     this.klinik()
// this.dafatrdokter()
this.kddokter = this.route.snapshot.paramMap.get('kddokter')
this.dokter = this.route.snapshot.paramMap.get('dokter')


setTimeout(() => {
  this.tmpprofildokter()
  this.tmpprofildokterulasan()
}, 200);


  }
  status:boolean = false
  showkkk:boolean = true;
  imageSrc:any = '';
  onFileChange(event:any) {

    const fileList: FileList = event.target.files;
    const filex = fileList[0];

    if((filex.size/1048576)<=4)
    {

      this.status = false
      const file = event.target.files[0];
      
      this.status = event.target.files.length>0?true:false
      if(this.status==true){
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
          this.showkkk = false;

            this.imageSrc = reader.result;          
         }
      }
    }else{
      this.toastr.error('Berkas Foto Terlalu Besar Harus Di Bawah 4mb', 'Eror');
  
    
    }

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


tmpprofildokter(){
  this.authService.profil(this.kdcabang,this.kddokter)
  .subscribe(
    data => {
    
   this.tdokter = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )



}
tulasan:any;
pilihe(spesialis,lulusan,deskripsi,total_pengalaman){
this.sp = spesialis;
this.lulusan = lulusan;
this.diskripsi = deskripsi;
this.pengalaman = total_pengalaman;

}
tmpprofildokterulasan(){
  this.authService.ulasan(this.kdcabang,this.kddokter)
  .subscribe(
    data => {
    
   this.tulasan = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )


  
}


sp:string;
lulusan:string;
diskripsi:string;
pengalaman:string;
  simpan(){

    this.authService.simpanprofildokter(this.kdcabang,this.kddokter,this.sp,this.lulusan,this.diskripsi,this.pengalaman,this.imageSrc).then(data =>{
        
        
      if(data ){
      this.toastr.success('Berhasil', 'Sukses', {
        timeOut: 2000,
      });
      setTimeout(() => {
        
        this.batal()
        this.tmpprofildokter()

      }, 200);
      
      
      }else{
      this.toastr.error('Simpan User Gagal', 'Eror');
      
      }
      
      
      })
    
   
//     this.authService.simpandokter(this.kdklinik,this.kdcabang,this.namadokter,this.online,this.kddokter,'1',this.aktif).then(data =>{
//       this.dafatrdokter()

//  if(data ){
//   this.toastr.success(''+data, 'Sukses', {
//     timeOut: 2000,
//   });
 
//   this.kddokter = '';
//   this.namadokter = '';
// this.batal()

//  }else{
//   this.toastr.error('Simpan  Gagal', 'Eror');

//  }
  
  
//   })




  }

tmpusers:any;



  cariuserx(a){

this.authService.caridokter(this.kdcabang,a.target.value)
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
  this.sp = '';
  this.lulusan='';
  this.diskripsi='';
  this.pengalaman='';
this.showedit = false;
}
 edituser(){
  this.authService.simpandokter("", this.kdklinik,this.kdcabang,this.namadokter,this.online,this.kddokter,'2',this.aktif,'','').then(data =>{
    this.dafatrdokter()

if(data ){
this.toastr.success(''+data, 'Sukses', {
  timeOut: 2000,
});
this.kddokter = '';
this.namadokter = '';

this.batal()
}else{
this.toastr.error('Simpan  Gagal', 'Eror');

}


})

 }

 delete(kddokter,kdpoli){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus Maping?',
      text: 'Yakin Akan Menghapus Maping',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {


           

    this.authService.simpandokterpoli(this.kdklinik,this.kdcabang,kddokter,kdpoli,'3').then(data =>{
    



      if(data ){
      this.toastr.success(''+data, 'Sukses', {
        timeOut: 2000,
      });
    
    this.dokterpp(kddokter)
    
      this.kddokter = '';
      this.namadokter = '';
      
      
      }else{
      this.toastr.error('Hapus  Gagal', 'Eror');
      
      }
      
      
      })

      

        swalWithBootstrapButtons.fire(
          'Berhasil Hapus User',
          'User Telah Terhapus Dari Database.',
          'success'
        );


     

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       
      }
    });
  
 }

 closeResult: string;

 pol(){
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
 dokter:any;

 setting(content,a,b) {
   this.kddokter = a;
   this.dokter = b;
  this.pol()
  this.dokterpp(a);

    this.modalService.open(content).result.then((result) => {
  

      this.closeResult = `Closed with: ${result}`;

    
    }, (reason) => {
    
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
 

  dokterform = this.fb.group({
    sp : ['',Validators.required],
    lulusan : ['',Validators.required],
    diskripsi : ['',Validators.required],
    pengalaman : ['',Validators.required],
    
    })
  


  simpanc(){
   

    this.authService.simpandokterpoli(this.kdklinik,this.kdcabang,this.kddokter,this.selectedCity,'1').then(data =>{
    

console.log(data)

  // this.toastr.success(''+data, 'Sukses', {
  //   timeOut: 2000,
  // });

// this.dokterpp(this.kddokter)

// this.modalService.dismissAll()
if(data === 200){
  this.toastr.success('Berhasil', 'Sukses', {
    timeOut: 2000,
  });
  this.dokterpp(this.kddokter)

this.modalService.dismissAll()
}else if(data === 201){
  this.toastr.error('Sudah ada dokter tersebut di poli ini', 'Eror');
}



 
  
  
  })

  

  }
}
