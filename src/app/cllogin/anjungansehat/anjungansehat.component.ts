import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  FormControl,
} from "@angular/forms";
import { DatePipe, formatDate } from "@angular/common";
import { SampleService } from "src/app/services";
import Swal from "sweetalert2";
import {
  GlobalConfig,
  ToastrService,
  ToastContainerDirective,
  ToastNoAnimation,
} from "ngx-toastr";

import { Router } from "@angular/router";
import { FarmasijualService } from "src/app/clmaster/kasirfarmasijual/farmasijual.service";
@Component({
  selector: "app-anjungansehat",
  templateUrl: "./anjungansehat.component.html",
  styleUrls: [],
  providers: [DatePipe],
})
export class anjungansehatComponent implements OnInit {
  slideConfig2 = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  userData = { username: "", password: "" };
  resposeData: any;
  dataku: any;

  angForm: FormGroup;

  formGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  pin: string = "";
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;
  Username: "";
  password: "";
  namal: "";
  hakakses: "";
  kdcabang: any;
  myDate = new Date();
  hostName: string;
  URLINVOICE: string;
  tglp: any;
  constructor(
    public FarmasijualService: FarmasijualService,
    public hots: SampleService,
    private datepipe: DatePipe,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: ApiserviceService
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;

    this.tglp = this.datepipe.transform(this.myDate, "dd-MM-yyyy");

    console.log("tgl" + this.tglp);

    // this.angForm = this.fb.group({
    //   username :['',[Validators.required,Validators.minLength(1),Validators.email]],
    //   password : ['',Validators.required]
    // })
  }

  handleInput() {
    // if (pin === "clear") {
    //   this.pin = "";
    //   return;
    // }

    alert("dsa");

    // this.pin += pin;

    // console.log(this.pin)
  }
  slug: any;
  kdprov: any = "";
  ngOnInit(): void {
    this.hostName = this.hots.getHostname();

    this.URLINVOICE = "https://" + this.hostName + "/";
    // if (localStorage.getItem('userDatacl')) {
    //   this.router.navigate(['/dashboards/management']);
    // }
    // this.lg()
    // this.tmpil()
    this.tmppuser();
    // this.tmpan()
    this.pastdate();

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        for (let x of data) {
          this.slug = x.slug;
          this.kdprov = x.kdprov;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  passwordx: string = "";

  click(num) {
    this.passwordx += num;

    console.log(this.passwordx);
  }

  deletePass() {
    this.passwordx = "";
  }

  // handleValidSubmit() {
  //   console.log(this.formGroup.value);

  // }

  handleReset() {
    this.formGroup.reset();
  }

  tmpil() {
    this.authService.getall().subscribe(
      (data) => {
        this.dataku = data;

        //  this.common.closeLoading()
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  salah: any;

  lg() {
    this.authService.postData(this.formGroup.value, "login").then(
      (result) => {
        this.resposeData = result;

        // loader.present();

        if (this.resposeData.userData) {
          if (this.resposeData.userData.status === "0") {
            this.toastr.error(
              "User Ini Sudah Login Di browser Lain,Silahkan Keluar Login dulu pada browser sebelumnya",
              "Gagal Login",
              {
                timeOut: 2000,
              }
            );
          } else {
            this.toastr.success("Berhasil Login", "Sukses", {
              timeOut: 2000,
            });

            let body = {
              kdcabang: this.resposeData.userData.kdcabang,
              kduser: this.resposeData.userData.username,
              stssimpan: "1",
              status: "0",
            };

            this.authService.keluar(body).subscribe((response) => {});

            // if(this.akses === 'Dokter'){
            //   // this.router.navigate(['/master/ermdokter']);

            // }else if( this.akses === 'Laborat'){
            //   this.router.navigate(['/master/kasirlab']);

            // }else if( this.akses === 'Radiologi'){
            //   this.router.navigate(['/master/kasirrad']);

            // }else if( this.akses === 'farmasi'){
            //   this.router.navigate(['/master/kasirfarmasijual']);

            // }else{
            //   this.router.navigate(['/dashboards/management']);

            // }

            this.router.navigate(["/master/ermdokter"]);

            localStorage.setItem(
              "userDatacl",
              JSON.stringify(this.resposeData)
            );
          }
        } else {
          this.toastr.error("Username atau Password Salah", "Error");
        }
      },
      (err) => {
        //Connection failed message
        this.toastr.error("Username atau Password Salah", "Error");
      }
    );
  }

  nomorasuransi: string = "";

  enter(a: string) {
    this.nomorasuransi += a;

    console.log(this.nomorasuransi);

    // alert(a);
  }

  hapus() {
    this.nomorasuransi = this.nomorasuransi.slice(0, -1);
  }

  depanshow: boolean = true;
  bpjsshow: boolean;
  padshow: boolean;

  kbpjs() {
    this.depanshow = false;
    this.bpjsshow = true;
  }

  showpad() {
    this.padshow = true;
    this.showloading = false;
    this.showantrian = false;
  }
  showpadx() {
    this.padshow = false;
  }
  home() {
    this.depanshow = true;
    this.bpjsshow = false;
    this.nomorasuransi = "";
    this.kdpoli = "";
    this.kddokter = "";
    this.showantrian = false;
    this.showloading = false;

    this.pilihklinik("xxxxxxxxxx");
    this.padshow = false;
  }

  tklinik: any;
  kliniks: string = "";

  tmppuser() {
    this.authService.poliByStatussakit(this.kdcabang, "2").subscribe(
      (data) => {
        this.tklinik = data;

        // for(let x of data ){
        //   this.kliniks = x.kdpoli
        // }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tdokter: any;
  showloading: boolean = false;
  zeros: string = "";
  generateZeros(count: number): void {
    this.zeros = "0".repeat(count);
  }

  pilihklinik(a) {
    var noasuransiv;
    var jumlahkarakter = 13;
    var jumlahnol;
    var hasilkurang: number;
    if (this.nomorasuransi.length < 13) {
      // console.log(a.target.value.length)

      // console.log(jumlahkarakter - a.target.value.length)
      hasilkurang = jumlahkarakter - this.nomorasuransi.length;
      this.generateZeros(hasilkurang);

      this.nomorasuransi = this.zeros + "" + this.nomorasuransi;
      // this.noasuransi = noasuransiv;
    }

    this.showloading = true;
    this.authService.polibyid(this.kdcabang, a).subscribe((data) => {
      if (data.length) {
        for (let x of data) {
          this.kdpolibpjs = x.kdpolibpjs;
        }
        this.showloading = false;
        this.authService.dokterperpolix(this.kdcabang, a).subscribe(
          (data) => {
            this.tdokter = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
      } else {
        this.showloading = false;
      }
    });
  }
  kdpoli: string = "";
  kddokter: string = "";
  namabpjs: string;
  tglakhirberlaku: string;
  jeniskelas: string;
  jenispeserta: string;
  aktif: string;
  ketaktif: string;
  kdprovider: string;
  namaprovider: string;
  carinobpjs: string = "";

  showaktif: boolean;
  jk: string = "";
  tgllahir: any;
  noindetitas: string = "";
  nohp: string = "";
  norm: any;
  kdasuransi: any;
  kdkostumer: any;
  showantrian: boolean;
  notransaksi: any;
  min: any;
  minbpjs: any;

  pastdate() {
    var tdate: any = new Date();
    var date: any = tdate.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    var month: any = tdate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    var year: any = tdate.getFullYear();
    this.min = year + "-" + month + "-" + date;
    this.minbpjs = date + "-" + month + "-" + year;

    console.log(this.minbpjs);
  }
  jadwal: any = "";
  tantriand: any;
  noantraian: any = "";

  daftar() {
    var noasuransix: string;
    var statuscaripasien: string;
    var nomorcaripasien: string;
    this.showantrian = false;

    var nokartu: string;

    if (this.nomorasuransi.length <= 13) {
      noasuransix = "noka";
      statuscaripasien = "6";
      nomorcaripasien = this.nomorasuransi;
    } else if (this.nomorasuransi.length > 13) {
      noasuransix = "nik";
      statuscaripasien = "7";
      nomorcaripasien = this.nomorasuransi;
    } else {
      this.toastr.error("Nik/Nokartu salah", "Eror");
    }
    // this.FarmasijualService.cekjadwal(this.kddokter,this.kdpoli)
    // .subscribe(
    //   data => {

    //     this.jadwal = data[0].jadwal

    //   }
    // )

    console.log(this.nomorasuransi, noasuransix);

    this.showloading = true;

    this.authService.tmpbpjs(this.nomorasuransi, noasuransix).subscribe(
      (data) => {
        if (data) {
          console.log(data.metaData.code);
          if (data.metaData.code == 200) {
            this.showloading = false;
            this.namabpjs = data.response.nama;
            this.tglakhirberlaku = data.response.tglAkhirBerlaku;
            this.jeniskelas = data.response.jnsKelas.nama;
            this.jenispeserta = data.response.jnsPeserta.nama;
            this.aktif = data.response.aktif;
            this.ketaktif = data.response.ketAktif;
            this.kdprovider = data.response.kdProviderPst.kdProvider;
            this.namaprovider = data.response.kdProviderPst.nmProvider;
            this.jk = data.response.sex;
            nokartu = data.response.noKartu;

            this.tgllahir = data.response.tglLahir;

            this.noindetitas = data.response.noKTP;
            this.nohp = data.response.noHP;

            if (data.response.kdProviderPst.kdProvider != this.kdprov) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons
                .fire({
                  title: "Peserta Tidak Sesuai Faskes",
                  text:
                    "Faskes " +
                    data.response.kdProviderPst.nmProvider +
                    " Tidak sesuai faskes apakah yakin akan melanjutkan?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Ya",
                  cancelButtonText: "Batal",
                  reverseButtons: true,
                })
                .then((result) => {
                  if (result.value) {
                    if (this.ketaktif === "AKTIF") {
                      let body = {
                        data: {
                          kdProviderPeserta: this.kdprovider,
                          tglDaftar: this.tglp,
                          noKartu: nokartu,
                          kdPoli: this.kdpolibpjs,
                          keluhan: "sehat",
                          kunjSakit: false,
                          sistole: 0,
                          diastole: 0,
                          beratBadan: 0,
                          tinggiBadan: 0,
                          respRate: 0,
                          lingkarPerut: 0,
                          heartRate: 0,
                          rujukBalik: 0,
                          kdTkp: "10",
                        },
                      };

                      this.authService
                        .adddaftarpcarekunjungansehat(body)
                        .subscribe((response) => {
                          if (response) {
                            if (response.metaData.code == 201) {
                              let body = {
                                nokartu: nokartu,
                                stssimpan: "1",
                                nama: this.namabpjs,
                                kdpolibpjs: this.kdpolibpjs,
                                tgl: this.tglp,
                                nomor: response.response.message,
                              };

                              this.authService
                                .simpansehat(body)
                                .subscribe((response) => {});

                              this.toastr.success(
                                "Berhasil Kirim Kunjungan Sehat"
                              );
                              this.showantrian = true;
                              this.noantraian = response.response.message;

                              this.nomorasuransi = "";
                              this.kdpoli = "";
                              this.kddokter = "";

                              this.nomorasuransi = "";

                              this.showloading = false;
                            } else if (response.metaData.code == 412) {
                              this.toastr.error(
                                "Gagal terkirim kode provider tidak ada",
                                "Eror"
                              );

                              this.showloading = false;
                            }
                          } else {
                            this.toastr.error("Simpan  Gagal", "Eror");
                          }
                        });

                      //                 this.authService.pasien(this.kdcabang,statuscaripasien,nomorcaripasien)
                      //                 .subscribe(
                      //                   data => {

                      //                     if(data.length){

                      //                       for(let x of data){
                      //                         this.norm = x.norm;
                      //                         this.kdasuransi = x.kdasuransi;
                      //                         this.kdkostumer = x.kdkostumer;

                      //                       }

                      //                       let body ={
                      //                         "norm": this.norm,"pasien":this.namabpjs,"indetitas":'KTP',"noindetitas":this.noindetitas,"kduser":'ANJUNGAN',
                      //                         "hp":this.nohp,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kelas":'1',
                      //                            "tgldaftar":this.tglp,"kostumer":this.kdkostumer,"kdkostumer":this.kdasuransi,
                      //                            "noasuransi":nokartu,
                      //                            "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'13',
                      //                            "kdprovider":this.kdprovider

                      //                        }

                      //                        this.authService.simpandaftarrj(body)
                      //                        .subscribe(response => {

                      //                          if(response ){

                      //                           if(response.kode === 201){
                      //                             this.toastr.error(response.keterangan, 'Eror');

                      //                           }else{

                      //                             this.showantrian= true;

                      //                             this.notransaksi = response.notrans;

                      //                             // setTimeout(() => {
                      //                             //   this.tmpan()
                      //                             // }, 100);

                      //                             this.authService.pasienantrian(this.kdcabang,'2',this.notransaksi,'','')
                      //                             .subscribe(
                      //                               data => {

                      //                                 this.tantrian = data;

                      //                                 if(data.length){

                      //                                 for(let x of data){

                      //                                   this.kdpolibpjs = x.kdpolibpjs;
                      //                                 }

                      //                                 let body={"data" :{
                      //                                   "kdProviderPeserta": this.kdprovider,
                      //                                   "tglDaftar":this.tglp,
                      //                                   "noKartu": nokartu,
                      //                                   "kdPoli": this.kdpolibpjs,
                      //                                   "keluhan": 'sehat',
                      //                                   "kunjSakit": false,
                      //                                   "sistole": 0,
                      //                                   "diastole": 0,
                      //                                   "beratBadan": 0,
                      //                                   "tinggiBadan": 0,
                      //                                   "respRate": 0,
                      //                                   "lingkarPerut": 0,
                      //                                   "heartRate": 0,
                      //                                   "rujukBalik": 0,
                      //                                   "kdTkp": '10' }}

                      //                                   this.authService.simpanpcaredaftar(body).subscribe(response => {
                      //                                                 if(response ){

                      //                               if(response.metaData.code == 201){

                      //                               this.toastr.success('Berhasil Kirim PCare', '-', {
                      //                               timeOut: 2000,
                      //                               });

                      //                               let body={
                      //                               "notransaksi":this.notransaksi,"stssimpan":'1',"noantrian":response.response.message,
                      //                               "kdtkp":'10',"jeniskun":'true'
                      //                               }

                      //                               this.authService.updatepcare(body)
                      //                               .subscribe(response => {

                      //                               })

                      //                               }else if(response.metaData.code == 412){

                      //                               this.toastr.error('Gagal terkirim kode provider tidak ada', 'Eror');

                      //                               this.showloading = false;

                      //                               }

                      //                               }else{
                      //                               this.toastr.error('Simpan  Gagal', 'Eror');

                      //                               }

                      //                               })

                      //                                 // setTimeout(() => {
                      //                                 //   let bodyAddFktp = {
                      //                                 //   "nomorkartu": nokartu,
                      //                                 //   "nik": this.tantrian[0].nopengenal,
                      //                                 //   "nohp": this.tantrian[0].hp,
                      //                                 //   "kodepoli": this.kdpolibpjs,
                      //                                 //   "namapoli": this.tantrian[0].nampoli,
                      //                                 //   "norm": this.tantrian[0].norm,
                      //                                 //   "tanggalperiksa": this.tantrian[0].tglpriksa,
                      //                                 //   "kodedokter": parseInt(this.tantrian[0].kddokterbpjs),
                      //                                 //   "namadokter": this.tantrian[0].namdokter,
                      //                                 //   "jampraktek": this.jadwal,
                      //                                 //   "nomorantrean": this.tantrian[0].kodeantrian+'-'+this.tantrian[0].noantrian,
                      //                                 //   "angkaantrean": parseInt(this.tantrian[0].noantrian),
                      //                                 //   "keterangan": "daftar",
                      //                                 //   }

                      //                                 //   console.log(bodyAddFktp)
                      //                                 //   this.authService.addBpjsAntrian(bodyAddFktp,this.slug)
                      //                                 //   .subscribe(Response => {
                      //                                 //   if (Response) {

                      //                                 //   if(Response.data.code == 200){

                      //                                 //   this.toastr.success(Response.data.message, 'Sukses', {
                      //                                 //   timeOut: 2000,
                      //                                 //   });
                      //                                 //   setTimeout(() => {

                      //                                 //   }, 500);

                      //                                 //   }else{
                      //                                 //   this.toastr.error(Response.data.message, 'Error');

                      //                                 //   }

                      //                                 //   }
                      //                                 //   })

                      //                                 //   this.nomorasuransi =''
                      //                                 //   }, 500);

                      //                                 }

                      //                             },
                      //                               Error => {

                      //                                console.log(Error)
                      //                               }
                      //                             )

                      //                          this.toastr.success(response.notrans+response.keterangan, 'Sukses', {
                      //                              timeOut: 2000,
                      //                            });

                      //                           }

                      //                           }else{
                      //                            this.toastr.error('Simpan  Gagal', 'Eror');

                      //                           }

                      //                        })

                      //                     }else{

                      //                       console.log('tidak ada')

                      //   let body = {"nama" : this.namabpjs,"tlahir":'-',"jeniskelamin":this.jk,"tanggallahir":this.tgllahir,
                      //   "alamat":'X',"kodekel":'X',"identitas":'KTP',"noidentitas":this.noindetitas,"nohp":this.nohp,"agama":'TIDAK TAHU',"marital":'TIDAK TAHU',
                      // "pendidikan":'TIDAK TAHU',"perkerjaan":'TIDAK TAHU',"golda":'Tidak Tahu',"norm":'',"stssimpan":'13',"kdcabang":this.kdcabang,
                      // "kdklinik":this.kdklinik,"noasuransi":nokartu};

                      // this.authService.simpanpasbaru(body)
                      // .subscribe(response => {

                      //   if(response ){
                      //     this.toastr.success('Berhasil', 'Sukses', {
                      //       timeOut: 2000,
                      //     });

                      // this.norm = response.norm;
                      // this.kdasuransi = response.kdasuransi;
                      // this.kdkostumer = response.kdkostumer;

                      // let body ={
                      //   "norm": this.norm,"pasien":this.namabpjs,"indetitas":'KTP',"noindetitas":this.noindetitas,"kduser":'ANJUNGAN',
                      //   "hp":this.nohp,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kelas":'1',
                      //      "tgldaftar":this.tglp,"kostumer":this.kdkostumer,"kdkostumer":this.kdasuransi,"noasuransi":nokartu,
                      //      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'12',
                      //      "kdprovider":this.kdprovider

                      //  }

                      //  this.authService.simpandaftarrj(body)
                      //  .subscribe(response => {

                      //    if(response ){

                      //     if(response.kode === 201){
                      //       this.toastr.error(response.keterangan, 'Eror');

                      //     }else{

                      //                             this.showantrian= true;

                      //                             this.notransaksi = response.notrans;

                      //                             this.authService.pasienantrian(this.kdcabang,'2',this.notransaksi,'','')
                      //                             .subscribe(
                      //                               data => {

                      //                                 this.tantrian = data;

                      //                                 if(data.length){

                      //                                   for(let x of data){

                      //                                     this.kdpolibpjs = x.kdpolibpjs;
                      //                                   }

                      //                                 }

                      //                                 let body={"data" :{
                      //                                   "kdProviderPeserta": this.kdprovider,
                      //                                   "tglDaftar":this.tglp,
                      //                                   "noKartu": nokartu,
                      //                                   "kdPoli": this.kdpolibpjs,
                      //                                   "keluhan": 'sehat',
                      //                                   "kunjSakit": false,
                      //                                   "sistole": 0,
                      //                                   "diastole": 0,
                      //                                   "beratBadan": 0,
                      //                                   "tinggiBadan": 0,
                      //                                   "respRate": 0,
                      //                                   "lingkarPerut": 0,
                      //                                   "heartRate": 0,
                      //                                   "rujukBalik": 0,
                      //                                   "kdTkp": '10' }}

                      //                                   this.authService.simpanpcaredaftar(body).subscribe(response => {
                      //                                     if(response ){

                      //                                       if(response.metaData.code == 201){

                      //                                         let body={
                      //                                           "notransaksi":this.notransaksi,"stssimpan":'1',"noantrian":response.response.message
                      //                                         }

                      //                                            this.authService.updatepcare(body)
                      //                                            .subscribe(response => {

                      //                                            })

                      //                                         this.nomorasuransi=''

                      //                                         this.showloading = false;

                      //                                       }else if(response.metaData.code == 412){

                      //                                         this.toastr.error('Gagal terkirim kode provider tidak ada', 'Eror');

                      //                                         this.showloading = false;
                      //                                       }
                      //                                     }else{
                      //                                       this.toastr.error('Simpan  Gagal', 'Eror');

                      //                                      }

                      //                                     })

                      //                                 // setTimeout(() => {

                      //                                 //   let bodyAddFktp = {
                      //                                 //     "nomorkartu":nokartu,
                      //                                 //     "nik": this.tantrian[0].nopengenal,
                      //                                 //     "nohp": '086786655899',
                      //                                 //     "kodepoli": this.kdpolibpjs,
                      //                                 //     "namapoli": this.tantrian[0].nampoli,
                      //                                 //     "norm": this.tantrian[0].norm,
                      //                                 //     "tanggalperiksa": this.tantrian[0].tglpriksa,
                      //                                 //     "kodedokter": parseInt(this.tantrian[0].kddokterbpjs),
                      //                                 //     "namadokter": this.tantrian[0].namdokter,
                      //                                 //     "jampraktek": this.jadwal,
                      //                                 //     "nomorantrean": this.tantrian[0].kodeantrian+'-'+this.tantrian[0].noantrian,
                      //                                 //     "angkaantrean": parseInt(this.tantrian[0].noantrian),
                      //                                 //     "keterangan": "daftar",
                      //                                 //     }

                      //                                 //     console.log(bodyAddFktp)
                      //                                 //     this.authService.addBpjsAntrian(bodyAddFktp,this.slug)
                      //                                 //     .subscribe(Response => {
                      //                                 //     if (Response) {

                      //                                 //       if(Response.data.code == 200){

                      //                                 //         this.toastr.success(Response.data.message, 'Sukses', {
                      //                                 //           timeOut: 2000,
                      //                                 //         });

                      //                                 //         this.toastr.success("Silahakn menuju NS untuk di TTV", 'Sukses', {
                      //                                 //           timeOut: 2000,
                      //                                 //         });

                      //                                 //       }else{
                      //                                 //         this.toastr.error(Response.data.message, 'Error');

                      //                                 //       }

                      //                                 //     }
                      //                                 //     })

                      //                                 //     this.nomorasuransi ='';

                      //                                 //         }, 100);

                      //                             },
                      //                               Error => {

                      //                                console.log(Error)
                      //                               }
                      //                             )

                      //    this.toastr.success(response.notrans+response.keterangan, 'Sukses', {
                      //        timeOut: 2000,
                      //      });

                      //     }

                      //     }else{
                      //      this.toastr.error('Simpan  Gagal', 'Eror');

                      //     }

                      //  })

                      //    }else{
                      //     this.toastr.error('Simpan  Gagal', 'Eror');

                      //    }

                      // })

                      //                     }

                      //                 },
                      //                   Error => {

                      //                    console.log(Error)
                      //                   }
                      //                 )
                    } else {
                      this.showaktif = true;
                      this.toastr.error(
                        "STATUS KEPERSETAAN " + this.ketaktif,
                        "Eror"
                      );
                    }
                  } else if (
                    /* Read more about handling dismissals below */

                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    this.toastr.error("No Kartu tidak sesuai faskes");
                    return;

                    // swalWithBootstrapButtons.fire(
                    //   'Cancelled',
                    //   'Your imaginary file is safe :)',
                    //   'error'
                    // );
                  }
                });
            } else {
              if (this.ketaktif === "AKTIF") {
                let body = {
                  data: {
                    kdProviderPeserta: this.kdprovider,
                    tglDaftar: this.tglp,
                    noKartu: nokartu,
                    kdPoli: this.kdpolibpjs,
                    keluhan: "sehat",
                    kunjSakit: false,
                    sistole: 0,
                    diastole: 0,
                    beratBadan: 0,
                    tinggiBadan: 0,
                    respRate: 0,
                    lingkarPerut: 0,
                    heartRate: 0,
                    rujukBalik: 0,
                    kdTkp: "10",
                  },
                };

                this.authService
                  .adddaftarpcarekunjungansehat(body)
                  .subscribe((response) => {
                    if (response) {
                      if (response.metaData.code == 201) {
                        let body = {
                          nokartu: nokartu,
                          stssimpan: "1",
                          nama: this.namabpjs,
                          kdpolibpjs: this.kdpolibpjs,
                          tgl: this.tglp,
                          nomor: response.response.message,
                        };

                        this.authService
                          .simpansehat(body)
                          .subscribe((response) => {});

                        this.toastr.success("Berhasil Kirim Kunjungan Sehat");
                        this.showantrian = true;
                        this.noantraian = response.response.message;

                        this.nomorasuransi = "";
                        this.kdpoli = "";
                        this.kddokter = "";

                        this.nomorasuransi = "";

                        this.showloading = false;
                      } else if (response.metaData.code == 412) {
                        this.toastr.error(
                          "Gagal terkirim kode provider tidak ada",
                          "Eror"
                        );

                        this.showloading = false;
                      }
                    } else {
                      this.toastr.error("Simpan  Gagal", "Eror");
                    }
                  });

                //                 this.authService.pasien(this.kdcabang,statuscaripasien,nomorcaripasien)
                //                 .subscribe(
                //                   data => {

                //                     if(data.length){

                //                       for(let x of data){
                //                         this.norm = x.norm;
                //                         this.kdasuransi = x.kdasuransi;
                //                         this.kdkostumer = x.kdkostumer;

                //                       }

                //                       let body ={
                //                         "norm": this.norm,"pasien":this.namabpjs,"indetitas":'KTP',"noindetitas":this.noindetitas,"kduser":'ANJUNGAN',
                //                         "hp":this.nohp,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kelas":'1',
                //                            "tgldaftar":this.tglp,"kostumer":this.kdkostumer,"kdkostumer":this.kdasuransi,
                //                            "noasuransi":nokartu,
                //                            "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'13',
                //                            "kdprovider":this.kdprovider

                //                        }

                //                        this.authService.simpandaftarrj(body)
                //                        .subscribe(response => {

                //                          if(response ){

                //                           if(response.kode === 201){
                //                             this.toastr.error(response.keterangan, 'Eror');

                //                           }else{

                //                             this.showantrian= true;

                //                             this.notransaksi = response.notrans;

                //                             // setTimeout(() => {
                //                             //   this.tmpan()
                //                             // }, 100);

                //                             this.authService.pasienantrian(this.kdcabang,'2',this.notransaksi,'','')
                //                             .subscribe(
                //                               data => {

                //                                 this.tantrian = data;

                //                                 if(data.length){

                //                                 for(let x of data){

                //                                   this.kdpolibpjs = x.kdpolibpjs;
                //                                 }

                //                                 let body={"data" :{
                //                                   "kdProviderPeserta": this.kdprovider,
                //                                   "tglDaftar":this.tglp,
                //                                   "noKartu": nokartu,
                //                                   "kdPoli": this.kdpolibpjs,
                //                                   "keluhan": 'sehat',
                //                                   "kunjSakit": false,
                //                                   "sistole": 0,
                //                                   "diastole": 0,
                //                                   "beratBadan": 0,
                //                                   "tinggiBadan": 0,
                //                                   "respRate": 0,
                //                                   "lingkarPerut": 0,
                //                                   "heartRate": 0,
                //                                   "rujukBalik": 0,
                //                                   "kdTkp": '10' }}

                //                                   this.authService.simpanpcaredaftar(body).subscribe(response => {
                //                                                 if(response ){

                //                               if(response.metaData.code == 201){

                //                               this.toastr.success('Berhasil Kirim PCare', '-', {
                //                               timeOut: 2000,
                //                               });

                //                               let body={
                //                               "notransaksi":this.notransaksi,"stssimpan":'1',"noantrian":response.response.message,
                //                               "kdtkp":'10',"jeniskun":'true'
                //                               }

                //                               this.authService.updatepcare(body)
                //                               .subscribe(response => {

                //                               })

                //                               }else if(response.metaData.code == 412){

                //                               this.toastr.error('Gagal terkirim kode provider tidak ada', 'Eror');

                //                               this.showloading = false;

                //                               }

                //                               }else{
                //                               this.toastr.error('Simpan  Gagal', 'Eror');

                //                               }

                //                               })

                //                                 // setTimeout(() => {
                //                                 //   let bodyAddFktp = {
                //                                 //   "nomorkartu": nokartu,
                //                                 //   "nik": this.tantrian[0].nopengenal,
                //                                 //   "nohp": this.tantrian[0].hp,
                //                                 //   "kodepoli": this.kdpolibpjs,
                //                                 //   "namapoli": this.tantrian[0].nampoli,
                //                                 //   "norm": this.tantrian[0].norm,
                //                                 //   "tanggalperiksa": this.tantrian[0].tglpriksa,
                //                                 //   "kodedokter": parseInt(this.tantrian[0].kddokterbpjs),
                //                                 //   "namadokter": this.tantrian[0].namdokter,
                //                                 //   "jampraktek": this.jadwal,
                //                                 //   "nomorantrean": this.tantrian[0].kodeantrian+'-'+this.tantrian[0].noantrian,
                //                                 //   "angkaantrean": parseInt(this.tantrian[0].noantrian),
                //                                 //   "keterangan": "daftar",
                //                                 //   }

                //                                 //   console.log(bodyAddFktp)
                //                                 //   this.authService.addBpjsAntrian(bodyAddFktp,this.slug)
                //                                 //   .subscribe(Response => {
                //                                 //   if (Response) {

                //                                 //   if(Response.data.code == 200){

                //                                 //   this.toastr.success(Response.data.message, 'Sukses', {
                //                                 //   timeOut: 2000,
                //                                 //   });
                //                                 //   setTimeout(() => {

                //                                 //   }, 500);

                //                                 //   }else{
                //                                 //   this.toastr.error(Response.data.message, 'Error');

                //                                 //   }

                //                                 //   }
                //                                 //   })

                //                                 //   this.nomorasuransi =''
                //                                 //   }, 500);

                //                                 }

                //                             },
                //                               Error => {

                //                                console.log(Error)
                //                               }
                //                             )

                //                          this.toastr.success(response.notrans+response.keterangan, 'Sukses', {
                //                              timeOut: 2000,
                //                            });

                //                           }

                //                           }else{
                //                            this.toastr.error('Simpan  Gagal', 'Eror');

                //                           }

                //                        })

                //                     }else{

                //                       console.log('tidak ada')

                //   let body = {"nama" : this.namabpjs,"tlahir":'-',"jeniskelamin":this.jk,"tanggallahir":this.tgllahir,
                //   "alamat":'X',"kodekel":'X',"identitas":'KTP',"noidentitas":this.noindetitas,"nohp":this.nohp,"agama":'TIDAK TAHU',"marital":'TIDAK TAHU',
                // "pendidikan":'TIDAK TAHU',"perkerjaan":'TIDAK TAHU',"golda":'Tidak Tahu',"norm":'',"stssimpan":'13',"kdcabang":this.kdcabang,
                // "kdklinik":this.kdklinik,"noasuransi":nokartu};

                // this.authService.simpanpasbaru(body)
                // .subscribe(response => {

                //   if(response ){
                //     this.toastr.success('Berhasil', 'Sukses', {
                //       timeOut: 2000,
                //     });

                // this.norm = response.norm;
                // this.kdasuransi = response.kdasuransi;
                // this.kdkostumer = response.kdkostumer;

                // let body ={
                //   "norm": this.norm,"pasien":this.namabpjs,"indetitas":'KTP',"noindetitas":this.noindetitas,"kduser":'ANJUNGAN',
                //   "hp":this.nohp,"kdpoli":this.kdpoli,"kddokter":this.kddokter,"kelas":'1',
                //      "tgldaftar":this.tglp,"kostumer":this.kdkostumer,"kdkostumer":this.kdasuransi,"noasuransi":nokartu,
                //      "kdcabang":this.kdcabang,"kdklinik":this.kdklinik,"stssimpan":'12',
                //      "kdprovider":this.kdprovider

                //  }

                //  this.authService.simpandaftarrj(body)
                //  .subscribe(response => {

                //    if(response ){

                //     if(response.kode === 201){
                //       this.toastr.error(response.keterangan, 'Eror');

                //     }else{

                //                             this.showantrian= true;

                //                             this.notransaksi = response.notrans;

                //                             this.authService.pasienantrian(this.kdcabang,'2',this.notransaksi,'','')
                //                             .subscribe(
                //                               data => {

                //                                 this.tantrian = data;

                //                                 if(data.length){

                //                                   for(let x of data){

                //                                     this.kdpolibpjs = x.kdpolibpjs;
                //                                   }

                //                                 }

                //                                 let body={"data" :{
                //                                   "kdProviderPeserta": this.kdprovider,
                //                                   "tglDaftar":this.tglp,
                //                                   "noKartu": nokartu,
                //                                   "kdPoli": this.kdpolibpjs,
                //                                   "keluhan": 'sehat',
                //                                   "kunjSakit": false,
                //                                   "sistole": 0,
                //                                   "diastole": 0,
                //                                   "beratBadan": 0,
                //                                   "tinggiBadan": 0,
                //                                   "respRate": 0,
                //                                   "lingkarPerut": 0,
                //                                   "heartRate": 0,
                //                                   "rujukBalik": 0,
                //                                   "kdTkp": '10' }}

                //                                   this.authService.simpanpcaredaftar(body).subscribe(response => {
                //                                     if(response ){

                //                                       if(response.metaData.code == 201){

                //                                         let body={
                //                                           "notransaksi":this.notransaksi,"stssimpan":'1',"noantrian":response.response.message
                //                                         }

                //                                            this.authService.updatepcare(body)
                //                                            .subscribe(response => {

                //                                            })

                //                                         this.nomorasuransi=''

                //                                         this.showloading = false;

                //                                       }else if(response.metaData.code == 412){

                //                                         this.toastr.error('Gagal terkirim kode provider tidak ada', 'Eror');

                //                                         this.showloading = false;
                //                                       }
                //                                     }else{
                //                                       this.toastr.error('Simpan  Gagal', 'Eror');

                //                                      }

                //                                     })

                //                                 // setTimeout(() => {

                //                                 //   let bodyAddFktp = {
                //                                 //     "nomorkartu":nokartu,
                //                                 //     "nik": this.tantrian[0].nopengenal,
                //                                 //     "nohp": '086786655899',
                //                                 //     "kodepoli": this.kdpolibpjs,
                //                                 //     "namapoli": this.tantrian[0].nampoli,
                //                                 //     "norm": this.tantrian[0].norm,
                //                                 //     "tanggalperiksa": this.tantrian[0].tglpriksa,
                //                                 //     "kodedokter": parseInt(this.tantrian[0].kddokterbpjs),
                //                                 //     "namadokter": this.tantrian[0].namdokter,
                //                                 //     "jampraktek": this.jadwal,
                //                                 //     "nomorantrean": this.tantrian[0].kodeantrian+'-'+this.tantrian[0].noantrian,
                //                                 //     "angkaantrean": parseInt(this.tantrian[0].noantrian),
                //                                 //     "keterangan": "daftar",
                //                                 //     }

                //                                 //     console.log(bodyAddFktp)
                //                                 //     this.authService.addBpjsAntrian(bodyAddFktp,this.slug)
                //                                 //     .subscribe(Response => {
                //                                 //     if (Response) {

                //                                 //       if(Response.data.code == 200){

                //                                 //         this.toastr.success(Response.data.message, 'Sukses', {
                //                                 //           timeOut: 2000,
                //                                 //         });

                //                                 //         this.toastr.success("Silahakn menuju NS untuk di TTV", 'Sukses', {
                //                                 //           timeOut: 2000,
                //                                 //         });

                //                                 //       }else{
                //                                 //         this.toastr.error(Response.data.message, 'Error');

                //                                 //       }

                //                                 //     }
                //                                 //     })

                //                                 //     this.nomorasuransi ='';

                //                                 //         }, 100);

                //                             },
                //                               Error => {

                //                                console.log(Error)
                //                               }
                //                             )

                //    this.toastr.success(response.notrans+response.keterangan, 'Sukses', {
                //        timeOut: 2000,
                //      });

                //     }

                //     }else{
                //      this.toastr.error('Simpan  Gagal', 'Eror');

                //     }

                //  })

                //    }else{
                //     this.toastr.error('Simpan  Gagal', 'Eror');

                //    }

                // })

                //                     }

                //                 },
                //                   Error => {

                //                    console.log(Error)
                //                   }
                //                 )
              } else {
                this.showaktif = true;
                this.toastr.error(
                  "STATUS KEPERSETAAN " + this.ketaktif,
                  "Eror"
                );
              }
            }
          } else {
            this.toastr.error("Gagal Memuat Data BPJS", "Eror");
          }
        } else {
          this.toastr.error("Gagal Memuat Data BPJS", "Eror");
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  kbpjsn() {
    this.toastr.error(
      "SEDANG PENGEMBANGAN SILAHKAN DAFTAR DI BAGIAN PENDAFTARAAN",
      "Eror"
    );
  }

  tantrian: any;
  kdpolibpjs: any;

  tmpan() {
    this.authService
      .pasienantrian(this.kdcabang, "2", this.notransaksi, "", "")
      .subscribe(
        (data) => {
          this.tantrian = data;

          for (let x of data) {
            this.kdpolibpjs = x.kdpolibpjs;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  cetaknoantrian(notransaksi) {
    this.showantrian = false;

    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/cetakantrian.php?kdcabang=" +
        this.kdcabang +
        "&notransaksi=" +
        notransaksi,
      "_blank",
      "location=no,toolbar=no,height=570,width=500,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
    this.home();
    this.nomorasuransi = "";
    this.kdpoli = "";
    this.kddokter = "";
  }

  batal(noKartu, tglDaftar, noUrut, kdPoli) {
    console.log(noKartu, tglDaftar, noUrut, kdPoli);
  }
}
