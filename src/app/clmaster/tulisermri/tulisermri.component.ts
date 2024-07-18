import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import { faCog, fas } from '@fortawesome/free-solid-svg-icons';
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
import { TreeNode } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { perminobatriComponent } from '../perminobatri/perminobatri.component';

@Component({
  selector: 'app-tulisermri',
  templateUrl: './tulisermri.component.html',
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


export class tulisermriComponent implements OnInit {
  @ViewChild('selectxx') selectxx: NgSelectComponent;
@ViewChild('myButton') myButton : ElementRef;
@ViewChild('usx') input :ElementRef<HTMLInputElement>;

@ViewChild("subjekfokus") subjekfokus: ElementRef;
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
subjek:string='';
td:any='';
bb:any='';
nadi:any='';
suhu:any='';
rr:any='';
spo:any='';
pf:string;
plan:string;
plankon:string;

hostName: string;
URLINVOICE:string
ststarif:any;
form: FormGroup;
form1: FormGroup;
form2: FormGroup;
selectedFile: TreeNode;
files1: TreeNode[];
files2: TreeNode[];
files3: TreeNode[];
selectedFile1: TreeNode;

myDate :any;
mydaterujuk:any;
myDatelab :any;
myDaterad :any;
myDatekon:any;

  users = ['Hipertensi','DM','Asma','TBC','PPOK','Stroke','Jantung','Penyakit Ginjal','Penyakit Liver','Keganasan'
    // { name: 'Hipertensi' },
    // { name: 'DM' },
    // { name: 'Asma' },
    // { name: 'TBC' },
    // { name: 'PPOK' },
    // { name: 'Stroke' },
    // {  name: 'Jantung' },
    // { name: 'Penyakit Ginjal' },
    // { name: 'Penyakit Liver' },
    // { name: 'Keganasan' },

  ];


 
  
  rwtp:any='';

  selectedUserIds: number[];
  menulisa:boolean;
  password:any;

  constructor(public hots:SampleService,private router: Router,private route: ActivatedRoute,private modalService: NgbModal,public toastr: ToastrService, private authService:ApiserviceService , private fb: FormBuilder,private domSanitizer: DomSanitizer) {
  

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
    this.password = this.userDetails.pass
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.kduser = this.userDetails.kduser; 
localStorage.setItem('username', this.username )

this.form = fb.group({
  gender: ['', Validators.required]
});

this.form1 = fb.group({
  gender: ['', Validators.required]
});

this.form2 = fb.group({
  gender: ['', Validators.required]
});
this.hak()

  }



  tesrprp(){
  
this.simpanambil()
  


  }
  addCustomUser = (term) => (term);

  simpancektgl(){
    console.log(this.pipe.transform(this.myDate, 'dd-MM-yyyy'))
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
  pcare:number;

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
  this.pcare = x.pcare
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
pipe = new DatePipe('en-US');
today: Date = new Date();
dariklik:any;

  ngOnInit() {

    this.myDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.myDatekon = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.mydaterujuk = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.myDatelab = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this. myDaterad = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

 
 

    this.hostName = this.hots.getHostname();
  

    this.URLINVOICE = 'https://'+this.hostName+'/';


    this.notrans = this.route.snapshot.paramMap.get('notrans')
    this.kddokter = this.route.snapshot.paramMap.get('kddokter')
    this.dariklik = this.route.snapshot.paramMap.get('dariklik')
    this.norm = this.route.snapshot.paramMap.get('norm')

    localStorage.setItem('noRM', this.norm )
    localStorage.setItem('noTransaksi', this.notrans )


  this.tampildata()
//   this.tampildaigtindakinput()
//   this.tmpcppt()
//   this.tmprjkn()
//   this.tmptrans()
//   this.tmpkonsul()
// setTimeout(() => {
  
//   this.authService.listintruksilab(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter)
//   .subscribe(
//     data => {
    
// this.tlistlab = data;
// if(data.length){
//   this.tlistlabshow = true;

//  }else{
//   this.tlistlabshow = false;
  
//  }

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )

 




// }, 100);


// setTimeout(() => {
//   this.authService.listintruksilab(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter)
//   .subscribe(
//     data => {
    
// this.tlistrad = data;
//    if(data.length){
//               this.tlistradshow = true;

//             }else{
//               this.tlistradshow = false;
              
//             }
        
//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
// }, 150);

// setTimeout(() => {
//   this.authService.obatnonracik(this.kdcabang,this.notrans,this.notrans+this.kddokter)
//   .subscribe(
//     data => {
    
// this.tlistobatn = data;

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )

//   this.authService.obatracik(this.kdcabang,this.notrans,this.notrans+this.kddokter,this.nomorracik)
//   .subscribe(
//     data => {
    
// this.tlistobatr = data;

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )

//   this.authService.tmpbhp(this.kdcabang,this.notrans,this.notrans+this.kddokter)
//   .subscribe(
//     data => {
    
// this.tlistbhpr = data;

//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
  


//   this.authService.alergi(this.norm,this.kdcabang)
//   .subscribe(
//     data => {

//       if(data){
//         this.talergi = data;
//         this.talergishow = true;
//         this.tjmlhalergi = data.length

//       }else{
// this.talergishow = false;
        
//       }
    


//   },
//     Error => {
  
//      console.log(Error)
//     }
//   )
  



// }, 250);





  }
  tjmlhalergi:any;

  talergi:any;
  talergishow:boolean;

  tlistobatn:any;
  tlistobatr:any;
  dash:any;
  igdorrj:any;

  noasuransi:string=''
  kdpolibpjs:string='';
  kddokterbpjs:string='';
  tgldaftar:any;
  tb:any='';
spcare:any='';
nokunjungan:any='';
skunjungan:any;
tombollihatcetakpcare:boolean;
tandapengenal:any='';
nopengenal:any='';
kdprovider:any='';
hp:any='';
kdkostumer:any;
tdata:any;

  tampildata(){
         this.authService.datapasienri(this.kdcabang,this.notrans)
    .subscribe(
      data => {

        this.tdata = data;


        for (let x of data )
        {
          this.norm =x.norm
                    this.kdpoli = x.kdkamar
          //           this.tglpriksa = x.tglpriksa

                    this.kdkostumerd = x.kdkostumer
          //           this.kdkostumer = x.kdkostumer
          //           this.notransaksi = x.notransaksi
                    this.pasien = x.pasien
                    this.tgllahir = x.tgllahir
          //           this.noantrian = x.noantrian
                    this.nampoli = x.nmkamar
                    this.namdokter = x.namdokter
                    this.namacus = x.costumer
                    this.costumer = x.costumer
                    this.alamat = x.alamat
                    this.kdtarif = x.kdtarif
          //           this.kelas = x.kelas;
                    this.umur = x.umur;
          //           this.dash = x.dash
          //           this.ststarif = x.sts;
          //           this.igdorrj = x.sts;
          //           this.noasuransi = x.noasuransi;
          //           this.kdpolibpjs = x.kdpolibpjs;
          //           this.kddokterbpjs = x.kddokterbpjs;
          //           this.tgldaftar = x.tgldaftar
          //           this.spcare = x.spcare
          //           this.nokunjungan = x.nokunjungan
          //           this.skunjungan = x.skunjungan;
          //           this.stspulang = x.jeniskunjungan;
          //           this.tandapengenal=x.tandapengenal
          //           this.nopengenal=x.nopengenal
          //           this.kdprovider=x.kdprovider
          //           this.hp=x.hp


                  
          //           if(this.skunjungan === '1'){
          //             this.tombollihatcetakpcare = true;
                 
                     
                
          //           }else{
          //             this.tombollihatcetakpcare = false;
                 
          //           }



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
hr:any='';
tdd:any='';
nomorcpptangka:any;

nomorcppt(){
  this.authService.kdcppt(this.kduser)
  .subscribe(
    data => {

   this.nomorcpptangka = data;


    },
    Error => {
    
     console.log(Error)
    }
    )
}
lihatcppt(){

  

  this.nomorcppt()


  this.tmpcppt()




  setTimeout(() => {

    localStorage.setItem('noclenic', JSON.stringify( {
    notrans: this.notrans,
    kddokter: this.kddokter,
    kdcpptangka : this.nomorcpptangka

    
    }));
    
    
    }, 200);


    setTimeout(() => {
      this.tmpnonr( )
      this.tmplistintruksilab()
      this.tmplistintruksirad()
    }, 500);


}
  tmpcppt(){
    this.authService.tampilcppt(this.kdcabang,this.notrans)
    .subscribe(
      data => {
  
       
        this.tmpcpptt = data;
        // for (let x of data )
        // {
        //   this.subjek = x.subjek
        //   this.td= x.td
        //   this.bb= x.bb
        //   this.nadi=  x.nadi
        //   this.suhu= x.suhu
        //   this.rr= x.rr
        //   this.spo= x.spo
        //   this.pf= x.pf
        //   this.plan= x.planing
        //   this.gmburl = x.url
        //   this.alergi = x.alergi
        //   this.tdd = x.tdd
        //   this.hr = x.hr
        //   this.rwtp = [x.rwytp],
        //   this.tb = x.tb
        //   this.subjekp = x.subjekp
        //   this.plankon = x.rencanatindakan
        //   this.myDatekon = x.tglkontrol
        // }
        // if(data.length){
        //   this.showdatacppt = true;
          
        // }else{

        // }
  
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
  monitoringurlemr:SafeResourceUrl;
  monitoringurl:SafeResourceUrl;
  monitoringurlx:SafeResourceUrl;
  monitoringurlrj:SafeResourceUrl;
  monitoringshowcontent:boolean;
  monitoringshowcontentrj:boolean;
  monitoringshowcontentx:boolean;

  monitoringshowsakit:boolean;
  monitoringurlsakit:SafeResourceUrl;

ip:string='https://demo.clenicapp.com/';

lihatrad(notrans,kdcabang,kdproduk,status,nmfile){
  this.monitoringshowcontentx = true
  this.showuploaddd = false;

  if(status === '1'){
    this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasilrad.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&kdproduk='+kdproduk);
   
  }else{
    this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasilradu.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&kdproduk='+nmfile);
   
  }
 
}
thasillab:any;

  lihatlab(notrans,kdcabang,status,nmfile){
  
    this.showuploadd = false;
    console.log(notrans)

    if(status === '1'){
      this.monitoringshowcontent = false

      this.authService.tamplatelab(this.kdcabang,notrans,'L')
      .subscribe(
        data => {
        
    this.thasillab = data;
    
      },
        Error => {
      
         console.log(Error)
        }
      )


      // this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasillab.php?notransaksi='+notrans+'&kdcabang='+kdcabang);
   
    }else{
      console.log('s')
      this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasillabu.php?notransaksi='+notrans+'&kdcabang='+kdcabang+'&x='+nmfile);
      this.monitoringshowcontent = true
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

  ksehatx(){
    var redirectWindow = window.open('http://localhost:8011/ermkopi/partograf/popup/?notrans=RBI-22-06-136&norm=22019574', '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
    redirectWindow.location;
  }

  diagnosa:string;
  kddiagnosa:string;
  tindakan:string;
  kdtindakan:string;

  diagnos:any;

dignosshow:boolean;
pilihdiag(kddiagnosa,diagnosa){

this.kddiagnosa =kddiagnosa;
this.diagnosa=diagnosa;
this.dignosshow = false;
// setTimeout(() => {
//   let body = {
//     "notrans":this.notransaksi,"diagnosa":diagnosa,"kddiagnosa":kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
//     "norm":this.norm,"status":'diagnosa',"stssimpan":'1',"kdcabang":this.kdcabang
//   }



//     console.log(body)

//   this.authService.simpandiagtindak(body)
//   .subscribe(response => {
  
  
  
//     if(response ){
//       this.toastr.success(''+response, 'Sukses', {
//         timeOut: 2000,
//       });

// setTimeout(() => {
//   this.tampildaigtindakinput()

// }, 200);
   
//       this.dignosshow = false;
// this.kddiagnosa ='';
// this.diagnosa='';
//       this.kddiagnosabpjs = kddiagnosa
     
//      }else{
//       this.toastr.error('Simpan  Gagal', 'Eror');
    
//      }
  
  
  
  
  
//   })

// }, 0);





}
tindakanicd:string='';

pilihtindak(kddiagnosa,diagnosa){

         this.tindaksshow = false;
        this.tindaksshowicd = false;
  this.kdtindakan =kddiagnosa;
  this.tindakan=diagnosa;
  this.tindakanicd = diagnosa


  // setTimeout(() => {
  //   let body = {
  //     "notrans":this.notransaksi,"diagnosa":diagnosa,"kddiagnosa":kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
  //     "norm":this.norm,"status":'tindakan',"stssimpan":'1',"kdcabang":this.kdcabang
  //   }
  
  
  
  //     console.log(body)
  
  //   this.authService.simpandiagtindak(body)
  //   .subscribe(response => {
    
    
    
  //     if(response ){
  //       this.toastr.success(''+response, 'Sukses', {
  //         timeOut: 2000,
  //       });
  
  // setTimeout(() => {
  //   this.tampildaigtindakinput()
  // }, 200);
    
  
  //       this.tindaksshow = false;
  //       this.tindaksshowicd = false;
  // this.kdtindakan ='';
  // this.tindakan='';
  // this.tindakanicd = ''
        
       
  //      }else{
  //       this.toastr.error('Simpan  Gagal', 'Eror');
      
  //      }
    
    
    
    
    
  //   })
  
  // }, 0);
  
  
}
senditx(){
  setTimeout(() => {
    let body = {
      "notrans":this.notransaksi,"diagnosa":this.tindakanicd,"kddiagnosa":this.kdtindakan,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
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
  this.tindakanicd='';
        
       
       }else{
        this.toastr.error('Simpan  Gagal', 'Eror');
      
       }
    
    
    
    
    
    })
  
  }, 0);
  
}
klikobatrd(notransaksi,norm,kdpoli)
{
  this.authService.rwtobatd(this.kdcabang,this.norm,notransaksi)
  .subscribe(
    data => {


      this.tobatad = data;


},
Error => {

 console.log(Error)
}
) 
}

tobata:any;
tobatad:any;

klikrwo(){
  this.authService.rwtobat(this.kdcabang,this.norm)
  .subscribe(
    data => {


      this.tobata = data;


},
Error => {

 console.log(Error)
}
) 
}
tdiag:any;
ttindak:any;
showmunculdiagjudul:boolean;

tampildaigtindakinput(){
  this.authService.diagnosatmp(this.kdcabang,this.notrans,'diagnosa')
  .subscribe(
    data => {

   var xyz:number=0;

      if(data.length){

        for(let x of data){


        }


        this.tdiag = data;
        this.showmunculdiagjudul = true;


      }else{
      
        this.showmunculdiagjudul = false;


      }
    


},
Error => {

 console.log(Error)
}
)


this.authService.diagnosatmp(this.kdcabang,this.notrans,'tindakan')
.subscribe(
  data => {


    if(data.length){

      this.ttindak = data;
      this.ttindakshow = true;


    }else{
    
      this.ttindakshow = false;


    }






},
Error => {

console.log(Error)
}
)

}

ttindakshow:boolean;

sendit(a){
  console.log(a)
  this.diagnosa  = a;


  // setTimeout(() => {
  //   let body = {
  //     "notrans":this.notransaksi,"diagnosa":this.diagnosa,"kddiagnosa":this.kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
  //     "norm":this.norm,"status":'diagnosa',"stssimpan":'1',"kdcabang":this.kdcabang
  //   }
  
  

  //     console.log(body)
  
  //   this.authService.simpandiagtindak(body)
  //   .subscribe(response => {
    
    
    
  //     if(response ){
  //       this.toastr.success(''+response, 'Sukses', {
  //         timeOut: 2000,
  //       });

  // setTimeout(() => {
  //   this.tampildaigtindakinput()
 
  // }, 200);
    
  //       this.dignosshow = false;
  //       this.kddiagnosa ='';
  //       this.diagnosa='';
        
       
  //      }else{
  //       this.toastr.error('Simpan  Gagal', 'Eror');
      
  //      }
    
    
    
    
    
  //   })
  
  // }, 0);



}

diagnose:any;

caridiagedit(a){



  
if(this.form1.value.gender === 'Kode'){

  if(a.target.value === ''){
  

  }else{


    this.authService.caridiagnosa(a.target.value,'3')
    .subscribe(data => {
      this.diagnose = data;
    
     
     
    })
  }
}else if(this.form1.value.gender === 'Diagnosa'){

  if(a.target.value === ''){
  

  }else{
 

    this.authService.caridiagnosa(a.target.value,'2')
    .subscribe(data => {
      this.diagnose = data;
    
     
     
    })
  }

}else{
  if(a.target.value === ''){
 

  }else{
 

    this.authService.caridiagnosa(a.target.value,'2')
    .subscribe(data => {
      this.diagnose = data;
    
     
     
    })
  }

}

    // this.authService.caridiagnosa(a.target.value,'2')
    // .subscribe(data => {
    //   this.diagnose = data;
    
     
     
    // })
  
}
caridiag(a){

console.log(this.form.value.gender)

if(this.form.value.gender === 'Kode'){

  if(a.target.value === ''){
    this.dignosshow = false;

  }else{
    this.dignosshow = true;

    this.authService.caridiagnosa(a.target.value,'3')
    .subscribe(data => {
      this.diagnos = data;
    
     
     
    })
  }
}else if(this.form.value.gender === 'Diagnosa'){

  if(a.target.value === ''){
    this.dignosshow = false;

  }else{
    this.dignosshow = true;

    this.authService.caridiagnosa(a.target.value,'2')
    .subscribe(data => {
      this.diagnos = data;
    
     
     
    })
  }

}else{
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

 
    
   
    
      }


tindak:any;
tindaksshow:boolean;
tindaktarif:any;


      caritindakan(a){
    
    console.log(a.target.value)
        if(a.target.value === ''){
          this.tindaksshow = false;
      
        }else{
          this.tindaksshow = true;
          if(this.ststarif === "igd"){
            this.ststarif='IGD'
          }else{
            this.ststarif='RJ'

          }
          this.authService.listtarif(this.kdcabang,this.ststarif,a.target.value,this.kdtarif)
          .subscribe(
            data => {
            
        this.tindaktarif = data;
        
          },
            Error => {
          
             console.log(Error)
            }
          )
          // this.authService.caritindakan(a.target.value,'2')
          // .subscribe(data => {
          //   this.tindak = data;
          
           
           
          // })
        }
      }
      tindaksshowicd:boolean;

      caritindakanicd(a){

        if(a.target.value === ''){
          this.tindaksshowicd = false;
      
        }else{
          this.tindaksshowicd = true;


          if(this.form2.value.gender === 'Kode'){
            this.authService.caritindakan(a.target.value,'3')
            .subscribe(data => {
              this.tindak = data;
            
             
             
            })

          }else{
            this.authService.caritindakan(a.target.value,'2')
            .subscribe(data => {
              this.tindak = data;
            
             
             
            })
          }
      
          
        }


        


      }

      hapusdiag(notrans,no,diagnosa){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-success'
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


      gigi:any;
      progress: boolean | number = false;

      startLoading() {
        this.progress = 0; // starts spinner
    
        setTimeout(() => {
          this.progress = 0.5; // sets progress bar to 50%
    
          setTimeout(() => {
            this.progress = 1; // sets progress bar to 100%
    
            setTimeout(() => {
              this.progress = false; // stops spinner
            }, 200);
          }, 500);
        }, 400);
      }
    
      simpan(){
        this.simpanambil()

        // if(this.pcare == 1){
          
        //   if(this.dash === 'BPJS'){


        //     const swalWithBootstrapButtons = Swal.mixin({
        //       customClass: {
        //         confirmButton: 'btn btn-success',
        //         cancelButton: 'btn btn-danger'
        //       },
        //       buttonsStyling: false
        //     });
          
        //     swalWithBootstrapButtons.fire({
        //       title: 'Simpan CPPT',
        //       text: 'Apakah Anda Akan Menyimpan Dan Mengirim Resume Ke PCare',
           
        //       showCancelButton: true,
        //       confirmButtonText: 'Ya,Kirim',
        //       cancelButtonText: 'Tidak,Hanya Simpan',
        //       reverseButtons: true
        //     }).then((result) => {
        //       if (result.value) {

        //         if(this.skunjungan === '1'){

        //           console.log('update')

        //           if(this.stspulang === '4'){
             
        //           if(this.tiperujuk === '01'){
        //                   this.kirimpcarerujukedit()
        //                   this.simpanambil()

        //           }else{
        //             this.kirimpcarerujukkhususedit()
        //             this.simpanambil()
        //           }

        //         }else{
        //           this.kirimpcareedit()
        //           this.simpanambil()

        //         }

        //         }else{
        //           console.log('kirimbaru')
                  
               
        //           if(this.stspulang === '4'){
        //             console.log('rujuk')

                 
        //             if(this.tiperujuk === '01'){
        //               console.log('rujuksp')

        //                 this.kirimpcarerujuk()
        //                   this.simpanambil()
        //             }else{
        //               console.log('rujukkhusu')
        //               this.kirimpcarerujukkhusus()
        //               this.simpanambil()
        //             }


        //           }else{
        //             console.log('nonrujuk')

        //                this.kirimpcare()
        //             this.simpanambil()

        //           }

               
        //         }
          
          

        //       } else if (
        //         /* Read more about handling dismissals below */
        //         result.dismiss === Swal.DismissReason.cancel
        //       ) {

        //         this.simpanambil()
          
        //         // swalWithBootstrapButtons.fire(
        //         //   'Cancelled',
        //         //   'Your imaginary file is safe :)',
        //         //   'error'
        //         // );
        //       }
        //     });

         
           
            
        //   }else{
           

        //     this.simpanambil()
            
        //   }



        // }else{

            
        //     this.simpanambil()

        // }

}

subjekp:string='';

      simpanambil(){
                this.progress = 0; // starts spinner



var dari :any;

if(this.dariklik === 'dokter'){
dari = '0';

}else{
  dari = '1';
  
}



 let body={"alergi":this.alergi,"dari":dari,"subjekp":this.subjekp,
          "kdcabang":this.kdcabang,"kduser":this.kduser,"notrans":this.notrans,"norm":this.norm,"kdpoli":this.kdpoli,
          "kddokter":this.kddokter,"stssimpan":'1',"subjek":this.subjek,"td":this.td,"bb":this.bb,"nadi":this.nadi,
          "suhu":this.suhu,"rr":this.rr,"spo":this.spo,"pf":this.pf,"planing":this.plan,"tdd":this.tdd,"hr":this.hr,
          "rwytp":this.rwtp,"gigi":this.gigi,"tb":this.tb,"hakakses":this.akses,"tglkontrol":this.myDatekon,"rencanatindakan":this.plankon,
          "diagnosa":this.diagnosa,"tindakan":this.tindakanicd,"nomorcppt":this.nomorcpptangka,"insobat":this.tmpinarrayobat,
          "inspenunjang":this.labdetailray+'<br>'+this.raddetailray,"jeniscppt":this.jeniscppt
        }


        setTimeout(() => {
          this.progress = 0.5; // sets progress bar to 50%

          this.authService.simpancpptri(body)
          .subscribe(response => {
          
      setTimeout(() => {
        
  this.progress = 1; // sets progress bar to 100%

  if(response.metadata.code == 200 ){
          this.toastr.success(''+response.metadata.message , 'Sukses', {
            timeOut: 2000,
          });
  

          setTimeout(() => {
            this.progress = false; // stops spinner

            this.lihatcppt()



            this.subjek = '';
this.td = ''
this.tdd =''
this.bb = '';
this.nadi = ''
this.suhu = ''
this.rr =''
this.hr = '';
this.spo ='';
this.pf = '';
this.plan = '';
this.alergi = '';

this.diagnosa='';
this.tindakanicd='';
this.plankon ='';

this.menulisa = false;



          }, 200);
          
    
        
         
         }else{
          this.toastr.error('Simpan  Gagal', 'Eror');
        
         }


      }, 500);
          
        
          
          
          
          
          
          }
          
          )



        }, 400);

      }


      kirimpcare(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }



        let body={
          "data" : {
            "noKunjungan": null,
"noKartu": this.noasuransi,
"tglDaftar": this.tgldaftar,
"kdPoli": this.kdpolibpjs,
"keluhan": this.subjek,
"kdSadar": this.kesadaran,

"sistole": parseInt(this.td),
"diastole": parseInt(this.tdd),
"beratBadan": parseInt(this.bb),
"tinggiBadan": parseInt(this.tb),
"respRate": parseInt(this.rr),
"heartRate": parseInt(this.hr),
"lingkarPerut": 0,

"kdStatusPulang": this.stspulang,
"tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
"kdDokter": this.kddokterbpjs,
"kdDiag1": this.kddiagnosabpjs,
"kdDiag2": null,
"kdDiag3": null,
"kdPoliRujukInternal": null,

"rujukLanjut": {
  "tglEstRujuk": null,
  "kdppk": null,
  "subSpesialis": null,
  "khusus": {
      "kdKhusus":null,
      "kdSubSpesialis": null,
      "catatan": null
  }
},
"kdTacc": -1,
"alasanTacc": null

            }
          
        }

        

   
                 
      this.authService.addkunjungan(body)
      .subscribe(response => {
      
      
    
        
        if(response.metaData.code == 412){

   

        for(let x of response.response){

          this.toastr.error(x.field+' '+x.message, 'Eror');
       
        }
        

      
        }else if(response.metaData.code == 201 ){
  

        for(let y of response.response){

     


          let body={
            "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":y.message,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
          }
          
             this.authService.updatepcare(body)
             .subscribe(response => {


              if(response){
                this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                  timeOut: 2000,
                });
  
              }

             
              })



        }


     
      
         
        setTimeout(() => {
          this.tampildata()
        }, 200);
      
      
      
       
        }else{
          this.toastr.error('Simpan Gagal', 'Eror');
        }
      
      
      
      
      })



      }

      kirimpcarerujuk(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        if(this.kodeppk === ''){
          this.toastr.error('anda belum memilih faskes rujukan', 'Eror');
       
          return
        }

        let body={
          "data" : {
            "noKunjungan": null,
"noKartu": this.noasuransi,
"tglDaftar": this.tgldaftar,
"kdPoli": this.kdpolibpjs,
"keluhan": this.subjek,
"kdSadar": this.kesadaran,

"sistole": parseInt(this.td),
"diastole": parseInt(this.tdd),
"beratBadan": parseInt(this.bb),
"tinggiBadan": parseInt(this.tb),
"respRate": parseInt(this.rr),
"heartRate": parseInt(this.hr),
"lingkarPerut": 0,

"kdStatusPulang": this.stspulang,
"tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
"kdDokter": this.kddokterbpjs,
"kdDiag1": this.kddiagnosabpjs,
"kdDiag2": null,
"kdDiag3": null,
"kdPoliRujukInternal": null,
"rujukLanjut": {
  "kdppk":  this.kodeppk,
  "tglEstRujuk":  this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),
  "subSpesialis": {
      "kdSubSpesialis1": this.sspesialis,
      "kdSarana": this.nsarana
  },
  "khusus": null
},
"kdTacc": -1,
"alasanTacc": null



            }
          
        }

        

   console.log(body)
                 
      this.authService.addkunjungan(body)
      .subscribe(response => {
      
      
    
        
        if(response.metaData.code == 412){

   

        for(let x of response.response){

          this.toastr.error(x.field+' '+x.message, 'Eror');
       
        }
        

      
        }else if(response.metaData.code == 201 ){
  

        for(let y of response.response){

     


          let body={
            "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":y.message,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
          }
          
             this.authService.updatepcare(body)
             .subscribe(response => {


              if(response){
                this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                  timeOut: 2000,
                });
  
              }

             
              })



        }


     
      
       
        
        setTimeout(() => {
          this.tampildata()
        }, 200);
      
      
       
        }else{
          this.toastr.error('Simpan Gagal', 'Eror');
        }
      
      
      
      
      })



      }

      kirimpcarerujukedit(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        if(this.kodeppk === ''){
          this.toastr.error('anda belum memilih faskes rujukan', 'Eror');
       
          return
        }

        let body={
          "data" : {
            "noKunjungan": this.nokunjungan,
"noKartu": this.noasuransi,

"keluhan": this.subjek,
"kdSadar": this.kesadaran,

"sistole": parseInt(this.td),
"diastole": parseInt(this.tdd),
"beratBadan": parseInt(this.bb),
"tinggiBadan": parseInt(this.tb),
"respRate": parseInt(this.rr),
"heartRate": parseInt(this.hr),
"lingkarPerut": 0,

"kdStatusPulang": this.stspulang,
"tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
"kdDokter": this.kddokterbpjs,
"kdDiag1": this.kddiagnosabpjs,
"kdDiag2": null,
"kdDiag3": null,
"kdPoliRujukInternal": null,
// "rujukLanjut": {
//   "tglEstRujuk": this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),
//   "kdppk": this.kodeppk,
//   "subSpesialis": this.sspesialis,
//   "khusus": {
//       "kdKhusus": null,
//       "kdSubSpesialis": null,
//       "catatan": "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal"
//   }
// },
// "kdTacc": -1,
// "alasanTacc": ""
"rujukLanjut": {
  "kdppk":this.kodeppk,
  "tglEstRujuk": this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),
  "subSpesialis": {
      "kdSubSpesialis1":  this.sspesialis,
      "kdSarana": null
  },
  "khusus": null
},
"kdTacc": -1,
"alasanTacc": null


            }
          
        }

        

   console.log(body)
                 
      this.authService.editkunjungan(body)
      .subscribe(response => {
      
      
    
        
        if(response.metaData.code == 412){

   

        for(let x of response.response){

          this.toastr.error(x.field+' '+x.message, 'Eror');
       
        }
        

      
        }else if(response.metaData.code == 200 ){
  



          let body={
            "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":this.nokunjungan,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
          }
          
             this.authService.updatepcare(body)
             .subscribe(response => {


              if(response){
                this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                  timeOut: 2000,
                });
  
              }

             
              })



        


     
      
       
        
        setTimeout(() => {
          this.tampildata()
        }, 200);
      
      
       
        }else{
          this.toastr.error('Simpan Gagal', 'Eror');
        }
      
      
      
      
      })



      }


      kirimpcareedit(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }



        let body={
          "data" : {
            "noKunjungan": this.nokunjungan,
"noKartu": this.noasuransi,

"keluhan": this.subjek,
"kdSadar": this.kesadaran,

"sistole": parseInt(this.td),
"diastole": parseInt(this.tdd),
"beratBadan": parseInt(this.bb),
"tinggiBadan": parseInt(this.tb),
"respRate": parseInt(this.rr),
"heartRate": parseInt(this.hr),
"lingkarPerut": 0,

"kdStatusPulang": this.stspulang,
"tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
"kdDokter": this.kddokterbpjs,
"kdDiag1": this.kddiagnosabpjs,
"kdDiag2": null,
"kdDiag3": null,
"kdPoliRujukInternal": null,

"rujukLanjut": {
  "tglEstRujuk": null,
  "kdppk": null,
  "subSpesialis": null,
  "khusus": {
      "kdKhusus":null,
      "kdSubSpesialis": null,
      "catatan": null
  }
},
"kdTacc": -1,
"alasanTacc": null

            }
          
        }

        

   
        this.authService.editkunjungan(body)
        .subscribe(response => {
        
        
      
          
          if(response.metaData.code == 412){
  
     
  
          for(let x of response.response){
  
            this.toastr.error(x.field+' '+x.message, 'Eror');
         
          }
          
  
        
          }else if(response.metaData.code == 200 ){
    
  
  
  
            let body={
              "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":this.nokunjungan,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
            }
            
               this.authService.updatepcare(body)
               .subscribe(response => {
  
  
                if(response){
                  this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                    timeOut: 2000,
                  });
    
                }
  
               
                })
  
  
  
          
  
  
       
        
         
          
          setTimeout(() => {
            this.tampildata()
          }, 200);
        
        
         
          }else{
            this.toastr.error('Simpan Gagal', 'Eror');
          }
        
        
        
        
        })



      }
      kirimpcarerujukkhusus(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        if(this.kodeppk === ''){
          this.toastr.error('anda belum memilih faskes rujukan', 'Eror');
       
          return
        }

        let body={
          "data" : {
            "noKunjungan": null,
            "noKartu": this.noasuransi,
            "tglDaftar": this.tgldaftar,
            "kdPoli": this.kdpolibpjs,
            "keluhan": this.subjek,
            "kdSadar": this.kesadaran,
            
            "sistole": parseInt(this.td),
            "diastole": parseInt(this.tdd),
            "beratBadan": parseInt(this.bb),
            "tinggiBadan": parseInt(this.tb),
            "respRate": parseInt(this.rr),
            "heartRate": parseInt(this.hr),
            "lingkarPerut": 0,
            
            "kdStatusPulang": this.stspulang,
            "tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
            "kdDokter": this.kddokterbpjs,
            "kdDiag1": this.kddiagnosabpjs,
            "kdDiag2": null,
            "kdDiag3": null,
            "kdPoliRujukInternal": null,

            "rujukLanjut": {	
            "tglEstRujuk":this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),
            "kdppk": this.kodeppk,
            "subSpesialis": null,
            "khusus": {
            "kdKhusus": this.khususap,
            "kdSubSpesialis": null,
            "catatan": "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal"
            }
            },
            "kdTacc": -1,
            "alasanTacc": null



            }
          
        }

        

                 
      this.authService.addkunjungan(body)
      .subscribe(response => {
      
      
    
        
        if(response.metaData.code == 412){

   

        for(let x of response.response){

          this.toastr.error(x.field+' '+x.message, 'Eror');
       
        }
        

      
        }else if(response.metaData.code == 201 ){
  

        for(let y of response.response){

     


          let body={
            "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":y.message,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
          }
          
             this.authService.updatepcare(body)
             .subscribe(response => {


              if(response){
                this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                  timeOut: 2000,
                });
  
              }

             
              })



        }


     
      
       
        
        setTimeout(() => {
          this.tampildata()
        }, 200);
      
      
       
        }else{
          this.toastr.error('Simpan Gagal', 'Eror');
        }
      
      
      
      
      })



      }

      kirimpcarerujukkhususedit(){


        if(this.bb === ''){
          this.bb = 0
          this.toastr.error('bb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.td === ''){
          this.td = 0
          this.toastr.error('Sistole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tdd === ''){
          this.tdd = 0
          this.toastr.error('diastole harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.tb === ''){
          this.tb = 0
          this.toastr.error('Tb harus di isi agar terkirim ke pcare', 'Eror');
          return
        }
        if(this.rr === ''){
          this.rr = 0
          this.toastr.error('rr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }

        if(this.hr === ''){
          this.hr = 0
          this.toastr.error('hr harus di isi agar terkirim ke pcare', 'Eror');
          return
        }


        if(this.subjek === ''){
          this.toastr.error('Keluhan harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        
        if(this.kddiagnosabpjs === ''){
          this.toastr.error('Diagnosa harus di isi agar terkirim ke pcare', 'Eror');
       
          return
        }

        if(this.kodeppk === ''){
          this.toastr.error('anda belum memilih faskes rujukan', 'Eror');
       
          return
        }

        let body={
          "data" : {
            "noKunjungan": this.nokunjungan,
            "noKartu": this.noasuransi,
         
            "keluhan": this.subjek,
            "kdSadar": this.kesadaran,
            
            "sistole": parseInt(this.td),
            "diastole": parseInt(this.tdd),
            "beratBadan": parseInt(this.bb),
            "tinggiBadan": parseInt(this.tb),
            "respRate": parseInt(this.rr),
            "heartRate": parseInt(this.hr),
            "lingkarPerut": 0,
            
            "kdStatusPulang": this.stspulang,
            "tglPulang":  this.pipe.transform(this.myDate, 'dd-MM-yyyy'),
            "kdDokter": this.kddokterbpjs,
            "kdDiag1": this.kddiagnosabpjs,
            "kdDiag2": null,
            "kdDiag3": null,
            "kdPoliRujukInternal": null,

            "rujukLanjut": {	
            "tglEstRujuk":this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),
            "kdppk": this.kodeppk,
            "subSpesialis": null,
            "khusus": {
            "kdKhusus": this.khususap,
            "kdSubSpesialis": null,
            "catatan": "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal"
            }
            },
            "kdTacc": -1,
            "alasanTacc": null



            }
          
        }

        

                 
        this.authService.editkunjungan(body)
        .subscribe(response => {
        
        
      
          
          if(response.metaData.code == 412){
  
     
  
          for(let x of response.response){
  
            this.toastr.error(x.field+' '+x.message, 'Eror');
         
          }
          
  
        
          }else if(response.metaData.code == 200 ){
    
  
  
  
            let body={
              "notransaksi":this.notransaksi,"stssimpan":'2',"nokunjungan":this.nokunjungan,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"jeniskunjungan":this.stspulang
            }
            
               this.authService.updatepcare(body)
               .subscribe(response => {
  
  
                if(response){
                  this.toastr.success('', 'Berhasil Kirim Kunjungan'+this.stspulang, {
                    timeOut: 2000,
                  });
    
                }
  
               
                })
  
  
  
          
  
  
       
        
         
          
          setTimeout(() => {
            this.tampildata()
          }, 200);
        
        
         
          }else{
            this.toastr.error('Simpan Gagal', 'Eror');
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
      pilihdiagedit(a,b){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
      
        swalWithBootstrapButtons.fire({
          title: 'Edit Diagnosa',
          text: 'Apakah anda yakin bahwa diagnosa '+ this.diagfree +' tersebut cocok dengan kode diagnosa  '+ a ,
       
          showCancelButton: true,
          confirmButtonText: 'Iya Yakin',
          cancelButtonText: 'Batal',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
       
            let body={
              "notrans":this.notrans,"kdcabang":this.kdcabang,"kode":a,"diagfree":this.diagfree,"norm":this.norm,"no":this.diagnourut
              ,"stssimpan":'1'}
      
              this.authService.editfreetextdiag(body)
              .subscribe(response => {
              
              
              
                if(response ){
                  this.toastr.success(''+response, 'Sukses', {
                    timeOut: 2000,
                  });
          
                  this.authService.diagnosatmp(this.kdcabang,this.notrans,'diagnosa')
                  .subscribe(
                    data => {
                
                
                
                      if(data.length){
                
                        this.tdiag = data;
                        this.showmunculdiagjudul = true;
                
                
                      }else{
                      
                        this.showmunculdiagjudul = false;
                
                
                      }
                    
                
                
                },
                Error => {
                
                 console.log(Error)
                }
                )

                


                setTimeout(() => {
                  this.modalService.dismissAll()
                
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
      tahu(){
        this.toastr.error('SETELAH MENULIS DIAGNOSA FREE TEXT SILAHKAN ENTER PADA KEYBOARD AGAR TERSIMPAN', 'Eror');

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
      
      tlistlabshow:boolean;
      labdetailray:any;

      tmplistintruksilab(){
        
               this.authService.listintruksilab(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter+this.nomorcpptangka)
             .subscribe(
               data => {
               
           this.tlistlab = data;
         
           console.log(this.labdetailray)
           if(data.length){
            this.tlistlabshow = true;
            this.labdetailray =  '<b>LABORAT : </b> '+ Array.prototype.map.call(data,s=>s.nama+'<br>').toString();
          
           }else{
            this.tlistlabshow = false;
            this.labdetailray =  ''
          
           }
           
             },
               Error => {
             
                console.log(Error)
               }
             )

             
             this.authService.keteranganklinis(this.kdcabang,this.notrans,'LABORAT',this.notrans+this.kddokter+this.nomorcpptangka)
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
           tlistradshow:boolean;
           raddetailray:any;

           tmplistintruksirad(){
        
            this.authService.listintruksilab(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter+this.nomorcpptangka)
          .subscribe(
            data => {
            
        this.tlistrad = data;
      
            if(data.length){
              this.tlistradshow = true;
              this.raddetailray =  '<b>RADIOLOGI :</b> '+ Array.prototype.map.call(data,s=>s.nama+'<br>').toString();
          
            }else{
              this.raddetailray='';

              this.tlistradshow = false;
              
            }
        
          },
            Error => {
          
             console.log(Error)
            }
          )

          
          this.authService.keteranganklinis(this.kdcabang,this.notrans,'RADIOLOGI',this.notrans+this.kddokter+this.nomorcpptangka)
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
diagfree:any;
diagnourut:any;

        opendiagedit(contentdiag,diagfree,no){
          this.diagnourut = no
          
          this.diagfree = diagfree
          this.modalService.open(contentdiag, {
            size: 'xl'


          });


        }

        perminbatc(){
        
          // this.router.navigate(['master/perminobat',''])
          // this.modalService.open(perminobatComponent, {
          //   size: 'xl'
          // });


          this.modalService.open(perminobatriComponent,{size: 'xl'
        }).result.then((result) => {
 

        
        
           
            
           }, (reason) => {
           
            this.tmpnonr( )
        
           });


        


        }
         private expandRecursive(node: TreeNode, isExpand: boolean) {
      node.expanded = isExpand;
      if (node.children) {
        node.children.forEach((childNode) => {
          this.expandRecursive(childNode, isExpand);
        });
      }
    }
    nodeSelectx(event){

      if(event.node.harga == 0){
        this.toastr.error('Silahkan pilih Pemeriksaan', 'Eror');
        
      }else{


        
        let body ={"kduser":this.username,"norm":this.norm,"dari":'RADIOLOGI',"kdkostumerd":this.kdkostumerd,
        "kdproduk":event.node.key,"produk":event.node.label,"kdpoli":'rad',"qty":'1',"harga":event.node.harga,"debet":event.node.harga,"kdcppt":this.notrans+this.kddokter+this.nomorcpptangka,
         "kridit":0,"jenistransaksi":'DB',"tarifasli":event.node.harga,"nofaktur":this.notrans,
         "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1',"tglminta":this.myDatelab
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
    }
        nodeSelect(event) {

        
          if(event.node.harga == 0){
            this.toastr.error('Silahkan pilih Pemeriksaan', 'Eror');
            
          }else{

          

          let body ={"kduser":this.username,"norm":this.norm,"dari":'LABORAT',"kdkostumerd":this.kdkostumerd,
           "kdproduk":event.node.key,"produk":event.node.label,"kdpoli":'lab',"qty":'1',"harga":event.node.harga,"debet":event.node.harga,"kdcppt":this.notrans+this.kddokter+this.nomorcpptangka,
            "kridit":0,"jenistransaksi":'DB',"tarifasli":event.node.harga,"nofaktur":this.notrans,
            "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1',"tglminta":this.myDatelab
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
    
          // this.toastr.success(event.node.key, 'Sukses', {
          //   timeOut: 2000,
          // });
    
          // this.toastr.success(event.node.label, 'Sukses', {
          //   timeOut: 2000,
          // });
    
          
          // this.toastr.success(event.node.harga, 'Sukses', {
          //   timeOut: 2000,
          // });
          // this.messageService.add({
          //   severity: 'info',
          //   summary: 'Node Selected',
          //   detail: event.node.id,
          // });
        }
      
        nodeUnselect(event) {
          // this.toastr.success(event.node.key, 'Un Sukses', {
          //   timeOut: 2000,
          // });
          // this.messageService.add({
          //   severity: 'info',
          //   summary: 'Node Unselected',
          //   detail: event.node.label,
          // });
        }

      perminlab(content6){
        // this.tmptarif()

        this.authService.listtariftreelabrad(this.kdcabang,'LAB',this.kdtarif)
        .subscribe(
          data => {
          
            this.files1 = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )

        

        this.tmplistintruksilab()
        this.modalService.open(content6, {
          size: 'lg'
        });
      }
      carilink(contentrj){
        // if(this.ststarif === "igd"){
        //   this.ststarif='IGD'
        // }else{
        //   this.ststarif='RJ'

        // }

        this.ststarif = 'RI'
        this.authService.listtariftree(this.kdcabang,this.ststarif,this.kdtarif)
        .subscribe(
          data => {
          
            this.files3 = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )



        this.modalService.open(contentrj, {
          size: 'lg'
        });
      }
      ttarifrj:any;

      nodeSelectrj(a){


        this.authService.tarifdetail(this.kdcabang,'2','',a.node.key,this.ststarif)
        .subscribe(
          data => {
          
       this.ttarifrj = data;
       
       
        },
          Error => {
        
           console.log(Error)
          }
        )



      }
      perminrad(content2){
        // this.tmptarifrad()

        this.authService.listtariftreelabrad(this.kdcabang,'RAD',this.kdtarif)
        .subscribe(
          data => {
          
            this.files2 = data;
      
        },
          Error => {
        
           console.log(Error)
          }
        )


        this.tmplistintruksirad()
        this.modalService.open(content2, {
          size: 'lg'
        });
      }



      tambahtarifrad(kdtarif,nama,harga){
        let body ={"kduser":this.username,"norm":this.norm,"dari":'RADIOLOGI',"kdkostumerd":this.kdkostumerd,
       "kdproduk":kdtarif,"produk":nama,"kdpoli":'rad',"qty":'1',"harga":harga,"debet":harga,"kdcppt":this.notrans+this.kddokter,
        "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"nofaktur":this.notrans,
        "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1',"tglminta":this.myDatelab,"ri":'0'
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
  "kdcppt":this.notrans+this.kddokter+this.nomorcpptangka,
   "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":this.notrans,"nomorx":'',"keterangan":this.keteranganakhirrad,
   "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'3',"kdklinik":this.kdklinik
 }

 this.authService.simpanrxtunjangerm(body)
 .subscribe(response => {
 
 
 
   if(response ){
     this.toastr.success('Sukses Terkirim Ke Penunjang'+response, 'Sukses', {
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
        "kdcppt":this.notrans+this.kddokter+this.nomorcpptangka,
         "kridit":0,"jenistransaksi":'DB',"tarifasli":0,"nofaktur":this.notrans,"nomorx":'',"keterangan":this.keteranganakhir,
         "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'3',"kdklinik":this.kdklinik
       }

       this.authService.simpanrxtunjangerm(body)
       .subscribe(response => {
       
       
       
         if(response ){
           this.toastr.success('Sukses Terkirim Ke Penunjang'+response, 'Sukses', {
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
tlistobatnshow:boolean;
tlistobatrshow:boolean;

tmpinarrayobat:any;
tmpinarrayobatr:any;

tmpnonr(){
  this.authService.obatnonracik(this.kdcabang,this.notrans,this.notrans+this.kddokter+this.nomorcpptangka)
  .subscribe(
    data => {
    
this.tlistobatn = data;
this.tmpinarrayobat = Array.prototype.map.call(this.tlistobatn,s=>s.nama + s.aturan+'<br>').toString();



if(data.length){
  this.tlistobatnshow = true;


}else{
this.tlistobatnshow = false;
  

}

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.obatracik(this.kdcabang,this.notrans,this.notrans+this.kddokter+this.nomorcpptangka,this.nomorracik)
  .subscribe(
    data => {
    
this.tlistobatr = data;




if(data.length){
  this.tlistobatrshow = true;


}else{
this.tlistobatrshow = false;
  

}



  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.tmpbhp(this.kdcabang,this.notrans,this.notrans+this.kddokter+this.nomorcpptangka)
  .subscribe(
    data => {
    
this.tlistbhpr = data;

  },
    Error => {
  
     console.log(Error)
    }
  )



setTimeout(() => {
      
console.log(this.tmpinarrayobat)

}, 600);
}
tlistbhpr:any;

hapusobat(notransaksi,kdpoli,kdpruduk,statuso,dari,kunci,no,kdcppt,nama){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success'
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
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success'
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


  
  this.totalestimasi = xyz + parseInt(this.totalrjes);





  },
    Error => {
  
     console.log(Error)
    }
  )
}

trujukr:any;

riwayatrj(){
  this.authService.riwayatrujuk(this.noasuransi)
  .subscribe(
    data => {
      this.trujukr = data;


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


      showhr:boolean;
      chr(a){
     if(a.target.value.length <= 0){
          this.showhr = false;
        }else if(a.target.value <= 60){
       
    this.showhr = true;

        }else if(a.target.value >= 100){
        
    this.showhr = true;
    
        }else{
                  
    this.showhr = false;
        }
      }   
      
      showbb:boolean;
      cbb(a){
        if(a.target.value.length <= 0){
             this.showbb = false;
           }else if(a.target.value <= 1){
          
       this.showbb = true;
   
           }else if(a.target.value >= 400){
           
       this.showbb = true;
       
           }else{
                     
       this.showbb = false;
           }
         }   

         shownadi:boolean;


         cnadi(a){
          if(a.target.value.length <= 0){
               this.shownadi = false;
             }else if(a.target.value <= 60){
            
         this.shownadi = true;
     
             }else if(a.target.value >= 160){
             
         this.shownadi = true;
         
             }else{
                       
         this.shownadi = false;
             }
           }   
           showsuhu:boolean;

           csuhu(a){
            if(a.target.value.length <= 0){
                 this.showsuhu = false;
               }else if(a.target.value <= 35){
              
           this.showsuhu = true;
       
               }else if(a.target.value >= 40){
               
           this.showsuhu = true;
           
               }else{
                         
           this.showsuhu = false;
               }
             }  
             showrr:boolean;

             crr(a){
              if(a.target.value.length <= 0){
                   this.showrr = false;
                 }else if(a.target.value <= 12){
                
             this.showrr = true;
         
                 }else if(a.target.value >= 16){
                 
             this.showrr = true;
             
                 }else{
                           
             this.showrr = false;
                 }
               } 
               
               showpp:boolean;

               cpp(a){
                if(a.target.value.length <= 0){
                     this.showpp = false;
                   }else if(a.target.value <= 95){
                  
               this.showpp = true;
           
                   }else if(a.target.value >= 100){
                   
               this.showpp = true;
               
                   }else{
                             
               this.showpp = false;
                   }
                 } 

                 showtd:boolean;

          ctd(a){
            if(a.target.value.length <= 0){
                 this.showtd = false;
               }else if(a.target.value <= 100){
              
           this.showtd = true;
       
               }else if(a.target.value >= 120){
               
           this.showtd = true;
           
               }else{
                         
           this.showtd = false;
               }
             } 
             showtdd:boolean;

             ctdd(a){
              if(a.target.value.length <= 0){
                   this.showtdd = false;
                 }else if(a.target.value <= 80){
                
             this.showtdd = true;
         
                 }else if(a.target.value >= 100){
                 
             this.showtdd = true;
             
                 }else{
                           
             this.showtdd = false;
                 }
               } 

               krujuk(content){
                this.modalService.open(content, {
                  size: 'lg'
                });
              }

              rujukanuntuk:any;
              keteranganrujuk:string='';
              instansi:string='';
              catatan:string='';
              catatankon:string='';
              
            trujuk:any;
            
              tmprjkn(){
                this.authService.tampilrujukan(this.kdcabang,this.notrans)
                .subscribe(
                  data => {
                  
              this.trujuk = data;
            
            
              for(let x of data){
            
                this.rujukanuntuk = x.rujukanuntuk;
                this.keteranganrujuk = x.keteranganrujuk;
                this.instansi = x.instansi;
                this.catatan = x.catatan;
            
              }
              
                },
                  Error => {
                
                   console.log(Error)
                  }
                )
              
              }
               simpanrujuk(){
            
            
            
            
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                  },
                  buttonsStyling: false
                });
            
                swalWithBootstrapButtons.fire({
                  title: 'Simpan',
                  text: 'Yakin Simpan',
               
                  showCancelButton: true,
                  confirmButtonText: 'Simpan',
                  cancelButtonText: 'Batal',
                  reverseButtons: true
                }).then((result) => {
                  if (result.value) {
            
            
            
                    let body={
                      "rujukanuntuk":this.rujukanuntuk,"keteranganrujuk":this.keteranganrujuk,"instansi":this.instansi,"catatan":this.catatan,"stssimpan":'1',
                      "notrans":this.notransaksi,"kdcabang":this.kdcabang,"norm":this.norm
                    }
                
                
                    this.authService.simpanrujukan(body)
                    .subscribe(response => {
                    
                    
                    
                      if(response ){
                        this.toastr.success(''+response, 'Sukses', {
                          timeOut: 2000,
                        });
                  
                       
                  
                        setTimeout(() => {
                          this.authService.tampilrujukan(this.kdcabang,this.notrans)
                          .subscribe(
                            data => {
                            
                        this.trujuk = data;
                      
                      
                      
                        
                          },
                            Error => {
                          
                             console.log(Error)
                            }
                          )
                       }, 200);
                 
                       
                       
                       }else{
                        this.toastr.error('Simpan  Gagal', 'Eror');
                      
                       }
                    
                    
                    
                    
                    
                    })
                  
            
            
                  
            
            
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    swalWithBootstrapButtons.fire(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    );
                  }
                });
            
            
            
            
            
            
            
            
               }

               




               odon(){
                var redirectWindow = window.open(this.URLINVOICE+'clenic/report/odo/odontogram.php?kdcabang='+this.kdcabang+'&norm='+this.norm+'&notrans='+this.notransaksi+'&kddokter='+this.kddokter, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
                redirectWindow.location;
               }



               kdtarifigd:any;
               namaigd:any;
               hargaigd:any;
               tdokter:any;
               tperawat:any;

               tambahtarif(kdtarif,nama,harga,contentdokter,contentperawat){
              
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                  },
                  buttonsStyling: false
                });
            
                swalWithBootstrapButtons.fire({
                  title: 'Tambah Tarif',
                  text: 'Menambah Tarif '+nama,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Simpan',
                  cancelButtonText: 'Batal',
                  reverseButtons: true
                }).then((result) => {
                  if (result.value) {
  
  
  
  
  
  
  
                    if(this.igdorrj === 'igd'){
                      this.kdtarifigd = kdtarif;
                      this.namaigd = nama;
                      this.hargaigd = harga;
  
  
                      this.authService.dokter(this.kdcabang)
                      .subscribe(
                        data => {
                       
                          
                          if(data.length){
  
                            this.tdokter = data;
                            this.modalService.open(contentdokter, {
                              size: 'lg'
                            });
                          }else{
  
                          }
  
                    
                      
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
                      
  
  
  
                   
                      
                      
                    }else{
  
  
                      this.authService.listkomponen(this.kdcabang,kdtarif)
                      .subscribe(
                        data => {
                        
                          if(data.length){
                            this.kdtarifigd = kdtarif;
                            this.namaigd = nama;
                            this.hargaigd = harga;
  
  
                            this.authService.perawat(this.kdcabang)
                            .subscribe(
                              data => {
                              
                          
                        if(data.length){
  
                          this.tperawat = data;
                          this.modalService.open(contentperawat, {
                            size: 'lg'
                          });
                        }else{
                          
                        }
                          
                            
                            },
                              Error => {
                            
                               console.log(Error)
                              }
                            )
  
                          }else{
  
     let body ={"user":this.username,
                      "notransaksi":this.notransaksi,"kdproduk":kdtarif,"produk":nama,"kdpoli":this.kdpoli,"qty":'1',"harga":harga,"debet":harga,
                      "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":this.notransaksi,
                      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',kdperawat:'0','ri':'0'
                    }
  
                    
                    this.authService.simpantrxrj(body)
                    .subscribe(response => {
                    
                   
                  
                      if(response ){
                        this.toastr.success(''+response, 'Sukses', {
                          timeOut: 2000,
                        });
                    
                        setTimeout(() => {
                          this.tmptrans()
                        }, 200);
                     
                    
                      
                       }else{
                        this.toastr.error('Simpan  Gagal', 'Eror');
                      
                       }
                  
                  
                  
                  
                  
                    })
                          }
                      
                      },
                        Error => {
                      
                         console.log(Error)
                        }
                      )
  
  
  
  
  
  
  
  
  
  
  
  
  
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




          tambahtariflab(kdtarif,nama,harga){



            let body ={"kduser":this.username,"norm":this.norm,"dari":'LABORAT',"kdkostumerd":this.kdkostumerd,
           "kdproduk":kdtarif,"produk":nama,"kdpoli":'lab',"qty":'1',"harga":harga,"debet":harga,"kdcppt":this.notrans+this.kddokter,
            "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"nofaktur":this.notrans,
            "kdcabang":this.kdcabang,"kddokter":this.kddokter,"stssimpan":'1',"tglminta":this.myDatelab
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







          pilihdokter(kddokter,namdokter){
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });
          
            swalWithBootstrapButtons.fire({
              title: 'Tambah Jasa Dokter',
              text: 'Menambah Jasa Dokter Ke '+namdokter,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Simpan',
              cancelButtonText: 'Batal',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
          
          
          
                  let body ={"user":this.username,
                  "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdpoli,"qty":'1',"harga":  this.hargaigd,"debet":  this.hargaigd,
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":  this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":kddokter,"stssimpan":'1',kdperawat:'0','ri':'0'
                }
          
                
                this.authService.simpantrxrj(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
                
                    setTimeout(() => {
                      this.tmptrans()
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
                // swalWithBootstrapButtons.fire(
                //   'Cancelled',
                //   'Your imaginary file is safe :)',
                //   'error'
                // );
              }
            });
          }


          pilihperawat(kdperawat,namdokter){
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });
          
            swalWithBootstrapButtons.fire({
              title: 'Tambah Jasa Perawat',
              text: 'Menambah Jasa Perawat Ke '+namdokter,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Simpan',
              cancelButtonText: 'Batal',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
          
          
          
                let body ={"user":this.username,
                "notransaksi":this.notransaksi,"kdproduk":this.kdtarifigd,"produk":this.namaigd,"kdpoli":this.kdpoli,"qty":'1',"harga":this.hargaigd,"debet":this.hargaigd,
                "kridit":0,"jenistransaksi":'DB',"tarifasli":this.hargaigd,"disc":0,"nofaktur":this.notransaksi,
                "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"stssimpan":'1',kdperawat:kdperawat,'ri':'0'
              }
          
                
                this.authService.simpantrxrj(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
                
                    setTimeout(() => {
                      this.tmptrans()
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
                // swalWithBootstrapButtons.fire(
                //   'Cancelled',
                //   'Your imaginary file is safe :)',
                //   'error'
                // );
              }
            });
          
          }


          ttindakx:any;
          ttindakxshow:boolean;
          totalrjes:any;

          
          tmptrans(){
            this.tindaksshow = false
            this.tindakan=''
            this.authService.listtrxcppt(this.kdcabang,this.notrans)
            .subscribe(
              data => {
              
                var xyz:number=0
          if(data.length){
            this.ttindakx = data;
            this.ttindakxshow = true;

            for(let x of data){

             
              xyz += x.debet;

            }
            this.totalrjes = xyz;

            
          }else{
            this.ttindakxshow = false;
          }
        
        
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )
          
          }


          ttmpkonsulin:any;
          showkonsulrj:boolean;

          ttmpkonsulina:any;
          showkonsulrja:boolean;
          tmpkonsul(){
           
            this.authService.listkonsultasirj('1',this.kdcabang,this.notrans)
            .subscribe(
              data => {
              this.ttmpkonsulin = data;

                if(data.length){
                  this.showkonsulrj = true;

                }else{
                    this.showkonsulrj = false;
                  

                }
        
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )
          


            this.authService.listkonsultasirj('2',this.kdcabang,this.notrans)
            .subscribe(
              data => {
              this.ttmpkonsulina = data;

                if(data.length){
                  this.showkonsulrja = true;

                }else{
                    this.showkonsulrja = false;
                  

                }
        
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )


          }






          hapusproduk(nomor,kdproduk,produk,notransaksi,harga,nofaktur,kridita,kdpoli){
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-success'
              },
              buttonsStyling: false
            });
        
            swalWithBootstrapButtons.fire({
              title: 'Hapus',
              text: 'Hapus Tarif '+produk,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Hapus',
              cancelButtonText: 'Batal',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
  
  
                let body ={"user":this.username,"netto":0,
                  "notransaksi":notransaksi,"kdproduk":kdproduk,"produk":produk,"kdpoli":kdpoli,"qty":'1',"harga":harga,"debet":harga,
                  "kridit":0,"jenistransaksi":'DB',"tarifasli":harga,"disc":0,"nofaktur":nofaktur,
                  "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'2','ri':'0'
                }
  
                
                this.authService.simpantrxrj(body)
                .subscribe(response => {
                
               
              
                  if(response ){
                    this.toastr.success(''+response, 'Sukses', {
                      timeOut: 2000,
                    });
                setTimeout(() => {
                  this.tmptrans()
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

          
          kdlabshow:any;
          kdlabshowc:boolean;
          nmlabshow:any;

          listpol:any;
          listtot:number;
          min:any;
          max:any;

          showgrafik(a,b,c,d){

              this.authService.trackhasillab(this.kdcabang,this.norm,a)
  .subscribe(
    data => {
    



      if(data.length){

    
this.listpol = data.map(function(e) {
  return e.tgl;
 })
 this.listtot = data.map(function(e) {
  return parseInt(e.hasil)
  
  ;
 })

 this.kdlabshow = a;
 this.nmlabshow = b;
 this.min = c;
 this.max = d;

 
 this.kdlabshowc = true;
}else{


}

  },
    Error => {
  
     console.log(Error)
    }
  )

          



          }
         

          showgrafikx(a){
            this.kdlabshow = '';
            this.kdlabshowc = false;
          }


          showrujuk:boolean;
          kddiagnosabpjs:any;

          pilihstatuspulang(a){
            

            this.authService.diagnosaambilpcare(this.notrans,this.kdcabang)
            .subscribe(
              data => {

                if(data.length){
                  for (let x of data )
                  {
  
                    this.kddiagnosabpjs = x.kddiagnosa
  
                  }
          
                }else{

                  this.kddiagnosabpjs = ''
                }
              
           
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )


            if(a === '4'){
              this.showrujuk = true;

            }else if(a === '6'){
              this.showrujuk = true;
              
            }else{
              this.showrujuk = false;


              


            }
          } 


          tiperujuk:string='';
          stspulang:string='';
          kesadaran:string='01'
          spesialis:string='';
          sspesialis:string='';
          sarana:string='';
          nsarana:string='';
          showloadingper:boolean;  
          showloadingpers:boolean;  
          tspesialis:any;
          showrujuknon:boolean;
          showrujuknonkusus:boolean;
          tkhusus:any;
          khususap:string='';

          pilihtiperujuk(a){


              if(a === '01'){
                this.showrujuknon = true;
                this.showrujuknonkusus = false
                this.showloadingper = true;
                this.showthahem = false;

                this.authService.spesialispcare()
                .subscribe(
                  data => {
                   
                    if(data){
                 
                      this.showloadingper = false;
                      this.tspesialis = data.response.list
    
                   
    
                  
              
                    }else{
              this.showloadingper = false;
                      
                     
                    }
                  
               
         
              
                },
                  Error => {
                
                   console.log(Error)
                  }
                )
              }else{
            this.showrujuknon = false;
            this.showrujuknonkusus = true   
            this.showloadingper = true;
this.showthahem = false;
                
            this.authService.refkhusus()
            .subscribe(
              data => {
               
                if(data){
             
              this.tkhusus = data.response.list;
              this.showloadingper = false;
            
              
          
                }else{
                  this.showloadingper = false;
            
              
                  
                 
                }
              
           
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )

            
              }
        
          }
          tspesialissub:any;

          pilihsubsp(a){

            this.showloadingpers = true;
            this.authService.subspesialis(a)
            .subscribe(
              data => {
               
                if(data){
             
                  this.showloadingpers = false;
                  this.tspesialissub = data.response.list

               

              
          
                }else{
          this.showloadingpers = false;
                  
                 
                }
              
           
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )
          }

          showloadingperss:boolean;
          tsarana:any;

          ksarana(a){
            if(a === '02'){
              this.showloadingperss = true;
              this.authService.sarana()
              .subscribe(
                data => {
                 
                  if(data){
               
                    this.showloadingperss = false;
                    this.tsarana = data.response.list
  
                 
  
                
            
                  }else{
            this.showloadingperss = false;
                    
                   
                  }
                
             
       
            
              },
                Error => {
              
                 console.log(Error)
                }
              )
            }else{

              this.tsarana = ''
            }
          }
          showfaskes:boolean;
          tfaskesbpjs:any;

          klistfaskes(content){

            this.showfaskes = true;
            
            this.authService.getfaskessp(this.sspesialis,this.sarana,this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'))
            .subscribe(
              data => {
               
                if(data){


                  if(data.metaData.code == 401  ){
                    this.showfaskes = false;
                    this.toastr.error(data.metaData.message, 'Eror');
                 

                  }else{
                    this.showfaskes = false;
               
                    this.tfaskesbpjs = data.response.list
     
                    
   
                     this.modalService.open(content, {
                       size: 'lg'
                     });
                 
                  }
             
              
          
                }else{
          this.showfaskes = false;
                  
                 
                }
              
           
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )


   

         

          }
          klistfaskesx(content){
         
            if(this.thanon == 0){
              console.log('ambiligd')


                  //   this.showfaskes = true;
            
            this.authService.refrujukankusus('1',this.khususap, this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),this.sspesialis,this.noasuransi)
            .subscribe(
              data => {
               
                if(data){


                  if(data.metaData.code == 401  ){

                    this.toastr.error(data.metaData.message, 'Eror');
                 
                  }else{
                    this.showfaskes = false;
               
                    this.tfaskesbpjs = data.response.list
     
                    
   
                     this.modalService.open(content, {
                       size: 'lg'
                     });
                  }
             
                 
              
          
                }else{
          this.showfaskes = false;
                  
                 
                }
              
           
     
          
            },
              Error => {
            
               console.log(Error)
              }
            )



            }else{
              console.log('noigd')

              this.authService.refrujukankusus('2',this.khususap, this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'),this.sspesialis,this.noasuransi)
              .subscribe(
                data => {
                 
                  if(data){


                    if(data.metaData.code == 401  ){
                      this.showfaskes = false;
                      this.toastr.error(data.metaData.message, 'Eror');
                    }else{

                      this.showfaskes = false;
                 
                      this.tfaskesbpjs = data.response.list
       
                      
     
                       this.modalService.open(content, {
                         size: 'lg'
                       });

                    }
               
                
            
                  }else{
            this.showfaskes = false;


            this.toastr.error(data.metaData.message, 'Eror');
                  

                    
                   
                  }
                
             
       
            
              },
                Error => {
              
                 console.log(Error)
                }
              )

              

            }


          }
          pilihfaskes(a,b){
            this.kodeppk = a;
            this.namafaskes = b;

            this.modalService.dismissAll()
          }
          kodeppk:string='';
          namafaskes:string='';
          showthahem:boolean;
          thanon:number;

          pilihrefkusus(a){
            console.log(a)
            if(a === 'THA'){
              this.thanon = 1;

              this.showthahem = true
              this.authService.spesialispcare()
              .subscribe(
                data => {
                 
                  if(data){
               
                   
                    this.tspesialis = data.response.list
  
                 
  
                
            
                  }else{
          
                    
                   
                  }
                
             
       
            
              },
                Error => {
              
                 console.log(Error)
                }
              )
            }else if(a === 'HEM'){
              this.thanon = 1;
              
        this.showthahem = true
        this.authService.spesialispcare()
        .subscribe(
          data => {
           
            if(data){
         
            
              this.tspesialis = data.response.list

           

          
      
            }else{
 
              
             
            }
          
       
 
      
        },
          Error => {
        
           console.log(Error)
          }
        )
            }else{
              this.thanon = 0;
              
              this.showthahem = false
              

            
            }

          }

          produkdise:any;
          tkomp:any;
          totaljasakom:number;
          totaldiscnom:number;

          tmpkomp(a,b,c){
            this.authService.listkomponentrx(this.kdcabang,a,b,c)
            .subscribe(
              data => {
              
          this.tkomp = data;
          
          var xyz:number=0;
          var xyzx:number=0;
          
          
          for (let product of data )
          {
            var y = parseInt(product.jasa)
            xyz += y;
          
          
          var x = parseInt(product.nominal)
          xyzx += x;
          
          
          }
          
          this.totaljasakom = xyz;
          this.totaldiscnom = xyzx
          
            },
              Error => {
            
               console.log(Error)
              }
            )
          }
                  diskonprodukp(content,nomor,kdproduk,produk,notransaksi,harga,nofaktur){
          
          
                 
                    this.tmpkomp(notransaksi,kdproduk,nomor)
          
                    this.produkdise = produk
          
                    
                    this.modalService.open(content).result.then((result) => {
          
          
           
            
            
                    }, (reason) => {
                     
                    });
          
                  }

                  discpp(nomor,kdproduk,notrans,kdkomponen,nofaktur){
                    console.log(nomor,kdproduk,notrans,kdkomponen)
          
          
                    Swal.fire({
                      title: 'Masukan Presentase diskon %',
                      input: 'number',
                      customClass: {
                        validationMessage: 'my-validation-message'
                      },
                      showLoaderOnConfirm: true,
                      preConfirm: (value) => {
                        if (!value) {
                          Swal.showValidationMessage(
                            
                            '<i class="fa fa-info-circle"></i> Qty Belum di isi'
                          )
                        }else{
                        
          
          
                          if(value > 100){
                            this.toastr.error('Tidak Boleh 100%', 'Eror');
                            
                          }else{
                            let body ={"user":this.username,
                            "notransaksi":notrans,"kdproduk":kdproduk,"produk":'',"kdpoli":this.kdpoli,"qty":value,"harga":'',"debet":'',
                            "kridit":0,"jenistransaksi":'DB',"tarifasli":'',"disc":value,"nofaktur":nofaktur,"kdkomponen":kdkomponen,
                            "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"kddokter":this.kddokter,"nomorx":nomor,"stssimpan":'5','ri':'0'
                          }
            
                          
                          this.authService.simpantrxrj(body)
                          .subscribe(response => {
                          
                         
                        
                            if(response ){
                              this.toastr.success(''+response, 'Sukses', {
                                timeOut: 2000,
                              });
          
          setTimeout(() => {
            this.tmpkomp(notrans,kdproduk,nomor)
          
                        
                              this.tmptrans()
          }, 200);
          
                            
                          
                            
                             }else{
                              this.toastr.error('Simpan  Gagal', 'Eror');
                            
                             }
                        
                        
                        
                        
                        
                          })
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
                          }
                
                       
          
                        }
                      }
                    })
          
          
          
                  }

                  tpolitunjang:any;
                  politunjang:any;


                  perminkon(content){

                    this.authService.poli(this.kdcabang)
                    .subscribe(
                      data => {
                       
                        if(data){
                     this.tpolitunjang = data;

                        
                          this.modalService.open(content).result.then((result) => {
          
          
           
            
            
                          }, (reason) => {
                           
                          });
                      
                  
                        }else{
             
                          
                         
                        }
                      
                   
             
                  
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )


             
          

                  }
                  tdoktunjang:any;
                  doktunjang:any;

                  pilihklinik(a){


   

                    this.authService.dokterperpolix(this.kdcabang,a)
                    .subscribe(
                      data => {
                      
                 this.tdoktunjang = data;
                 
                 
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )
                 
                    
                  }

                  tkunjungan:any;
                  nmPst:any;
                  nokaPst:any;
                  noRujukan:any;
                  tglKunjungan:any;
                  tglEstRujuk:any;
                  tglAkhirRujuk:any;
                  nmPPK:any;
                  kdPPK:any;

                  nmPoli:any;
                  kdPoli:any;

                  kdDiag:any;
                  nmDiag:any;
                  

                  nmPPKa:any;
                  kdPPKa:any;
                  nmDokter:any;
                  kdDati:any;
                  nmDati:any;
                  nmKR:any;
                  pisa:any;
                  ketPisa:any;
                  

                  cekkunjungan(content){

                    this.authService.listpcare(this.nokunjungan)
                    .subscribe(
                      data => {
                      
                        if(data.metaData.code == '200'){

                          this.tkunjungan = data.response;

                          this.nmPst = data.response.nmPst
                          this.nokaPst = data.response.nokaPst
                          this.noRujukan = data.response.noRujukan

                          this.tglKunjungan = data.response.tglKunjungan
                          this.tglEstRujuk = data.response.tglEstRujuk
                          this.tglAkhirRujuk = data.response.tglAkhirRujuk


                         

                          this.nmPPK = data.response.ppkRujuk.nmPPK
                          this.kdPPK = data.response.ppkRujuk.kdPPK
                          this.nmPoli = data.response.poli.nmPoli
                          this.kdPoli = data.response.poli.kdPoli
                          this.kdDiag = data.response.diag1.kdDiag
                          this.nmDiag = data.response.diag1.nmDiag
                        

                          this.nmPPKa = data.response.ppk.nmPPK
                          this.kdPPKa = data.response.ppk.kdPPK
                          this.nmDokter = data.response.dokter.nmDokter

                          this.kdDati = data.response.ppk.kc.dati.kdDati
                          this.nmDati = data.response.ppk.kc.dati.nmDati
                          this.nmKR = data.response.ppk.kc.kdKR.nmKR
                          this.pisa = data.response.pisa
                          this.ketPisa= data.response.ketPisa
                          setTimeout(() => {
                            this.modalService.open(content, {
                              size: 'lg'
                            });
                          }, 300);
                        
                        }else{

                          this.toastr.error(data.metaData.message, 'Eror');
                            
                        }
                 
                 
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )
                  
                  }     

                  cetaklembarrj(){
                    let body = {
                     "nmPst": this.nmPst,
                     "nokaPst":  this.nokaPst,
                     "noRujukan":  this.noRujukan,
                     "tglKunjungan":  this.tglKunjungan,
                     "tglEstRujuk":  this.tglEstRujuk,
                     "tglAkhirRujuk":  this.tglAkhirRujuk,
                     "nmPPK":  this.nmPPK,
                     "kdPPK":  this.kdPPK,
                     "nmPoli":  this.nmPoli ,
                     "kdPoli":  this.kdPoli ,
                     "kdDiag":  this.kdDiag,
                     "nmDiag":  this.nmDiag ,
                     "nmPPKa":  this.nmPPKa,
                     "kdPPKa":  this.kdPPKa ,
                     "nmDokter":  this.nmDokter,
                     "kdDati":  this.kdDati,
                     "nmDati": this.nmDati,
                     "nmKR":  this.nmKR,
                     "kduser":this.kduser,
                     "stssimpan":'1',
                     "pisa":this.pisa,
                     "ketpisa":this.ketPisa
                    }

                    console.log(body)

                    
   this.authService.simpanlembarrj(body)
   .subscribe(response => {
   
   
   
     if(response ){
       this.toastr.success(''+response, 'Sukses', {
         timeOut: 2000,
       });
 
       var redirectWindow = window.open(this.URLINVOICE+'clenic/pcare/cetakrujukan.php?nokunjungan='+this.noRujukan, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
       redirectWindow.location
 
      
      }else{
       this.toastr.error('Simpan  Gagal', 'Eror');
     
      }
   
   
   
   
   
   })


                  }

cetakrwrj(a){
  var redirectWindow = window.open(this.URLINVOICE+'clenic/pcare/cetakrujukan.php?nokunjungan='+a, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
  redirectWindow.location
}
                  hapusrujukan(){
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                      },
                      buttonsStyling: false
                    });
                
                    swalWithBootstrapButtons.fire({
                      title: 'Batal Rujuk',
                      text: 'Apakah Anda Yakin Batal Rujuk Berganti ke Berobat Jalan',
                   
                      showCancelButton: true,
                      
                      cancelButtonText: 'Batal',
                      confirmButtonText: 'Hapus',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.value) {
            
                        this.kirimpcareedit()
                     
                        // this.authService.deletekunjungan(this.noRujukan)
                        // .subscribe(
                        //   data => {
                          
                 


                   
                     
                     
                        // },
                        //   Error => {
                        
                        //    console.log(Error)
                        //   }
                        // )
                
                     
                        let body={
                          "notransaksi":this.notransaksi,"stssimpan":'3',"kdpoli":this.kdpoli,"nokaPst":this.noasuransi,"noRujukan":this.noRujukan
                        }
                        
                           this.authService.updatepcare(body)
                           .subscribe(response => {
              
              
                            if(response){
                              this.toastr.success('', 'Sukses', {
                                timeOut: 2000,
                              });
  
                              this.tampildata()
  
  
                              this.modalService.dismissAll()
                
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


                  simpankonsul(){
                    this.authService.verifdaftar(this.norm,this.kdcabang,this.politunjang,this.myDate)
                    .subscribe(
                      data => {
                      
                  
                        if(data.length){
                          this.toastr.error('Anda Sudah Terdaftar di Poli yang sama', 'Eror');
                    
                        }else{
                  
                   let body ={
                      "norm": this.norm,"pasien":this.pasien,"indetitas":this.tandapengenal,"noindetitas":this.nopengenal,
                      "kduser":this.username,
                      "hp":this.hp,"kdpoli":this.politunjang,"kddokter":this.doktunjang,"kelas":'1',
                         "tgldaftar":this.tglp,"kostumer":this.kdkostumer,"kdkostumer":this.kdkostumerd,
                         "noasuransi":this.noasuransi,"kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'1',
                         "kdprovider":this.kdprovider
                  
                     }
                     
                     this.authService.simpandaftarrj(body)
                     .subscribe(response => {
                     
                     
                     
                       if(response ){
                         this.toastr.success('Berhasil'+response, 'Sukses', {
                           timeOut: 2000,
                         });
            
                         
                         let body={
                          "kdcabang":this.kdcabang,"isi":this.catatankon,"notransasal":this.notrans,"notrans":response,"kddokterasal":this.kddokter,
                          "kddokter":this.doktunjang,"stssimpan":'1'
                         }

                         this.authService.simpankonsulrj(body)
                         .subscribe(response => {
                     
                          this.catatankon='';
                          this.doktunjang='';
                          this.politunjang='';

                          this.tmpkonsul()
                          this.modalService.dismissAll()
                    
                     
                        })
                     
                     
                     
                       
                        }else{
                         this.toastr.error('Simpan  Gagal', 'Eror');
                       
                        }
                     
                     
                     
                     
                     
                     })
                  
                        }
                    
                    },
                      Error => {
                    
                       console.log(Error)
                      }
                    )
                  
                  
                  
                  
                  }

                  batalpriksa(notransaksi,norm,kddokter,kdpoli){
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                      },
                      buttonsStyling: false
                    });
                
                    swalWithBootstrapButtons.fire({
                      title: 'Hapus Transaksi?',
                      text: 'Yakin Akan Batal Priksa',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Hapus',
                      cancelButtonText: 'Batal',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.value) {
              
              
         
        
        let body ={
         "kdcabang":this.kdcabang,"notransaksi":notransaksi,"norm":norm,
         "kddokter":kddokter,"kdpoli":kdpoli,"kduser":this.username,"stssimpan":'1'
         }
         
        
        
         this.authService.hapustrx(body)
         .subscribe(response => {
         
         
         
           if(response ){
             this.toastr.success(''+response, '-', {
               timeOut: 2000,
             });
         
       
             let body={
              "kdcabang":this.kdcabang,"isi":this.catatankon,"notransasal":this.notrans,"notrans":notransaksi,"kddokterasal":this.kddokter,
              "kddokter":this.doktunjang,"stssimpan":'2'
             }

             this.authService.simpankonsulrj(body)
             .subscribe(response => {
         
          

              this.tmpkonsul()
            
        
         
            })
        
        
  
         
         
         
           
            }else{
             this.toastr.error('Simpan  Gagal', 'Eror');
           
            }
         
         
         
         
         
         })
              
              
                 
              
                       
              
                
                
                
                      } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        swalWithBootstrapButtons.fire(
                          'Cancelled',
                          'Your imaginary file is safe :)',
                          'error'
                        );
                      }
                    });
                   }

                   cetaklabview(){
                    var redirectWindow = window.open(this.URLINVOICE+'clenic/report/hasillabview.php?norm='+this.norm, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
                    redirectWindow.location;
                 }

                 lihathd(){
                  // this.monitoringshowcontenthd = true
               
                  // this.monitoringurlhd = this.domSanitizer.bypassSecurityTrustResourceUrl('https://fronttemprs.clenic.id/#/masuk/002000001/002000001/Wirahman/Wirahman Usman/Super Admin/002/12345');
                    

            
                 
                  // var redirectWindow = window.open('https://fronttemprs.clenic.id/#/masuk/'+this.notrans+'/'+this.norm+'/Wirahman/tes/Manajemen/002/12345', '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
                  // redirectWindow.location;

                  var redirectWindow = window.open('https://emrefamedika.clenicapp.com/frontend/#/masuk/'+this.notrans+'/'+this.norm+'/'+this.username+'/'+this.nama+'/'+this.akses+'/'+this.kdcabang+'/'+this.password, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
                  redirectWindow.location;

            

                }
                monitoringshowcontenthd:boolean;
                monitoringurlhd:any;
           
                jeniscppt:any='';
                tuliscppt(){
                

                  if(this.akses === 'Dokter'){
                    this.menulisa = true;

                  }else if(this.akses === 'Gizi'){
                    Swal.fire({
                      title: 'Menulis CPPT ?',
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: 'SOAP',
                      denyButtonText: `ADIME`,
                      
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                     
                        
                      if (result.isConfirmed) {
                        this.jeniscppt = 'SOAP';
                        
                      } else if (result.isDenied) {
                        this.jeniscppt = 'ADIME';

                      }
                      this.menulisa = true;
                      setTimeout(() => {
                        this.subjekfokus.nativeElement.focus()
    
                      }, 200);

                    })
                  
                    }else{
                    Swal.fire({
                      title: 'Menulis CPPT ?',
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: 'SOAP',
                      denyButtonText: `SBAR`,
                      
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                     
                      if (result.isConfirmed) {
                        this.jeniscppt = 'SOAP';
                        
                      } else if (result.isDenied) {
                        this.jeniscppt = 'SBAR';

                      }
                      this.menulisa = true;
                      setTimeout(() => {
                        this.subjekfokus.nativeElement.focus()
    
                      }, 200);

                    })
                  }

             
                 
                  }

              
                  hapuscppt(a){
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-success'
                      },
                      buttonsStyling: false
                    })
                    
                    swalWithBootstrapButtons.fire({
                      title: 'Hapus CPPT',
                      text: "Apakah Yakin Hapus CPPT",
                    
                      showCancelButton: true,
                      confirmButtonText: 'Hapus',
                      cancelButtonText: 'Batal',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                      
                 
                    this.progress = 0; // starts spinner
    
    
    
                    var dari :any;
                    
                    if(this.dariklik === 'dokter'){
                    dari = '0';
                    
                    }else{
                      dari = '1';
                      
                    }
                    
                    
                    
                     let body={"alergi":this.alergi,"dari":dari,"subjekp":this.subjekp,
                              "kdcabang":this.kdcabang,"kduser":this.kduser,"notrans":this.notrans,"norm":this.norm,"kdpoli":this.kdpoli,
                              "kddokter":this.kddokter,"stssimpan":'2',"subjek":this.subjek,"td":this.td,"bb":this.bb,"nadi":this.nadi,
                              "suhu":this.suhu,"rr":this.rr,"spo":this.spo,"pf":this.pf,"planing":this.plan,"tdd":this.tdd,"hr":this.hr,
                              "rwytp":this.rwtp,"gigi":this.gigi,"tb":this.tb,"hakakses":this.akses,"tglkontrol":this.myDatekon,"rencanatindakan":this.plankon,
                              "diagnosa":this.diagnosa,"tindakan":this.tindakanicd,"nomorcppt":this.nomorcpptangka,"insobat":this.tmpinarrayobat,"kdcppt":a,
                              "inspenunjang":this.labdetailray+'<br>'+this.raddetailray,"jeniscppt":this.jeniscppt
                            }
                    
                    
                            setTimeout(() => {
                              this.progress = 0.5; // sets progress bar to 50%
                    
                              this.authService.simpancpptri(body)
                              .subscribe(response => {
                              
                          setTimeout(() => {
                            
                      this.progress = 1; // sets progress bar to 100%
                    
                            if(response.metadata.code == 200 ){
                              this.toastr.success(''+response.metadata.message , 'Sukses', {
                                timeOut: 2000,
                              });
                      
                    
                              setTimeout(() => {
                                this.progress = false; // stops spinner
                    
                                this.lihatcppt()
                    
                    
                    
                                this.subjek = '';
                    this.td = ''
                    this.tdd =''
                    this.bb = '';
                    this.nadi = ''
                    this.suhu = ''
                    this.rr =''
                    this.hr = '';
                    this.spo ='';
                    this.pf = '';
                    this.plan = '';
                    this.alergi = '';
                    
                    this.diagnosa='';
                    this.tindakanicd='';
                    this.plankon ='';
                    
                    this.menulisa = false;
                    
                    
                    
                              }, 200);
                              
                        
                            
                             
                             }else{
                              this.toastr.error('Simpan  Gagal', 'Eror');
                            
                             }
                    
                    
                          }, 500);
                              
                            
                              
                              
                              
                              
                              
                              }
                              
                              )
                    
                    
                    
                            }, 400);
                    
                      } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                      
                      }
                    })
                  }


                  halaman:any;
                  halamanrm:boolean;

                  lihatbid(a){
                    this.halamanrm = true;

                    this.halaman = a;

                    
                  }
                  monitoringurlemrshow:boolean=false

                  lihatemr(){
                    this.monitoringurlemrshow = true
                
                   this.monitoringurlemr = this.domSanitizer.bypassSecurityTrustResourceUrl('https://fronttemprs.clenic.id/#/masuk/002000001/002000001/Wirahman/Wirahman Usman/Super Admin/002/12345');
                     
                 }
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
