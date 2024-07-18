import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { perminobatComponent } from '../perminobat/perminobat.component';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { G } from '@angular/cdk/keycodes';
import { SampleService } from 'src/app/services';


@Component({
  selector: 'app-tulisermrm',
  templateUrl: './tulisermrm.component.html',
  styles: [
   
  ],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})


export class tulisermrmComponent implements OnInit {
  @ViewChild('selectxx') selectxx: NgSelectComponent;
@ViewChild('myButton') myButton : ElementRef;
@ViewChild('usx') input :ElementRef<HTMLInputElement>;


@ViewChild('signature')
public signaturePad: SignaturePadComponent;

private signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
  'minWidth': 1,
  'canvasWidth': 500,
  'canvasHeight': 300,
  'penColor': 'rgb(255, 3, 3)',


  'backgroundColor': 'rgb(252, 252, 252)',
};



  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faCog = faCog;
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

// @ViewChild('NgSelectComponentx') ngSelectComponent: NgSelectComponent;

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
  norm :string
  kdpoli:string
  tglpriksa:''
  kddokter:string;
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
  alergi:'';

  kdtarif:''
  notrans:string;
  kelas:string;
  showdata:boolean;
//   kelas:string;
umur:string;
subjek:string;
td:string;
bb:string;
nadi:string;
suhu:string;
rr:string;
spo:string;
pf:string;
plan:string;
hostName: string;
URLINVOICE:string

  constructor(public hots:SampleService,private router: Router,private route: ActivatedRoute,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder,private domSanitizer: DomSanitizer) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 
this.hak()
  }
  file=new FormControl('')
  file_data:any=''
  fileChange(event) {
    
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

        const file = fileList[0];
        //get file information such as name, size and type
        console.log('finfo',file.name,file.size,file.type);
        //max file size is 4 mb
        if((file.size/1048576)<=4)
        {
          let formData = new FormData();
          let info={id:2,name:'raja'}
          formData.append('file', file, file.name);
          formData.append('id','2');
          formData.append('tz',new Date().toISOString())
          formData.append('update','2')
          formData.append('info',JSON.stringify(info))
          this.file_data=formData

          console.log(formData)
          
        }else{
          this.toastr.error('Berkas Foto Terlalu Besar Harus Di Bawah 4mb', 'Eror');
      
          //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
        }
        
    }

  }
  upload(){
    console.log(this.file_data)
  }
  imageSrc:any = '';
  imageSrcx:any='';
  imageSrcxx:any='';
  status:boolean = false
  showkkk:boolean = true;

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
  showkkkx:boolean = true;
  showkkkxx:boolean = true;
  showuploadd:boolean;
  showuploaddd:boolean;
  kuplab(){
    this.showuploadd = true;
    this.monitoringshowcontent = false;
  }
  kuprad(){
    this.showuploaddd = true;
    this.monitoringshowcontentx = false;
  }
  onFileChangex(event:any) {

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
          this.showkkkx = false;

            this.imageSrcx = reader.result;          
         }
      }
    }else{
      this.toastr.error('Berkas Foto Terlalu Besar Harus Di Bawah 4mb', 'Eror');
  
    
    }

  }
  keteranganakhirxx:string='';

  onFileChangexx(event:any) {

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
          this.showkkkxx = false;

            this.imageSrcxx = reader.result;          
         }
      }
    }else{
      this.toastr.error('Berkas Foto Terlalu Besar Harus Di Bawah 4mb', 'Eror');
  
    
    }

  }
  submit(){

    console.log(this.imageSrc)
  //   this.http.post('http://localhost/phpapi/imageupload.php', {'image':this.imageSrc})
  //     .subscribe(res => {
  //       console.log(res);
  //       alert('Uploaded Successfully.');
  //     })
  // }
}

  rj:number;
  far:number;
  lab:number;
  rad:number;
  emr:number;

  hak(){
    this.authService.hakakses(this.kdcabang)
    .subscribe(
      data => {
     for (let x of data ){
  this.rj = x.rj
  this.far = x.farmasi
  this.lab = x.lab
  this.rad = x.rad
  this.emr = x.emr
   }
  
     
  
      },
      Error => {
    
       console.log(Error)
      }
    )
  
  
  }

  showingmb:boolean=true;

  ksad(){
  this.signaturePad.clear();
}
uploadx(){
this.showingmb = false;
}
  ngOnInit() {
    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';


    this.notrans = this.route.snapshot.paramMap.get('notrans')
    this.kddokter = this.route.snapshot.paramMap.get('kddokter')

    setTimeout(() => {

      localStorage.setItem('noclenic', JSON.stringify( {
      notrans: this.notrans,
      kddokter: this.kddokter,
  
      
      }));
      
      
      }, 0);



  this.tampildata()
  this.tampildaigtindakinput()
  this.tmpcppt()

setTimeout(() => {
  
  this.authService.listintruksilab(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistlab = data;

  },
    Error => {
  
     console.log(Error)
    }
  )

 




}, 100);


setTimeout(() => {
  this.authService.listintruksilab(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistrad = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
}, 150);

setTimeout(() => {
  this.authService.obatnonracik(this.kdcabang,this.notrans,this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistobatn = data;

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.obatracik(this.kdcabang,this.notrans,this.notrans+this.kddokter,this.nomorracik)
  .subscribe(
    data => {
    
this.tlistobatr = data;

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.tmpbhp(this.kdcabang,this.notrans,this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistbhpr = data;

  },
    Error => {
  
     console.log(Error)
    }
  )


  this.authService.alergi(this.norm,this.kdcabang)
  .subscribe(
    data => {
    
this.talergi = data;

  },
    Error => {
  
     console.log(Error)
    }
  )
  

}, 250);

  }


  talergi:any;


  tlistobatn:any;
  tlistobatr:any;
  dash:any;

  tampildata(){
         this.authService.datapasien(this.kdcabang,this.notrans)
    .subscribe(
      data => {
        for (let x of data )
        {
          this.norm =x.norm
                    this.kdpoli = x.kdpoli
                    this.tglpriksa = x.tglpriksa

                    this.kdkostumerd = x.kdkostumerd
                    this.notransaksi = x.notransaksi
                    this.pasien = x.pasien
                    this.tgllahir = x.tgllahir
                    this.noantrian = x.noantrian
                    this.nampoli = x.nampoli
                    this.namdokter = x.namdokter
                    this.namacus = x.nama
                    this.costumer = x.costumer
                    this.alamat = x.alamat
                    this.kdtarif = x.kdtarif
                    this.kelas = x.kelas;
                    this.umur = x.umur;
                    this.dash = x.dash

        }


  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  tmpcpptt:any;
  showdatacppt:boolean;
gmburl:string;
hr:string;
tdd:string;
tb:string;

  tmpcppt(){
    this.authService.tampilcppt(this.kdcabang,this.notrans)
    .subscribe(
      data => {
  
       
        // this.tmpcpptt = data;
        for (let x of data )
        {
          this.subjek = x.subjek
          this.td= x.td
          this.bb= x.bb
          this.nadi=  x.nadi
          this.suhu= x.suhu
          this.rr= x.rr
          this.spo= x.spo
          this.pf= x.pf
          this.plan= x.planing
          this.gmburl = x.url
          this.alergi = x.alergi
          this.tdd = x.tdd
          this.hr = x.hr
          this.tb = x.tb
        }
        if(data.length){
          this.showdatacppt = true;
          
        }else{

        }
  
  },
  Error => {
  
   console.log(Error)
  }
  )
  }
tlab:any;
trad:any;

krad(){
  this.monitoringshowcontent = false
  this.monitoringshowcontentx = false
  this.monitoringshowcontentrj = false
  this.monitoringshowsakit = false;

  this.authService.riwayatradiologi(this.kdcabang,this.norm)
  .subscribe(
    data => {


      this.trad = data;


},
Error => {

 console.log(Error)
}
)
}
  klab(){
    this.monitoringshowcontent = false
    this.monitoringshowcontentx = false
    this.monitoringshowcontentrj = false
    this.monitoringshowsakit = false;
  
    this.authService.riwayatlaborat(this.kdcabang,this.norm)
    .subscribe(
      data => {


        this.tlab = data;


  },
  Error => {

   console.log(Error)
  }
)
  }
  monitoringurl:SafeResourceUrl;
  monitoringurlx:SafeResourceUrl;
  monitoringurlrj:SafeResourceUrl;
  monitoringshowcontent:boolean;
  monitoringshowcontentrj:boolean;
  monitoringshowcontentx:boolean;

  monitoringshowsakit:boolean;
  monitoringurlsakit:SafeResourceUrl;

ip:string='https://clenicapp.com/';

lihatrad(notrans,kdcabang,kdproduk,status,nmfile){
  this.monitoringshowcontentx = true
  this.showuploaddd = false;

  if(status === '1'){
    this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasilrad.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&kdproduk='+kdproduk);
   
  }else{
    this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasilradu.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&kdproduk='+nmfile);
   
  }
 
}

  lihatlab(notrans,kdcabang,status,nmfile){
    this.monitoringshowcontent = true
    this.showuploadd = false;
    console.log(notrans)

    if(status === '1'){
      this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasillab.php?notransaksi='+notrans+'&kdcabang='+kdcabang);
   
    }else{
      console.log('s')
      this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasillabu.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&x='+nmfile);
   
    }
      
  }

  lihatresume(notrans,norm,kdcabang){
    this.monitoringshowcontentrj = true
 
    this.monitoringurlrj = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/resumerj.php?notrans='+notrans+'&norm='+norm+'&kdcabang='+kdcabang);
      
  }

  ksakit(){
    this.monitoringshowsakit = true;
    this.monitoringurlsakit = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/suratsakit.php?nosurat='+this.notrans+'&norm='+this.norm+'&kdcabang='+this.kdcabang+'&kddokter='+this.kddokter);
     
  }
  ksehat(){
    this.monitoringshowsakit = true;
    this.monitoringurlsakit = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/suratsehat.php?nosurat='+this.notrans+'&norm='+this.norm+'&kdcabang='+this.kdcabang+'&kddokter='+this.kddokter);
     
  }

  diagnosa:string;
  kddiagnosa:string;
  tindakan:string;
  kdtindakan:string;

  diagnos:any;

dignosshow:boolean;
pilihdiag(kddiagnosa,diagnosa){


setTimeout(() => {
  let body = {
    "notrans":this.notransaksi,"diagnosa":diagnosa,"kddiagnosa":kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
    "norm":this.norm,"status":'diagnosa',"stssimpan":'1',"kdcabang":this.kdcabang
  }



    console.log(body)

  this.authService.simpandiagtindak(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

setTimeout(() => {
  this.tampildaigtindakinput()

}, 200);
   
      this.dignosshow = false;
this.kddiagnosa ='';
this.diagnosa='';
      
     
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })

}, 0);





}

pilihtindak(kddiagnosa,diagnosa){
  setTimeout(() => {
    let body = {
      "notrans":this.notransaksi,"diagnosa":diagnosa,"kddiagnosa":kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
      "norm":this.norm,"status":'tindakan',"stssimpan":'1',"kdcabang":this.kdcabang
    }
  
  
  
      console.log(body)
  
    this.authService.simpandiagtindak(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
  
  setTimeout(() => {
    this.tampildaigtindakinput()
  }, 200);
    
  
        this.tindaksshow = false;
  this.kdtindakan ='';
  this.tindakan='';
        
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
  
  }, 0);
  
  
}
senditx(){
  setTimeout(() => {
    let body = {
      "notrans":this.notransaksi,"diagnosa":this.tindakan,"kddiagnosa":this.kdtindakan,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
      "norm":this.norm,"status":'tindakan',"stssimpan":'1',"kdcabang":this.kdcabang
    }
  
  
  
      console.log(body)
  
    this.authService.simpandiagtindak(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
  
  setTimeout(() => {
    this.tampildaigtindakinput()
  }, 200);
     
  
        this.tindaksshow = false;
  this.kdtindakan ='';
  this.tindakan='';
        
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
  
  }, 0);
  
}
tdiag:any;
ttindak:any;

tampildaigtindakinput(){
  this.authService.diagnosatmp(this.kdcabang,this.notrans,'diagnosa')
  .subscribe(
    data => {


      this.tdiag = data;


},
Error => {

 console.log(Error)
}
)


this.authService.diagnosatmp(this.kdcabang,this.notrans,'tindakan')
.subscribe(
  data => {


    this.ttindak = data;


},
Error => {

console.log(Error)
}
)

}
sendit(a){
  console.log(a)

  setTimeout(() => {
    let body = {
      "notrans":this.notransaksi,"diagnosa":this.diagnosa,"kddiagnosa":this.kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
      "norm":this.norm,"status":'diagnosa',"stssimpan":'1',"kdcabang":this.kdcabang
    }
  
  

      console.log(body)
  
    this.authService.simpandiagtindak(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });

  setTimeout(() => {
    this.tampildaigtindakinput()
 
  }, 200);
    
        this.dignosshow = false;
        this.kddiagnosa ='';
        this.diagnosa='';
        
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
  
  }, 0);



}
caridiag(a){


  if(a.target.value === ''){
    this.dignosshow = false;

  }else{
    this.dignosshow = true;

    this.authService.caridiagnosa(a.target.value,'2')
    .subscribe(data => {
      this.diagnos = data;
    
     
     
    })
  }
    
   
    
      }


tindak:any;
tindaksshow:boolean;

      caritindakan(a){
    
    console.log(a.target.value)
        if(a.target.value === ''){
          this.tindaksshow = false;
      
        }else{
          this.tindaksshow = true;
      
          this.authService.caritindakan(a.target.value,'2')
          .subscribe(data => {
            this.tindak = data;
          
           
           
          })
        }
      }

      hapusdiag(notrans,no,diagnosa){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: 'Hapus',
          text: 'Hapus  '+diagnosa,
       
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {


         

            setTimeout(() => {
              let body = {
                "notrans":notrans,'no':no,"diagnosa":this.diagnosa,"kddiagnosa":this.kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
                "norm":this.norm,"status":'diagnosa',"stssimpan":'2',"kdcabang":this.kdcabang
              }
            
            
          
            
              this.authService.simpandiagtindak(body)
              .subscribe(response => {
              
              
              
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
          
                  setTimeout(() => {
                    this.tampildaigtindakinput()
           
                  }, 200);
                  
                  
                  
                 
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
              
              
              
              
              
              })
            
            }, 0);


            
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

      tsubjek:any;
      showtsubjek:boolean;

      carisubjek(a){
        if(a.length >= 10){
          console.log('tutupnet')
          this.showtsubjek = false;

        }else{

          if(a === ''){
            this.showtsubjek = false;
          }else{
            this.showtsubjek = true;
            this.authService.tamplateos(this.kdcabang,this.kduser,'1',a)
            .subscribe(
              data => {
              
               this.tsubjek = data;
               
           
            
            },
              Error => {
            
               console.log(Error)
              }
            ) 
          }
          


          console.log('bukanet')
        }
      }

      pilihsub(details){
      this.subjek = details;
      this.showtsubjek = false;
      }

      pilihpf(details){
        this.pf = details;
        this.showtpf = false;
      }




      showtpf:boolean;
      tpf:any;

      caripf(a){
        if(a.length >= 10){
          console.log('tutupnet')
          this.showtpf = false;

        }else{

          if(a === ''){
            this.showtpf = false;
          }else{
            this.showtpf = true;
            this.authService.tamplateos(this.kdcabang,this.kduser,'2',a)
            .subscribe(
              data => {
              
               this.tpf = data;
               
           
            
            },
              Error => {
            
               console.log(Error)
              }
            ) 
          }
          


          console.log('bukanet')
        }
      }


      simpan(){
 let body={"alergi":this.alergi,"dari":'1',
          "kdcabang":this.kdcabang,"kduser":this.kduser,"notrans":this.notrans,"norm":this.norm,"kdpoli":this.kdpoli,
          "kddokter":this.kddokter,"stssimpan":'1',"subjek":this.subjek,"td":this.td,"bb":this.bb,"nadi":this.nadi,
          "suhu":this.suhu,"rr":this.rr,"spo":this.spo,"pf":this.pf,"planing":this.plan,"tdd":this.tdd,"hr":this.hr,"tb":this.tb
        }

    


        this.authService.simpancppt(body)
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
modalsubjek:boolean;
modalpf:boolean;
modalplan:boolean;
modaldiag:boolean;
modaltindak:boolean;
modalterapi:boolean;

tsubjkerw:any;
tdiagnosa:any;


      openLargex(content,a) {

if(a === 's'){
  this.modalsubjek = true
  this.modalpf = false;
  this.modalplan = false;
  this.modaldiag = false;
  this.modaltindak = false;
  this.modalterapi = false


  this.authService.tampilcpptlist(this.kdcabang,this.norm,this.kddokter,this.kdpoli)
  .subscribe(
    data => {
    
      this.tsubjkerw = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  ) 


}else if(a === 'pf'){

  this.modalpf = true;
  this.modalsubjek = false;
  this.modalplan = false;
  this.modaldiag = false;
  this.modaltindak = false;
  this.modalterapi = false
  
  this.authService.tampilcpptlist(this.kdcabang,this.norm,this.kddokter,this.kdpoli)
  .subscribe(
    data => {
    
      this.tsubjkerw = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  ) 

}else if(a === 'plan'){

  this.modalplan = true;
  this.modaldiag = false;
  this.modalpf = false;
  this.modalsubjek = false;
  this.modaltindak = false;
  this.modalterapi = false
  
  this.authService.tampilcpptlist(this.kdcabang,this.norm,this.kddokter,this.kdpoli)
  .subscribe(
    data => {
    
      this.tsubjkerw = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  ) 
}else if(a === 'diag'){
this.modaldiag = true;
this.modalplan = false;

this.modalpf = false;
this.modalsubjek = false;
this.modaltindak = false;
this.modalterapi = false
  
this.authService.diagnosacopy(this.kdcabang,this.norm,'diagnosa',this.kdpoli)
.subscribe(
  data => {
  
    this.tdiagnosa = data;
   


},
  Error => {

   console.log(Error)
  }
) 

}else if(a === 'tindak'){
  this.modaltindak = true;
  this.modaldiag = false;
  this.modalplan = false;
  
  this.modalpf = false;
  this.modalsubjek = false;
  this.modalterapi = false
  
  this.authService.diagnosacopy(this.kdcabang,this.norm,'tindakan',this.kdpoli)
.subscribe(
  data => {
  
    this.tdiagnosa = data;
   


},
  Error => {

   console.log(Error)
  }
) 

}else if(a === 'terapi'){

  this.modaltindak = false;
  this.modaldiag = false;
  this.modalplan = false;
  
  this.modalpf = false;
  this.modalsubjek = false;
  this.modalterapi = true
  this.authService.riwayatobat(this.kdcabang,this.norm)
.subscribe(
  data => {
  
    this.tterapi = data;
   


},
  Error => {

   console.log(Error)
  }
) 


}else{

}

      
        this.modalService.open(content, {
         
        });
      }

tterapi:any;

      copysubjek(a){
        this.subjek = a;
        this.modalService.dismissAll()
      }
      copypf(a){
        this.pf = a;
        this.modalService.dismissAll()
      }
      copyplan(a){
        this.plan = a;
        this.modalService.dismissAll()
      }

      copydiag(a){
        let body={
          "notrans":a,"notransx":this.notrans,
          "kdpoli":this.kdpoli,"kdcabang":this.kdcabang,
          "status":'diagnosa',"stssimpan":'1'}
          this.authService.copydiagnosa(body)
          .subscribe(response => {
          
          
          
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
      
        
        setTimeout(() => {
          this.tampildaigtindakinput()
        }, 200);
          
              
             
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
          
          
          
          
          
          })
  

      }


      copytindak(a){
        let body={
          "notrans":a,"notransx":this.notrans,
          "kdpoli":this.kdpoli,"kdcabang":this.kdcabang,
          "status":'tindakan',"stssimpan":'1'}
          this.authService.copydiagnosa(body)
          .subscribe(response => {
          
          
          
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
      
        
        
              this.tampildaigtindakinput()
              
             
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
          
          
          
          
          
          })
      }

triwayatcppt:any
      klikrw(){
        this.authService.tampilcpptlist(this.kdcabang,this.norm,this.kddokter,this.kdpoli)
        .subscribe(
          data => {
          
            this.triwayatcppt = data;
           
       
        
        },
          Error => {
        
           console.log(Error)
          }
        ) 
      }

      ttarif:any;

      tmptarif(){
        this.authService.listtarif(this.kdcabang,'LAB','',this.kdtarif)
        .subscribe(
          data => {
          
      this.ttarif = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      
      
       
      
      }

      tmptarifrad(){
        this.authService.listtarif(this.kdcabang,'RAD','',this.kdtarif)
        .subscribe(
          data => {
          
      this.ttarifrad = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      
      
       
      
      }


      caritarif(a){
  
          this.authService.listtarif(this.kdcabang,'LAB',a.target.value,this.kdtarif)
        .subscribe(
          data => {
          
      this.ttarif = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )
      }
      ttarifrad:any;

      caritarifrad(a){
  
        this.authService.listtarif(this.kdcabang,'RAD',a.target.value,this.kdtarif)
      .subscribe(
        data => {
        
    this.ttarifrad = data;
    
      },
        Error => {
      
         console.log(Error)
        }
      )
    }


      tlistlab:any;
      keteranganakhirrad:string='';
      

      tmplistintruksilab(){
        
               this.authService.listintruksilab(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter)
             .subscribe(
               data => {
               
           this.tlistlab = data;
           
             },
               Error => {
             
                console.log(Error)
               }
             )

             
             this.authService.keteranganklinis(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter)
             .subscribe(
               data => {
              
                for (let x of data )
                {

this.keteranganakhir = x.keterangan
                }


        
           
             },
               Error => {
             
                console.log(Error)
               }
             )





           }


           tlistrad:any;

           tmplistintruksirad(){
        
            this.authService.listintruksilab(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter)
          .subscribe(
            data => {
            
        this.tlistrad = data;
        
          },
            Error => {
          
             console.log(Error)
            }
          )

          
          this.authService.keteranganklinis(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter)
          .subscribe(
            data => {
           
             for (let x of data )
             {

this.keteranganakhirrad = x.keterangan
             }


     
        
          },
            Error => {
          
             console.log(Error)
            }
          )





        }

        perminbat(content5){
        
          this.showtamplate = false
          this.modalService.open(content5, {
            size: 'xl'


          });

       

          
      
        
        }

        perminbatc(){
        
          // this.router.navigate(['master/perminobat',''])
          // this.modalService.open(perminobatComponent, {
          //   size: 'xl'
          // });


          this.modalService.open(perminobatComponent,{size: 'xl'
        }).result.then((result) => {
 

        
        
           
            
           }, (reason) => {
           
            this.tmpnonr( )
        
           });


        


        }
     

        

      perminlab(content6){
        this.tmptarif()
        this.tmplistintruksilab()
        this.modalService.open(content6, {
          size: 'lg'
        });
      }

      perminrad(content2){
        this.tmptarifrad()
        this.tmplistintruksirad()
        this.modalService.open(content2, {
          size: 'lg'
        });
      }



      tambahtarifrad(kdtarif,nama,harga){
        let body ={"kduser":this.username,"norm":this.norm,"dari":'RADIOLOGI',"kdkostumerd":this.kdkostumerd,
       "kdproduk":kdtarif,"produk":nama,"kdpoli":'rad',"qty":'1',"harga":harga,"debet":harga,"kdcppt":this.notrans+this.kddokter,
        "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"nofaktur":this.notrans,
        "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1'
      }

      this.authService.simpanrxtunjangerm(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
  
          this.tmplistintruksirad()
    
         
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
      
      
      
      
      
      })



      }


      
  

      tambahtarif(kdtarif,nama,harga){
        let body ={"kduser":this.username,"norm":this.norm,"dari":'LABORAT',"kdkostumerd":this.kdkostumerd,
       "kdproduk":kdtarif,"produk":nama,"kdpoli":'lab',"qty":'1',"harga":harga,"debet":harga,"kdcppt":this.notrans+this.kddokter,
        "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"nofaktur":this.notrans,
        "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1'
      }

      this.authService.simpanrxtunjangerm(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
  
          this.tmplistintruksilab()
    
         
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
      
      
      
      
      
      })



      }


      hapustarif(kdpruduk,kdpoli,notransaksi,nomor,kdcppt,nama){
 this.authService.verifhapus(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter,this.kddokter,kdpoli,kdpruduk)
        .subscribe(
          data => {
          
   if(data.length){
    let body ={"kduser":this.username,"norm":this.norm,"dari":'LABORAT',"kdkostumerd":this.kdkostumerd,
    "kdproduk":kdpruduk,"produk":nama,"kdpoli":kdpoli,"qty":'1',"harga":0,"debet":0,
    "kdcppt":kdcppt,
     "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":notransaksi,"nomorx":nomor,
     "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'2'
   }

   this.authService.simpanrxtunjangerm(body)
   .subscribe(response => {
   
   
   
     if(response ){
       this.toastr.success(''+response, 'Sukses', {
         timeOut: 2000,
       });

       this.tmplistintruksilab()

      
      
      }else{
       this.toastr.error('Simpan  Gagal', 'Eror');
     
      }
   
   
   
   
   
   })
   }else{
    this.toastr.error('Tidak Bisa Di Hapus Karena Sudah Di Kunci', 'Eror');
         
   }

      
        },
          Error => {
        
           console.log(Error)
          }
        )

}



hapustarifrad(kdpruduk,kdpoli,notransaksi,nomor,kdcppt,nama){
  this.authService.verifhapus(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter,this.kddokter,kdpoli,kdpruduk)
         .subscribe(
           data => {
           
    if(data.length){
     let body ={"kduser":this.username,"norm":this.norm,"dari":'RADIOLOGI',"kdkostumerd":this.kdkostumerd,
     "kdproduk":kdpruduk,"produk":nama,"kdpoli":kdpoli,"qty":'1',"harga":0,"debet":0,
     "kdcppt":kdcppt,
      "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":notransaksi,"nomorx":nomor,
      "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'2'
    }
 
    this.authService.simpanrxtunjangerm(body)
    .subscribe(response => {
    
    
    
      if(response ){
        this.toastr.success(''+response, 'Sukses', {
          timeOut: 2000,
        });
 
        this.tmplistintruksirad()
 
       
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
    }else{
     this.toastr.error('Tidak Bisa Di Hapus Karena Sudah Di Kunci', 'Eror');
          
    }
 
       
         },
           Error => {
         
            console.log(Error)
           }
         )
 
 }

 verifikasirad(){
  let body ={"kduser":this.username,"norm":this.norm,"dari":'RADIOLOGI',"kdkostumerd":this.kdkostumerd,
  "kdproduk":'',"produk":'',"kdpoli":this.kdpoli,"qty":'1',"harga":0,"debet":0,
  "kdcppt":this.notrans+this.kddokter,
   "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":this.notrans,"nomorx":'',"keterangan":this.keteranganakhirrad,
   "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'3'
 }

 this.authService.simpanrxtunjangerm(body)
 .subscribe(response => {
 
 
 
   if(response ){
     this.toastr.success(''+response, 'Sukses', {
       timeOut: 2000,
     });

     this.tmplistintruksirad()


     this.modalService.dismissAll()
    
    
    }else{
     this.toastr.error('Simpan  Gagal', 'Eror');
   
    }
 
 
 
 
 
 })
}

      keteranganakhir:string='';
      verifikasi(){
        let body ={"kduser":this.username,"norm":this.norm,"dari":'LABORAT',"kdkostumerd":this.kdkostumerd,
        "kdproduk":'',"produk":'',"kdpoli":this.kdpoli,"qty":'1',"harga":0,"debet":0,
        "kdcppt":this.notrans+this.kddokter,
         "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":this.notrans,"nomorx":'',"keterangan":this.keteranganakhir,
         "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'3'
       }

       this.authService.simpanrxtunjangerm(body)
       .subscribe(response => {
       
       
       
         if(response ){
           this.toastr.success(''+response, 'Sukses', {
             timeOut: 2000,
           });
   
           this.tmplistintruksilab()
    

           this.modalService.dismissAll()
          
          
          }else{
           this.toastr.error('Simpan  Gagal', 'Eror');
         
          }
       
       
       
       
       
       })
      }

      // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 

      cetakresume(){
        var redirectWindow = window.open(this.URLINVOICE+'clenic/report/resumerj.php?notrans='+this.notrans+'&kdcabang='+this.kdcabang+'&norm='+this.norm, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
        redirectWindow.location;
     }
     tobat:any;



     cariobat(a){
       this.authService.obaterm(this.kdcabang,'2',a.target.value)
       .subscribe(
         data => {
         
          this.tobat = data;
          
      
       
       },
         Error => {
       
          console.log(Error)
         }
       )  
     }

     nmobat:any;
     aturan:string=' ';
     qtyk:number;
     keterangan:string;
     tess(){
      alert('sd')
     }

     tessx(){
      this.myButton.nativeElement.focus()
     }
     onKeyUpa(a){
      this.selectxx.handleClearClick()
     }
  
tambahobat(){
  
     

      // this.aturan ='';
      // this.qtyk=0;
      // this.keterangan=''
  
      // this.selectxx.handleClearClick()

  let body={
"nmobat":this.nmobat,"aturan":this.aturan,"qtyk":this.qtyk,"keterangan":this.keterangan,
"notrans":this.notrans,"norm":this.norm,"kddokter":this.kddokter,
"kdpoli":this.kdpoli,"kdobat":this.nmobat,"statuso":'Non Racik',"dari":'Obat',
"kduser":this.username,"kdcabang":this.kdcabang,"kdcppt":this.notrans+this.kddokter,"stssimpan":'1',"kdkostumerd":this.kdkostumerd
  }


  console.log(body)

  this.authService.simpanrxobaterm(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });
      this.nmobat='';

      // this.ngSelectComponent.handleClearClick()

      this.aturan ='';
      this.qtyk=0;
      this.keterangan=''
     
      setTimeout(() => {
        this.tmpnonr()
      }, 200);
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


}

nomorracik:number;
klikr(){
  this.simno=false;
  this.simnor=true;
  this.authService.nomorracik(this.kdcabang,this.notrans,this.norm)
  .subscribe(
    data => {
    

     this.nomorracik = data;
     
     console.log(this.nomorracik)

 
  
  },
    Error => {
  
     console.log(Error)
    }
  ) 
}

kapasitas:number;
satuanstnd:number;
jmlracik(a){
  this.authService.obatbyid(this.kdcabang,this.nmobatx)
.subscribe(
  data => {
  
    this.kapasitas = Array.prototype.map.call(data,s=>s.zakaktif).toString();
  
    this.satuanstnd = Array.prototype.map.call(data,s=>s.standartd).toString();
  

},
  Error => {

   console.log(Error)
  }
)


setTimeout(() => {
  // console.log(this.kapasitas,this.satuanstnd)

var hnx:number;
var hny:number;
hnx = this.kapasitas / a.target.value;

// console.log(Math.round(hnx))

hny =  Math.round(hnx) * this.satuanstnd ;

// console.log(Math.ceil(hny/this.kapasitas))

var qty:number;
var s:any;

qty   = hny/this.kapasitas;


console.log(qty.toFixed(2))
s = qty.toFixed(1)

this.qtykx = s;

// console.log(hny/this.kapasitas)



}, 200);

}


tobatx:any;

nmobatx:any;


aturanx:string=' ';
qtykx:number;
keteranganx:string;



cariobatx(a){
  this.authService.obaterm(this.kdcabang,'2',a.target.value)
  .subscribe(
    data => {
    
     this.tobatx = data;
     
 
  
  },
    Error => {
  
     console.log(Error)
    }
  )  
}




tambahobatr(){
  let body={
"nmobat":this.nmobatx,"aturan":'-',"qtyk":this.qtykx,"keterangan":this.keteranganx,"noracik":this.nomorracik,
"notrans":this.notrans,"norm":this.norm,"kddokter":this.kddokter,
"kdpoli":this.kdpoli,"kdobat":this.nmobatx,"statuso":'Racik',"dari":'Obat',
"kduser":this.username,"kdcabang":this.kdcabang,"kdcppt":this.notrans+this.kddokter,"stssimpan":'2',"kdkostumerd":this.kdkostumerd
  }


  console.log(body)

  this.authService.simpanrxobaterm(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      // this.namaracikm='';
      // this.aturanm ='';
      // this.qtykm=0;
      // this.keteranganm=''
     
      this.nmobatx='';
   
      this.qtykx=0;
      this.keteranganx=''
     


      setTimeout(() => {
        this.tmpnonr()
             
      }, 250);

     
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


}

namaracikm:string='';
metode:any;
aturanm:string='';
qtykm:number;
keteranganm:string='';


verifracik(){
  let body={
"nmobat":this.namaracikm,"aturan":this.aturanm,"qtyk":this.qtykm,"keterangan":this.keteranganm,"noracik":this.nomorracik,
"notrans":this.notrans,"norm":this.norm,"kddokter":this.kddokter,"metode":this.metode,
"kdpoli":this.kdpoli,"kdobat":this.namaracikm,"statuso":'MRacik',"dari":'MObat',
"kduser":this.username,"kdcabang":this.kdcabang,"kdcppt":this.notrans+this.kddokter,"stssimpan":'3',
"kdkostumerd":this.kdkostumerd
  }


  console.log(body)

  this.authService.simpanrxobaterm(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

       this.namaracikm='';
      this.aturanm ='';
      this.qtykm=0;
      this.keteranganm=''

          


      setTimeout(() => {
        this.tmpnonr()
             
      }, 250);

     
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })


}
simno:boolean=true;
simnor:boolean=false;

kliknonr(){
  this.simno=true;
  this.simnor=false;
  
}

tmpnonr(){
  this.authService.obatnonracik(this.kdcabang,this.notrans,this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistobatn = data;

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.obatracik(this.kdcabang,this.notrans,this.notrans+this.kddokter,this.nomorracik)
  .subscribe(
    data => {
    
this.tlistobatr = data;

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.tmpbhp(this.kdcabang,this.notrans,this.notrans+this.kddokter)
  .subscribe(
    data => {
    
this.tlistbhpr = data;

  },
    Error => {
  
     console.log(Error)
    }
  )




}
tlistbhpr:any;

hapusobat(notransaksi,kdpoli,kdpruduk,statuso,dari,kunci,no,kdcppt,nama){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus',
    text: 'Hapus  '+nama,
 
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {


   if(kunci === '1'){
    this.toastr.error('Data telah di verifikasi tidak bisa di hapus', 'Eror');
   }else{

    let body={"notransaksi":notransaksi,"kdpoli":kdpoli,"kdpruduk":kdpruduk,
    "statuso":statuso,"dari":dari,"kunci":kunci,"no":no,"kdcppt":kdcppt,"kdcabang":this.kdcabang,"stssimpan":'1'

    }
    this.authService.hapusobatnon(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      setTimeout(() => {
        this.tmpnonr()
      }, 200);


    
     
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })
   }
   

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

hapusobatt(a){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Hapus',
    text: 'Hapus  ',
 
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {



    let body={"notransaksi":this.notrans,"kdpoli":this.kdpoli,"kdpruduk":'',"kd":a,
    "statuso":'MRacik',"dari":'MObat',"kunci":'0',"no":'',"kdcppt":this.notrans+this.kddokter,"kdcabang":this.kdcabang,"stssimpan":'2'

    }
    this.authService.hapusobatnon(body)
  .subscribe(response => {
  
  
  
    if(response ){
      this.toastr.success(''+response, 'Sukses', {
        timeOut: 2000,
      });

      setTimeout(() => {
        this.tmpnonr()
      }, 200);


    
     
     }else{
      this.toastr.error('Simpan  Gagal', 'Eror');
    
     }
  
  
  
  
  
  })
   
   

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



profileForm = this.fb.group({
  qtyk: ['',Validators.required],




});

kobat(){

}
testimasi:any;
totalestimasi:number=0;

kestimasi(){
  this.authService.estimasibiaya(this.kdcabang,this.notrans)
  .subscribe(
    data => {
    
this.testimasi= data;

var xyz=0;

      for (let product of data )
{


  for(let x of product.detail){


          var y = parseInt(x.harga)
        
        


          xyz += y;

       
        }

  }

  this.totalestimasi = xyz;


  },
    Error => {
  
     console.log(Error)
    }
  )
}



copyterapi(notransaksi,nama){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Copy',
    text: 'Copy Terapi Tanggal  '+nama,
 
    showCancelButton: true,
    confirmButtonText: 'Copy',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {




let body ={
  "notrans":notransaksi,"notransaksi":this.notrans,"kdkostumerd":this.kdkostumerd,"norm":this.norm,"kddokter":this.kddokter,"kdpoli":this.kdpoli,
  "kduser":this.kduser,"kdcppt":this.notrans+this.kddokter,"stssimpan":'1',"kdcabang":this.kdcabang,"kdtamplate":this.nomorracik
}

      this.authService.copyterapi(body)
      .subscribe(response => {
      
      
      
        if(response ){
          this.toastr.success(''+response, 'Sukses', {
            timeOut: 2000,
          });
    
          setTimeout(() => {
            this.tmpnonr()
          }, 200);
    
    
        
         
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }
      
      
      
      
      
      })
   

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

ttamplate:any;
showtamplate:boolean=false;

caritamplate(a){

if(a.target.value.length){
  this.authService.hasiltamplateobat(this.kdcabang,this.kduser,a.target.value)
  .subscribe(
    data => {

      if(data.length){
        this.showtamplate = true;
        this.ttamplate = data;

      }else{
        this.showtamplate = false;
        
      }
    

  },
    Error => {
  
     console.log(Error)
    }
  )
}else{
  this.showtamplate = false;
}


}
caritam:string='';

pilihobattam(kdtamplated,nama,status){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Copy',
    text: 'Copy Terapi Tamplate  '+nama,
 
    showCancelButton: true,
    confirmButtonText: 'Copy',
    cancelButtonText: 'Batal',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {

 
if(status === 'Racik'){
  let body={
    "kdkostumerd":this.kdkostumerd,"norm":this.norm,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kduser":this.kduser,"kdcppt":this.notrans+this.kddokter,
    "stssimpan":'2',"kdcabang":this.kdcabang,"notransaksi":this.notrans,"status":status,"kdtamplated":kdtamplated
   }

   this.authService.copyterapitamplate(body)
   .subscribe(response => {
   
   
   
     if(response ){
       this.toastr.success(''+response, 'Sukses', {
         timeOut: 2000,
       });
 
      
 
       setTimeout(() => {
        this.tmpnonr()
      }, 200);

      this.showtamplate = false;
      this.caritam='';
      
      }else{
       this.toastr.error('Simpan  Gagal', 'Eror');
     
      }
   
   
   
   
   
   })
}else if(status === 'Umum'){
  let body={
    "kdkostumerd":this.kdkostumerd,"norm":this.norm,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kduser":this.kduser,"kdcppt":this.notrans+this.kddokter,
    "stssimpan":'1',"kdcabang":this.kdcabang,"notransaksi":this.notrans,"status":status,"kdtamplated":kdtamplated
   }

   this.authService.copyterapitamplate(body)
   .subscribe(response => {
   
   
   
     if(response ){
       this.toastr.success(''+response, 'Sukses', {
         timeOut: 2000,
       });
 
      
 
       setTimeout(() => {
        this.tmpnonr()
      }, 200);

      this.showtamplate = false;
      this.caritam='';
      
      }else{
       this.toastr.error('Simpan  Gagal', 'Eror');
     
      }
   
   
   
   
   
   })

}else{

}

  

 



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


aturannonracik(aturan,norm,kdpoli,kddokter,
  notransaksi,kdpruduk,no){


  Swal.fire({
    title: 'Masukan Aturan Terbaru',
    input: 'text',
    inputValue:aturan, 
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

       

        let body={
          "aturan":value,"no":no,"norm":norm,"kdpoli":kdpoli,"kddokter":kddokter,"kduser":this.kduser,"kdcppt":notransaksi+kddokter,
          "stssimpan":'1',"kdcabang":this.kdcabang,"notransaksi":notransaksi,"kdpruduk":kdpruduk
        }

        this.authService.editaturan(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
      
           
      
            setTimeout(() => {
             this.tmpnonr()
           }, 200);
     
           this.showtamplate = false;
           this.caritam='';
           
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })


        
        
      }
    }
  })

}


qtynonracik(aturan,norm,kdpoli,kddokter,
  notransaksi,kdpruduk,qty,harga,no){


  Swal.fire({
    title: 'Masukan Qty Terbaru',
    input: 'number',
    inputValue:qty,
    customClass: {
      validationMessage: 'my-validation-message'
    },
    showLoaderOnConfirm: true,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage(
          
          '<i class="fa fa-info-circle"></i> Qty Belum disi'
        )
      }else{
      
        let body={
          "qty":value,"no":no,"norm":norm,"kdpoli":kdpoli,"kddokter":kddokter,"kduser":this.kduser,"kdcppt":notransaksi+kddokter,
          "stssimpan":'3',"kdcabang":this.kdcabang,"notransaksi":notransaksi,"kdpruduk":kdpruduk,"harga":harga
        }



        this.authService.editaturan(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
      
           
      
            setTimeout(() => {
             this.tmpnonr()
           }, 200);
     
           this.showtamplate = false;
           this.caritam='';
           
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })



      }
    }
  })

}


qtyracik(aturan,norm,kdpoli,kddokter,
  notransaksi,kdpruduk,qty,harga,no){


   
  Swal.fire({
    title: 'Masukan Qty Terbaru',
    input: 'number',
    inputValue:qty,
    customClass: {
      validationMessage: 'my-validation-message'
    },
    showLoaderOnConfirm: true,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage(
          
          '<i class="fa fa-info-circle"></i> Qty Belum disi'
        )
      }else{
      
        let body={
          "qty":value,"no":no,"norm":norm,"kdpoli":kdpoli,"kddokter":kddokter,"kduser":this.kduser,"kdcppt":notransaksi+kddokter,
          "stssimpan":'4',"kdcabang":this.kdcabang,"notransaksi":notransaksi,"kdpruduk":kdpruduk,"harga":harga
        }

        console.log(body)

        this.authService.editaturan(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
      
           
      
            setTimeout(() => {
             this.tmpnonr()
           }, 200);
     
           this.showtamplate = false;
           this.caritam='';
           
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })



      }
    }
  })

}

keteranganracik(aturan,norm,kdpoli,kddokter,
  notransaksi,kdpruduk,qty,harga,no){


   
  Swal.fire({
    title: 'Masukan Keterangan Terbaru',
    input: 'text',
    inputValue:aturan,
    customClass: {
      validationMessage: 'my-validation-message'
    },
    showLoaderOnConfirm: true,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage(
          
          '<i class="fa fa-info-circle"></i> Qty Belum disi'
        )
      }else{
      
        let body={
          "keterangan":value,"no":no,"norm":norm,"kdpoli":kdpoli,"kddokter":kddokter,"kduser":this.kduser,"kdcppt":notransaksi+kddokter,
          "stssimpan":'5',"kdcabang":this.kdcabang,"notransaksi":notransaksi,"kdpruduk":kdpruduk,"harga":harga
        }

        console.log(body)

        this.authService.editaturan(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
      
           
      
            setTimeout(() => {
             this.tmpnonr()
           }, 200);
     
           this.showtamplate = false;
           this.caritam='';
           
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })



      }
    }
  })

}

ketnonracik(aturan,norm,kdpoli,kddokter,
  notransaksi,kdpruduk,no){


  Swal.fire({
    title: 'Masukan Keterangan Terbaru',
    input: 'text',
    inputValue:aturan, 
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
      

        let body={
          "keterangan":value,"no":no,"norm":norm,"kdpoli":kdpoli,"kddokter":kddokter,"kduser":this.kduser,"kdcppt":notransaksi+kddokter,
          "stssimpan":'2',"kdcabang":this.kdcabang,"notransaksi":notransaksi,"kdpruduk":kdpruduk
        }

        this.authService.editaturan(body)
        .subscribe(response => {
        
        
        
          if(response ){
            this.toastr.success(''+response, 'Sukses', {
              timeOut: 2000,
            });
      
           
      
            setTimeout(() => {
             this.tmpnonr()
           }, 200);
     
           this.showtamplate = false;
           this.caritam='';
           
           }else{
            this.toastr.error('Simpan  Gagal', 'Eror');
          
           }
        
        
        
        
        
        })


      }
    }
  })

}


aturanracikm(kdtamplated,namaracik,metode,aturan,qty,
  keterangan,notransaksi,kdpoli){

  

    Swal.fire({
      title: 'Masukan Aturan Terbaru',
      input: 'text',
      inputValue:aturan, 
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
        
  
          let body={
            "kdtamplated":kdtamplated,"namaracik":namaracik,"metode":metode,"aturan":value,"qty":qty,"keterangan":keterangan,
            "notransaksi":notransaksi,"kdcabang":this.kdcabang,"stssimpan":'1',"kdpoli":kdpoli,"kduser":this.kduser
          }
      
          this.authService.editaturanm(body)
          .subscribe(response => {
          
          
          
            if(response ){
              this.toastr.success(''+response, 'Sukses', {
                timeOut: 2000,
              });
        
             
        
              setTimeout(() => {
               this.tmpnonr()
             }, 200);
       
             this.showtamplate = false;
             this.caritam='';
             
             }else{
              this.toastr.error('Simpan  Gagal', 'Eror');
            
             }
          
          
          
          
          
          })
  
  
        }
      }
    })


  } 

  qtyracikm(kdtamplated,namaracik,metode,aturan,qty,
    keterangan,notransaksi,kdpoli){
  
    
  
      Swal.fire({
        title: 'Masukan Qty Terbaru',
        input: 'number',
        inputValue:qty, 
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
          
    
            let body={
              "kdtamplated":kdtamplated,"namaracik":namaracik,"metode":metode,"aturan":aturan,"qty":value,"keterangan":keterangan,
              "notransaksi":notransaksi,"kdcabang":this.kdcabang,"stssimpan":'2',"kdpoli":kdpoli,"kduser":this.kduser
            }
        
            this.authService.editaturanm(body)
            .subscribe(response => {
            
            
            
              if(response ){
                this.toastr.success(''+response, 'Sukses', {
                  timeOut: 2000,
                });
          
               
          
                setTimeout(() => {
                 this.tmpnonr()
               }, 200);
         
               this.showtamplate = false;
               this.caritam='';
               
               }else{
                this.toastr.error('Simpan  Gagal', 'Eror');
              
               }
            
            
            
            
            
            })
    
    
          }
        }
      })
  
  
    } 

    keteranganracikm(kdtamplated,namaracik,metode,aturan,qty,
      keterangan,notransaksi,kdpoli){
    
      
    
        Swal.fire({
          title: 'Masukan keterangan Terbaru',
          input: 'text',
          inputValue:keterangan, 
          
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
            
      
              let body={
                "kdtamplated":kdtamplated,"namaracik":namaracik,"metode":metode,"aturan":aturan,"qty":qty,"keterangan":value,
                "notransaksi":notransaksi,"kdcabang":this.kdcabang,"stssimpan":'3',"kdpoli":kdpoli,"kduser":this.kduser
              }
          
              this.authService.editaturanm(body)
              .subscribe(response => {
              
              
              
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
            
                 
            
                  setTimeout(() => {
                   this.tmpnonr()
                 }, 200);
           
                 this.showtamplate = false;
                 this.caritam='';
                 
                 }else{
                  this.toastr.error('Simpan  Gagal', 'Eror');
                
                 }
              
              
              
              
              
              })
      
      
            }
          }
        })
    
    
      } 

 
      metoderacik(kdtamplated,namaracik,metode,aturan,qty,
        keterangan,notransaksi,kdpoli){

          Swal.fire({
            title: 'Masukan keterangan Terbaru',
            input: 'select',
            inputValue:metode, 
            inputOptions: {
            
              Puyer: 'Puyer',
              Salep: 'Salep',
              Sirup: 'Sirup',
              Kapsul: 'Kapsul',
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
              
        
                let body={
                  "kdtamplated":kdtamplated,"namaracik":namaracik,"metode":value,"aturan":aturan,"qty":qty,"keterangan":value,
                  "notransaksi":notransaksi,"kdcabang":this.kdcabang,"stssimpan":'4',"kdpoli":kdpoli,"kduser":this.kduser
                }
            
                this.authService.editaturanm(body)
                .subscribe(response => {
                
                
                
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
              
                   
              
                    setTimeout(() => {
                     this.tmpnonr()
                   }, 200);
             
                   this.showtamplate = false;
                   this.caritam='';
                   
                   }else{
                    this.toastr.error('Simpan  Gagal', 'Eror');
                  
                   }
                
                
                
                
                
                })
        
        
              }
            }
          })


        }
        background:string;
        home(a){
          this.showingmb = true
          this.authService.master(a)
          .subscribe(
            data => {
      
              this.background = data
    
              // console.log(this.background)
              this.signaturePad.fromDataURL(this.background)
             
      
      
        },
        Error => {
      
         console.log(Error)
        }
      )
        }

        public signatureImage : string;
        simpang(){
          this.signatureImage = this.signaturePad.toDataURL();


          this.authService.simpangmb(this.kdcabang,this.notransaksi,this.signatureImage).then(data =>{
        
        
        if(data ){
        this.toastr.success('Berhasil', 'Sukses', {
          timeOut: 2000,
        });
        
        
        
        }else{
        this.toastr.error('Simpan User Gagal', 'Eror');
        
        }
        
        
        })
        



        }

        simpangu(){
          // this.signatureImage = this.signaturePad.toDataURL();


          this.authService.simpangmbu(this.kdcabang,this.notransaksi,this.imageSrc).then(data =>{
        
        
        if(data ){
        this.toastr.success('Berhasil', 'Sukses', {
          timeOut: 2000,
        });
        
        
        
        }else{
        this.toastr.error('Simpan User Gagal', 'Eror');
        
        }
        
        
        })
        



        }
        keteranganakhirx:any='';

        simpanlab(){
         
          this.authService.simpanuploadlab(this.kdcabang,this.notransaksi,this.imageSrcx,this.norm,this.keteranganakhirx).then(data =>{
        
        
            if(data ){
            this.toastr.success('Berhasil', 'Sukses', {
              timeOut: 2000,
            });
            setTimeout(() => {
              
    this.authService.riwayatlaborat(this.kdcabang,this.norm)
    .subscribe(
      data => {


        this.tlab = data;


  },
  Error => {

   console.log(Error)
  }
)
            }, 200);
            
            
            }else{
            this.toastr.error('Simpan User Gagal', 'Eror');
            
            }
            
            
            })
            
    
        }
   
simpanrad(){
  this.authService.simpanuploadrad(this.kdcabang,this.notransaksi,this.imageSrcxx,this.norm,this.keteranganakhirxx).then(data =>{
        
        
    if(data ){
    this.toastr.success('Berhasil', 'Sukses', {
      timeOut: 2000,
    });
    setTimeout(() => {
      
this.authService.riwayatradiologi(this.kdcabang,this.norm)
.subscribe(
data => {


this.trad = data;


},
Error => {

console.log(Error)
}
)
    }, 200);
    
    
    }else{
    this.toastr.error('Simpan User Gagal', 'Eror');
    
    }
    
    
    })
}
  
        // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy'; 
  
      //   cetakresume(){
      //     var redirectWindow = window.open(this.URLINVOICE+'clenic/report/resumerj.php?notrans='+this.notrans+'&kdcabang='+this.kdcabang+'&norm='+this.norm, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
      //     redirectWindow.location;
      //  }



    }
    // https://stackblitz.com/edit/angular-t5dfp7?file=app%2Fservice-component.ts unutk modal beda page dan send parameter



    // export class ModalContentComponent implements OnInit {
    //   title: string;
    //   closeBtnName: string;
    //   list: any[] = [];
    //   // @ViewChild('div') div: ElementRef;
    
    
    //   constructor() {}
    
    //   ngOnInit() {
       
    //   }
    // }
