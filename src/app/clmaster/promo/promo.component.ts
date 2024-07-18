import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
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
export class promoComponent implements OnInit {

  heading = 'Master Dokter';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';
  faSearch = faSearch;
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
@ViewChild("takeInput", {static: false})
   
// this InputVar is a reference to our input.

InputVar: ElementRef;

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
// this.kddokter = this.route.snapshot.paramMap.get('kddokter')
// this.dokter = this.route.snapshot.paramMap.get('dokter')


setTimeout(() => {
  this.tmpprofildokter()

}, 200);


  }

  statusaktif:string='';

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
  this.authService.promo(this.kdcabang,'')
  .subscribe(
    data => {
    
   this.tdokter = data;

  
  },
    Error => {
  
     console.log(Error)
    }
  )



}

caripass(a){
  this.authService.promo(this.kdcabang,a.target.value)
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
fotokos:any;

  simpan(){

console.log(this.showkkk)

    this.authService.simpanpromo(this.kdcabang,this.sp,this.diskripsi,this.statusaktif,'1',this.imageSrc,this.kdklinik,'x',this.showkkk).then(data =>{
        
        
      if(data ){
      this.toastr.success('Berhasil', 'Sukses', {
        timeOut: 2000,
      });
      setTimeout(() => {
        
     

        this.showkkk = true;
        this.tmpprofildokter()

        this.dokterform.reset()
        this.InputVar.nativeElement.value = "";
      }, 200);
      
      
      }else{
      this.toastr.error('Simpan User Gagal', 'Eror');
      
      }
      
      
      })
    
   





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
this.dokterform.reset()
this.showedit = false;
}
kdpromo:any;

pilix(kdpromo,judulpromo,keterangan,
  gambar,aktif){

    this.sp = judulpromo;
    this.diskripsi = keterangan;
    this.statusaktif = aktif;
    this.kdpromo = kdpromo
    this.showedit = true;
}
 edituser(){
  this.authService.simpanpromo(this.kdcabang,this.sp,this.diskripsi,this.statusaktif,'2',this.imageSrc,this.kdklinik,this.kdpromo,this.showkkk).then(data =>{
        
        
    if(data ){
    this.toastr.success('Berhasil', 'Sukses', {
      timeOut: 2000,
    });
    setTimeout(() => {
      
   this.showedit = true
      this.tmpprofildokter()

      this.dokterform.reset()
      this.InputVar.nativeElement.value = "";
    }, 200);
    
    
    }else{
    this.toastr.error('Simpan User Gagal', 'Eror');
    
    }
    
    
    })
  
 


 }

 delete(){
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus Promo?',
      text: 'Yakin Akan Menghapus Promo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {


           
        this.authService.simpanpromo(this.kdcabang,this.sp,this.diskripsi,this.statusaktif,'3',this.imageSrc,this.kdklinik,this.kdpromo,this.showkkk).then(data =>{
        
        
          if(data ){
          this.toastr.success('Berhasil', 'Sukses', {
            timeOut: 2000,
          });
          setTimeout(() => {
            
         this.showedit = false
            this.tmpprofildokter()
      
            this.dokterform.reset()
      
          }, 200);
          
          
          }else{
          this.toastr.error('Simpan User Gagal', 'Eror');
          
          }
          
          
          })
        

     

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
  
    diskripsi : ['',Validators.required],
    statusaktif : ['',Validators.required],
    // foto : ['',Validators.required],
    
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
