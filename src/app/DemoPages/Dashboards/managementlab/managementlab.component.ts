import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managementlab',
  templateUrl: './managementlab.component.html',
  styles: [],
  providers: [
    DatePipe
   
  ],
})
export class ManagementlabComponent implements OnInit {

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faDotCircle = faDotCircle;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  // <div class="font-icon-wrapper font-icon-lg"><i class="fa fa-gavel icon-gradient bg-happy-fisher"> </i></div>

  heading = 'Dashborad Management';
  subheading = 'Ini Adalah Dasboard Klinik';
  icon = 'lnr-magic-wand icon-gradient bg-mixed-hopes';

  public datasets = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

    }
  ];
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(58, 196, 125, 0.35)',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderColor: '#3ac47d',
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#3ac47d',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#3ac47d',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
    },
  ];

  // public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };
  public userDetails: any;
  nama:any;
  akses:any;
 
  kdklinik:any;
  kdcabang:any;
username:any;

nom:number;
tglpx = '2013-12-12'
myDate = new Date();
// tglp : String = new Date().toISOString();

constructor(public router : Router,private datepipe: DatePipe, private authService:ApiserviceService) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails=data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
this.kdklinik = this.userDetails.kdklinik;
this.kdcabang = this.userDetails.kdcabang;
this.username = this.userDetails.username; 
this.tglpx = this.datepipe.transform(this.myDate, 'yyyy-MM-dd')

setTimeout(() => {
  this.dash()
}, 200);

this.nom = 40; 

}

totalpenjualan:number=0;
  totalall:number=0;
  totalumum:number=0;
  totalasuransi:number=0;
  totalbpjs:number=0;
 
  dash(){
    this.authService.jumlahpasiendashboard(this.kdcabang,'ALL',this.tglpx)
  .subscribe(
    data => {
    
this.totalall = data.length

  },
    Error => {
  
     console.log(Error)
    }
  )



  this.authService.jumlahpasiendashboard(this.kdcabang,'UMUM',this.tglpx)
  .subscribe(
    data => {
    
this.totalumum = data.length

  },
    Error => {
  
     console.log(Error)
    }
  )


  this.authService.jumlahpasiendashboard(this.kdcabang,'ASURANSI',this.tglpx)
  .subscribe(
    data => {
    
this.totalasuransi = data.length

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.jumlahpasiendashboard(this.kdcabang,'BPJS',this.tglpx)
  .subscribe(
    data => {
    
this.totalbpjs = data.length

  },
    Error => {
  
     console.log(Error)
    }
  )

  this.authService.totalpenjualan(this.kdcabang,this.tglpx)
  .subscribe(
    data => {
    
// this.totalpenjualan = data

for(let x of data){
this.totalpenjualan = x.total
}

  },
    Error => {
  
     console.log(Error)
    }
  )



  this.authService.polipie(this.kdcabang,this.tglpx)
  .subscribe(
    data => {
    
this.tpoli = data

// this.listpol = Array.prototype.map.call(data,s=>s.nampoli).toString();

this.listpol = data.map(function(e) {
  return e.nampoli;
 })
 this.listtot = data.map(function(e) {
  return parseInt(e.ttl)
  
  ;
 })

// this.listpol = 
// for(let x of data){

//   this.listpol = x.nampoli;

//   console.log(this.listpol.toString)
// }

  },
    Error => {
  
     console.log(Error)
    }
  )


  this.authService.grafik(this.kdcabang)
  .subscribe(
    data => {
   this.tgl = data.map(function(e) {
  return e.tgl
  
  ;
 })

  },
    Error => {
  
     console.log(Error)
    }
  )


  this.authService.grafik(this.kdcabang)
  .subscribe(
    data => {
   this.tgl = data.map(function(e) {
  return e.tgl
  
  ;
 })

  },
    Error => {
  
     console.log(Error)
    }
  )



  
  this.authService.grafikbpjs(this.kdcabang,'ASURANSI')
  .subscribe(
    data => {




      

         this.bpjsvalue = data.map(function(e) {
  return e.jml;
 })


  },
    Error => {
  
     console.log(Error)
    }
  )



  this.authService.grafikbpjs(this.kdcabang,'UMUM')
  .subscribe(
    data => {




      

         this.umumvalue = data.map(function(e) {
  return e.jml;
 })


  },
    Error => {
  
     console.log(Error)
    }
  )




  this.authService.grafikbpjs(this.kdcabang,'BPJS')
  .subscribe(
    data => {




      

         this.bpjssvalue = data.map(function(e) {
  return e.jml;
 })


  },
    Error => {
  
     console.log(Error)
    }
  )



  }


  bpjsvalue:number;
  umumvalue:number;
  bpjssvalue:number;
  
  tgl:any;

listpol:any;
listtot:number;

  tpoli:any;

tdapat:any;


ktglrad(){
  console.log(this.tglpx)
  // this.dash()
  // this.pendapatan()
}

  pendapatan(){
    this.authService.pendapatanrjdepan(this.kdcabang,this.tglpx)
    .subscribe(
      data => {
      
  this.tdapat = data;
  
    },
      Error => {
    
       console.log(Error)
      }
    )
  }
  ngOnInit():void {
    // if (localStorage.getItem('userDatacl')) {




    //   if(this.akses === 'Dokter'){
    //     this.router.navigate(['/master/ermdokter']);


    //   }else if( this.akses === 'Laborat'){
    //     this.router.navigate(['/master/kasirlab']);


    //   }else if( this.akses === 'Radiologi'){
    //     this.router.navigate(['/master/kasirrad']);

    //   }else if( this.akses === 'farmasi'){
    //     this.router.navigate(['/master/kasirfarmasijual']);

    //   }else{
    //     this.router.navigate(['/dashboards/management']);

    //   }




    // }
    // else {
    //   this.router.navigate(['/masuk']);
      
    // }

  }

}
