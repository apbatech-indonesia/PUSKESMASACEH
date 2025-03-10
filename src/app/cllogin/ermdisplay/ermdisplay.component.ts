import { Component, ViewChild, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { WebsocketService } from "../../websocket.service";
// import { ChatService } from '../../chat.service';

import { io } from "socket.io-client";

@Component({
  selector: "app-ermdisplay",
  templateUrl: "./ermdisplay.component.html",

  providers: [WebsocketService],
})
export class ermdisplayComponent implements OnInit {
  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = "Master Customer";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  closeResult: string;

  kdparent = "";
  coa = "";
  kdcabang: any;
  username: any;
  tglp: String = new Date().toISOString();
  currentJustify = "start";
  currentJustify2 = "center";
  currentJustify3 = "start";

  currentOrientation = "horizontal";

  kduser: any;
  content = "";
  received = [];
  sent = [];
  urlposter: any;
  urlvidio: any;
  Nomor: string = "0";
  namadoker: string = "-";
  kddokter1: any;
  namadokter1: any;
  kolom1: any;
  public kdantrian: any;

  kddokter2: any;
  namadokter2: any;
  kolom2: any;

  kddokter3: any;
  namadokter3: any;
  kolom3: any;

  noantrian1: any;
  noantrian2: any;
  noantrian3: any;
  kdnoantrian1: any;
  kdnoantrian2: any;
  kdnoantrian3: any;
  newMessage = "";
  messageList: string[] = [];
  private socketx: any;
  public data: any;
  vidioid: any;
  videoId = "dQw4w9WgXcQ";
  constructor(
    // private chatService: ChatService,
    private WebsocketService: WebsocketService,

    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.username = this.userDetails.username;
    this.kduser = this.userDetails.kduser;

    const datax = JSON.parse(localStorage.getItem("dokterkolom1"));

    this.kddokter1 = datax.kddokter1;
    this.namadokter1 = datax.namadokter1;
    this.kolom1 = datax.kolom1;

    const datax2 = JSON.parse(localStorage.getItem("dokterkolom2"));

    this.kddokter2 = datax2.kddokter2;
    this.namadokter2 = datax2.namadokter2;
    this.kolom2 = datax2.kolom2;

    const datax3 = JSON.parse(localStorage.getItem("dokterkolom3"));

    this.kddokter3 = datax3.kddokter3;
    this.namadokter3 = datax3.namadokter3;
    this.kolom3 = datax3.kolom3;

    console.log(this.namadokter3);
    this.authService.klinikper(this.kdklinik).subscribe(
      (data) => {
        this.subheading = Array.prototype.map
          .call(data, (s) => s.nama)
          .toString();
        this.urlposter = Array.prototype.map
          .call(data, (s) => s.urlposter)
          .toString();
        this.urlvidio = Array.prototype.map
          .call(data, (s) => s.urlvideo)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.socketx = io("https://socketpkm.apbatech.com/");

    console.log(localStorage.getItem("urlsocket"));
    this.vidioid = localStorage.getItem("vidioid");
  }
  playerVars = {
    autoplay: 1,
    loop: 1,
    playlist: localStorage.getItem("vidioid"), // Required for loop to work, use the same video ID
  };

  sendMessage() {
    // this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';
  }
  pasienNotificationl(msg) {
    //  this.tmptotal()
  }

  // sendNotificationAntrian(kodeDokter)
  // {
  //   this.sent.push(kodeDokter);
  //   this.WebsocketService.messages.next(kodeDokter);
  // }

  rec: any;
  nampasien: any;
  nampoli: any;

  ngOnInit() {
    this.socketx.on("message", (data) => {
      this.data = data;

      const pesan = JSON.parse(data);

      var kddokter;
      var noantrian;
      var namdokter;
      var kdantrian;
      var nampoli;
      var namapasien;
      var kdcabang;
      var kdcabangasli = this.kdcabang;

      for (let x of pesan) {
        // console.log(x.namadokter)
        kddokter = x.kddokter;
        noantrian = x.antrian;
        namdokter = x.namadokter;
        kdantrian = x.kdantrian;
        nampoli = x.nampoli;
        namapasien = x.pasien;
        kdcabang = x.kdcabang;
      }
      const userData = JSON.parse(localStorage.getItem("userDatacl"));

      if ("Antrian" === userData["userData"]["hakakses"]) {
        console.log(kdcabangasli, kdcabang);
        if (kdcabangasli === kdcabang) {
          this.namadoker = namdokter;
          this.terbilangx(noantrian);

          this.Nomor = noantrian;

          this.kdantrian = kdantrian;
          this.nampasien = namapasien;
          this.nampoli = nampoli;

          // alert("as")
          let audiox = new Audio();
          audiox.src =
            "https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav";
          audiox.play();
          var indexl = 1;
          audiox.onended = function () {
            if (indexl < 2) {
              audiox.src =
                "https://knm.clenicapp.com/clenic/sound/" + kdantrian + ".wav";

              audiox.play();
              indexl++;
            }
          };
          // audiox.src='https://knm.clenicapp.com/clenic/sound/B.wav';
          // audiox.play();
        }

        //    if(kddokter === this.kddokter1){
        //     this.noantrian1 = noantrian
        //     this.kdnoantrian1 = kdantrian
        //     this.kdantrian = kdantrian
        //     this.nampasien = namapasien;
        //     this.nampoli = nampoli

        //     let audiox =new Audio();
        //     audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
        // audiox.play();
        // var indexl=1
        // audiox.onended = function() {
        // if(indexl < 2){
        // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
        // audiox.play();
        // indexl++;
        // }
        // }

        //    }else if(kddokter === this.kddokter2){

        // this.noantrian2 = noantrian
        // this.kdnoantrian2 = kdantrian
        // this.kdantrian = kdantrian
        // this.nampasien = namapasien;
        // this.nampoli = nampoli
        // let audiox =new Audio();
        // audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
        // audiox.play();
        // var indexl=1
        // audiox.onended = function() {
        // if(indexl < 2){
        // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
        // audiox.play();
        // indexl++;
        // }
        // }

        //    }else if(kddokter === this.kddokter3){

        //     this.noantrian3 = noantrian
        //     this.kdnoantrian3 = kdantrian
        //     this.kdantrian = kdantrian

        //     let audiox =new Audio();
        //     audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
        // audiox.play();
        // var indexl=1
        // audiox.onended = function() {
        // if(indexl < 2){
        // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
        // audiox.play();
        // indexl++;
        // }
        // }
        //              }
      }
    });

    //     this.WebsocketService.messages.subscribe(msg => {
    //       this.received.push(msg);
    //       // console.log("Ini hasil cetak di Angularxxxxxxxxxx");
    //       console.log("Ini nilai msg");
    //       // console.log(msg);
    //       // console.log("Ini nilai pesan");
    //       // console.log(msg['pesan']);

    //       console.log(msg)

    //       const pesan = JSON.parse(msg['pesan']);

    //       var kddokter
    //       var noantrian
    //       var namdokter
    //       var kdantrian;

    //       for(let x of pesan){
    //         // console.log(x.namadokter)
    //         kddokter = x.kddokter
    //         noantrian = x.antrian
    //         namdokter = x.namadokter
    //         kdantrian = x.kdantrian

    //       }
    //       const userData = JSON.parse(localStorage.getItem('userDatacl'));

    //   if('Antrian' === userData['userData']['hakakses']){
    //     this.namadoker = namdokter;
    //     this.terbilangx(noantrian)
    //     this.Nomor = noantrian;

    //      if(kddokter === this.kddokter1){
    //       this.noantrian1 = noantrian
    //       this.kdnoantrian1 = kdantrian
    //       this.kdantrian = kdantrian

    //       let audiox =new Audio();
    //       audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
    // audiox.play();
    // var indexl=1
    // audiox.onended = function() {
    // if(indexl < 2){
    // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
    // audiox.play();
    // indexl++;
    // }
    // }

    //      }else if(kddokter === this.kddokter2){

    // this.noantrian2 = noantrian
    // this.kdnoantrian2 = kdantrian
    // this.kdantrian = kdantrian

    // let audiox =new Audio();
    // audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
    // audiox.play();
    // var indexl=1
    // audiox.onended = function() {
    // if(indexl < 2){
    // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
    // audiox.play();
    // indexl++;
    // }
    // }

    //      }else if(kddokter === this.kddokter3){

    //       this.noantrian3 = noantrian
    //       this.kdnoantrian3 = kdantrian
    //       this.kdantrian = kdantrian

    //       let audiox =new Audio();
    //       audiox.src='https://knm.clenicapp.com/clenic/sound/NOMORANTRIAN.wav';
    // audiox.play();
    // var indexl=1
    // audiox.onended = function() {
    // if(indexl < 2){
    // audiox.src='https://knm.clenicapp.com/clenic/sound/' + kdantrian +'.wav';
    // audiox.play();
    // indexl++;
    // }
    // }
    //                }

    //   }

    //     });

    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.received.push(message);
    //   console.log(  this.received)

    // })

    // this.tmptotal()
  }
  totalpass: number = 0;
  totalpassbelum: number = 0;
  totalpasssudah: number = 0;
  tampilpas: any;

  //   tmptotal(){
  //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM','','2','')
  //     .subscribe(
  //       data => {
  // this.totalpass = data.length
  // this.tampilpas = data;

  //     },
  //       Error => {

  //        console.log(Error)
  //       }
  //     )

  //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM','','1','')
  //     .subscribe(
  //       data => {
  // this.totalpassbelum = data.length

  //     },
  //       Error => {

  //        console.log(Error)
  //       }
  //     )

  //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'SUDAH','','1','')
  //     .subscribe(
  //       data => {
  // this.totalpasssudah = data.length

  //     },
  //       Error => {

  //        console.log(Error)
  //       }
  //     )

  //   }

  //   cpasien(a){
  //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM',a.target.value,'2','')
  //     .subscribe(
  //       data => {

  // this.tampilpas = data;

  //     },
  //       Error => {

  //        console.log(Error)
  //       }
  //     )
  //   }

  norm: "";
  kdpoli: "";
  tglpriksa: "";
  kddokter: "";
  kdkostumerd: "";
  notransaksi: "";
  pasien: "";
  tgllahir: "";
  noantrian: "";

  namdokter: "";
  namacus: "";
  costumer: "";
  alamat: "";
  kdtarif: "";
  showdata: boolean;
  kelas: string;

  pilihpasien(
    norm,
    kdpoli,
    tglpriksa,
    kddokter,
    kdkostumerd,
    notransaksi,
    pasien,
    tgllahir,
    noantrian,
    nampoli,
    namdokter,
    nama,
    costumer,
    alamat,
    kdtarif,
    kelas
  ) {
    this.showdata = true;
    this.norm = norm;
    this.kdpoli = kdpoli;
    this.tglpriksa = tglpriksa;
    this.kddokter = kddokter;
    this.kdkostumerd = kdkostumerd;
    this.notransaksi = notransaksi;
    this.pasien = pasien;
    this.tgllahir = tgllahir;
    this.noantrian = noantrian;
    this.nampoli = nampoli;
    this.namdokter = namdokter;
    this.namacus = nama;
    this.costumer = costumer;
    this.alamat = alamat;
    this.kdtarif = kdtarif;
    this.kelas = kelas;
  }

  terbilangx(bilangan) {
    bilangan = String(bilangan);
    var angka = new Array(
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0"
    );
    var kata = new Array(
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan"
    );
    var tingkat = new Array("", "Ribu", "Juta", "Milyar", "Triliun");

    var panjang_bilangan = bilangan.length;

    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-i, 1);
    }

    var i = 1;
    var j = 0;
    var kaLimat = "";

    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
      var subkaLimat = "";
      var kata1 = "";
      var kata2 = "";
      var kata3 = "";

      /* untuk Ratusan */
      if (angka[i + 2] != "0") {
        if (angka[i + 2] == "1") {
          kata1 = "seratus";
        } else {
          kata1 = kata[angka[i + 2]] + " ratus";
        }
      }

      /* untuk Puluhan atau Belasan */
      if (angka[i + 1] != "0") {
        if (angka[i + 1] == "1") {
          if (angka[i] == "0") {
            kata2 = "sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "sebelas";
          } else {
            kata2 = kata[angka[i]] + " belas";
          }
        } else {
          kata2 = kata[angka[i + 1]] + " puluh";
        }
      }

      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i + 1] != "1") {
          kata3 = kata[angka[i]];
        }
      }

      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if (angka[i] != "0" || angka[i + 1] != "0" || angka[i + 2] != "0") {
        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
      }

      /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;
    }

    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if (angka[5] == "0" && angka[6] == "0") {
      kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
    }

    const sentence = kaLimat.replace(/\s+/g, " ").trim();
    this.ucap = sentence;

    console.log(kaLimat);
    this.lsdl();

    // return kaLimat + "Rupiah";
  }

  ucap: any;
  lsdl() {
    var kdantrian = this.kdantrian;

    setTimeout(() => {
      let audio = new Audio();
      let audiov = new Audio();

      var strings = this.ucap.split(" ");
      var index = 1;

      audio.src =
        "https://knm.clenicapp.com/clenic/sound/" + strings[0] + ".wav";
      audio.play();

      audio.onended = function () {
        if (index < strings.length) {
          audio.src =
            "https://knm.clenicapp.com/clenic/sound/" + strings[index] + ".wav";
          audio.play();
          index++;
        }
      };
    }, 1800);

    setTimeout(() => {
      let audiov = new Audio();
      var index = 1;
      var kdantrian = this.kdantrian;
      var strings = this.ucap.split(" ");
      audiov.src =
        "https://knm.clenicapp.com/clenic/sound/SILAHKANMENUJUKE.wav";
      audiov.play();
      audiov.onended = function () {
        if (index < 2) {
          audiov.src =
            "https://knm.clenicapp.com/clenic/sound/" + kdantrian + "U.wav";
          audiov.play();
          index++;
        }
      };
    }, 4000);
  }

  pglpoli() {
    let audiov = new Audio();
    var kdantrian = this.kdantrian;
    audiov.src = "https://knm.clenicapp.com/clenic/sound/SILAHKANMENUJUKE.wav";
    audiov.play();
    audiov.onended = function () {
      audiov.src =
        "https://knm.clenicapp.com/clenic/sound/" + kdantrian + "U.wav";
      audiov.play();
    };
  }
  showdoktersatu: boolean;
  showdokterdua: boolean;

  tdokter: any;

  caridokter(a) {
    if (a.target.value.length > 0) {
      this.showdoktersatu = true;
      this.authService
        .caridokter(this.kdcabang, a.target.value)
        .subscribe((data) => {
          this.tdokter = data;
        });
    } else {
      this.showdoktersatu = false;
    }
  }
  caridokterx(a) {
    if (a.target.value.length > 0) {
      this.showdokterdua = true;
      this.authService
        .caridokter(this.kdcabang, a.target.value)
        .subscribe((data) => {
          this.tdokter = data;
        });
    } else {
      this.showdokterdua = false;
    }
  }

  showdoktertiga: boolean;

  caridoktery(a) {
    if (a.target.value.length > 0) {
      this.showdoktertiga = true;
      this.authService
        .caridokter(this.kdcabang, a.target.value)
        .subscribe((data) => {
          this.tdokter = data;
        });
    } else {
      this.showdoktertiga = false;
    }
  }

  pilihdokter1(a, b, c) {
    localStorage.setItem(
      "dokterkolom1",
      JSON.stringify({
        kddokter1: a,
        namadokter1: b,
        kolom1: c,
      })
    );

    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("dokterkolom1"));

      this.kddokter1 = data.kddokter1;
      this.namadokter1 = data.namadokter1;
      this.kolom1 = data.kolom1;
    }, 200);

    this.showdoktersatu = false;
  }

  pilihdokter2(a, b, c) {
    localStorage.setItem(
      "dokterkolom2",
      JSON.stringify({
        kddokter2: a,
        namadokter2: b,
        kolom2: c,
      })
    );

    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("dokterkolom2"));

      this.kddokter2 = data.kddokter2;
      this.namadokter2 = data.namadokter2;
      this.kolom2 = data.kolom2;
    }, 200);

    this.showdokterdua = false;
  }

  ns(a) {
    localStorage.setItem(
      "dokterkolom3",
      JSON.stringify({
        kddokter3: "NS",
        namadokter3: "Nursetation",
        kolom3: "3",
      })
    );

    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("dokterkolom3"));

      this.kddokter3 = data.kddokter3;
      this.namadokter3 = data.namadokter3;
      this.kolom3 = data.kolom3;
    }, 200);

    this.showdoktertiga = false;
  }
  pilihdokter3(a, b, c) {
    localStorage.setItem(
      "dokterkolom3",
      JSON.stringify({
        kddokter3: a,
        namadokter3: b,
        kolom3: c,
      })
    );

    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("dokterkolom3"));

      this.kddokter3 = data.kddokter3;
      this.namadokter3 = data.namadokter3;
      this.kolom3 = data.kolom3;
    }, 200);

    this.showdoktertiga = false;
  }
}
