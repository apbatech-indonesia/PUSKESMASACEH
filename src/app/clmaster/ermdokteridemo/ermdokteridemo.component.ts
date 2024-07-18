import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { WebsocketService } from "../../websocket.service";
import { AppComponent } from 'src/app/app.component';
import { ChatService } from '../../chat.service';
import { FarmasijualService } from '../kasirfarmasijual/farmasijual.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-ermdokteridemo',
  templateUrl: './ermdokteridemo.component.html',
  styles: [
   
  ],
  providers: [
WebsocketService,
DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ermdokteridemoComponent implements OnInit {
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
username:any;
tglp : String = new Date().toISOString();
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
kduser:any;
  content = '';
  received = [];
  sent = [];
  kodeorg:any=''
  tglss:any;
  myDate = new Date();
  constructor(
    private chatService: ChatService,public FarmasijualService:FarmasijualService,private datepipe: DatePipe,private router:Router,
    private appComponent : AppComponent,private WebsocketService: WebsocketService,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 
this.authService.cabangper(this.kdklinik)
.subscribe(
  data => {


    for (let x of data) {
      this.kodeorg = x.kodeorg

    }


  },
  Error => {

    console.log(Error)
  }
)
this.tglss = this.datepipe.transform(this.myDate,'yyyy-MM-ddTHH:mm:ss+07:00')

  //  WebsocketService.messages.subscribe(msg => {
  //     this.received.push(msg);
  //     console.log("Ini hasil cetak di Angular");
  //     console.log("Ini nilai msg");
  //     console.log(msg);
  //     console.log("Ini nilai pesan");
  //     console.log(msg['pesan']);
  //     const pesan = JSON.parse(msg['pesan']);
  //     const userData = JSON.parse(localStorage.getItem('userDatacl'));
  //     console.log(pesan);

  //     if(pesan == userData['userData']['kduser']){
  //       this.pasienNotification("Anda mendapatkan pasien baru")
  //     }
      
      
    
  //   });

  this.authService.cabangper(this.kdklinik)
  .subscribe(
    data => {
  
  
  for(let x of data){
  this.kodeorg=x.kodeorg
  
  }
  
  
  },
    Error => {
  
     console.log(Error)
    }
  )
  

  }
  // ksatusehat(notransaksi,norm,kddokter,kdpoli,nokunjungan,noantrianbpjs,noasuransi,kdpolibpjs,idpasien,idhis,idsatusehat,pasien,nampoli,namdokter){

  //   const headers = new HttpHeaders({
  //     'kd-cabang': this.kdcabang
    
  //   });
  //   let body={
      
  //       "data": {        
  //           "organizationId": this.kodeorg,
  //           "patientId": idpasien,
  //           "patientNama": pasien,
  //           "practitionerId": idhis,
  //           "practitionerNama":namdokter,
  //           "periodStart": this.tglss,
  //           "periodEnd": this.tglss,
  //           "locationId": idsatusehat,
  //           "locationDisplay":nampoli
  //       }
    
  //   }

    
  //   this.authService.simpanencounter(body,headers)
  //   .subscribe(response => {

    

  //     if(response.resourceType === 'Encounter'){


  //       let bodyx={
  //         "stssimpan":'2',
  //         "token":response.id,
  //         "notransaksi":notransaksi,
  //         "norm":norm,
  //         "idpasien":idpasien
  //       }
  //       this.authService.simpantoken(bodyx)
  //       .subscribe(response => {
  
  //         if(response.length){
  
  //           this.toastr.success('Berhasil Kirim ');
  //         }
  
  //       }
  //       )
  //     }else{

  //       console.log(response.issue[0])

  //       this.toastr.error(response.issue[0].diagnostics);
  //     }

  




  //   })

  // }
  // pasienNotification(msg)
  // {
  //   let audio: HTMLAudioElement = new Audio('https://clenicapp.com/notiflama.mp3');
  //   audio.play();
  //   this.tmptotal()
    

  // }

  //   sendMsg() {
  //   let message = {
  //     source: '',
  //     content: ''
  //   };

  //   message.source = 'localhost';
  //   message.content = this.content;

  //   this.sent.push(message);
  //   this.WebsocketService.messages.next(message);
  // }

  // sendNotificationDokter(kodeDokter)
  // {
  //   this.sent.push(kodeDokter);
  //   this.WebsocketService.messages.next(kodeDokter);
  // }


  ngOnInit() {
  
    this.tmptotal()
    
  
  }
totalpass:number=0;
totalpassbelum:number=0;
totalpasssudah:number=0;
tampilpas:any;
statuscari:any='';

  tmptotal(){
    this.authService.pasienperdokterri(this.kdcabang,this.kduser,'BELUM','','2',this.statuscari)
    .subscribe(
      data => {
this.totalpass = data.length
this.tampilpas = data;

  
    },
      Error => {
    
       console.log(Error)
      }
    )
  
  
    this.authService.pasienperdokterri(this.kdcabang,this.kduser,'BELUM','','1',this.statuscari)
    .subscribe(
      data => {
this.totalpassbelum = data.length
      
  
    },
      Error => {
    
       console.log(Error)
      }
    )



    this.authService.pasienperdokterri(this.kdcabang,this.kduser,'SUDAH','','1',this.statuscari)
    .subscribe(
      data => {
this.totalpasssudah = data.length
      
  
    },
      Error => {
    
       console.log(Error)
      }
    )

  
  }
 

  cpasien(a){
    this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM',a.target.value,'2',this.statuscari)
    .subscribe(
      data => {

this.tampilpas = data;

  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
   
  norm :''
  kdpoli:''
  tglpriksa:''
  kddokter:''
  kdkostumerd:''
  notransaksi:''
  pasien:''
  tgllahir:''
  noantrian:''
  nampoli:''
  namdokter:''
  namacus:''
  costumer:''
  alamat:''
  kdtarif:''
  showdata:boolean;
  kelas:string;

  pilihpasien(norm,kdpoli
        ,tglpriksa
        ,kddokter
        ,kdkostumerd
        ,notransaksi
        ,pasien
        ,tgllahir
        ,noantrian
        ,nampoli
        ,namdokter
        ,nama
        ,costumer
        ,alamat,kdtarif,kelas){
          this.showdata = true;
          this.norm =norm
          this.kdpoli = kdpoli
          this.tglpriksa = tglpriksa
          this.kddokter = kddokter
          this.kdkostumerd = kdkostumerd
          this.notransaksi = notransaksi
          this.pasien = pasien
          this.tgllahir = tgllahir
          this.noantrian = noantrian
          this.nampoli = nampoli
          this.namdokter = namdokter
          this.namacus = nama
          this.costumer = costumer
          this.alamat = alamat
          this.kdtarif = kdtarif
          this.kelas = kelas;

     



       



        
       
        }

        onChange(a){


          this.statuscari = a;

          this.tmptotal()


        }
        panggil(a,kddokter,namdokter,kodeantrian,pasien,v,nampoli){

          const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

swalWithBootstrapButtons.fire({
  title: 'Panggil?',
  text: 'Yakin Akan Panggil Antrian',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Panggil',
  cancelButtonText: 'Batal',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
 
    // this.WebsocketService.sendMessage([
    //   {
    //     antrian:a,
    //     kddokter:kddokter,
    //     namadokter:namdokter,
    //     kdantrian:kodeantrian
    //   }

    // ]);


    this.chatService.sendMessage([
        {
          antrian:a,
          kddokter:kddokter,
          namadokter:namdokter,
          kdantrian:kodeantrian,
          pasien:v,
          nampoli:nampoli
        }
  
      ]);

  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    
  }
});


    

    }


    not:any='';
    showloading:boolean=false;
    idhs:any='';

    ksatusehat(notransaksi,norm,idpasien,idhis,idsatusehat,pasien,nampoli,namdokter,nopengenal,kddokter,sts){



      if(this.akses ==='Dokter'){
        this.router.navigate(['/emrform/tuliserm',notransaksi,kddokter,'dokter',norm]);
      }else{
        this.router.navigate(['/emrform/tuliserm',notransaksi,kddokter,'all',norm]);
      }
    //   const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // });

    // swalWithBootstrapButtons.fire({
    //   title: 'Kirim SatuSehat?',
    //   text: 'Yakin Akan SatuSehat',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Kirim Satusehat',
    //   cancelButtonText: 'Lihat EMR Saja',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.value) {

    //     // ['/master/tuliserm', x.notransaksi,x.kddokter,'dokter']

    //     this.not = notransaksi;
    //     this.showloading = true;
    
    //     this.FarmasijualService.ceksatusehat(notransaksi)
    //     .subscribe(
    //       data => {
    
    
    //         if(data.length){
    //           this.toastr.error('Sudah terkirim sebelumnya', '', {
    //             timeOut: 2000,
    //           });
    
    //           this.showloading = false;
    
    //           this.router.navigate(['/emrform/tuliserm',notransaksi,kddokter,'dokter',norm]);
    
    //         }else{
    
    //           const headers = new HttpHeaders({
    //             'kd-cabang': this.kdcabang
          
    //           });
          
    //           this.authService.getpasien(nopengenal, headers)
    //             .subscribe(
    //               data => {
          
          
          
    //                 if (data.entry.length !== 0) {
    //                   this.idhs = data.entry[0].resource.id
          
          
    //                 let body={
                
    //                   "data": {        
    //                       "organizationId": this.kodeorg,
    //                       "patientId":  this.idhs,
    //                       "patientNama": pasien,
    //                       "practitionerId": idhis,
    //                       "practitionerNama":namdokter,
    //                       "periodStart": this.tglss,
    //                       "periodEnd": this.tglss,
    //                       "locationId": idsatusehat,
    //                       "locationDisplay":nampoli
    //                   }
                  
    //               }
              
                  
    //               this.authService.simpanencounter(body,headers)
    //               .subscribe(response => {
              
                  
              
    //                 if(response.resourceType === 'Encounter'){
              
              
    //                   let bodyx={
    //                     "stssimpan":'2',
    //                     "token":response.id,
    //                     "notransaksi":notransaksi,
    //                     "norm":norm,
    //                     "idpasien":idpasien
    //                   }
    //                   this.authService.simpantoken(bodyx)
    //                   .subscribe(response => {
                
    //                     if(response.length){
                
    //                       this.toastr.success('Berhasil Kirim ');
    //                       this.showloading = false;
    //                       this.router.navigate(['/emrform/tuliserm',notransaksi,kddokter,'dokter',norm]);
              
    //                     }
                
    //                   }
    //                   )
    //                 }else{
              
    //                   console.log(response.issue[0])
              
    //                   this.toastr.error(response.issue[0].diagnostics);
    //                 }
              
                
              
              
              
              
    //               })
              
    //               }else{
    //                 this.showloading = false;

    //                 this.idhs = 'Gagal Get IHS'
    //                 this.toastr.error('Silahkan Lengkapi NIK Pasein Agar dapat ID Satu Sehat Pasien', 'SATU SEHAT ID PASIEN', {
    //                   timeOut: 2000,
    //                 });
    //               }
          
          
    //               },
    //               Error => {
          
    //                 console.log(Error)
    //               }
    //             )
          
    //         }
    
    
    //       },
    //       Error => {
    
    //         console.log(Error)
    //       }
    //     )

    
     


    //   } else if (
    //     /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     this.router.navigate(['/emrform/tuliserm',notransaksi,kddokter,'dokter',norm]);
    //     // [routerLink]="['/emrform/tuliserm', x.notransaksi,x.kddokter,'dokter',x.norm]"
    //   }
    // });


      
      
        }

}
