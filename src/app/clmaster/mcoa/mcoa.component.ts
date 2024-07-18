import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-mcoa',
  templateUrl: './mcoa.component.html',
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
export class McoaComponent implements OnInit {

  heading = 'Master COA';
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

files1: TreeNode[];
selectedFile: TreeNode;
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
  this.toastr.success('Berhasil ', 'Sukses', {
    timeOut: 2000,
  });
  this.tmppuser()
 this.coa=''

 }else{
  this.toastr.error(' Gagal', 'Eror');

 }
  
  
  })




  }


  simpane(){
   
    this.authService.editcoa(this.kdklinik,this.kdcabang,this.kdakune,this.coae,'1').then(data =>{


 if(data ){


  if(data == 200){
    this.toastr.success('Berhasil ', 'Sukses', {
      timeOut: 2000,
    });
    this.lihatcoa(this.kdc);
   this.coa=''
  
  }else{

  }

 }else{
  this.toastr.error(' Gagal', 'Eror');

 }
  
  
  })




  }
  hapus(kdakun,parent,akun){
    this.authService.editcoa(this.kdklinik,this.kdcabang,kdakun,akun,'2').then(data =>{


      if(data ){


        if(data == 200){
          this.toastr.success(' '+data, '-', {
            timeOut: 2000,
          });
          this.lihatcoa(this.kdc);
        
        }else{
          this.toastr.error('Data Tidak bisa di hapus karena sudah di pakai', 'Eror');
     
        }
    
     
      }else{
       this.toastr.error(' Gagal', 'Eror');
     
      }
       
       
       })
     
  }
tmpusers:any;
  tmppuser(){
    this.authService.listcoa(this.kdcabang)
    .subscribe(
      data => {
      
        this.files1 = data;
      

        console.log(this.files1)


    },
      Error => {
    
       console.log(Error)
      }
    )
  }


  cariuserx(a){
console.log(a.target.value)

this.authService.caricoa(this.kdcabang,a.target.value,'1','')
.subscribe(data => {
  this.tmpusers = data;

 
 
})




  }

  cariuserxx(a){
    console.log(a.target.value)
    
    this.authService.caricoa(this.kdcabang,a.target.value,'2',this.kdc)
    .subscribe(data => {
      this.coadetail = data;
    
     
     
    })
    
    
    
    
      }

 edit(){
 
 }

 edituser(){

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
coadetail:any;
kdc:any;

 lihatcoa(a){
   console.log(a)
this.kdc = a;

   this.authService.coaper(a,this.kdcabang)
   .subscribe(
     data => {
     
this.coadetail = data;


   },
     Error => {
   
      console.log(Error)
     }
   )


 }




 open(content,a) {


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  
  swalWithBootstrapButtons.fire({
    title: 'Tambah COA',
    // text: 'Bayar Tagihan Rawat Jalan',
  
    showCancelButton: true,
  
    confirmButtonText: 'Tambah Anak',
    cancelButtonText: 'Hapus',
  
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
  
 
      this.kdparent  = a.node.key;
      this.modalService.open(content).result.then((result) => {
      
        console.log('a')
        this.closeResult = `Closed with: ${result}`;
      // this.lihatcoa(a);
      
      }, (reason) => {
        // this.lihatcoa(a);
        console.log('b')
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      
    
   
  
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
  
     
      this.authService.deletecoa(this.kdcabang, a.node.key).then(data =>{


        if(data ){
         this.toastr.success('Berhasil ', 'Sukses', {
           timeOut: 2000,
         });
         this.tmppuser()
        this.coa=''
       
        }else{
         this.toastr.error(' Gagal', 'Eror');
       
        }
         
         
         })
  
  
  
    }
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
kdparente:any;
kdakune:any;
coae:any;

opene(contente,kdakun,parent,akun){

  this.kdparente = parent;
  this.kdakune = kdakun;
  this.coae = akun;

  this.modalService.open(contente).result.then((result) => {

    console.log('a')
    this.closeResult = `Closed with: ${result}`;
// this.lihatcoa(a);
  
  }, (reason) => {
    // this.lihatcoa(a);
    console.log('b')
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

}
