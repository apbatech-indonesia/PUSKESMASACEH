import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-mtariflihat',
  templateUrl: './mtariflihat.component.html',
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
  ],
  providers: [
    DatePipe,
   
  ],
})
export class mtariflihatComponent implements OnInit {

  heading = 'Master Tarif';
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
tglb = '2013-12-12'
tgla = '2013-12-12'
myDate = new Date();
  constructor(public datepipe:DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
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
this.tglb = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tgla = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
  }
  jenistarif:any;

  golonganform = this.fb.group({
    kdtarifm : ['',Validators.required],
    kelompok : ['',Validators.required],
    jenistarif : ['',Validators.required],
  })
  
 tarifform = this.fb.group({
  namatarif : ['',Validators.required],
   
  })


  ngOnInit() {
    this.klinik()
    this.tmppuser()
    this.tampilkelompok()
  
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

this.authService.tarifm(this.kdcabang,'2',a.target.value)
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
     


      let body = {"statusaktif":'1',
      "kdkelompok":a,"kelompok":b,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3',"jenistarif":this.jenistarif
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

      let body = {"statusaktif":'0',
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
namakus:any;
kdtarif:any;
xxxx:number=0;

 open(content,a,c,kdkostumerd,nama,alamat,hp,tglberlaku,tglberakhir) {
  // open(content,x.kdkostumer,'2',x.kdkostumerd,
  // x.nama,x.alamat,x.hp)"
this.cosshowd = c;


this.kdkelompok  = a;

this.namakus = nama




if(c == '2'){
  // this.Kostumerd = nama;
  // this.alamatd = alamat;
  // this.hpd = hp;
  // this.kdKostumerd = kdkostumerd.
  
  this.jasaklinik=0;
  this.jasapel=0;
  this.jasadokter=0;
  this.jasasewa=0;
  this.jasaalat=0;
  this.jasaasisdok=0;
  this.totaltarif = 0;
  this.jasajp = 0;
  this.jasdokp = 0;
  

  this.jenist = hp;
  this.kdkelompok = a;
  this.kdtarif = kdkostumerd;
  this.namatarif = nama;
  this.totaltarif = alamat;
  this.tglb = tglberlaku;
  this.tgla = tglberakhir
  var x :string;


  this.authService.tarifkomponen(this.kdcabang,kdkostumerd)
  .subscribe(
    data => {
    


      
  // x = Array.prototype.map.call(data,s=>s.kdkomponen).toString();

for (let product of data )
{


 
  var y = parseInt(product.harga)
 console.log(y);


   if (product.kdkomponen =='1' ){ 
    //  return product;
  
 

    this.jasaklinik = y;

   

   }else if(product.kdkomponen =='2'){

    this.jasapel = y

  }else if(product.kdkomponen =='3'){

    this.jasadokter = y

  }else if(product.kdkomponen =='4'){


    this.jasasewa = y

  }else if(product.kdkomponen =='5'){

    this.jasaalat = y

  }else if(product.kdkomponen =='6'){
    this.jasaasisdok = y

    
   }else if(product.kdkomponen =='7'){
    this.jasajp = y

    
   }else if(product.kdkomponen =='8'){
    this.jasdokp = y

   }else{

   }
}




  },
    Error => {
  
     console.log(Error)
    }
  )



}else if(c == '1'){

  this.jasaklinik=0;
this.jasapel=0;
this.jasadokter=0;
this.jasasewa=0;
this.jasaalat=0;
this.jasaasisdok=0;
this.totaltarif = 0;
this.jasajp = 0;
this.jasdokp = 0;


this.jenist = 'RJ';


this.namatarif = '';

}else{

}


  this.modalService.open(content).result.then((result) => {


 
  
  
  }, (reason) => {
   
  });
}



editshow:boolean;
openc(contentc,sts,a,b,kode,jenis) {


this.editshow = sts;
  if(sts === '1'){
    this.kdkelompok = '';
    this.statusaktif = '';
    this.kelompok = '';
    this.kdtarifm= '';
    
  }else if(sts === '2'){
this.kdkelompok = a;
this.kelompok = b;
this.kdtarifm = kode
this.jenistarif = jenis;




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
  this.authService.tarifm(this.kdcabang,'1','')
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

  let body = {"statusaktif":this.statusaktif,
  "kdkelompok":this.kdkelompok,"kode":this.kdtarifm,"nama":this.kelompok,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2'
  }




  // console.log(body)

  this.authService.simpanmtarif(body)
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
kdtarifm='';

simpankelompok(){
  

  let body = {"statusaktif":this.statusaktif,"jenistarif":this.jenistarif,
  "kdkelompok":this.kdkelompok,"kode":this.kdtarifm,"nama":this.kelompok,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1'
  }



  // console.log(body)

  this.authService.simpanmtarif(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tampilkelompok()
      this.kdkelompok = '';
      this.statusaktif = '';
      this.kelompok = '';
      this.kdtarifm= '';

    
      this.modalService.dismissAll()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })



}

tcusd:any;
judulnama:any;
lihat(a,b){

  this.kdkelompok = a;
  this.judulnama = b;
  this.tarifdetailx()
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

ttarifd:any;

tarifdetailx(){
  this.authService.tarifdetail(this.kdcabang,'1','',this.kdkelompok,'')
  .subscribe(
    data => {
    
 this.ttarifd = data;
 
 
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
 
 
let body ={
  "jenist":this.jenist,
  "jasaklinik":this.jasaklinik,"jasadokter":this.jasadokter,"jasapel":this.jasapel,"jasasewa" : this.jasasewa,"jasaalat":this.jasaalat,"jasaasisdok":this.jasaasisdok,
  "nama":this.namatarif,"harga":this.totaltarif,"kdtarifm":this.kdkelompok,
  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1',"tglb":this.tglb,"tgla":this.tgla,
  "jasajp":this.jasajp,"jasdokp":this.jasdokp
}

  console.log(body)
  this.authService.simpantarifdetail(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.tarifdetailx()



    this.jasaklinik=0;
    this.jasapel=0;
    this.jasadokter=0;
    this.jasasewa=0;
    this.jasaalat=0;
    this.jasaasisdok=0;
    this.totaltarif = 0;
    this.jasajp = 0;
    this.jasdokp = 0;
    
    this.namatarif =''


    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })





}


editkd(){
  let body ={
    "kdtarif":this.kdtarif,
    "jenist":this.jenist,
    "jasaklinik":this.jasaklinik,"jasadokter":this.jasadokter,"jasapel":this.jasapel,"jasasewa" : this.jasasewa,"jasaalat":this.jasaalat,"jasaasisdok":this.jasaasisdok,
    "nama":this.namatarif,"harga":this.totaltarif,"kdtarifm":this.kdkelompok,
    "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'2',"tglb":this.tglb,"tgla":this.tgla,
    "jasajp":this.jasajp,"jasdokp":this.jasdokp
  }
  
    console.log(body)
    this.authService.simpantarifdetail(body)
    .subscribe(response => {
    
   
  
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
  
        this.tarifdetailx()
  
  
  
      this.jasaklinik=0;
      this.jasapel=0;
      this.jasadokter=0;
      this.jasasewa=0;
      this.jasaalat=0;
      this.jasaasisdok=0;
      this.totaltarif = 0;
      this.jasajp = 0;
      this.jasdokp = 0;

  
      this.namatarif =''
  
  

      this.modalService.dismissAll()
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })
  
  

}

onChange(deviceValue) {
  console.log(deviceValue);


  this.authService.tarifdetail(this.kdcabang,'2','',this.kdkelompok,deviceValue)
  .subscribe(
    data => {
    
 this.ttarifd = data;
 
 
  },
    Error => {
  
     console.log(Error)
    }
  )


}
jenistc='RJ';

jenist='RJ';
cariuserxx(a){
 
  this.authService.tarifdetail(this.kdcabang,'2',a.target.value,this.kdkelompok,this.jenistc)
  .subscribe(
    data => {
    
 this.ttarifd = data;
 
 
  },
    Error => {
  
     console.log(Error)
    }
  )
}

Aktifx(kdtarifm,kdtarif,
  nama,harga,statust){

    this.kdkelompok = kdtarifm
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Hapus?',
      text: 'Apakah Ingin Hapus Tarif',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
       
  
      
        let body ={
          "kdtarif":kdtarif,
          "jenist":this.jenist,
          "jasaklinik":this.jasaklinik,"jasadokter":this.jasadokter,"jasapel":this.jasapel,"jasasewa" : this.jasasewa,"jasaalat":this.jasaalat,"jasaasisdok":this.jasaasisdok,
          "nama":this.namatarif,"harga":this.totaltarif,"kdtarifm":kdtarifm,
          "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'3',
          "jasajp":this.jasajp,"jasdokp":this.jasdokp
        }
        
          console.log(body)
          this.authService.simpantarifdetail(body)
          .subscribe(response => {
          
         
        
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
          
        
              this.tarifdetailx()
        
        
        
            this.jasaklinik=0;
            this.jasapel=0;
            this.jasadokter=0;
            this.jasasewa=0;
            this.jasaalat=0;
            this.jasaasisdok=0;
            this.totaltarif = 0;
           this.jasajp = 0;
      this.jasdokp = 0;
      
            this.namatarif =''
        
        
      
            this.modalService.dismissAll()
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })
        

      
  
        // swalWithBootstrapButtons.fire(
        //   'Berhasi',
        //   'Berhasil Hapus '+ nama ,
        //   'success'
        // );
  
  
  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
  
      
     
  
        
        swalWithBootstrapButtons.fire(
          'Batal',
          'Batal Hapus' + nama ,
          'error'
        );
      }
    });
  }



  namatarif:string='';
  jasaklinik:number=0;
  jasapel:number=0;
  jasadokter:number=0;
  jasasewa:number=0;
  jasaalat:number=0;
  jasaasisdok:number=0;
  totaltarif:number=0;
  jasajp:number=0;
  jasdokp:number=0;


  cjasaklinik(a){
  

    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp



  }

  cjasapel(a){



    console.log( this.jasaklinik , this.jasapel , this.jasadokter , this.jasasewa
      ,this.jasaalat,this.jasaasisdok)
   
    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }
  cjasadokter(a){
 
    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }

  cjasasewa(a){
  
    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }

  cjasaalat(a){

    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }
  cjasajp(a){
    
    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }


  cjasdokp(a){
    
    this.totaltarif = 
    this.jasaklinik + this.jasapel + this.jasadokter + this.jasasewa
    +this.jasaalat+this.jasaasisdok+this.jasajp+this.jasdokp
  }
}
