import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption,NgSelectComponent } from '@ng-select/ng-select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { McoaComponent } from '../mcoa/mcoa.component';
import { MobatComponent } from '../mobat/mobat.component';
import { SampleService } from 'src/app/services';




@Component({
  selector: 'app-glmini',
  templateUrl: './glmini.component.html',
  styles: [
   
  ],

  providers: [
    DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class glminiComponent implements OnInit {
  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = 'Master Customer';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

 
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
username:any;
tglp = '2013-12-12'
tglpx = '2013-12-12'
tglpxx = '2013-12-12'
tglpxinput = '2013-12-12'
tgldari= '2013-12-12'
tglsampai= '2013-12-12'
currentJustify = 'start';
currentJustify2 = 'center';
currentJustify3 = 'start';

currentOrientation = 'horizontal';


htmlContent = '';

config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '25rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  uploadUrl:'no',
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ], toolbarHiddenButtons: [
    [
   
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode',
      'strikeThrough',
      'subscript',
      'superscript',
    ]
  
  ]
};
FormGroup:FormGroup;
TotalRow:number;
myDate = new Date();
title = 'autocomplete';

options = ["Sam", "Varun", "Jasmine"];

filteredOptions;


formGroup : FormGroup;
// @ViewChild('TextInput3') inputSearch3: TextInput;
@ViewChild("myinput") df: ElementRef;
@ViewChild('select') select: NgSelectComponent;

@ViewChild("myinputqty") myinputqty: ElementRef;
@ViewChild("myinputdisc") myinputdisc: ElementRef;
@ViewChild("myinputtot") myinputtot : ElementRef;
@ViewChild("myinputbatch") myinputbatch :ElementRef;

@ViewChild('selectd') selectd: ElementRef;


tomboledit:boolean=true;
tombolhapus:boolean=true;
tombolbatal:boolean=true;
tombolmobat:boolean=true;
tombolcetak:boolean=true;
tombolsimpan:boolean=true;
tomboltambah:boolean=true;
showtransaksi:boolean=true;
showtr:boolean;
showsimpan:boolean=true;
hostName: string;
URLINVOICE:string
  constructor(public hots:SampleService,public router:Router,private datepipe: DatePipe,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 

this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglpxx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglpxinput = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglsampai = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

if(this.nomutasi === ''){
  this.showtr = false;

}else{
this.showtr = true;
  
}


  }
  jml:number;
  ket:string='';
  batalt(){
    this.tombolsimpan = true;
    this.tombolhapus = true;
    this.tombolcetak = true;
    this.showtransaksi = false;
    this.tombolbatal = false;
    this.nofakturbeli='';
    this.kdsuplier='';
    this.suplier ='';
    this.nofakturpajak = '';
    this.nolpb = '';
    this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
    this.tglpxx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
    this.keterangan = '';
    this.adm=0
    this.authService.transbeliobat(this.kdcabang,this.nofakturbeli,this.nolpb)
    .subscribe(
      data => {
  
        
  
        var xyzx=0;
       
        for (let productx of data )
        {
  
          var yx = parseInt(productx.TOTAL)
          xyzx += yx;
        
         
        }
        var ppn:number;
        this.totalsebelumpajak = xyzx
  ppn = (this.ppnobat * this.totalsebelumpajak) / 100;
  this.jmlppn = ppn
  this.totalsetelahppn = ppn + this.totalsebelumpajak;
  
  
  
  
  this.totalakhir = this.adm + this.totalsetelahppn;
      
  this.ttrxbeli = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  tambahmodal(){

    this.nomutasi = '';
    this.keterangan='';
    this.showtr = false;
    this.showsimpan = true
    this.trxgl()
    
      }
  tobat:any;
  nmobat:any;
  cariobat(a){
    this.authService.coax(this.kdcabang,a.target.value)
    .subscribe(
      data => {
      
       this.tobat = data;
       
   
    
    },
      Error => {
    
       console.log(Error)
      }
    )  
  }
  // date:any;
  // myFunction(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');


  //  }
   
  profileForm = this.fb.group({
    keterangan: ['',Validators.required]
    
    
  });
thasillab:any;
// ngAfterViewInit() {
//   this.myInputField.nativeElement.focus();
//   }

onKeyUpa(a){
  // console.log(a.target.value)
  // this.df.nativeElement.focus();
 


 let body={
"KDJENISOBAT":this.jenisobat,"KDOBAT":this.nmobat,"obat":this.namaobat,"SATUAN":this.ttsatuan,"HNA":this.hna,
"QTY":this.qty,"DISCPERSEN":this.disc,"DISCRP":this.discrp,"TOTAL":this.total,"NOFAKTUR":this.nofakturbeli,
"NOLPB":this.nolpb,"KDSUPLIER":this.kdsuplier,"TGLEX":this.tglpxinput,"NOBATCH":this.nobatch,
"kdcabang":this.kdcabang,"stssimpan":'2',"kdklinik":this.kdklinik,"kduser":this.username,"kdgudang":this.kdgudang

 }


 this.authService.simpanlpb(body)
 .subscribe(response => {
 


   if(response ){
     this.toastr.success(''+response, 'Sukses', {
       timeOut: 2000,
     });

  this.select.handleClearClick()
  this.ttsatuan='';
  this.hna ='';
  this.qty ='';
  this.disc ='';
  this.discrp = '';
  this.total = 0;
  this.nobatch =''
  this.trxpbeli()
 
  setTimeout(() => {
   this.select.focus()
  }, 500);

   
    }else{
     this.toastr.error('Simpan  Gagal', 'Error');
   
    }





 })



  
}
onKeyUp(a){
  // console.log(a.target.value)
  // this.df.nativeElement.focus();
  this.select.focus()

 
  
}

tsatuan:any;
ttsatuan:any;
hna:any;
qty:any;
disc:any;
discrp:any;
total:number;
nobatch:any;
namaobat:string='';
tipe:string='0';

onobat(a){
  console.log(this.nmobat)

this.selectd.nativeElement.focus()


}
ontipe(a){
  this.myinputtot.nativeElement.focus()

}
jenisobat:any;
onobatx(a){
  
  this.myinputtot.nativeElement.focus()


}
onjlml(a){
  this.myinputbatch.nativeElement.focus()

}
stok:number;
tmutasi:any;

trxmutasix(){
  this.authService.trxmutasiin(this.kdcabang,this.nomutasi)
  .subscribe(
    data => {
    
     this.tmutasi = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  
}

tjumlahbawah:any;

trxgl(){
  this.authService.coad(this.kdcabang,this.nomutasi)
  .subscribe(
    data => {
    
     this.tmutasi = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  


  this.authService.coadbawah(this.kdcabang,this.nomutasi)
  .subscribe(
    data => {
    
     this.tjumlahbawah = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  


}




prosesglbatal(){
  let body={
    "tgldari":this.tgldari,
    "kdcabang":this.kdcabang,"stssimpan":'5',"kdklinik":this.kdklinik,"kduser":this.username
   }
 
 
 
   this.authService.simpangl(body)
   .subscribe(response => {
   
  
 
     if(response ){
       this.toastr.success(''+response, 'Sukses', {
         timeOut: 2000,
       });
       setTimeout(() => {
         
        this.trxgl()
        this.jml = 0;
        this.ket = '';
        this.select.handleClearClick()

  
      }, 200);
 
 
   
       
    
     
      }else{
       this.toastr.error('Simpan  Gagal', 'Error');
     
      }
 
 
 
 
 
   })
}
prosesgl(){
  


  let body={
   "tgldari":this.tgldari,
   "kdcabang":this.kdcabang,"stssimpan":'4',"kdklinik":this.kdklinik,"kduser":this.username
  }



  this.authService.simpangl(body)
  .subscribe(response => {
  
 

    if(response ){
      // this.toastr.success(''+response, 'Sukses', {
      //   timeOut: 2000,
      // });



      if(response === 201){
        this.toastr.error('Bulan Ini Sudah Di Proses Silahkan Batal Proses Dulu', 'Error');
    
      }else if(response === 200){
        setTimeout(() => {
        
          this.trxgl()
          this.jml = 0;
          this.ket = '';
          this.select.handleClearClick()
  
    
        }, 200);

           this.toastr.success('Berhasil', 'Sukses', {
        timeOut: 2000,
      });


  
      }
   
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Error');
    
     }





  })
}
ondisc(a){


console.log(this.disc)

 if(this.disc === null){

 }else if(this.disc === undefined){

 
 }else{
let jumlah :number;
  jumlah = (this.disc * this.total) / 100;

this.total = this.total - jumlah;

 }
 
 this.myinputdisc.nativeElement.focus()
 

}
ontot(a){

  
 if(this.discrp === null){

}else if(this.discrp === undefined){


}else{
  this.total = this.total - this.discrp;

}




  this.myinputtot.nativeElement.focus()

  // this.select.focus()
}

onKeyUpaxx(a){



  this.myinputbatch.nativeElement.focus()

  // this.select.focus()
}
  ngOnInit() {

    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';
    this.tmpgudang()
  
   
    // this.initForm();
    // this.getNames();
   
    // this.tmptarif()
   
    
    // this.FormGroup = this.fb.group({
    //   itemRows:this.fb.array([this.initItemRow()]),});
 
    }
 
    initForm(){
      this.formGroup = this.fb.group({
        'employee' : ['']
      })
      this.formGroup.get('employee').valueChanges.subscribe(response => {
        console.log('data is ', response);
        this.filterData(response);
      })
    }
  
    filterData(enteredData){
      this.filteredOptions = this.options.filter(item => {
        return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
      })
    }
  
    getNames(){
      this.authService.getData().subscribe(response => {
 
        this.filteredOptions = response;
      })
    }

    // initItemRow(){
    //   return this.fb.group({
    //      Name:[''],
    //      RolNo:[''],
    //      class:[''],
    //      MobileNo:['']
    //   });
    // }
    // addNewRow(){
    //   const control = <FormArray>this.FormGroup.controls['itemRows'];
    //    control.push(this.initItemRow());
       
    // }

    // deleteRow(index:number){
    //   const control  = <FormArray>this.FormGroup.controls['itemRows'];
    //  if(control != null){
    //     this.TotalRow = control.value.length;
    //  }
    //   if(this.TotalRow >1){
    //     control.removeAt(index);
    //  }else{
    //     alert('One record is mandatory.');
    //     return false;
    //  }
    
    // }

nofakturbeli:any;
suplier:any;
kdsuplier:any;
kdbayar:any;
kdgudang:any;
nofakturpajak:any;
nolpb:any;
keterangan:any;


    tambah(){
     
      
    

      let body={
        "nomutasi":this.nomutasi,"keterangan":this.keterangan,"tglgl":this.tglpx,
       "kdcabang":this.kdcabang,"stssimpan":'1',"kdklinik":this.kdklinik,"user":this.username
      }
    

    
      this.authService.simpangl(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });

          setTimeout(() => {
            
          this.nomutasi = response;

          console.log(this.nomutasi)
          this.showtr = true;
      
          }, 200);

        
         }else{
          this.toastr.error('Simpan  Gagal', 'Error');
        
         }
    
    
    
    
    
      })



    }

    


    tgudang:any;


    ppnobat:any;

tmpgudang(){
  this.authService.gudangcab(this.kdklinik,this.kdcabang)
  .subscribe(
    data => {
    
this.tgudang = data;


  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.cabangbyid(this.kdklinik,this.kdcabang)
  .subscribe(
    data => {
    

      for (let x of data )
      {
this.ppnobat = x.ppnobat;
      }


  },
    Error => {
  
     console.log(Error)
    }
  )





}
tsupplier:any;
tsupshow:boolean;
carisup(a){


  if(a.target.value.length){
    this.tsupshow = true;
    this.authService.carisuplier('1',a.target.value,this.kdcabang)
    .subscribe(
      data => {
      
       this.tsupplier = data;
       
    
    
    },
      Error => {
    
       console.log(Error)
      }
    ) 
  
  }else{
    this.tsupshow = false;
  }
 
}

pilihsup(kdsup,nama){
this.kdsuplier= kdsup;
this.suplier = nama;
this.tsupshow = false;
}
nomutasi:string='';


    profileFormfar = this.fb.group({
      // nofakturbeli: ['',Validators.required],
      suplier: ['',Validators.required],
      // kdbayar:['',Validators.required],
      kdgudang:['',Validators.required],
  
    });

    kgantiex(a,b,c){
     console.log(a.target.value,b,c)


     
     let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
     "nomor":c,"kdobat":b,"field":'TGLEX',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
     "kduser":this.username,"stssimpan":'4'}
     this.authService.simpanlpb(body)
     .subscribe(response => {
     
    
   
       if(response ){
         this.toastr.success(''+response, 'Sukses', {
           timeOut: 2000,
         });

       
       
        }else{
         this.toastr.error('Simpan  Gagal', 'Error');
       
        }
   
   
   
   
   
     })


    }
 
    ubahqty(a,kdobat,nomor,HNA,QTY,DISCRP,DISCPERSEN){
      // console.log(a.target.value,kdobat,nomor,HNA,QTY,DISCRP,DISCPERSEN)

      let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,"kdgudang":this.kdgudang,
      "nomor":nomor,"kdobat":kdobat,"field":'QTY',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
      "kduser":this.username,"stssimpan":'4',"HNA":HNA,"QTY":QTY,"discrp":DISCRP,"discpersen":DISCPERSEN}



this.authService.simpanlpb(body)
.subscribe(response => {



  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });

    setTimeout(() => {
     this.trxpbeli()
    }, 200);
  
  
   }else{
    this.toastr.error('Simpan  Gagal', 'Error');
  
   }





})

     
    }
    ubahdiscpersen(a,kdobat,nomor,HNA,QTY,DISCRP){
      console.log(a.target.value,kdobat,nomor,HNA,QTY,DISCRP)


      
      

   
     let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
     "nomor":nomor,"kdobat":kdobat,"field":'DISCPERSEN',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
     "kduser":this.username,"stssimpan":'4',"HNA":HNA,"QTY":QTY,"discrp":DISCRP}
     this.authService.simpanlpb(body)
     .subscribe(response => {
     
    
   
       if(response ){
         this.toastr.success(''+response, 'Sukses', {
           timeOut: 2000,
         });

         setTimeout(() => {
          this.trxpbeli()
         }, 200);
       
       
        }else{
         this.toastr.error('Simpan  Gagal', 'Error');
       
        }
   
   
   
   
   
     })



    }
    ubahdiscrp(a,kdobat,nomor,HNA,QTY,DISCPERSEN){
      console.log(a.target.value)

      let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
      "nomor":nomor,"kdobat":kdobat,"field":'DISCRP',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
      "kduser":this.username,"stssimpan":'4',"HNA":HNA,"QTY":QTY,"DISCPERSEN":DISCPERSEN}
      this.authService.simpanlpb(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
 
          setTimeout(() => {
           this.trxpbeli()
          }, 200);
        
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Error');
        
         }
    
    
    
    
    
      })

      

    }
    ubahbatch(a,kdobat,nomor){
      console.log(a.target.value)

        
     let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
     "nomor":nomor,"kdobat":kdobat,"field":'NOBATCH',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
     "kduser":this.username,"stssimpan":'4'}
     this.authService.simpanlpb(body)
     .subscribe(response => {
     
    
   
       if(response ){
         this.toastr.success(''+response, 'Sukses', {
           timeOut: 2000,
         });

       
       
        }else{
         this.toastr.error('Simpan  Gagal', 'Error');
       
        }
   
   
   
   
   
     })



    }
    hapusall(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus',
        text: 'Hapus Transaksi',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,"kdgudang":this.kdgudang,
        "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
          "kduser":this.username,"stssimpan":'6'}
    
          this.authService.simpanlpb(body)
          .subscribe(response => {
          
         
        
            if(response ){
              this.toastr.success(''+response, '-', {
                timeOut: 2500,
              });
     
              if(response === 'Berhasil Hapus'){
                this.tambahmodal()
              }else{


              }
            
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Error');
            
             }
        
        
        
        
        
          })

          // swalWithBootstrapButtons.fire(
          //   'Berhasil Hapus User',
          //   'User Telah Terhapus Dari Database.',
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

    tombolp:any;

    proses(content,a){
      this.tombolp = a;

      this.modalService.open(content, {
       
      });
    }

    proseslb(content){
      this.modalService.open(content, {
       
      });
    }

    hapusobat(kdgl,kdcoa,no,stsd){


      if(stsd === '1'){
        this.toastr.error('Tidak  Bisa di hapus karena sudah di  proses', 'Error');
              
      }else{
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Hapus',
          text: 'Hapus Transaksi',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
  
            let body={
              "nogl":kdgl,"kdcabang":this.kdcabang,"stssimpan":'3',"kdklinik":this.kdklinik,"kdcoa":kdcoa,"no":no
            }
          
          
          
            this.authService.simpangl(body)
            .subscribe(response => {
            
           
          
              if(response ){
                this.toastr.success(''+response, 'Sukses', {
                  timeOut: 2000,
                });
          
                setTimeout(() => {
                  
                  this.trxgl()
                  this.jml = 0;
                  this.ket = '';
                  this.select.handleClearClick()
          
            
                }, 200);
          
              
               }else{
                this.toastr.error('Simpan  Gagal', 'Error');
              
               }
          
          
          
          
          
            })
  
    
  
    
         
    
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
         
          }
        });
      }
   
    }


  

  totalpasenlist:number;
  ktglrad(){
    this.authService.listgl(this.kdcabang,'',this.tglp)
    .subscribe(
      data => {
        this.totalpasenlist = data.length
  this.tbeli = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
    caripass(a){
      this.authService.listgl(this.kdcabang,a.target.value,this.tglp)
      .subscribe(
        data => {
          this.totalpasenlist = data.length
    this.tbeli = data;
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
    openLargemap(content) {

      this.tmpbeli()

      this.modalService.open(content, {
        size: 'lg'
      });
    }




 
    tbeli:any;
    caripas='1';
tmpbeli(){
  this.authService.listgl(this.kdcabang,'',this.tglp)
  .subscribe(
    data => {
      this.totalpasenlist = data.length
this.tbeli = data;

  },
    Error => {
  
     console.log(Error)
    }
  )



 

}
simpanbeli(){
  // this.tombolsimpan = true;
  this.tomboledit = false;


  let body={
    "nofakturbeli":this.nofakturbeli,"kdsuplier":this.kdsuplier,"kdbayar":this.kdbayar,
    "nofakturpajak":this.nofakturpajak,"tglfaktur":this.tglpx,"tgljatuhtempo":this.tglpxx,
    "kduser":this.username,"kdcabang":this.kdcabang,"stssimpan":'3',"kdklinik":this.kdklinik,"NOLPB" : this.nolpb,
    "JMLPPN":this.jmlppn,"PPN":this.ppnobat,
    "TOTAL":this.totalsetelahppn,"ADM":this.adm,"NETTO":this.totalakhir,"keterangan":this.keterangan,"kdgudang":this.kdgudang
  }

  this.authService.simpanlpb(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.trxpbeli()
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Error');
    
     }





  })


}
 

goToLink() {
  this.modalService.open(MobatComponent, {
    size: 'lg'
  });
  
  // window.open('master/mobat', '_blank');
  
  // this.router.navigate(['master/mobat']);
}

ttrxbeli:any;
totalsebelumpajak:number;
totaladappn:number;
totalsetelahppn:number;
jmlppn:number;
adm:number=0;
totalakhir:number;

trxpbeli(){
  this.authService.transbeliobat(this.kdcabang,this.nofakturbeli,this.nolpb)
  .subscribe(
    data => {

      

      var xyzx=0;
     
      for (let productx of data )
      {

        var yx = parseInt(productx.TOTAL)
        xyzx += yx;
      
       
      }
      var ppn:number;
      this.totalsebelumpajak = xyzx
ppn = (this.ppnobat * this.totalsebelumpajak) / 100;
this.jmlppn = ppn
this.totalsetelahppn = ppn + this.totalsebelumpajak;




this.totalakhir = this.adm + this.totalsetelahppn;
    
this.ttrxbeli = data;

  },
    Error => {
  
     console.log(Error)
    }
  )


 

}
tambahadm(a){
  this.totalakhir = this.totalsetelahppn + this.adm;
}

statushap:any;

pilihpasien(kdgl,keterangan,tgl,status)
  {


    this.nomutasi = kdgl;
    this.tglpx = tgl;
    this.keterangan = keterangan
    this.tomboledit = false;
    this.tombolcetak = false;
    this.showtr = true;
    this.showsimpan = false;
    this.statushap = status;


setTimeout(() => {
  this.trxgl()
  this.modalService.dismissAll()
  
}, 200);

   
      
 


  }


  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

  cetakfaktur(){
    var redirectWindow = window.open(this.URLINVOICE+'clenic/report/reportmutasiin.php?nomutasi='+this.nomutasi+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
    redirectWindow.location;
 }

 laprl(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/labarugiklinik.php?&kdcabang='+this.kdcabang+'&tgldari='+this.tgldari, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}
 cetakfakturp(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/belipriodik.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}

cetakfakturbp(){



  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/barangpriodik.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;




}

cetakd(){
  
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/barangpriodikdetail.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}
cetakfaktursp(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/suplierdetail.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}
pcoa:string='';

laprlx(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/bukubesar.php?&kdcabang='+this.kdcabang+'&tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdakun='+this.pcoa, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  redirectWindow.location;
}


num1:boolean;
num2:boolean;
num3:boolean;
detaillap:any;
openlaporan(content,a){

if(a == '1'){
  this.num1 = true;
  this.num2 = false;
  this.num3 = false;

}else if(a == '2'){
  this.num1 = false;
  this.num2 = true;
  this.num3 = false;
}else if(a == '3'){

  this.num1 = false;
  this.num2 = false;
  this.num3 = true;
}else{

}


  this.modalService.open(content, {
       
  });
}

hapusgl(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus',
    text: 'Hapus Transaksi',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



      if(this.statushap === '1'){
        this.toastr.error('Tidak Bisa di Hapus Karena Sudah Di Proses', 'Error');
        
      }else{

      }

      let body={
        "nogl":this.nomutasi,"kdcabang":this.kdcabang,"stssimpan":'6',"kdklinik":this.kdklinik
      }
    
    
    
      this.authService.simpangl(body)
      .subscribe(response => {
      
     
    
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
    
          setTimeout(() => {
            
            this.trxgl()
            this.nomutasi = '';
            this.keterangan = '';
           
      
          }, 200);
    
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Error');
        
         }
    
    
    
    
    
      })




   

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
   
    }
  });
}
tcoa:any;

prosesbb(content){

  this.authService.tampilcoa(this.kdcabang, '')
  .subscribe(
    data => {
    
     this.tcoa = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  


  this.modalService.open(content, {
       
  });
}


onqty(a){
  


  let body={
    "nogl":this.nomutasi,"keterangan":this.ket,"tglgl":this.tglpx,"kdcoa":this.nmobat,"jml":this.jml,"tipe":this.tipe,
   "kdcabang":this.kdcabang,"stssimpan":'2',"kdklinik":this.kdklinik,"kduser":this.username
  }



  this.authService.simpangl(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      setTimeout(() => {
        
        this.trxgl()
        this.jml = 0;
        this.ket = '';
        this.select.handleClearClick()

  
      }, 200);

    
     }else{
      this.toastr.error('Simpan  Gagal', 'Error');
    
     }





  })
}

simpans(){

  let body={
    "nogl":this.nomutasi,"keterangan":this.ket,"tglgl":this.tglpx,"kdcoa":this.nmobat,"jml":this.jml,"tipe":this.tipe,
   "kdcabang":this.kdcabang,"stssimpan":'2',"kdklinik":this.kdklinik,"kduser":this.username
  }



  this.authService.simpangl(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      setTimeout(() => {
        
        this.trxgl()
        this.jml = 0;
        this.ket = '';
        this.select.handleClearClick()

  
      }, 200);

    
     }else{
      this.toastr.error('Simpan  Gagal', 'Error');
    
     }





  })
}

      }
