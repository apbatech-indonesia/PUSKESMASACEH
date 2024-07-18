import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { TreeNode } from 'primeng/api';
import { NodeService } from './nodeservice';

@Component({
  selector: 'app-mgudang',
  templateUrl: './mgudang.component.html',
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
export class MgudangComponent implements OnInit {

  heading = 'Master Gudang';
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

gudang='';
kdgudang='';

hakakses:string='';
files1: TreeNode[];

selectedFile: TreeNode;

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
this.kdcabang = this.userDetails.kdcabang;
   
  }
  masterform = this.fb.group({
    gudang : ['',Validators.required],
    hakakses : ['',Validators.required],



    })


    nodeSelect(event) {

      this.toastr.success(event.node.id, 'Sukses', {
        timeOut: 2000,
      });

      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Node Selected',
      //   detail: event.node.id,
      // });
    }
  
    nodeUnselect(event) {
      this.toastr.success(event.node.id, 'Un Sukses', {
        timeOut: 2000,
      });
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Node Unselected',
      //   detail: event.node.label,
      // });
    }
  ngOnInit() {
    // this.nodeService.getFiles().then((files) => (this.files1 = files));

    // this.authService.getFiles().then((files) => (
      
      
    //   this.files1 = files
      
     
    //   ));


  this.authService.getFiles()
    .then(
      data => {
      
        this.files1 = data

    },
      Error => {
    
       console.log(Error)
      }
    )

    this.klinik()
    this.tmppuser()




  }
  tdepo:any;

  // nodeSelect(event) {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Node Selected',
  //     detail: event.node.id,
  //   });
  // }

  // nodeUnselect(event) {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Node Unselected',
  //     detail: event.node.id,
  //   });
  // }
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


  simpan(){

   

       
    this.authService.simpangudang(this.kdgudang,this.gudang,this.kdklinik,this.kdcabang,'1',this.hakakses).then(data =>{

if(data === 201){

  this.toastr.error('Gudang Utama Sudah Ada Kalo Ingin Ganti silahkan Edit dulu menjadi gudang cadangan gudang utama sebelumnya', 'Eror');
}else if(data == 200){


    this.toastr.success('Berhasil Tambah Gudang', 'Sukses', {
    timeOut: 2000,
  });
  this.kdgudang='';
  this.gudang ='';
 

  setTimeout(() => {
    this.tmppuser()
  }, 150);
}

  
  
  })






  }
  batal(){
    this.kdgudang='';
    this.gudang ='';
    this.showedit = false;
  }
tmpusers:any;
  tmppuser(){
    this.authService.gudang(this.kdcabang)
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

this.authService.carigudang(this.kdcabang,a.target.value)
.subscribe(data => {
  this.tmpusers = data;

 
 
})

  }

 edit(a,b,c){

this.kdgudang = a;
this.gudang = b;
this.hakakses = c
  this.showedit = true;
 
 }

 edituser(){
  this.authService.simpangudang(this.kdgudang,this.gudang,this.kdklinik,this.kdcabang,'2',this.hakakses).then(data =>{


if(data === 201){
  this.toastr.error('Gudang Utama Sudah Ada Kalo Ingin Ganti silahkan Edit dulu menjadi gudang cadangan gudang utama sebelumnya', 'Eror');
}else if(data === 200){

this.toastr.success('Berhasil Edit Gudang', 'Sukses', {
  timeOut: 2000,
});

this.kdgudang='';
this.gudang ='';
this.showedit = false;
setTimeout(() => {
          this.tmppuser()

}, 150);
}


// if(data ){
// this.toastr.success(''+data, 'Sukses', {
//   timeOut: 2000,
// });

// this.kdgudang='';
// this.gudang ='';
// this.showedit = false;
// }else{
// this.toastr.error('Simpan User Gagal', 'Eror');

// }


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
      title: 'Hapus Gudang?',
      text: 'Yakin Akan Menghapus Gudang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.authService.simpangudang(a,this.gudang,this.kdklinik,this.kdcabang,'3','').then(data =>{
    
          

          if(data === 201){
            this.toastr.error('Gudang Sudah Di Pakai Transaksi', 'Eror');
      
          }else if(data === 200){
   this.toastr.success('Berhasil Hapus', 'Sukses', {
        timeOut: 2000,
      });
      
      this.kdgudang='';
      this.gudang ='';
      setTimeout(() => {
        this.tmppuser()
      }, 200);
          }
      
      // if(data ){
      // this.toastr.success(''+data, 'Sukses', {
      //   timeOut: 2000,
      // });
      
      // this.kdgudang='';
      // this.gudang ='';
      
      // }else{
      // this.toastr.error('Simpan User Gagal', 'Eror');
      
      // }
      
      
      })


        // swalWithBootstrapButtons.fire(
        //   'Berhasil Hapus',
        //   'Telah Terhapus Dari Database.',
        //   'success'
        // );



     





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

 showedit:boolean;
}
