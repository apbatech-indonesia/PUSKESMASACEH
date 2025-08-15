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
  selector: 'app-returfarmasijual',
  templateUrl: './returfarmasijual.component.html',
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
export class returfarmasijualComponent implements OnInit {
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
@ViewChild("fokuspasien") fokuspasien :ElementRef;



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

console.log(this.akses)

  }


  tambahmodal(){
    this.tombolsimpan = true;
    this.tombolhapus = true;
    this.tombolcetak = true;
    // this.showtransaksi = true;
    this.tombolbatal = false;
    // this.nofakturbeli='';
    // this.kdsuplier='';
    // this.suplier ='';
    // this.nofakturpajak = '';
    // this.nolpb = '';
    this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
    this.tglpxx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
    this.keterangan = '';
    // this.adm=0

    // this.trxpbeli()
    this.ttsatuan='';
    this.hna ='';
    this.qty ='';
    this.disc ='';
    this.discrp = '';
    this.total = 0;
   this.notransaksi = "";
  this.pasien = "";
  this.nofaktur = "";
  this.norm ="";
  this.dokter = "";
  this.kddokter = "";
  this.kdkostumer = "";
  this.kostumer ="";
  this.kdpoli = "";
  this.poli = "";
  this.noresep = ""
  this.keterangan ="";
  this.stssimpan ='2';
  this.showobt = false;
  this.fokuspasien.nativeElement.focus()

    setTimeout(() => {
      this.trjual()
    
      
    
     
      
    }, 100);

    this.admresep=0
    this.tuslahresep=0;

    setTimeout(() => {
 
      
     this.ttlsisaterbayar = this.netto - this.ttlterbayar;
     }, 300);

  
    
  }
  tobat:any;
  nmobat:any;
  cariobat(a){
    this.authService.cobatjual(this.kdcabang,this.kdgudang,a.target.value)
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

tsatuan:any;
ttsatuan:any;
hna:any;
qty:any;
disc:any;
discrp:any;
total:number;
nobatch:any;
namaobat:string='';

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
    this.ttsatuan = harga.standart
this.jenisobat = harga.jenisobat
this.namaobat = harga.obat
  }



  this.df.nativeElement.focus();
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
    this.ttsatuan = harga.standart
this.jenisobat = harga.jenisobat
this.namaobat = harga.obat
  }



  this.df.nativeElement.focus();
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


  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';


    this.tmpgudang()
    this.tomboledit= false;
   
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

nofakturpajak:any;
nolpb:any;
keterangan:any;


    tambah(){
     
      

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
      // this.showtransaksi = false;
      this.tombolmobat = false;
      
        
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
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

tobatnonracik:any;
tobatracik:any;


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
totalretur:number;


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
 

    tmpdrijl(){
      this.authService.trxfgudang(this.kdcabang,this.nofaktur,this.notransaksi)
      .subscribe(
        data => {
        
   
    for (let x of data )
          {
        
            this.ttlterbayarblm = x.sudahbayar;
    
          }
          // this.ttlsisaterbayar = this.nettoblm - this.ttlterbayarblm;
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
    ubahqty(a,kdobat,notransaksi,nomor,qty,disc,discrp,harga,qtyr){

if(this.notransaksi === ''){
  this.toastr.error('', 'Notransaksi Tidak Ada silahkan simpan terlebih dahulu', {
          timeOut: 2000,
        });

}else{

console.log(a.target.value,kdobat,notransaksi,nomor,qty,disc,discrp,harga)

if(a.target.value > qty){
  this.toastr.error('', 'Retur Melebehi Qty Penjualan', {
    timeOut: 2000,
  });
}else{
  let body={
    "qtyrl":qty,"qtyr":a.target.value,"totalharga":harga,"nomor":nomor,"notransaksi":notransaksi,"kdobat":kdobat,
    "kdgudang":this.kdgudang,"norm":this.norm,"tglpx":this.tglpx,"qtyrr":qtyr,"kdcabang":this.kdcabang,"stssimpan":'10'
    }
    
    
    console.log(body)
    
    
    
    this.authService.simpanbeliverif(body)
    .subscribe(response => {
    
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
    
        setTimeout(() => {
          this.trjual()
        }, 150);
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    })
    
}



}






     
    }
    ubahdiscpersen(a,kdobat,notransaksi,nomor,disc,qty,discrp,harga){

      if(this.notransaksi === ''){
        this.toastr.error('', 'Notransaksi Tidak Ada silahkan simpan terlebih dahulu', {
                timeOut: 2000,
              });
      
      }else{

        let body={
          "qtyedit":qty,"kdobat":kdobat,"notransaksi":notransaksi,"nomor":nomor,
          "qty":qty,"disc":a.target.value,"discrp":discrp,"harga":harga,"kdgudang":this.kdgudang,"stssimpan":'3',
          "kdcabang":this.kdcabang,
          "nofaktur":this.nofaktur,"kdpoli":this.kdpoli,"kddokter":this.kddokter
        }

        

        this.authService.simpanbeliverif(body)
.subscribe(response => {

  if(response ){
    this.toastr.success(''+response, 'Sukses', {
      timeOut: 2000,
    });


    setTimeout(() => {
      this.trjual()
    }, 100);

    setTimeout(() => {
      
      this.ttlsisaterbayar = this.netto - this.ttlterbayar;
    
    }, 150);
  
  
   }else{
    this.toastr.error('Simpan  Gagal', 'Eror');
  
   }






})
        
      }
    //   console.log(a.target.value,kdobat,nomor,HNA,QTY,DISCRP)


      
      

   
    //  let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
    //  "nomor":nomor,"kdobat":kdobat,"field":'DISCPERSEN',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
    //  "kduser":this.username,"stssimpan":'8',"HNA":HNA,"QTY":QTY,"discrp":DISCRP,"QTYR":QTYR}
    //  this.authService.simpanlpb(body)
    //  .subscribe(response => {
     
    
   
    //    if(response ){
    //      this.toastr.success(''+response, 'Sukses', {
    //        timeOut: 2000,
    //      });

    //      setTimeout(() => {
    //       this.trxpbeli()
    //      }, 200);
       
       
    //     }else{
    //      this.toastr.error('Simpan  Gagal', 'Eror');
       
    //     }
   
   
   
   
   
    //  })



    }

    ubahdiscrp(a,kdobat,notransaksi,nomor,qty,disc,harga){
      console.log(a.target.value)
      if(this.notransaksi === ''){
        this.toastr.error('', 'Notransaksi Tidak Ada silahkan simpan terlebih dahulu', {
                timeOut: 2000,
              });
      
      }else{

        let body={
          "qtyedit":qty,"kdobat":kdobat,"notransaksi":notransaksi,"nomor":nomor,
          "qty":qty,"disc":disc,"discrp":a.target.value,"harga":harga,"kdgudang":this.kdgudang,"stssimpan":'4',
          "kdcabang":this.kdcabang,
          "nofaktur":this.nofaktur,"kdpoli":this.kdpoli,"kddokter":this.kddokter
        }


        this.authService.simpanbeliverif(body)
        .subscribe(response => {


          console.log(response)
        
          if(response){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
        
        
            setTimeout(() => {
              this.trjual()
            }, 100);
        
            setTimeout(() => {
              
              this.ttlsisaterbayar = this.netto - this.ttlterbayar;
            
            }, 150);
          
          
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        
        })




      }
      // let body={"nofakturbeli":this.nofakturbeli,"NOLPB":this.nolpb,
      // "nomor":nomor,"kdobat":kdobat,"field":'DISCRP',"angka":a.target.value,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,
      // "kduser":this.username,"stssimpan":'9',"HNA":HNA,"QTY":QTY,"DISCPERSEN":DISCPERSEN,"QTYR":QTYR,"DISCPERSENR":DISCPERSENR}
      // this.authService.simpanlpb(body)
      // .subscribe(response => {
      
     
    
      //   if(response ){
      //     this.toastr.success(''+response, 'Sukses', {
      //       timeOut: 2000,
      //     });
 
      //     setTimeout(() => {
      //      this.trxpbeli()
      //     }, 200);
        
        
      //    }else{
      //     this.toastr.error('Simpan  Gagal', 'Eror');
        
      //    }
    
    
    
    
    
      // })

      

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

          
 
          let body={"norm":this.norm,"notransaksi":this.notransaksi,"stssimpan":'12',"kdcabang":this.kdcabang}
    
          this.authService.simpanbeliverif(body)
          .subscribe(response => {
          
         
        
            if(response ){
            
     
              if(response === 'Berhasil Hapus'){
                this.toastr.success(''+response, '-', {
                  timeOut: 2500,
                });
              }else{
                this.toastr.error(response, 'Eror');

              }
            
            
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
        
        
        
        
        
          })



//    let body={
//     "notransaksi":this.notransaksi,
//     "kdcabang":this.kdcabang,
//     "stssimpan":'8'}

//           this.authService.simpanbeliverif(body)
//     .subscribe(response => {
    
//    console.log(response)
  


//       if(response ){

//           if(response === '1'){
//             this.toastr.error('Hapus Gagal Karena Transaksi Belum di hapus atau trasaksi sudah di bayar', 'Eror');

//           }else{
//             this.toastr.success('Berhasil', 'Sukses', {
//               timeOut: 2000,
//             });
      
           
//                this.ttsatuan='';
//             this.hna ='';
//             this.qty ='';
//             this.disc ='';
//             this.discrp = '';
//             this.total = 0;
//            this.notransaksi = "";
//           this.pasien = "";
//           this.nofaktur = "";
//           this.norm ="";
//           this.dokter = "";
//           this.kddokter = "";
//           this.kdkostumer = "";
//           this.kostumer ="";
//           this.kdpoli = "";
//           this.poli = "";
//           this.noresep = ""
//           this.keterangan ="";
//           this.stssimpan ='2';
//        this.showobt= false;
    
//             setTimeout(() => {
//               this.trjual()
            
              
            
             
              
//             }, 100);
      
    
//             setTimeout(() => {
//               this.select.focus()
              
//              this.ttlsisaterbayar = this.netto - this.ttlterbayar;
//              }, 300);
     
// this.admresep=0
//     this.tuslahresep=0;
//           }
 


//        }else{
//         this.toastr.error('Simpan  Gagal', 'Eror');
      
//        }
  
  
  
  
  
//     })



    
  
  
       
  
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
   
    hapusobat( kdobat,notransaksi,nomor,obat,qty){
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



          let body={
            "notransaksi":notransaksi,
"kdobat":kdobat,
"nomor":nomor,
"nofaktur":this.nofaktur,
"kddokter":this.kddokter,
"kdpoli":this.kdpoli,
"qty":qty,
"kdgudang":this.kdgudang,
"stssimpan":'7',
"kdcabang":this.kdcabang
          }

       
          this.authService.simpanbeliverif(body)
          .subscribe(response => {
          
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
          
          
              setTimeout(() => {
                this.trjual()
              }, 100);
          
              setTimeout(() => {
                
                this.ttlsisaterbayar = this.netto - this.ttlterbayar;
              
              }, 150);
            
            
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
 
    this.authService.listfarmasijual(this.kdcabang,this.caripas,'',this.tglp)
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
      this.authService.listfarmasijual(this.kdcabang,this.caripas,a.target.value,this.tglp)
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

    caripassr(a){
      this.authService.cariretur(this.kdcabang,this.tglp,this.caripas,a.target.value)
      .subscribe(
        data => {
         
    this.tbelir = data;
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
    openLargemap(content) {
//       this.notransaksi = "";
//       this.pasien = "";
//       this.nofaktur = "";
//       this.norm ="";
//       this.dokter = "";
//       this.kddokter = "";
//       this.kdkostumer = "";
//       this.kostumer ="";
//       this.kdpoli = "";
//       this.poli = "";
// this.noresep = ""
// this.keterangan ="";


this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')
this.noretur = '';
this.keteranganretur = '';
      this.tmpbeli()

      this.modalService.open(content, {
        size: 'lg'
      });
    }



    openLargemapr(content){
      this.tmpbelir()

      this.modalService.open(content, {
        size: 'lg'
      });
    }
 
    tbeli:any;
    caripas='2';
tmpbeli(){
  this.authService.listfarmasijual(this.kdcabang,this.caripas,'',this.tglp)
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
tbelir:any;

tmpbelir(){
  this.authService.cariretur(this.kdcabang,this.tglp,this.caripas,'')
  .subscribe(
    data => {
    
this.tbelir = data;

  },
    Error => {
  
     console.log(Error)
    }
  )


 

}

stss:any;
koxx:any;

simpanbeli(){

  if(this.notransaksi === ''){
    this.toastr.error('', 'Notransaksi Tidak Ada silahkan simpan terlebih dahulu', {
            timeOut: 2000,
          });
  
  }else{
  
 
  
  let body={
  "notransaksi":this.notransaksi,
  "kdgudang":this.kdgudang,"norm":this.norm,"tglpx":this.tglpx,"kdcabang":this.kdcabang,"stssimpan":'11',
  "keteranganretur":this.keteranganretur,"totaluangr":this.totalretur,"kduser":this.username
  }
  
  

  // console.log(body)
 
  
  this.authService.simpanbeliverif(body)
  .subscribe(response => {
  
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
  

      this.noretur = response;
      setTimeout(() => {
        this.trjual()
      }, 150);
    
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  })
  
  
  }
  
  
  



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
totalsebelumpajakr:number;
totaladappn:number;
totalsetelahppn:number;
totalsetelahppnr:number;
jmlppn:number;
jmlppnr:number;
adm:number=0;
totalakhir:number;

trxpbeli(){
  this.authService.transbeliobat(this.kdcabang,this.nofakturbeli,this.nolpb)
  .subscribe(
    data => {

      

      var xyzx=0;
      var xyzxu=0;
      for (let productx of data )
      {

        var yx = parseInt(productx.TOTALR)
        xyzx += yx;

        var yxu = parseInt(productx.TOTAL)
        xyzxu += yxu;
      

       
      }
      var ppn:number;
      this.totalsebelumpajakr = xyzx
ppn = (this.ppnobat * this.totalsebelumpajakr) / 100;
this.jmlppnr = ppn
this.totalsetelahppnr = this.jmlppnr + this.totalsebelumpajakr;


var ppnu:number;
this.totalsebelumpajak = xyzxu
ppnu = (this.ppnobat * this.totalsebelumpajak) / 100;
this.jmlppn = ppnu
this.totalsetelahppn = ppnu + this.totalsebelumpajak;




this.totalakhir = this.adm + this.totalsetelahppn;
    


// this.totalakhir = this.adm + this.totalsetelahppn;
    
this.ttrxbeli = data;

  },
    Error => {
  
     console.log(Error)
    }
  )


 

}

keteranganretur:any;


// penjualan
notransaksi:any;
pasien:any;
norm:any;
kdgudang:any;
dokter:any;
kddokter:any;
kdkostumer:any;
kostumer:any;
kdpoli:any;
poli:any;
noresep:any;
KETERANGAN:any;
nofaktur:any;

profileFormfar = this.fb.group({
 
  kdgudang:['',Validators.required],
  pasien:['',Validators.required],
  dokter:['',Validators.required],
  kostumer:['',Validators.required],
  poli:['',Validators.required],
});
showobt:boolean;
sts:any;
stssimpan:any;
pilihpasienr(nofaktur,tgl,pasien,kdpoli,nampoli,kdkostumerd,
  nama,kddokter,namdokter,notransaksi,sts,norm,statuslunas,kdgudang,
  noretur,keteranganretur,tglretur
  ){

    this.notransaksi = notransaksi;
    this.pasien = pasien;
    this.nofaktur = nofaktur;
    this.norm = norm;
    this.dokter = namdokter;
    this.kddokter = kddokter
    this.kdkostumer = kdkostumerd
    this.kostumer = nama
    this.kdpoli = kdpoli;
    this.poli = nampoli
    // this.tglpx = tgl;
    this.sts = sts;
    this.noretur = noretur;
    this. keteranganretur = keteranganretur
    this.tglpx = tglretur;

    this.kdgudang = kdgudang
    this.tombolhapus = false;
    this.tombolcetak = false;
    // this.trgudang()
    setTimeout(() => {
      this.trjual()
    
      
    
     
      
    }, 100);


    this.modalService.dismissAll()

}
pilihpasien(nofaktur,tgl,pasien,kdpoli,nampoli,kdkostumerd,
  nama,kddokter,namdokter,notransaksi,sts,norm,statuslunas,kdgudang)
  {


    this.nettoblm =0;
this.admresepblm = 0;
this.tuslahresepblm = 0;
this.pembulatanblm = 0;
this.ttlterbayarblm =0;
this.netto = 0;
this.totalsebelumadm=0;
this.admresep=0
this.tuslahresep=0
this.pembulatan =0
this.ttlterbayar=0
this.ttlsisaterbayar=0
this.ttsatuan='';
this.hna ='';
this.qty ='';
this.disc ='';
this.discrp = '';
this.total = 0;

    this.notransaksi = notransaksi;
    this.pasien = pasien;
    this.nofaktur = nofaktur;
    this.norm = norm;
    this.dokter = namdokter;
    this.kddokter = kddokter
    this.kdkostumer = kdkostumerd
    this.kostumer = nama
    this.kdpoli = kdpoli;
    this.poli = nampoli
    // this.tglpx = tgl;
    this.sts = sts;

    this.kdgudang = kdgudang

    console.log(sts)
    
    if(sts === '0'){

      this.stssimpan='0';
      this.showobt= false;

  
  
    }else{
      this.stssimpan='1';


      if(statuslunas === '2'){
        this.showobt= false;
      }else{
        this.showobt= true;
      }

      
    }


// var yx = parseInt(ADM)

// this.adm = yx



//     this.nolpb = NOLPB
//     this.tomboledit =  false;
    this.tombolsimpan = false;
    this.tombolhapus = false;
    this.tombolcetak = false;
//     this.tombolbatal = true;

//     this.tombolcetak = false;
//     this.showtransaksi = false;
//     this.trxpbeli()
this.trgudang()
setTimeout(() => {
  this.trjual()

  

 
  
}, 100);

setTimeout(() => {
  if(this.sts === '0'){
    // this.ttldisc = 0;
        }else{
// this.netto = this.nettoblm
this.admresep = this.admresepblm;
// this.ttldisc = this.ttldiscblm
this.tuslahresep = this.tuslahresepblm;
this.ttlterbayar = this.ttlterbayarblm

// this.nettoblm = x.totalbayar;
// this.admresepblm = x.adminresep;
// this.tuslahresepblm = x.tulsah;
// this.pembulatanblm = x.pembulatan;
// this.ttlterbayarblm = x.sudahbayar;
this.nettobmx = (Number(this.totalsebelumadm) + Number(this.admresep)) + Number(this.tuslahresep) ;


let num = this.nettobmx;
  let text = num.toString()

  var angka = text.substr(-2);
var angka1 = parseInt(angka);



var akhir:number;
if(angka1 < 50){
akhir = this.nettobmx - angka1;
}else{
akhir = this.nettobmx + (100 - angka1);

}

this.netto = akhir;
this.pembulatan = this.netto-this.nettobmx;
this.ttlsisaterbayar = this.netto - this.ttlterbayar


          
        }

        this.modalService.dismissAll()
}, 150);

   
      
 


  }

  tjual:any;
  totalsebelumadmT:number;
  trjual(){
    this.authService.trxjual(this.kdcabang,this.nofaktur,this.notransaksi)
    .subscribe(
      data => {
      this.tjual = data
  
  

      
      var xyzx=0;
      // var xyzxu=0;
      // var disc=0
      for (let productx of data )
      {

        var yx = parseInt(productx.totalhargar)
        xyzx += yx;


        // var discx = parseInt(productx.jmldisc)
        // disc += discx;
        // var yxu = parseInt(productx.TOTAL)
        // xyzxu += yxu;
      

       
      }

      this.totalretur = xyzx
//       this.totalsebelumadmT = xyzx;
//       this.ttldisc = disc;
   
  

//       this.nettobmx = (Number(this.totalsebelumadm) + Number(this.admresep)) + Number(this.tuslahresep) ;


// let num = this.nettobmx;
//   let text = num.toString()

//   var angka = text.substr(-2);
// var angka1 = parseInt(angka);



// var akhir:number;
// if(angka1 < 50){
// akhir = this.nettobmx - angka1;
// }else{
// akhir = this.nettobmx + (100 - angka1);

// }

// this.netto = akhir;
// this.pembulatan = this.netto-this.nettobmx;





    },
      Error => {
    
       console.log(Error)
      }
    )
  }

  tgudangx:any;
  jumlahblm:number;
nettoblm:number;
admresepblm:number;
tuslahresepblm:number;
pembulatanblm:number;
ttlterbayarblm:number;
ttldisc:number;
ttldiscblm:number
noretur:any;

trgudang(){
  this.authService.trxfgudang(this.kdcabang,this.nofaktur,this.notransaksi)
  .subscribe(
    data => {
    
this.tgudangx = data;
for (let x of data )
      {
        this.kdgudang = x.kdgudang
        this.noresep = x.noresep
        this.keterangan = x.keterangan
        this.jumlahblm = x.jumlah;
        this.nettoblm = x.totalbayar;
        this.admresepblm = x.adminresep;
        this.tuslahresepblm = x.tuslah;
        // this.ttldiscblm = x.totaldisc;
       
        this.pembulatanblm = x.pembulatan;
        this.ttlterbayarblm = x.sudahbayar;

      }
      // this.ttlsisaterbayar = this.nettoblm - this.ttlterbayarblm;

  },
    Error => {
  
     console.log(Error)
    }
  )

  // this.authService.listpobaterm(this.kdcabang,this.nofaktur)
  // .subscribe(
  //   data => {
  //   this.tobatnonracik = data


  // },
  //   Error => {
  
  //    console.log(Error)
  //   }
  // )
  // this.authService.listobatermracik(this.kdcabang,this.nofaktur)
  // .subscribe(
  //   data => {
  //   this.tobatracik = data


  // },
  //   Error => {
  
  //    console.log(Error)
  //   }
  // )


  



}


nettobmx:number
tambahadm(a){


// console.log(this.admresep)
let tuslah = Number(this.tuslahresep);


  this.nettobmx = (this.totalsebelumadm + this.admresep) + tuslah ;




  let num = this.nettobmx;
    let text = num.toString()

    var angka = text.substr(-2);
var angka1 = parseInt(angka);



var akhir:number;
if(angka1 < 50){
 akhir = this.nettobmx - angka1;
}else{
akhir = this.nettobmx + (100 - angka1);

}

this.netto = akhir;
this.pembulatan = this.netto-this.nettobmx;
this.ttlsisaterbayar = this.netto - this.ttlterbayar;

}
nettobm:number;

tambahadmx(a){




  let admresep = Number(this.admresep);


  
    this.nettobm = (this.totalsebelumadm + this.tuslahresep) + admresep  ;
    


    let num = this.nettobm;
    let text = num.toString()

    // this.netto = (this.totalsebelumadm + this.tuslahresep) + this.admresep  ;
   


var angka = text.substr(-2);
var angka1 = parseInt(angka);



var akhir:number;
if(angka1 < 50){
 akhir = this.nettobm - angka1;
}else{
akhir = this.nettobm + (100 - angka1);

}

this.netto = akhir;
this.pembulatan = this.netto-this.nettobm;
this.ttlsisaterbayar = this.netto - this.ttlterbayar;
  }

  onKeyUpaxx(a){




    let body={"nofaktur":this.nofaktur,"notransaksi":this.notransaksi,"kdobat":this.nmobat,"qty":this.qty,"hna":this.hna,
    "disc":this.disc,"discrp":this.discrp,"total":this.total,"kdcabang":this.kdcabang,"kddokter":this.kddokter,"norm":this.norm,
"kdkus":this.kdkostumer,"kdgudang":this.kdgudang,"stssimpan":'5'
    }
    

this.authService.simpanbeliverif(body)
    .subscribe(response => {
    
   
  


      if(response ){

          if(response === '1'){
            this.toastr.error('Simpan  Gagal Stok Tidak Cukup', 'Eror');

          }else{
            this.toastr.success('Berhasil', 'Sukses', {
              timeOut: 2000,
            });
      
            this.select.handleClearClick()
               this.ttsatuan='';
            this.hna ='';
            this.qty ='';
            this.disc ='';
            this.discrp = '';
            this.total = 0;
           
         
    
            setTimeout(() => {
              this.trjual()
            
              
            
             
              
            }, 100);
      
    
            setTimeout(() => {
              this.select.focus()
              
             this.ttlsisaterbayar = this.netto - this.ttlterbayar;
             }, 300);
     

          }
 


       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
  
  
  
  
  
    })


   
      
      
    //  let body={
    //   "KDJENISOBAT":this.jenisobat,"KDOBAT":this.nmobat,"obat":this.namaobat,"SATUAN":this.ttsatuan,"HNA":this.hna,
    //   "QTY":this.qty,"DISCPERSEN":this.disc,"DISCRP":this.discrp,"TOTAL":this.total,"NOFAKTUR":this.nofakturbeli,
    //   "NOLPB":this.nolpb,"KDSUPLIER":this.kdsuplier,"TGLEX":this.tglpxinput,"NOBATCH":this.nobatch,
    //   "kdcabang":this.kdcabang,"stssimpan":'2',"kdklinik":this.kdklinik,"kduser":this.username,"kdgudang":this.kdgudang
      
    //    }
      
      
    //    this.authService.simpanlpb(body)
    //    .subscribe(response => {
       
      
      
    //      if(response ){
    //        this.toastr.success(''+response, 'Sukses', {
    //          timeOut: 2000,
    //        });
      
    //     this.select.handleClearClick()
    //     this.ttsatuan='';
    //     this.hna ='';
    //     this.qty ='';
    //     this.disc ='';
    //     this.discrp = '';
    //     this.total = 0;
    //     this.nobatch =''
    //     this.trxpbeli()
       
    //     setTimeout(() => {
    //      this.select.focus()
    //     }, 500);
      
         
    //       }else{
    //        this.toastr.error('Simpan  Gagal', 'Eror');
         
    //       }
      
      
      
      
      
    //    })
    
       
    
     
    }


 
  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

  cetakfaktur(){
    var redirectWindow = window.open(this.URLINVOICE+'clenic/report/fakturpenjualanretur.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username='+this.username+'&noretur='+this.noretur, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
    redirectWindow.location;
 }

 cetakfakturp(){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/report/returpenjualan.php?tgldari='+this.tgldari+'&tglsampai='+this.tglsampai+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
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




totalsebelumadm:number;
admresep:number=0;
tuslahresep:number=0;
pembulatan:number=0;
netto:number;
ttlterbayar:number;
ttlsisaterbayar:number;

statuscaripas='1';
caritipe='5';
tpasien:any;
tmplpasien(){
  this.authService.pasienantrian(this.kdcabang,this.caritipe,'','',this.tglp)
  .subscribe(
    data => {
    
this.tpasien = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
tmplpasiensemua(){
  this.authService.pasiensemua(this.kdcabang,this.caritipe,'')
  .subscribe(
    data => {
    
this.tpasien = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
enterpasien(content){
  if(this.stssimpan === '2'){


    this.tmplpasien()
    this.modalService.open(content, {
      size: 'lg'
    });
  }else{
    this.toastr.error('Silahkan klik Tambah Dulu', 'Eror');
   
  }


}

onChangec(a){
  console.log(a)

  if(a === '2'){
    this.tmplpasiensemua()
  }else{
    this.tmplpasien()
  }
}
ktglradr(){
  this.authService.pasienantrian(this.kdcabang,this.caritipe,'','',this.tglp)
  .subscribe(
    data => {
    
this.tpasien = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}

caripasienlist(a){
if(this.statuscaripas === '1' ){
  this.authService.pasienantrian(this.kdcabang,this.caritipe,'',a.target.value,this.tglp)
  .subscribe(
    data => {
    
this.tpasien = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}else{
  this.authService.pasiensemua(this.kdcabang,this.caritipe,a.target.value)
  .subscribe(
    data => {
    
this.tpasien = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
}

pilihpasienx(norm,kddokter,kdkostumerd,notransaksi,
  pasien,nampoli,namdokter,nama,kdpoli,sts){
    console.log(norm,kddokter,kdkostumerd,notransaksi,
      pasien,nampoli,namdokter,nama,kdpoli,sts)



      if(sts === 'semua'){

        this.notransaksi = '';
        this.pasien = pasien;
        this.nofaktur = '';
        this.norm = norm;
        this.dokter = '';
        this.kddokter = '';
        this.kdkostumer = '';
        this.kostumer = ''
        this.kdpoli = '';
        this.poli = '';

      }else{
        this.notransaksi = '';
        this.pasien = pasien;
        this.nofaktur = notransaksi;
        this.norm = norm;
        this.dokter = namdokter;
        this.kddokter = kddokter
        this.kdkostumer = kdkostumerd
        this.kostumer = nama
        this.kdpoli = kdpoli;
        this.poli = nampoli
     

      }


      this.modalService.dismissAll()
  }
  tdokter:any;

tmpdokter(){
  this.authService.caridokter(this.kdcabang,'')
  .subscribe(
    data => {
    
this.tdokter = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}
  enterdokter(content){
    this.tmpdokter()
    this.modalService.open(content, {
     
    });
  }

  caridokter(a){
    this.authService.caridokter(this.kdcabang,a.target.value)
  .subscribe(
    data => {
    
this.tdokter = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
  }


  tkostumer:any;

  tmpkostumerlist(){
    this.authService.kostumerlist(this.kdcabang,'')
    .subscribe(
      data => {
      
  this.tkostumer = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  carikostumer(a){
    this.authService.kostumerlist(this.kdcabang,a.target.value)
    .subscribe(
      data => {
      
  this.tkostumer = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  enterkostumer(content){

    this.tmpkostumerlist()
    this.modalService.open(content, {
     
    });
  }

  pilihdokter(kddokter,namdokter){
    this.kddokter = kddokter;
    this.dokter = namdokter;
    this.modalService.dismissAll()
  }

  pilihkostumer(kdkostumerd,nama){
    this.kdkostumer = kdkostumerd;
    this.kostumer = nama;
    this.modalService.dismissAll()
  }

  enterpoli(content){
    this.tmppoli()
    this.modalService.open(content, {
     
    });



    
  }

  tpoli:any;

  tmppoli(){
    this.authService.caripoli(this.kdcabang,'')
    .subscribe(
      data => {
      
  this.tpoli = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  caripoli(a){
    this.authService.caripoli(this.kdcabang,a.target.value)
    .subscribe(
      data => {
      
  this.tpoli = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }

  pilihpoli(kdpoli,nampoli){
  this.kdpoli = kdpoli;
  this.poli = nampoli;


  this.modalService.dismissAll()
  }

  showloading:boolean=true;
  tetiket:any;

  muncultiket(){
   

  

    let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,"norm":this.norm,"kduser":this.username,"stssimpan":'1'
    }
          
       this.authService.simpanetiket(body)
       .subscribe(response => {
       
      
      
         if(response ){
           this.toastr.success(''+response, 'Sukses', {
             timeOut: 2000,
           });
      
             
           setTimeout(() => {
            this.showtransaksi = false;
           }, 250);


           setTimeout(() => {

            this.authService.etiket(this.kdcabang,this.notransaksi)
            .subscribe(
              data => {
              
                  if(data.length){
                    this.showloading = false
                    this.tetiket = data;

  
                  }else{

                    setTimeout(() => {
                      this.showloading = false
                      this.toastr.error('Simpan  Gagal Silahkan Ulangi Lagi', 'Eror');
                    }, 500);
                  }


          
            },
              Error => {
            
               console.log(Error)
              }
            )



           
         
           }, 300);
       
    
         
          }else{
           this.toastr.error('Simpan  Gagal', 'Eror');
         
          }
      
      
      
      
      
       })
    


  }

  close(){
    this.showtransaksi = true;
  }

  metodeminum(aturanminum,kdobat){

      Swal.fire({
        title: 'Masukan Aturan',
        input: 'select',
        inputValue:aturanminum, 
        inputOptions: {
        
          SebelumMakan: 'Sebelum Makan',
          SesudahMakan: 'Sesudah Makan',
          BersamaMakan: 'Bersama Makan',
         
        },
      
        customClass: {
          validationMessage: 'my-validation-message'
        },
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage(
              
              '<i class="fa fa-info-circle"></i> Aturan Belum disi'
            )
          }else{
          
    
         
    
    
          }
        }
      })


    }
    namaetiket:string='';
    signae:string='';
    aturane:any;
    qtye:any;
    kete:string='';
    
showtombol:boolean;
kdobate:any;

    tambahetiket(content,a,obat,signa,aturanminum,qty,keterangan,kdobat){

console.log(a,obat,signa,aturanminum,qty,keterangan)


if(a === '1'){
this.showtombol = true;
  this.namaetiket=obat;
  this.signae=signa;
  this.qtye=qty;
 this.kete = keterangan;
 this.aturane = aturanminum;
this.kdobate = kdobat;
}else{
  this.showtombol = false;
 this.namaetiket='';
 this.signae='';
 this.qtye='';
this.kete = '';
}

      this.modalService.open(content, {
       
      });
    }


    tmpetiket(){
      this.authService.etiket(this.kdcabang,this.notransaksi)
      .subscribe(
        data => {
        
            if(data.length){
          
              this.tetiket = data;


            }else{

            
            }


    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
    simpanetiket(){


      let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,
      "norm":this.norm,"kduser":this.username,"stssimpan":'2',"obat":this.namaetiket,"signa":this.signae,"aturan":this.aturane,
      "qty":this.qtye,"keterangan":this.kete
    }

    this.authService.simpanetiket(body)
    .subscribe(response => {
    
   
   
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
   
          
      
          setTimeout(() => {
            this.tmpetiket()
          }, 200);


          this.modalService.dismissAll()
 
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
   
   
   
   
   
    })

    }

    editetiket(){
      let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,"kdobat":this.kdobate,
      "norm":this.norm,"kduser":this.username,"stssimpan":'3',"obat":this.namaetiket,"signa":this.signae,"aturan":this.aturane,
      "qty":this.qtye,"keterangan":this.kete
    }

    this.authService.simpanetiket(body)
    .subscribe(response => {
    
   
   
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
   
          
      
          setTimeout(() => {
            this.tmpetiket()
          }, 200);


          this.modalService.dismissAll()
 
      
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
   
   
   
   
   
    })
    }
    tjenisbayar:any;
    jbayari='';
    produkbayar:any;
    kdprodukbayar:any;
    showlstbank:boolean;

  
    yangmasuk:number=0;
    yangmasuki:number=0;
    banklis='';
    keterangb='';
    jumlahpasien:number=0;
    jumlahpasieni:number=0;
    jumlahpasienx:number=0;
    jumlahpasienx1:number=0;
    kembalian:number=0;
    kembaliani:number=0;
    totalrjsaja:number;
    lstbank:any;
    bayarmodal(content){


      if(this.nofaktur === ''){
      

        if(this.ttlsisaterbayar <= 0){
          this.toastr.error('Transaksi Sudah Terbayar', 'Eror');
        }else{

          this.listbank()
          this.yangmasuk=this.ttlsisaterbayar;
          this.jumlahpasien = this.ttlsisaterbayar;
    
          this.modalService.open(content, {
         
          });
        }

       
      }else{
        this.toastr.error('Silahkan Bayar melalui Kasir RJ', 'Eror');
      }
   
  
    }
    listbank(){
      this.authService.jenisbayar('1','')
      .subscribe(
        data => {
        
    this.tjenisbayar = data;
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }
    jbayar(a){
          
      console.log(a)
      
      
      this.authService.jenisbayar('2',a)
      .subscribe(
        data => {
        
          for (let productx of data )
          {
            this.produkbayar= productx.bayar
      this.kdprodukbayar = productx.kdakhir
          }
      
      },
        Error => {
      
         console.log(Error)
        }
        )
      
      
      
                if(a === '2'){
                  this.showlstbank = false
      
      //             this.jumlahpasien = this.totalrjsaja;
      // this.kembalian = 0
                }else{
                  this.showlstbank = true
                  // this.jumlahpasien = 0
                  // this.kembalian = 0
                  this.authService.listbank(this.kdcabang)
                  .subscribe(
                    data => {
                    
                this.lstbank = data;
                
                  },
                    Error => {
                  
                     console.log(Error)
                    }
                  )
                }
            
              }



              jmlu(a){
                console.log(a)
                this.kembalian = a.target.value - this.ttlsisaterbayar
              }


              refreshtagiha(){
                this.authService.trxfgudang(this.kdcabang,this.nofaktur,this.notransaksi)
                .subscribe(
                  data => {
                  
              this.tgudangx = data;
              for (let x of data )
                    {
                    

                      
                     
                      this.netto = x.totalbayar;
                      this.admresep = x.adminresep;
                      this.tuslahresep = x.tuslah;
                  
                      this.pembulatan = x.pembulatan;
                      this.ttlterbayar  = x.sudahbayar;
              
                    }
                    this.ttlsisaterbayar = this.netto - this.ttlterbayar;
              
                },
                  Error => {
                
                   console.log(Error)
                  }
                )
              }
      bayartagihanakhir(){
        if(this.kembalian < 0){
          this.toastr.error('Tidak Bisa Simpan Karena Uang Dari Pasien Kurang', 'Eror');
        }else{
            if(this.ttlsisaterbayar <= 0){
              this.toastr.error('Sudah Terbayar', 'Eror');
            }else{

            
  
              let body={
                "kdbayar":this.kdprodukbayar,"bayar":this.produkbayar,"jbayari":this.jbayari,"sudahbayar":this.jumlahpasien,
                "norm":this.norm,"bank":this.banklis,"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,
              "kduser":this.username,"stssimpan":'1'
              }


              this.authService.simpanbayarfarmasi(body)
              .subscribe(response => {
              
             
             
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
             
                    
                
                    setTimeout(() => {
                      this.refreshtagiha()
                      this.showobt = false;
                    }, 200);
          
          
                    this.modalService.dismissAll()
           
                
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
             
             
             
             
             
              })


            }

        }
      }


      hapusetiket(a,obat,signa,aturanminum,qty,keterangan,kdobat){
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
  
  
            let body={"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,
            "kdobat":kdobat,
            "norm":this.norm,"kduser":this.username,"stssimpan":'4',"obat":obat,"signa":signa,"aturan":aturanminum,
            "qty":qty,"keterangan":keterangan
          }
      
          this.authService.simpanetiket(body)
          .subscribe(response => {
          
         
         
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
         
                
            
                setTimeout(() => {
                  this.tmpetiket()
                }, 200);
      
      
                this.modalService.dismissAll()
       
            
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

      batalbayar(){

        if(this.notransaksi === 'undefined'){
          this.toastr.error('Tidak ada transaksi yang di pilih', 'Eror');
        }else{

          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Batal Bayar',
            text: 'Batal Bayar Transaksi'+this.notransaksi,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Batal Bayar',
            cancelButtonText: 'Batal',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
    
    
              let body={
                "kdbayar":'',"bayar":'',"jbayari":'',"sudahbayar":this.jumlahpasien,
                "norm":this.norm,"bank":'',"kdklinik":this.kdklinik,"kdcabang":this.kdcabang,"notransaksi":this.notransaksi,
              "kduser":this.username,"stssimpan":'2'
              }


              this.authService.simpanbayarfarmasi(body)
              .subscribe(response => {
              
             
             
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
             
                    
                
                    setTimeout(() => {
                      this.refreshtagiha()
                      this.showobt = false;
                    }, 200);
          
          
                    this.modalService.dismissAll()
           
                
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
       
      }


      cetakresepdokter(){
  
        var redirectWindow = window.open(this.URLINVOICE+'clenic/report/resepdaridokter.php?nofaktur='+this.nofaktur+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
        redirectWindow.location;
      }


      cetaketiket(){
  
        var redirectWindow = window.open(this.URLINVOICE+'clenic/report/etiket.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
        redirectWindow.location;
      }

tretur:any;
caripasx='2';
      carireturpenjualan(content){
        this.authService.listfarmasijualretur(this.kdcabang,this.caripasx,'',this.tglp)
        .subscribe(
          data => {
          
      this.tretur = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )


        this.modalService.open(content, {
          size: 'lg'
        });
      }

      ktglradx(){
        this.authService.listfarmasijualretur(this.kdcabang,this.caripasx,'',this.tglp)
        .subscribe(
          data => {
          
      this.tretur = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      }

      caripassretur(a){
        this.authService.listfarmasijualretur(this.kdcabang,this.caripasx,a.target.value,this.tglp)
        .subscribe(
          data => {
          
      this.tretur = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      }
      }
