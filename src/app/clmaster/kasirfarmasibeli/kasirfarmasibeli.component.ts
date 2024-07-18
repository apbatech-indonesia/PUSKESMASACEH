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
import { MobatidComponent } from '../mobatid/mobatid.component';
import { SampleService } from 'src/app/services';



@Component({
  selector: 'app-kasirfarmasibeli',
  templateUrl: './kasirfarmasibeli.component.html',
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
export class kasirfarmasibeliComponent implements OnInit {
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
@ViewChild("myinputhna") myinputhna :ElementRef;

tomboledit:boolean=true;
tombolhapus:boolean=true;
tombolbatal:boolean=true;
tombolmobat:boolean=true;
tombolcetak:boolean=true;
tombolsimpan:boolean=true;
tomboltambah:boolean=true;
showtransaksi:boolean=true;
hostName: string;
URLINVOICE:string
tglps:any;

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
this.tglps = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tgldari = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.tglsampai = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

  }

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
    this.tombolsimpan = true;
    this.tombolhapus = true;
    this.tombolcetak = true;
    this.showtransaksi = true;
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
    // this.profileFormfar.reset()
    
    // this.modalService.open(McoaComponent, {
    //   size: 'lg'
    // });
  }
  tobat:any;
  nmobat:any;
  cariobat(a){
    this.authService.cobatbeli(this.kdcabang,'2',a.target.value)
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
    jbayari: ['',Validators.required]
    
    
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
     this.toastr.error('Simpan  Gagal', 'Eror');
   
    }





 })



  
}
onKeyUp(a){
  // console.log(a.target.value)
  // this.df.nativeElement.focus();
  this.select.focus()

 
  
}
onhna(a){
console.log(a.target.value)
console.log(this.hnaasli)




if(a.target.value !== this.hnaasli){

console.log("tidak sama")


setTimeout(() => {

  localStorage.setItem('kdbatclenic', JSON.stringify( {
  kdobat: this.nmobat,


  
  }));
  
  
  }, 0);


  this.modalService.open(MobatidComponent,{size: 'xl'
}).result.then((result) => {




   
    
   }, (reason) => {
   
    this.authService.obatbykode(this.kdcabang,this.nmobat)
  .subscribe(
    data => {
    
if(data.length){

  this.tsatuan =data;

  for (let harga of data )
  {
    this.hna= harga.hna
   
    this.ttsatuan = harga.standart
this.jenisobat = harga.jenisobat
this.namaobat = harga.obat
  }


  this.df.nativeElement.focus()
}else{

return data;
}
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  




   

   });





}else{
  console.log("sama")
  this.df.nativeElement.focus();
}

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
hnaasli:any;

onobat(a){
  console.log(this.nmobat)


  
  

  this.authService.obatbykode(this.kdcabang,this.nmobat)
  .subscribe(
    data => {
    
if(data.length){

  this.tsatuan =data;

  for (let harga of data )
  {
    this.hna= harga.hna
    this.hnaasli = harga.hna;

    this.ttsatuan = harga.standart
this.jenisobat = harga.jenisobat
this.namaobat = harga.obat
  }


  this.myinputhna.nativeElement.focus()

  // this.df.nativeElement.focus();
}else{

return data;
}
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  









}
jenisobat:any;
onobatx(a){
  console.log(this.nmobat)


  
  

  this.authService.obatbykode(this.kdcabang,this.nmobat)
  .subscribe(
    data => {
    
if(data.length){

  this.tsatuan =data;

  for (let harga of data )
  {
    this.hna= harga.hna
    this.hnaasli = harga.hna;
    this.ttsatuan = harga.standart
this.jenisobat = harga.jenisobat
this.namaobat = harga.obat
  }


  this.myinputhna.nativeElement.focus()
  // this.df.nativeElement.focus();
}else{

return data;
}
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  









}

onqty(a){
  this.total = this.hna * this.qty;

this.myinputqty.nativeElement.focus()
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
     
      

if(this.kdsuplier === ''){
  this.toastr.error('Anda Belum Memilih SUplier', 'Eror');
}else{
  let body={
    "nofakturbeli":this.nofakturbeli,"kdsuplier":this.kdsuplier,"kdbayar":this.kdbayar,"kdgudang":this.kdgudang,
    "nofakturpajak":this.nofakturpajak,"tglfaktur":this.tglpx,"tgljatuhtempo":this.tglpxx,
    "keterangan":this.keterangan,"kduser":this.username,"kdcabang":this.kdcabang,"stssimpan":'1',"kdklinik":this.kdklinik
  }


  
  this.authService.simpanlpb(body)
  .subscribe(response => {
  
 

    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      this.nolpb = response;
  
      this.tomboltambah = false;
  this.tombolsimpan = false;
  this.showtransaksi = false;
  this.tombolmobat = false;
  
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }





  })
}


    


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

    profileFormfar = this.fb.group({
      nofakturbeli: ['',Validators.required],
      suplier: ['',Validators.required],
      kdbayar:['',Validators.required],
      kdgudang:['',Validators.required],
     kdsuplier: ['',Validators.required],
  
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
         this.toastr.error('Simpan  Gagal', 'Eror');
       
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
    this.toastr.error('Simpan  Gagal', 'Eror');
  
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
         this.toastr.error('Simpan  Gagal', 'Eror');
       
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
          this.toastr.error('Simpan  Gagal', 'Eror');
        
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
         this.toastr.error('Simpan  Gagal', 'Eror');
       
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
              this.toastr.error('Simpan  Gagal', 'Eror');
            
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
    hapusobat(kdobat,nomor,obat,HNA,QTY,DISCRP,DISCPERSEN){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus',
        text: 'Hapus Obat '+obat,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,"kdgudang":this.kdgudang,
          "nomor":nomor,"kdobat":kdobat,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
          "kduser":this.username,"stssimpan":'5',"HNA":HNA,"QTY":QTY,"discrp":DISCRP,"discpersen":DISCPERSEN}
    
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
              this.toastr.error('Simpan  Gagal', 'Eror');
            
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
    // profileFormfarhasil = this.fb.group({
    //   qryhasil: [''],
 
  
    // });

    // onSubmit(){
    //   console.log(this.profileFormfarhasil.value)
    // }

  totalpasenlist:number;
  ktglrad(){
    this.authService.caripembelian(this.kdcabang,this.tglp,this.caripas,'',this.tglps)
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

  ktglrads(){
    this.authService.caripembelian(this.kdcabang,this.tglp,this.caripas,'',this.tglps)
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
      this.authService.caripembelian(this.kdcabang,this.tglp,this.caripas,a.target.value,this.tglps)
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
      this.tglp = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
      this.tglps = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
      this.tmpbeli()

      this.modalService.open(content, {
        size: 'lg'
      });
    }




 
    tbeli:any;
    caripas='1';
tmpbeli(){
  this.authService.caripembelian(this.kdcabang,this.tglp,this.caripas,'',this.tglps)
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
      this.toastr.error('Simpan  Gagal', 'Eror');
    
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


pilihpasien(NOFAKTUR,KDSUPPLIER,SYSTEMBAYAR,KDGUDANG,
  FAKTURPAJAK,NOLPB,TGLFAKTUR,TGLJATUHTEMPO,KETERANGAN,PPN,JMLPPN,TOTAL,ADM,NETTO,nama)
  {

    this.nofakturbeli = NOFAKTUR;
this.kdsuplier = KDSUPPLIER;
this.suplier = nama;
this.kdbayar = SYSTEMBAYAR
this.kdgudang = KDGUDANG
this.nofakturpajak = FAKTURPAJAK
this.nolpb = NOLPB;
this.tglpx = TGLFAKTUR;
this.tglpxx = TGLJATUHTEMPO;
this.keterangan = KETERANGAN;






var yx = parseInt(ADM)

this.adm = yx



    this.nolpb = NOLPB
    this.tomboledit =  false;
    this.tombolsimpan = false;
    this.tombolhapus = false;
    this.tombolbatal = true;
    this.tombolmobat  = false;
    this.tombolcetak = false;
    this.showtransaksi = false;
    this.trxpbeli()

setTimeout(() => {
  this.modalService.dismissAll()
  
}, 200);

   
      
 


  }


  
  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

  cetakfaktur(){
    var redirectWindow = window.open(this.URLINVOICE+'clenic/report/fakturpembelian.php?nofaktur='+this.nofakturbeli+'&kdcabang='+this.kdcabang+'&nolpb='+this.nolpb, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
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


onsatuan(a){
  console.log(a)

  

  this.authService.obatbysatuan(this.kdcabang,this.nmobat,a)
  .subscribe(
    data => {
    
   
  
  },
    Error => {
  
     console.log(Error)
    }
  )


}
tbelix:any;
  detaild(a,b){
    console.log(a,b)
    this.authService.transbeliobat(this.kdcabang,b,a)
    .subscribe(
      data => {
  
        this.tbelix =data;

  
       
  
    },
      Error => {
    
       console.log(Error)
      }
    )

    

  }

      }
