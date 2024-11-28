import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, skipWhile, tap } from "rxjs/operators";
import { TreeNode } from "primeng/api";
import { environment } from "src/environments/environment";

let apiurl = localStorage.getItem("baseUrl");
let apiurx = localStorage.getItem("baseUrx");
// let apiurx ='https://tabaro.clenicapp.com/clenicv2/';

let apidaftar = localStorage.getItem("baseUrlDaftar");

// let apidaftar = 'https://tabaro.clenicapp.com/clenicv2/master/';

let pcareUrl = localStorage.getItem("pcareUrl");
let satusehat = "https://satusehat.clenicapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class ApiserviceService {
  constructor(public http: HttpClient) {
    if (environment.baseUrl === null) environment.baseUrl = apiurl;
    environment.rawatJalanUrl = localStorage.getItem("urlRawatJalan");
    environment.socketUrl = localStorage.getItem("socketBaseUrl");
    environment.subDomainName = localStorage.getItem("subDomain");
    environment.pcareUrl = localStorage.getItem("pcareUrl");

    // LOGGING
    console.log(
      "Is Production : " +
        environment.production +
        " Envi name : " +
        environment.name
    );
    console.log("Base urx : " + apiurx);
    console.log("Base url : " + environment.baseUrl);
    console.log("Base url pcare : " + environment.pcareUrl);
    console.log("Base url socket : " + environment.socketUrl);
    console.log("Base url rawat jalan : " + environment.rawatJalanUrl);
  }

  setBaseUrlConfig(subDomain) {
    environment.subDomainName = subDomain;
    environment.baseUrl = environment.production
      ? "https://" + environment.subDomainName + ".clenicapp.com/clenic/"
      : environment.baseUrl;
    apiurx = environment.baseUrl;
    apiurl = environment.baseUrl + environment.apiPath;
    apidaftar = environment.baseUrl + environment.masterPath;

    let rawatJalanUrl =
      environment.emrUrl +
      environment.apiPath +
      environment.subDomainName +
      environment.rawatJalanPath;
    let socketUrl =
      "https://socket" + environment.subDomainName + ".clenicapp.com";
    let pcareUrl =
      environment.emrUrl + environment.apiPath + environment.subDomainName;
    console.log("Base url pcare set config : " + pcareUrl);
    localStorage.setItem("subDomain", subDomain);
    localStorage.setItem("baseUrl", apiurl);
    localStorage.setItem("baseUrx", apiurx);
    localStorage.setItem("baseUrlDaftar", apidaftar);
    localStorage.setItem("socketBaseUrl", socketUrl);
    localStorage.setItem("pcareUrl", pcareUrl);
    if (localStorage.getItem("urlRawatJalan") !== null)
      localStorage.removeItem("urlRawatJalan");
    localStorage.setItem("urlRawatJalan", rawatJalanUrl);
  }

  // antrean
  addBpjsAntrian(data: Object, a): Observable<any> {
    return this.http.post(
      "https://emr.clenicapp.com/api/" +
        a +
        environment.antrianFktpPath +
        "add",
      data
    );
  }

  cancelBpjsAntrian(data: Object, a): Observable<any> {
    return this.http.post(
      "https://emr.clenicapp.com/api/" +
        a +
        environment.antrianFktpPath +
        "batal",
      data
    );
  }
  PanggilBpjsAntrian(data: any, a): Observable<any> {
    return this.http.post(
      "https://emr.clenicapp.com/api/" +
        a +
        environment.antrianFktpPath +
        "panggil",
      data
    );
  }

  //

  getBaseUrlConfig(branchCode: string): Observable<any> {
    let dataProd = this.http.get(
      environment.emrUrl + environment.cabangPath + branchCode
    );
    return dataProd;
  }

  getAllDataKajianAwal(noRm: string): Observable<Object> {
    return this.http.get(environment.rawatJalanUrl + "/" + noRm);
  }

  getDetailDataKajianAwal(noRm, noTransaksi): Observable<Object> {
    return this.http.get(
      environment.rawatJalanUrl + "/" + noRm + "/" + noTransaksi
    );
  }

  simpanDataKajianAwal(data: Object): Observable<Object> {
    return this.http.post(environment.rawatJalanUrl + "/create", data);
  }

  perbaharuiDataKajianAwal(data: Object): Observable<Object> {
    return this.http.post(environment.rawatJalanUrl + "/update", data);
  }

  getAllBpjsClub(clubCode: string) {
    return this.http.get(
      environment.pcareUrl +
        environment.pcareKelompokPath +
        "/get-club/" +
        clubCode
    );
  }

  getAllBpjsKegiatan(date: string) {
    return this.http.get(
      environment.pcareUrl +
        environment.pcareKelompokPath +
        "/get-kegiatan/" +
        date
    );
  }

  getAllBpjsPesertaKegiatan(eduID: string) {
    return this.http.get(
      environment.pcareUrl +
        environment.pcareKelompokPath +
        "/get-peserta/" +
        eduID
    );
  }

  getAllBpjsKegiatanDropdown() {
    return this.http.get(
      environment.pcareUrl + environment.pcareKelompokPath + "/get-drop-down"
    );
  }

  deleteBpjsKegiatan(eduID: string) {
    return this.http.delete(
      environment.pcareUrl +
        environment.pcareKelompokPath +
        "/delete-kegiatan/" +
        eduID
    );
  }

  deleteBpjsPesertaKegiatan(eduID: string, noKartu: string) {
    return this.http.delete(
      environment.pcareUrl +
        environment.pcareKelompokPath +
        "/delete-peserta/" +
        eduID +
        "/" +
        noKartu
    );
  }

  addBpjsKegiatan(data: Object): Observable<Object> {
    return this.http.post(
      environment.pcareUrl + environment.pcareKelompokPath + "/add-kegiatan",
      data
    );
  }

  addBpjsPesertaKegiatan(data: Object): Observable<Object> {
    return this.http.post(
      environment.pcareUrl + environment.pcareKelompokPath + "/add-peserta",
      data
    );
  }

  getBpjsMCUAllPasien(nama: string = "", tglPeriksa: string = "") {
    if (nama !== "" || tglPeriksa !== "")
      return this.http.get(
        environment.pcareUrl +
          environment.pcareMcuPath +
          "/pasien?nama=" +
          nama +
          "&tglperiksa=" +
          tglPeriksa
      );
    else
      return this.http.get(
        environment.pcareUrl + environment.pcareMcuPath + "/pasien"
      );
  }

  getBpjsMCUPasienDetail(noTransaksi: string = "") {
    return this.http.get(
      environment.pcareUrl + environment.pcareMcuPath + "/pasien/" + noTransaksi
    );
  }

  getBpjsMCU(noKunjungan: string = "") {
    return this.http.get(
      environment.pcareUrl +
        environment.pcareMcuPath +
        "/kunjungan/" +
        noKunjungan
    );
  }

  addBpjsMCU(data: Object): Observable<Object> {
    return this.http.post(
      environment.pcareUrl + environment.pcareMcuPath,
      data
    );
  }

  updateBpjsMCU(data: Object): Observable<Object> {
    return this.http.put(environment.pcareUrl + environment.pcareMcuPath, data);
  }

  deleteBpjsMCU(kodeMCU, noKunjungan) {
    return this.http.delete(
      environment.pcareUrl +
        environment.pcareMcuPath +
        "/" +
        kodeMCU +
        "/kunjungan/" +
        noKunjungan
    );
  }

  getBpjsAllObat(noKunjungan: string = "") {
    return this.http.get(
      environment.pcareUrl +
        environment.pcareObatPath +
        "/kunjungan/" +
        noKunjungan
    );
  }

  addBpjsObat(data: Object): Observable<Object> {
    return this.http.post(
      environment.pcareUrl + environment.pcareObatPath + "/kunjungan",
      data
    );
  }

  deleteBpjsObat(kodeObat: string = "", noKunjungan: string = "") {
    return this.http.delete(
      environment.pcareUrl +
        environment.pcareObatPath +
        "/" +
        kodeObat +
        "/kunjungan/" +
        noKunjungan
    );
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      // let headers = new Headers();
      this.http.post(apiurl + type, JSON.stringify(credentials)).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getall(): Observable<any> {
    return this.http.get("https://clenicapp.com/ermkopi/ruang.php");
  }

  // MASTER
  klinikper(a): Observable<any> {
    return this.http.get(apiurx + "master/klinik.php?kdklinik=" + a);
  }

  listtariftree(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listtariftree.php?kdcabang=" +
        a +
        "&status=" +
        b +
        "&kdtarif=" +
        c
    );
  }

  listcoa(a): Observable<any> {
    return this.http.get(apiurx + "master/listcoa.php?kdcabang=" + a);
  }

  listtariftreelabrad(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listtariftreelabrad.php?kdcabang=" +
        a +
        "&status=" +
        b +
        "&kdtarif=" +
        c
    );
  }

  diagnosa(): Observable<any> {
    return this.http.get(apiurx + "master/diagnosa.php");
  }

  tindakan(): Observable<any> {
    return this.http.get(apiurx + "master/tindakan.php");
  }

  coa(a): Observable<any> {
    return this.http.get(apiurx + "master/coa.php?kdcabang=" + a);
  }

  coaper(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/coaper.php?kdakun=" + a + "&kdcabang=" + b
    );
  }

  gudang(a): Observable<any> {
    return this.http.get(apiurx + "master/gudang.php?kdklinik=" + a);
  }
  gudangcab(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/gudangcab.php?kdklinik=" + a + "&kdcabang=" + b
    );
  }
  carigudang(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/carigudang.php?kdklinik=" + a + "&nama=" + b
    );
  }

  cabangper(a): Observable<any> {
    return this.http.get(apiurx + "master/cabang.php?kdklinik=" + a);
  }
  jadwaldokter(a): Observable<any> {
    return this.http.get(apiurx + "master/jadwaldokter.php?kdcabang=" + a);
  }
  cabangbyid(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/cabangbyid.php?kdklinik=" + a + "&kdcabang=" + b
    );
  }

  caricabang(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/caricabang.php?kdklinik=" + a + "&nama=" + b
    );
  }
  tampiluser(a): Observable<any> {
    return this.http.get(apiurx + "master/tampiluser.php?kdklinik=" + a);
  }

  cariuser(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/cariuser.php?kdklinik=" + a + "&nama=" + b
    );
  }
  caricoa(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/caricoa.php?kdcabang=" +
        a +
        "&coa=" +
        b +
        "&sts=" +
        c +
        "&parent=" +
        d
    );
  }
  caridiagnosa(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/caridiagnosa.php?diagnosa=" + a + "&sts=" + b
    );
  }

  caritindakan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/caritindakan.php?tindakan=" + a + "&sts=" + b
    );
  }

  poli(a): Observable<any> {
    return this.http.get(apiurx + "master/poliklinik.php?kdcabang=" + a);
  }

  caripoli(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/caripoli.php?kdcabang=" + a + "&nampoli=" + b
    );
  }

  rakobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/rakobat.php?kdcabang=" + a + "&namarak=" + b
    );
  }

  carigolobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/carigolobat.php?dari=" + a + "&nama=" + b
    );
  }

  carisuplier(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/carisuplier.php?dari=" +
        a +
        "&nama=" +
        b +
        "&kdcabang=" +
        c
    );
  }

  rekening(a): Observable<any> {
    return this.http.get(apiurx + "master/rekening.php?kdcabang=" + a);
  }
  promo(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/tampilpromo.php?kdcabang=" + a + "&judulpromo=" + b
    );
  }
  dokter(a): Observable<any> {
    return this.http.get(apiurx + "master/dokter.php?kdcabang=" + a);
  }
  perawat(a): Observable<any> {
    return this.http.get(apiurx + "master/perawat.php?kdcabang=" + a);
  }

  doktertunjang(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/doktertunjang.php?kdcabang=" + a + "&sts=" + b
    );
  }

  dokterperpoli(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/dokterperpoli.php?kdcabang=" + a + "&kddokter=" + b
    );
  }
  profil(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/profil.php?kdcabang=" + a + "&kddokter=" + b
    );
  }
  ulasan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/ulasan.php?kdcabang=" + a + "&kddokter=" + b
    );
  }
  dokterperpolix(a, kdpoli): Observable<any> {
    return this.http.get(
      apiurx + "master/dokterperpolix.php?kdcabang=" + a + "&kdpoli=" + kdpoli
    );
  }

  caridokter(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/caridokter.php?kdcabang=" + a + "&dokter=" + b
    );
  }
  carirekening(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/carirekening.php?kdcabang=" + a + "&akun=" + b
    );
  }

  simpanuser(
    Username,
    password,
    namal,
    hakakses,
    kdcb,
    kdklinik,
    stssimpan,
    kduser
  ) {
    let url = apiurx + "master/simpanuser.php";
    let param = {
      username: Username,
      password: password,
      nama: namal,
      hakakses: hakakses,
      kdcabang: kdcb,
      kdklinik: kdklinik,
      stssimpan: stssimpan,
      kduserlogin: kduser,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanuserx(username, kddokter, kdcabang, kdklinik, stssimpan) {
    let url = apiurx + "master/simpanuser.php";
    let param = {
      username: username,
      kddokter: kddokter,
      kdcabang: kdcabang,
      kdklinik: kdklinik,
      stssimpan: stssimpan,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  deleteuser(kduser, username, kdcabang) {
    let url = apiurx + "master/deleteuser.php";
    let param = { kduser: kduser, username: username, kdcabang: kdcabang };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpancabang(cabang, alamat, hp, kdcabang, sts, kdklinik) {
    let url = apiurx + "master/simpancabang.php";
    let param = {
      kdklinik: kdklinik,
      nama: cabang,
      alamat: alamat,
      hp: hp,
      kdcabang: kdcabang,
      stssimpan: sts,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpangudang(kdgudang, gudang, kdklinik, kdcabang, sts, hakakses) {
    let url = apiurx + "master/simpangudang.php";
    let param = {
      kdgudang: kdgudang,
      gudang: gudang,
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      hakakses: hakakses,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanpoli(kdklinik, kdcabang, kdpoli, nampoli, sts, hakakses, polibpjs) {
    let url = apiurx + "master/simpanpoli.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      kdpoli: kdpoli,
      poli: nampoli,
      hakakses: hakakses,
      polibpjs: polibpjs,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  nocoa(kdklinik, kdcabang, kdcoa, namacoa) {
    let url = apiurx + "master/nocoa.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      kdcoa: kdcoa,
      namacoa: namacoa,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }
  deletecoa(kdcabang, kdcoa) {
    let url = apiurx + "master/deletecoa.php";
    let param = { kdcabang: kdcabang, kdcoa: kdcoa };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  editcoa(kdklinik, kdcabang, kdcoa, namacoa, stssimpan) {
    let url = apiurx + "master/editcoa.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      kdcoa: kdcoa,
      namacoa: namacoa,
      stssimpan: stssimpan,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  // this.kdklinik,this.kdcabang,this.namarekening,this.norekening,this.norekeningl,this.kdcoarek,'1'

  simpanrekening(
    kdklinik,
    kdcabang,
    namarekening,
    norekening,
    norekeningl,
    kdcoarek,
    sts
  ) {
    let url = apiurx + "master/simpanrekening.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      kdcoa: kdcoarek,
      namarekening: namarekening,
      norekening: norekening,
      norekeningl: norekeningl,
      stssimpan: sts,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpandokter(
    nik,
    kdklinik,
    kdcabang,
    namadokter,
    online,
    kddokter,
    sts,
    aktif,
    sn,
    kddokterbpjs
  ) {
    let url = apiurx + "master/simpandokter.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      kddokterbpjs: kddokterbpjs,
      dokter: namadokter,
      online: online,
      kddokter: kddokter,
      aktif: aktif,
      sn: sn,
      nik: nik,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpandokterpoli(kdklinik, kdcabang, kddokter, kdpoli, sts) {
    let url = apiurx + "master/simpandokterpoli.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      kdpoli: kdpoli,
      kddokter: kddokter,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpranrak(kdcabang, kdklinik, inrak, kdrak, sts) {
    let url = apiurx + "master/simpanrak.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      namarak: inrak,
      kdrak: kdrak,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpansuplier(kdcabang, kdklinik, insup, inalamat, inhp, kdsup, sts) {
    let url = apiurx + "master/simpansuplier.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      nama: insup,
      alamat: inalamat,
      hp: inhp,
      kdsup: kdsup,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanpabrikan(kdcabang, kdklinik, insup, inalamat, inhp, kdpabrikan, sts) {
    let url = apiurx + "master/simpanpabrikan.php";
    let param = {
      kdklinik: kdklinik,
      kdcabang: kdcabang,
      stssimpan: sts,
      nama: insup,
      alamat: inalamat,
      hp: inhp,
      kdpabrikan: kdpabrikan,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpangmb(kdcabang, notrans, file) {
    let url = apiurx + "transaksi/simpangmb.php";
    let param = { kdcabang: kdcabang, notrans: notrans, file: file };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpangmbu(kdcabang, notrans, file) {
    let url = apiurx + "transaksi/uploadimage.php";
    let param = { kdcabang: kdcabang, notrans: notrans, file: file };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanuploadlab(kdcabang, notrans, file, norm, keterangan) {
    let url = apiurx + "transaksi/simpanuploadlab.php";
    let param = {
      kdcabang: kdcabang,
      notrans: notrans,
      file: file,
      norm: norm,
      keterangan: keterangan,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }
  simpanuploadrad(kdcabang, notrans, file, norm, keterangan) {
    let url = apiurx + "transaksi/simpanuploadrad.php";
    let param = {
      kdcabang: kdcabang,
      notrans: notrans,
      file: file,
      norm: norm,
      keterangan: keterangan,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanprofildokter(
    kdcabang,
    kddokter,
    sp,
    lulusan,
    diskripsi,
    pengalaman,
    file
  ) {
    let url = apiurx + "transaksi/simpanprofildokter.php";
    let param = {
      kdcabang: kdcabang,
      kddokter: kddokter,
      sp: sp,
      lulusan: lulusan,
      diskripsi: diskripsi,
      pengalaman: pengalaman,
      file: file,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanpromo(
    kdcabang,
    sp,
    diskripsi,
    statusaktif,
    stssimpan,
    file,
    kdklinik,
    kdpromo,
    showkkk
  ) {
    let url = apiurx + "transaksi/simpanpromo.php";
    let param = {
      kdcabang: kdcabang,
      sp: sp,
      diskripsi: diskripsi,
      kdklinik: kdklinik,
      file: file,
      statusaktif: statusaktif,
      stssimpan: stssimpan,
      kdpromo: kdpromo,
      showkkk: showkkk,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  simpanberita(sp, htmlContent, statusaktif, stssimpan, imageSrc, kdberita) {
    let url = apiurx + "transaksi/simpanberita.php";
    let param = {
      sp: sp,
      isi: htmlContent,
      katagori: statusaktif,
      file: imageSrc,
      stssimpan: stssimpan,
      kdberita: kdberita,
    };
    let request = this.http.post(url, param);
    return request.toPromise();
  }

  // simpandaftarrj(norm,pasienin,indetitas,noindetitas,hp,kliniks,dokter,kloter,
  //   tglp,cusi,cusid,noasuransi){

  //   let url = apidaftar+'simpandaftarrj.php';
  //   let param = {norm:norm,pasienin:pasienin,indetitas:indetitas,noindetitas:noindetitas,hp:hp,
  //     kliniks:kliniks,dokter:dokter,kloter:kloter,
  //     tglp:tglp,cusi:cusi,cusid:cusid,noasuransi:noasuransi};
  //   let request = this.http.post(url,param);
  //   return request.toPromise();

  // }

  ANTRIANDEPA(): Observable<any> {
    return this.http.get(apidaftar + "ANTRIANDEPA.php");
  }

  propinsi(a): Observable<any> {
    return this.http.get(apidaftar + "propinsi.php?nama=" + a);
  }
  kabupaten(a, nama): Observable<any> {
    return this.http.get(
      apidaftar + "kabupaten.php?kdprop=" + a + "&nama=" + nama
    );
  }

  kecamatan(a, nama): Observable<any> {
    return this.http.get(
      apidaftar + "kecamatan.php?kdkab=" + a + "&nama=" + nama
    );
  }

  keluarahan(a, nama): Observable<any> {
    return this.http.get(
      apidaftar + "keluarahan.php?kdkec=" + a + "&nama=" + nama
    );
  }
  klinikperdokter(a): Observable<any> {
    return this.http.get(apidaftar + "klinikperdokter.php?kdklinik=" + a);
  }

  klinik(): Observable<any> {
    return this.http.get(apidaftar + "klinik.php");
  }

  cus(): Observable<any> {
    return this.http.get(apidaftar + "cus.php");
  }

  cusid(a): Observable<any> {
    return this.http.get(apidaftar + "cusd.php?cusid=" + a);
  }

  caripasienful(a): Observable<any> {
    return this.http.get(apidaftar + "caripasienful.php?pasien=" + a);
  }
  caripasiennorm(a): Observable<any> {
    return this.http.get(apidaftar + "caripasiennorm.php?norm=" + a);
  }

  kloter(a, b): Observable<any> {
    return this.http.get(
      apidaftar + "kloter.php?kdklinik=" + a + "&kddokter=" + b
    );
  }

  lihatnoantrian(a): Observable<any> {
    return this.http.get(apidaftar + "lihatnoantrian.php?notrans=" + a);
  }

  caripasienrjbpjs(a): Observable<any> {
    return this.http.get(apidaftar + "caripasienrjbpjs.php?pasien=" + a);
  }

  // panggil(notrans, no) {
  //   return this.http.get('https://clenicapp.com/rjx/ws_antrianbpjs/kirimantrian.php?notrans=' + notrans + '&nomorreferensi=' + no)

  // }

  waktuTunggucb1(notrans, no, norm) {
    return this.http.get(
      "https://clenicapp.com/rjx/ws_antrianbpjs/waktuTunggucb1.php?notrans=" +
        notrans +
        "&no=" +
        no +
        "&norm=" +
        norm
    );
  }

  waktuTunggucb2(notrans, no, norm) {
    return this.http.get(
      "https://clenicapp.com/rjx/ws_antrianbpjs/waktuTunggucb2.php?notrans=" +
        notrans +
        "&no=" +
        no +
        "&norm=" +
        norm
    );
  }

  waktuTunggucb3(notrans, no) {
    return this.http.get(
      "https://clenicapp.com/rjx/ws_antrianbpjs/waktuTunggucb.php?notrans=" +
        notrans +
        "&no=" +
        no
    );
  }

  // ----------------------

  simpanobat(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanobat1.php", data);
  }

  obat(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/obat.php?kdcabang=" + a + "&sts=" + b + "&nama=" + c
    );
  }
  obatmaster(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/obatmaster.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&type=" +
        d
    );
  }

  obaterm(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/obaterm.php?kdcabang=" + a + "&sts=" + b + "&nama=" + c
    );
  }

  cobatbeli(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/cobatbeli.php?kdcabang=" + a + "&sts=" + b + "&nama=" + c
    );
  }

  obatbykode(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/obatbykode.php?kdcabang=" + a + "&kdobat=" + b
    );
  }

  obatbysatuan(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/satuancari.php?kdcabang=" +
        a +
        "&kdobat=" +
        b +
        "&satuan=" +
        c
    );
  }

  obatbykodestok(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/obatbykodestok.php?kdcabang=" +
        a +
        "&kdobat=" +
        b +
        "&kdgudang=" +
        c
    );
  }

  obatr(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/obatr.php?kdcabang=" +
        a +
        "&kddokter=" +
        b +
        "&kdtamplate=" +
        c
    );
  }

  obatbyid(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/obatbyid.php?kdcabang=" + a + "&kdobat=" + b
    );
  }

  riwayatobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/riwayatobat.php?kdcabang=" + a + "&norm=" + b
    );
  }
  politunjang(a): Observable<any> {
    return this.http.get(apiurx + "master/politunjang.php?kdcabang=" + a);
  }

  kostumer(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/kostumer.php?kdcabang=" + a + "&sts=" + b + "&nama=" + c
    );
  }

  tarifm(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/tarifm.php?kdcabang=" + a + "&sts=" + b + "&nama=" + c
    );
  }
  teslab(a, b, c, d): Observable<any> {
    // kdcabang=002&kdgolongan=ML12&dari=1&nama=
    return this.http.get(
      apiurx +
        "master/teslab.php?kdcabang=" +
        a +
        "&kdgolongan=" +
        b +
        "&nama=" +
        c +
        "&dari=" +
        d
    );
  }

  tarifkomponen(a, c): Observable<any> {
    return this.http.get(
      apiurx + "master/tarifkomponen.php?kdcabang=" + a + "&kdtarif=" + c
    );
  }

  tarifdetail(a, b, c, kdtarifm, statust): Observable<any> {
    return this.http.get(
      apiurx +
        "master/tarifdetail.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&kdtarifm=" +
        kdtarifm +
        "&statust=" +
        statust
    );
  }

  kostumerd(a, b, c, kdkelompok): Observable<any> {
    return this.http.get(
      apiurx +
        "master/kostumerd.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&kdkelompok=" +
        kdkelompok
    );
  }

  tamplateos(a, b, c, nama): Observable<any> {
    return this.http.get(
      apiurx +
        "master/tamplateos.php?kdcabang=" +
        a +
        "&kduser=" +
        b +
        "&status=" +
        c +
        "&nama=" +
        nama
    );
  }
  tamplateobat(a, b, c, nama, kdtamplate): Observable<any> {
    return this.http.get(
      apiurx +
        "master/tamplateobat.php?kdcabang=" +
        a +
        "&kduser=" +
        b +
        "&status=" +
        c +
        "&nama=" +
        nama +
        "&kdtamplate=" +
        kdtamplate
    );
  }

  pasien(a, b, nama): Observable<any> {
    return this.http.get(
      apiurx + "master/pasien.php?kdcabang=" + a + "&sts=" + b + "&nama=" + nama
    );
  }

  hasiltamplateobat(a, b, nama): Observable<any> {
    return this.http.get(
      apiurx +
        "master/hasiltamplateobat.php?kdcabang=" +
        a +
        "&kduser=" +
        b +
        "&nama=" +
        nama
    );
  }

  hasiltamplatebhp(a, nama): Observable<any> {
    return this.http.get(
      apiurx + "master/hasiltamplatebhp.php?kdcabang=" + a + "&nama=" + nama
    );
  }

  listantrian(): Observable<any> {
    return this.http.get(apiurx + "master/listantrian.php");
  }

  simpankelompok(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpancustomer.php", data);
  }
  editnorm(data: any): Observable<any> {
    return this.http.post(apiurx + "master/editnorm.php", data);
  }
  simpanmtarif(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanmtarif.php", data);
  }

  simpantarifbaru(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantarifbaru.php", data);
  }

  simpancustomerd(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpancustomerd.php", data);
  }

  simpantarifdetail(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantarifdetail.php", data);
  }

  simpantamplate(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantamplate.php", data);
  }

  simpantamplateobat(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantamplateobat.php", data);
  }

  simpantamplateobatr(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantamplateobatr.php", data);
  }
  simpanpasbaru(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanpasbaru.php", data);
  }

  simpantamplatelab(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantamplatelab.php", data);
  }
  s_masterkamarinduk(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_masterkamarinduk.php", data);
  }
  s_kamar(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_kamar.php", data);
  }
  s_transferfarmasi(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_transferfarmasi.php", data);
  }
  s_oktindakan(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_oktindakan.php", data);
  }

  s_spesialisasi(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_spesialisasi.php", data);
  }

  s_mperawat(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_mperawat.php", data);
  }

  s_bayarri(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_bayarri.php", data);
  }

  simpandaftarrj(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpandaftarrj.php", data);
  }
  updatepcare(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/updatepcare.php", data);
  }
  simpandaftarri(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpandaftarri.php", data);
  }

  simpansehat(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpansehat.php", data);
  }

  simpanmasterlab(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanmasterlab.php", data);
  }

  s_masterkelaskamar(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_masterkelaskamar.php", data);
  }

  nomorobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/nomorobat.php?kdcabang=" + a + "&kduser=" + b
    );
  }

  t_masterkelaskamar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_masterkelaskamar.php?kdcabang=" + a + "&nama=" + b
    );
  }

  datapasienri(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/datapasienri.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  t_outstandingrj(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_outstandingrj.php?kdcabang=" + a + "&norm=" + b
    );
  }

  t_outstandingfar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_outstandingfar.php?kdcabang=" + a + "&norm=" + b
    );
  }

  t_spesialisasimaping(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_spesialisasimaping.php?kdcabang=" + a + "&kdspesial=" + b
    );
  }

  t_listfarmasijual(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "ri/t_listfarmasijual.php?kdcabang=" +
        a +
        "&nama=" +
        b +
        "&tgl=" +
        c
    );
  }

  t_listpasienri(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_listpasienri.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_rwtlistpasienri(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "ri/t_rwtlistpasienri.php?kdcabang=" +
        a +
        "&nama=" +
        b +
        "&tgl=" +
        c
    );
  }
  t_listtrxrekap(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_listtrxrekap.php?kdcabang=" + a + "&notransaksi=" + b
    );
  }
  t_kostumerd(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_kostumerd.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_pendapatand(a): Observable<any> {
    return this.http.get(apiurx + "ri/t_pendapatand.php?kdcabang=" + a);
  }
  t_listpasienridokter(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "ri/t_listpasienridokter.php?kdcabang=" +
        a +
        "&nama=" +
        b +
        "&kddokter=" +
        c
    );
  }

  listtarif(a, b, c, kdtarif): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listtarif.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&kdtarif=" +
        kdtarif
    );
  }
  kdcppt(a): Observable<any> {
    return this.http.get(apiurx + "master/kdcppt.php?kduser=" + a);
  }
  pasienantrian(kdcabang, sts, notransaksi, nama, tgl): Observable<any> {
    return this.http.get(
      apiurx +
        "master/pasienantrian.php?kdcabang=" +
        kdcabang +
        "&sts=" +
        sts +
        "&notransaksi=" +
        notransaksi +
        "&nama=" +
        nama +
        "&tgl=" +
        tgl
    );
  }
  pasienantrianppoli(kdcabang, sts, nama, tgl, statuscari): Observable<any> {
    return this.http.get(
      apiurx +
        "master/pasienantrianppoli.php?kdcabang=" +
        kdcabang +
        "&sts=" +
        sts +
        "&nama=" +
        nama +
        "&tgl=" +
        tgl +
        "&statuscari=" +
        statuscari
    );
  }

  pasienantrianlab(kdcabang, sts, nama, tgl, statuscari): Observable<any> {
    return this.http.get(
      apiurx +
        "master/pasienantrianlab.php?kdcabang=" +
        kdcabang +
        "&sts=" +
        sts +
        "&nama=" +
        nama +
        "&tgl=" +
        tgl +
        "&statuscari=" +
        statuscari
    );
  }

  // transaksi rawat jalann

  simpantrxrj(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpantrxrj.php", data);
  }
  simpantrxri(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpantrxri.php", data);
  }
  simpantrxrjtunjang(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpantrxrjtunjang.php", data);
  }
  s_transferpenunjang(data: any): Observable<any> {
    return this.http.post(apiurx + "ri/s_transferpenunjang.php", data);
  }

  simpanbayar(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbayar.php", data);
  }
  simpanbayart(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbayart.php", data);
  }

  simpantriger(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpantriger.php", data);
  }

  simpandaftarrjrujuk(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpandaftarrjrujuk.php", data);
  }
  simpanhasilalb(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanhasilalb.php", data);
  }
  simpanhasilrad(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanhasilrad.php", data);
  }

  copyterapi(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/copyterapi.php", data);
  }

  simpanhasilalbx(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanhasilalbx.php", data);
  }

  simpanmaping(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanmaping.php", data);
  }

  simpandiagtindak(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpandiagtindak.php", data);
  }
  simpancppt(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpancpptrjfix.php", data);
  }

  simpancpptri(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpancpptri.php", data);
  }

  copydiagnosa(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/copydiagnosa.php", data);
  }

  simpanrxtunjangerm(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanrxtunjangerm.php", data);
  }

  simpanrxobaterm(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanrxobaterm.php", data);
  }

  verifpermintaan(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/verifpermintaan.php", data);
  }

  hapusobatnon(data: any): Observable<any> {
    return this.http.post(apiurx + "master/hapusobatnon.php", data);
  }

  copyterapitamplate(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/copyterapitamplate.php", data);
  }
  copyterapitamplateb(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/copyterapitamplateb.php", data);
  }

  editaturan(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/editaturan.php", data);
  }

  editaturantam(data: any): Observable<any> {
    return this.http.post(apiurx + "master/edittamplatobat.php", data);
  }

  editaturanm(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/editaturanm.php", data);
  }

  listtrxrj(a, b, c, sts): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listtrxrj.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nama=" +
        c +
        "&sts=" +
        sts
    );
  }
  listtrxri(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listtrxri.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nama=" +
        c
    );
  }

  listtrxrjpenunjang(a, b, c, sts): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listtrxrjpenunjang.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nama=" +
        c +
        "&sts=" +
        sts
    );
  }
  t_listtrxpen(a, b, c, sts): Observable<any> {
    return this.http.get(
      apiurx +
        "ri/t_listtrxpen.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nama=" +
        c +
        "&sts=" +
        sts
    );
  }

  lst(a, b, c, sts): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listtrxrj.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nama=" +
        c +
        "&sts=" +
        sts
    );
  }

  totalfarmasi(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/totalfarmasi.php?kdcabang=" + a + "&nofaktur=" + b
    );
  }
  trigerbayar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/trigerbayar.php?kdcabang=" + a + "&notrans=" + b
    );
  }
  listdaftartunjang(a, b): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listdaftartunjang.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b
    );
  }

  jenisbayar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/jenisbayar.php?sts=" + a + "&kd=" + b
    );
  }
  listbank(a): Observable<any> {
    return this.http.get(apiurx + "transaksi/listbank.php?kdcabang=" + a);
  }
  plafonbpjs(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/plafonbpjs.php?kdcabang=" + a + "&kelas=" + b
    );
  }

  listtrxfarrj(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listtrxfarrj.php?kdcabang=" +
        a +
        "&notransaksi=" +
        b +
        "&sts=" +
        c +
        "&obat=" +
        d
    );
  }

  listtrxfarrja(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listtrxfarrja.php?kdcabang=" + a + "&notransaksi=" + b
    );
  }
  metode(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/metode.php?kdcabang=" + a + "&nama=" + b + "&dari=" + c
    );
  }
  golongan(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/golongan.php?kdcabang=" + a + "&nama=" + b + "&dari=" + c
    );
  }

  t_masterkamarinduk(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_masterkamarinduk.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_ceknorm(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_ceknorm.php?kdcabang=" + a + "&norm=" + b
    );
  }
  t_kamar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_kamar.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_kamarkelas(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "ri/t_kamarkelas.php?kdcabang=" +
        a +
        "&nama=" +
        b +
        "&kdkelas=" +
        c
    );
  }

  t_oktindakan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_oktindakan.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_spesialisasi(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_spesialisasi.php?kdcabang=" + a + "&nama=" + b
    );
  }
  t_mperawat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "ri/t_mperawat.php?kdcabang=" + a + "&nama=" + b
    );
  }
  tamplatelab(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/tamplatelab.php?kdcabang=" +
        a +
        "&notransaksi=" +
        b +
        "&jk=" +
        c
    );
  }
  tamplatelabb(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/tamplatelabb.php?kdcabang=" +
        a +
        "&notransaksi=" +
        b +
        "&jk=" +
        c
    );
  }
  mapinglab(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/mapinglab.php?kdcabang=" + a + "&kdproduk=" + b
    );
  }

  listkomponentrx(a, b, c, nomor): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listkomponentrx.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&kdproduk=" +
        c +
        "&nomor=" +
        nomor
    );
  }
  jumlahpasiendashboard(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/jumlahpasiendashboard.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&tgl=" +
        c
    );
  }
  polipie(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/polipie.php?kdcabang=" + a + "&tgl=" + b
    );
  }
  grafik(a): Observable<any> {
    return this.http.get(apiurx + "master/grafik.php?kdcabang=" + a);
  }
  grafikbpjs(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/grafikbpjs.php?kdcabang=" + a + "&sts=" + b
    );
  }
  hasilradiologi(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/hasilradiologi.php?kdcabang=" +
        a +
        "&notransaksi=" +
        b +
        "&kdproduk=" +
        c
    );
  }

  pasienperdokter(a, b, c, d, e, f): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/pasienperdokter.php?kdcabang=" +
        a +
        "&kddokter=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&stss=" +
        e +
        "&status=" +
        f
    );
  }
  pasienperdokterri(a, b, c, d, e, f): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/pasienperdokterri.php?kdcabang=" +
        a +
        "&kddokter=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&stss=" +
        e +
        "&status=" +
        f
    );
  }

  datapasien(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/datapasien.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  riwayatrujuk(a): Observable<any> {
    return this.http.get(apiurx + "transaksi/riwayatrujuk.php?no=" + a);
  }
  riwayatlaborat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/riwayatlaborat.php?kdcabang=" + a + "&norm=" + b
    );
  }

  trackhasillab(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/trackhasillab.php?kdcabang=" +
        a +
        "&norm=" +
        b +
        "&kdlab=" +
        c
    );
  }

  master(a): Observable<any> {
    return this.http.get(apiurx + "master/image.php?nama=" + a);
  }

  riwayatradiologi(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/riwayatradiologi.php?kdcabang=" + a + "&norm=" + b
    );
  }
  diagnosatmp(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/diagnosa.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&sts=" +
        c
    );
  }
  diagnosacopy(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/diagnosacopy.php?kdcabang=" +
        a +
        "&norm=" +
        b +
        "&sts=" +
        c +
        "&kdpoli=" +
        d
    );
  }

  tampilcppt(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/tampilcppt.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  selesaiverif(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/selesaiverif.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&sts=" +
        c
    );
  }
  tampilcpptlist(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/tampilcpptlist.php?kdcabang=" +
        a +
        "&norm=" +
        b +
        "&kddokter=" +
        c +
        "&kdpoli=" +
        d
    );
  }

  listintruksilab(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listintruksilab.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&sts=" +
        c +
        "&kdcppt=" +
        d
    );
  }

  verifhapus(a, b, c, d, e, f, g): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/verifhapus.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&sts=" +
        c +
        "&kdcppt=" +
        d +
        "&kddokter=" +
        e +
        "&kdpoli=" +
        f +
        "&kdpruduk=" +
        g
    );
  }

  keteranganklinis(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/keteranganklinis.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&sts=" +
        c +
        "&kdcppt=" +
        d
    );
  }

  nomorracik(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/nomorracik.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&norm=" +
        c
    );
  }

  obatnonracik(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/obatnonracik.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&kdcppt=" +
        c
    );
  }

  tmpbhp(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/tmpbhp.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&kdcppt=" +
        c
    );
  }

  listpobaterm(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listpobaterm.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  listobatermracik(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listobatermracik.php?kdcabang=" + a + "&notrans=" + b
    );
  }
  obatracik(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/obatracik.php?kdcabang=" +
        a +
        "&notrans=" +
        b +
        "&kdcppt=" +
        c +
        "&kode=" +
        d
    );
  }

  estimasibiaya(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/estimasibiaya.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  // $kdcabang=$_GET['kdcabang'];
  // $tgl=$_GET['tgl'];
  // $sts=$_GET['sts'];
  // $nama=$_GET['nama'];

  caripembelian(a, b, c, d, tgls): Observable<any> {
    return this.http.get(
      apiurx +
        "master/caripembelian.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&tgls=" +
        tgls
    );
  }

  listmutasi(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listmutasi.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d
    );
  }
  listmutasiin(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listmutasiin.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d
    );
  }
  listmutasiout(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listmutasiout.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d
    );
  }
  caripembelianr(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/caripembelianr.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d
    );
  }

  listfarmasijual(a, c, d, e): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listfarmasijual.php?kdcabang=" +
        a +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&tgl=" +
        e
    );
  }

  listpiutang(a, c, d, e): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listpiutang.php?kdcabang=" +
        a +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&tgl=" +
        e
    );
  }

  listfarmasijualretur(a, c, d, e): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listfarmasijualretur.php?kdcabang=" +
        a +
        "&sts=" +
        c +
        "&nama=" +
        d +
        "&tgl=" +
        e
    );
  }

  cariretur(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/cariretur.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&sts=" +
        c +
        "&nama=" +
        d
    );
  }

  transbeliobat(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/transbeliobat.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&nolpb=" +
        c
    );
  }
  // pasienrm(a, b, c, d, e, tgls): Observable<any> {
  //   // kdcabang=002&sts=0&nama=&stss=1&tgl=
  //   return this.http.get(apiurx + 'transaksi/pasienrm.php?kdcabang=' + a + '&sts=' + b + '&nama=' + c + '&stss=' + d + '&tgl=' + e + '&tgls=' + tgls)
  // }

  pasienrm(a, b, c, d, e, tgls): Observable<any> {
    // kdcabang=002&sts=0&nama=&stss=1&tgl=
    return this.http.get(
      apiurx +
        "transaksi/pasienrm.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&stss=" +
        d +
        "&tgl=" +
        e +
        "&tgls=" +
        tgls
    );
  }

  trxfgudang(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/trxfgudang.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&notrans=" +
        c
    );
  }

  trxjual(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/trxjual.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&notrans=" +
        c
    );
  }
  trxjualx(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/trxjualx.php?kdcabang=" +
        a +
        "&nofaktur=" +
        b +
        "&notrans=" +
        c
    );
  }
  gudangdefault(a): Observable<any> {
    return this.http.get(apiurx + "master/gudangdefault.php?kdcabang=" + a);
  }

  tampilku(a): Observable<any> {
    return this.http.get(apiurx + "transaksi/tampilku.php?notrans=" + a);
  }

  panggiladmisi(a): Observable<any> {
    return this.http.get(
      "http://localhost:8011/clenic/transaksi/panggiladmisi.php?no=" + a
    );
  }
  panggilantrian(a, b): Observable<any> {
    return this.http.get(
      "http://localhost:8011/clenic/transaksi/panggilantrian.php?no=" +
        a +
        "&dokter=" +
        b
    );
  }

  listtrxcppt(a, c): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listtrxcppt.php?kdcabang=" + a + "&notrans=" + c
    );
  }

  kostumerdt(a): Observable<any> {
    return this.http.get(apiurx + "master/kostumerdt.php?kdcabang=" + a);
  }

  totalpenjualan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/totalpenjualan.php?kdcabang=" + a + "&tgl=" + b
    );
  }

  komponen(): Observable<any> {
    return this.http.get(apiurx + "master/komponen.php");
  }
  cobatjual(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/cobatjual.php?kdcabang=" +
        a +
        "&kdgudang=" +
        b +
        "&nama=" +
        c
    );
  }
  pasiensemua(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "master/pasiensemua.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c
    );
  }
  tescoba(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/tes.php?kdcabang=" +
        a +
        "&notransaksi=" +
        b +
        "&nofaktur=" +
        c
    );
  }

  etiket(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/etiket.php?kdcabang=" + a + "&notransaksi=" + b
    );
  }
  kostumerlist(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/kostumerlist.php?kdcabang=" + a + "&nama=" + b
    );
  }
  trxmutasi(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/trxmutasi.php?kdcabang=" + a + "&nomutasi=" + b
    );
  }
  trxmutasiin(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/trxmutasiin.php?kdcabang=" + a + "&nomutasi=" + b
    );
  }

  trxmutasiout(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/trxmutasiout.php?kdcabang=" + a + "&nomutasi=" + b
    );
  }
  pendapatanrjdepan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/pendapatanrjdepan.php?kdcabang=" + a + "&tgl=" + b
    );
  }

  hakakses(a): Observable<any> {
    return this.http.get(apiurx + "master/hakakses.php?kdcabang=" + a);
  }

  listbayarpiutang(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/listbayarpiutang.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  stokobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/stokobat.php?kdcabang=" + a + "&kdobat=" + b
    );
  }
  listbayarpiutangh(a, b, c, d): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listbayarpiutangh.php?kdcabang=" +
        a +
        "&sts=" +
        b +
        "&nama=" +
        c +
        "&tgl=" +
        d
    );
  }

  listhutang(a, b, c, d, e, f, g): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listhutang.php?kdcabang=" +
        a +
        "&kdsup=" +
        b +
        "&tgldari=" +
        c +
        "&tglsampai=" +
        d +
        "&nama=" +
        e +
        "&verif=" +
        f +
        "&cariby=" +
        e
    );
  }

  listhutangall(a, c, d, e): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listhutangall.php?kdcabang=" +
        a +
        "&nama=" +
        c +
        "&verif=" +
        d +
        "&cariby=" +
        e
    );
  }

  coax(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/coa.php?kdcabang=" + a + "&nama=" + b
    );
  }
  coad(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/coad.php?kdcabang=" + a + "&kdgl=" + b
    );
  }

  coadbawah(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/coadbawah.php?kdcabang=" + a + "&kdgl=" + b
    );
  }
  cekdiag(a): Observable<any> {
    return this.http.get(apiurx + "master/cekdiag.php?notrans=" + a);
  }
  cektacc(a): Observable<any> {
    return this.http.get(apiurx + "master/cektacc.php?kddiag=" + a);
  }
  listgl(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listgl.php?kdcabang=" + a + "&nama=" + b + "&tgl=" + c
    );
  }

  tmpbpjs(nokartu, status): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cekpeserta.php?no=" + nokartu + "&status=" + status
    );
  }

  panggilv2(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/panggil.php", data);
  }

  icare(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/icare.php", data);
  }
  statuspulang(status): Observable<any> {
    return this.http.get(apiurx + "pcare/statuspulang.php?status=" + status);
  }
  alergis(alergis): Observable<any> {
    return this.http.get(apiurx + "pcare/alergi.php?no=" + alergis);
  }
  ceklistdaftarpcare(no, tgl): Observable<any> {
    return this.http.get(
      apiurx + "pcare/ceklistdaftarpcare.php?no=" + no + "&tgl=" + tgl
    );
  }

  cekjadwalv2(no, tgl): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cekjadwal.php?kdpoli=" + no + "&tgl=" + tgl
    );
  }
  cekjadwalv22(no, tgl, c): Observable<any> {
    return this.http.get(
      apiurx +
        "pcare/cekjadwalv2.php?kdpoli=" +
        no +
        "&tgl=" +
        tgl +
        "&kdpoliin=" +
        c
    );
  }

  getfaskessp(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "pcare/getfaskessp.php?kdsubsp=" +
        a +
        "&kdsarana=" +
        b +
        "&tgl=" +
        c
    );
  }

  getpendaftaranprovider(tgl, nourut): Observable<any> {
    return this.http.get(
      apiurx +
        "pcare/getpendaftaranprovider.php?tgl=" +
        tgl +
        "&nourut=" +
        nourut
    );
  }

  pendaftaranbynourut(tgl, b): Observable<any> {
    return this.http.get(
      apiurx + "pcare/pendaftaranbynourut.php?tgl=" + tgl + "&nourut=" + b
    );
  }

  addpendaftaranpcare(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addpendaftaranpcare.php", data);
  }
  spesialispcare(): Observable<any> {
    return this.http.get(apiurx + "pcare/spesialis.php");
  }
  subspesialis(a): Observable<any> {
    return this.http.get(apiurx + "pcare/subspesialis.php?kdsp=" + a);
  }
  deletekunjungan(a): Observable<any> {
    return this.http.get(apiurx + "pcare/deletekunjungan.php?no=" + a);
  }
  listpcare(a): Observable<any> {
    return this.http.get(apiurx + "pcare/listpcare.php?nokunjungan=" + a);
  }
  caridiagnosaa(a): Observable<any> {
    return this.http.get(apiurx + "pcare/getdiagnosa.php?nama=" + a);
  }
  // getriwayatkunjungan(a): Observable<any> {
  //   return this.http.get(apiurx + 'pcare/getriwayatkunjungan.php?nokartu=' + a)
  // }
  getprognosa(): Observable<any> {
    return this.http.get(apiurx + "pcare/getprognosa.php");
  }

  simpanlembarrj(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanlembarrj.php", data);
  }

  refrujukankusus(status, kdkhusus, tgl, kdsubsp, nokartu): Observable<any> {
    return this.http.get(
      apiurx +
        "pcare/refrujukankusus.php?status=" +
        status +
        "&kdkhusus=" +
        kdkhusus +
        "&tgl=" +
        tgl +
        "&kdsubsp=" +
        kdsubsp +
        "&nokartu=" +
        nokartu
    );
  }

  sarana(): Observable<any> {
    return this.http.get(apiurx + "pcare/sarana.php");
  }
  alergi(norm, kdcabang): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/alergi.php?norm=" + norm + "&kdcabang=" + kdcabang
    );
  }

  diagnosaambilpcare(notrans, kdcabang): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/diagnosaambilpcarev.php?notrans=" +
        notrans +
        "&kdcabang=" +
        kdcabang
    );
  }

  listpasienmobile(tgl, kdcabang, sts, pasien): Observable<any> {
    return this.http.get(
      apiurx +
        "master/listpasienmobile.php?tgl=" +
        tgl +
        "&kdcabang=" +
        kdcabang +
        "&sts=" +
        sts +
        "&pasien=" +
        pasien
    );
  }

  bpjsdashbord(bulan, tahun, waktu): Observable<any> {
    return this.http.get(
      "https://clenicapp.com/rjx/ws_antrianbpjs/dashboardbulan.php?bulan=" +
        bulan +
        "&tahun=" +
        tahun +
        "&waktu=" +
        waktu
    );
  }

  verifdaftar(norm, kdcabang, kdpoli, tglp): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/verifdaftar.php?norm=" +
        norm +
        "&kdcabang=" +
        kdcabang +
        "&kdpoli=" +
        kdpoli +
        "&tgl=" +
        tglp
    );
  }

  userpcare(): Observable<any> {
    return this.http.get(apiurx + "transaksi/userpcare.php");
  }

  listkonsultasirj(sts, kdcabang, notransasal): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listkonsultasirj.php?sts=" +
        sts +
        "&kdcabang=" +
        kdcabang +
        "&notransasal=" +
        notransasal
    );
  }

  simpanlpb(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanlpb.php", data);
  }
  editobatsk(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/editobatsk.php", data);
  }

  simpanpcare(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanpcare.php", data);
  }

  simpanpcaredaftar(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addpendaftaranpcare.php", data);
  }
  simpanpcaredaftarv1(data: any): Observable<any> {
    return this.http.post(
      apiurx + "pcare/adddaftarpcarekunjungansehat.php",
      data
    );
  }

  adddaftarpcare(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/adddaftarpcare.php", data);
  }

  adddaftarpcarekunjungansehat(data: any): Observable<any> {
    return this.http.post(
      apiurx + "pcare/adddaftarpcarekunjungansehat.php",
      data
    );
  }
  addkunjungan(data: any): Observable<any> {
    console.log("abc");

    return this.http.post(apiurx + "pcare/addkunjungan.php", data);
  }

  editkunjungan(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/editkunjungan.php", data);
  }

  simpangl(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpangl.php", data);
  }
  simpanetiket(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanetiket.php", data);
  }

  gantidoktert(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/gantidoktert.php", data);
  }
  gantidokterrj(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/gantidokterrj.php", data);
  }
  gantikostumer(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/gantikostumer.php", data);
  }
  simpanbeliverif(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbeliverif.php", data);
  }
  simpandiagnosa(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpandiagnosa.php", data);
  }

  simpankonsulrj(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpankonsulrj.php", data);
  }
  simpanbayarfarmasi(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbayarfarmasi.php", data);
  }
  simpannomutasi(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpannomutasi.php", data);
  }
  simpanmutasiin(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanmutasiin.php", data);
  }

  simpanmutasiout(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanmutasiout.php", data);
  }

  simpanadjust(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanadjust.php", data);
  }

  simpanbayarpiutang(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbayarpiutang.php", data);
  }
  simpanjadwal(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpanjadwal.php", data);
  }

  simpanbayarhutang(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbayarhutang.php", data);
  }

  hapustrx(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/hapustrx.php", data);
  }

  simpanverifdaftar(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanverifdaftar.php", data);
  }

  musnahqty(data: any): Observable<any> {
    return this.http.post(apiurx + "master/musnahqty.php", data);
  }

  keluar(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/keluar.php", data);
  }

  simpanku(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanku.php", data);
  }

  // lit(data: any): Observable<any> {
  //   return this.http.post('https://clenicapp.com/phpjwt/crud-file/get-single-products.php', data)
  // }

  // listpiutang(a,b,c,d):Observable<any>{
  //   return this.http.get(apiurx+'master/listpiutang.php?kdcabang='+a)
  // }

  katagoriberita(): Observable<any> {
    return this.http.get(apiurx + "transaksi/katagoriberita.php");
  }
  listberita(a): Observable<any> {
    return this.http.get(apiurx + "transaksi/berita.php?judul=" + a);
  }
  listkostumer(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listkostumer.php?kdcabang=" + a + "&nama=" + b
    );
  }

  totalpasien(a): Observable<any> {
    return this.http.get(apiurx + "master/totalpasien.php?kdcabang=" + a);
  }

  pasiendaftar(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/pasiendaftar.php?kdcabang=" +
        a +
        "&nama=" +
        b +
        "&kdpoli=" +
        c
    );
  }
  listpolidaf(a): Observable<any> {
    return this.http.get(apiurx + "transaksi/listpolidaf.php?kdcabang=" + a);
  }
  riwayatpriksa(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/riwayatpriksa.php?kdcabang=" + a + "&norm=" + b
    );
  }
  verifshowdd(a): Observable<any> {
    return this.http.get(apiurx + "master/verifshowdd.php?kdcabang=" + a);
  }

  listadjust(a, b, c): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listadjust.php?kdcabang=" +
        a +
        "&tgl=" +
        b +
        "&nama=" +
        c
    );
  }
  listadjustd(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listadjustd.php?kdcabang=" + a + "&noadjust=" + b
    );
  }

  obated(a): Observable<any> {
    return this.http.get(apiurx + "master/obated.php?kdcabang=" + a);
  }

  listobated(a): Observable<any> {
    return this.http.get(apiurx + "master/listobated.php?kdcabang=" + a);
  }

  tampilcoa(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/tampilcoa.php?kdcabang=" + a + "&coa=" + b
    );
  }
  spesialis(a): Observable<any> {
    return this.http.get(apiurx + "master/spesialis.php?kdcabang=" + a);
  }
  kamarkelas(a): Observable<any> {
    return this.http.get(apiurx + "master/kamarkelas.php?kdcabang=" + a);
  }
  dokterspesialis(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/dokterspesialis.php?kdcabang=" + a + "&kdspesialis=" + b
    );
  }
  kamar(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/kamar.php?kdcabang=" + a + "&kdkelas=" + b
    );
  }

  listpasienri(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/listpasienri.php?kdcabang=" + a + "&nama=" + b
    );
  }

  simpanrujukan(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanrujukan.php", data);
  }
  tampilrujukan(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/tampilrujukan.php?kdcabang=" + a + "&notrans=" + b
    );
  }

  listkomponen(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/listkomponen.php?kdcabang=" + a + "&kdtarif=" + b
    );
  }

  listkomponendokter(a, b): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listkomponendokter.php?kdcabang=" +
        a +
        "&kdtarif=" +
        b
    );
  }
  tarifmri(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/treeview.php?kdcabang=" + a + "&kdtarif=" + b
    );
  }

  rwtobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/rwtobat.php?kdcabang=" + a + "&norm=" + b
    );
  }
  rwtobatd(a, b, notransaksi): Observable<any> {
    return this.http.get(
      apiurx +
        "master/rwtobatd.php?kdcabang=" +
        a +
        "&norm=" +
        b +
        "&notransaksi=" +
        notransaksi
    );
  }

  carapemberian(): Observable<any> {
    return this.http.get(apiurx + "master/carapemberian.php");
  }
  bentuksediaan(): Observable<any> {
    return this.http.get(apiurx + "master/bentuksediaan.php");
  }
  frekuensiobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/frekuensiobat.php?kdcp=" + a + "&kdbs=" + b
    );
  }

  signa(a, b): Observable<any> {
    return this.http.get(apiurx + "master/signa.php?kdcp=" + a + "&kdbs=" + b);
  }
  jmlobathari(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/jmlobathari.php?kdcp=" + a + "&kdbs=" + b
    );
  }

  obatermbyid(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/obatermbyid.php?kdcabang=" + a + "&kdobat=" + b
    );
  }
  jenisrujukankhusus(): Observable<any> {
    return this.http.get(apiurx + "transaksi/jenisrujukankhusus.php");
  }
  refkhusus(): Observable<any> {
    return this.http.get(apiurx + "pcare/refkhusus.php");
  }
  hari(): Observable<any> {
    return this.http.get(apiurx + "master/hari.php");
  }

  tamplatesignano(a): Observable<any> {
    return this.http.get(apiurx + "master/tamplatesignano.php?status=" + a);
  }

  cekpasienlamadanbaru(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/cekpasienlamadanbaru.php?norm=" + a + "&kdcabang=" + b
    );
  }
  metoderacik(): Observable<any> {
    return this.http.get(apiurx + "master/metoderacik.php");
  }

  editfreetextdiag(data: any): Observable<any> {
    return this.http.post(apiurx + "master/editfreetextdiag.php", data);
  }

  getFiles() {
    return this.http
      .get<any>(apiurx + "master/treeview.php")
      .toPromise()
      .then((res) => <TreeNode[]>res);
  }

  getlabtree(a, b) {
    return this.http
      .get<any>(
        apiurx + "master/listtariftree.php?status=" + a + "&kdcabang=" + b
      )
      .toPromise()
      .then((res) => <TreeNode[]>res);
  }
  // listcoa(b) {
  //   return this.http.get<any>(apiurx+'master/listcoa.php?kdcabang='+b).toPromise().then((res) => <TreeNode[]>res);
  // }

  cekpasien(a, b, c): Observable<any> {
    return this.http.get(
      apiurx + "master/cekpasien.php?no=" + a + "&kdcabang=" + b + "&sts=" + c
    );
  }

  cekkostumer(a): Observable<any> {
    return this.http.get(apiurx + "master/cekkostumer.php?kdcabang=" + a);
  }

  // satusehat

  ambiltoken(data: any): Observable<any> {
    return this.http.post(satusehat + "Auth/Accestoken", data);
  }

  simpanlokasi(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanlokasi.php", data);
  }

  simpanlokasiss(data: any, heder: any): Observable<any> {
    return this.http.post(satusehat + "Location", data, { headers: heder });
  }
  editlokasiss(data: any, heder: any, id: any): Observable<any> {
    return this.http.put(satusehat + "Location/" + id, data, {
      headers: heder,
    });
  }
  simpadiagnosass(data: any, heder: any): Observable<any> {
    return this.http.post(satusehat + "Condition", data, { headers: heder });
  }

  simpaakhirss(data: any, heder: any, id: any): Observable<any> {
    return this.http.put(satusehat + "Encounter/UpdateFinished/" + id, data, {
      headers: heder,
    });
  }

  kyc(payload: any, headers: any) {
    return this.http.post(
      satusehat + "KnowYourCustomer/generate-url",
      payload,
      { headers: headers }
    );
  }
  observation(payload: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "Observation", payload, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  procedure(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "Procedure", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  composition(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "Composition", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  carePlan(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "CarePlan", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  medication(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "Medication", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  medicationRequest(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "MedicationRequest", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  medicationDispense(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "MedicationDispense", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  medicationStatement(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "MedicationStatement", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  allergyIntolerance(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "AllergyIntolerance", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  clinicalImpression(data: any, headers: any) {
    return new Promise((resolve) => {
      this.http.post(satusehat + "ClinicalImpression", data, { headers: headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getdokter(a, heder): Observable<any> {
    return this.http.get(
      satusehat +
        "Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|" +
        a,
      { headers: heder }
    );
  }
  getpasien(a, heder): Observable<any> {
    return this.http.get(
      satusehat + "Patient?identifier=https://fhir.kemkes.go.id/id/nik|" + a,
      { headers: heder }
    );
  }

  simpanencounter(data: any, heder: any): Observable<any> {
    return this.http.post(satusehat + "Encounter", data, { headers: heder });
  }

  simpantoken(data: any): Observable<any> {
    return this.http.post(apiurx + "master/simpantoken.php", data);
  }

  deletependaftaranpcare(a, b, c, d): Observable<any> {
    //   $no=$_GET['no'];
    // $tgl=$_GET['tgl'];
    // $nourut=$_GET['nourut'];
    // $kdpoli=$_GET['kdpoli'];

    return this.http.get(
      apiurx +
        "pcare/deletependaftaranpcare.php?no=" +
        a +
        "&tgl=" +
        b +
        "&nourut=" +
        c +
        "&kdpoli=" +
        d
    );
  }
  deletependaftaranpcarev(a, b, c, d): Observable<any> {
    //   $no=$_GET['no'];
    // $tgl=$_GET['tgl'];
    // $nourut=$_GET['nourut'];
    // $kdpoli=$_GET['kdpoli'];

    return this.http.get(
      apiurx +
        "pcare/deletependaftaranpcarev.php?no=" +
        a +
        "&tgl=" +
        b +
        "&nourut=" +
        c +
        "&kdpoli=" +
        d
    );
  }
  kajianrsesepa(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/kajianrsesepa.php", data);
  }
  tampilkajianresep(a): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/tampilkajianresep.php?noresep=" + a
    );
  }
  polibyid(a, b): Observable<any> {
    return this.http.get(
      apiurx + "master/polibyid.php?kdcabang=" + a + "&kdpoli=" + b
    );
  }

  getData() {
    return this.http
      .get("https://jsonplaceholder.typicode.com/users")
      .pipe(map((response: []) => response.map((item) => item["name"])));
  }

  simpantriase(data: any): Observable<any> {
    return this.http.post(apiurx + "emr/simpantriase.php", data);
  }

  simpantindakan(data: any): Observable<any> {
    return this.http.post(apiurx + "emr/simpantindakan.php", data);
  }

  kajianawal(data: any): Observable<any> {
    return this.http.post(apiurx + "emr/kajianawal.php", data);
  }
  simpankajian(data: any): Observable<any> {
    return this.http.post(apiurx + "emr/simpankajian.php", data);
  }
  simpanaskep(data: any): Observable<any> {
    return this.http.post(apiurx + "emr/simpanaskep.php", data);
  }

  riwayattriase(data, status): Observable<any> {
    return this.http.get(
      apiurx + "emr/riwayattriase.php?data=" + data + "&status=" + status
    );
  }

  rwttindakan(data, status): Observable<any> {
    return this.http.get(
      apiurx + "emr/rwttindakan.php?data=" + data + "&status=" + status
    );
  }
  rwtkajianawal(data, status): Observable<any> {
    return this.http.get(
      apiurx + "emr/rwtkajianawal.php?data=" + data + "&status=" + status
    );
  }
  rwtaskep(data, status): Observable<any> {
    return this.http.get(
      apiurx + "emr/rwtaskep.php?data=" + data + "&status=" + status
    );
  }

  listpdok(hakakses): Observable<any> {
    return this.http.get(apiurx + "emr/listpdok.php?hakakses=" + hakakses);
  }

  rwtkajianperawatawal(data, status): Observable<any> {
    return this.http.get(
      apiurx + "emr/rwtkajianperawatawal.php?data=" + data + "&status=" + status
    );
  }

  ceknokunjungan(notransasal): Observable<any> {
    return this.http.get(
      apiurx + "master/ceknokunjungan.php?notransaksi=" + notransasal
    );
  }
  simpanobatbpjs(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/obat.php", data);
  }
  cekkunjunganobat(a): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cekkunjunganobat.php?nokunjungan=" + a
    );
  }
  deleteobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "pcare/deleteobat.php?nokunjungan=" + a + "&kodeObatSK=" + b
    );
  }

  listtariff(a): Observable<any> {
    return this.http.get(apiurx + "pcare/listtarif.php?kdTkp=" + a);
  }

  cekdokter(): Observable<any> {
    return this.http.get(apiurx + "pcare/cekdokter.php");
  }
  cekpoli(): Observable<any> {
    return this.http.get(apiurx + "pcare/getpoli.php");
  }

  cektindakankunjungan(a): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cektindakankunjungan.php?nokunjungan=" + a
    );
  }

  addtindakan(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addtindakan.php", data);
  }
  addantrean(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addantrean.php", data);
  }
  panggil(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/panggil.php", data);
  }

  batal(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/batal.php", data);
  }
  deletetindakan(a: any, b): Observable<any> {
    return this.http.get(
      apiurx + "pcare/deletetindakan.php?nokunjungan=" + a + "&kdtindakan=" + b
    );
  }
  getriwayatkunjungan(a): Observable<any> {
    return this.http.get(apiurx + "pcare/getriwayatkunjungan.php?nokartu=" + a);
  }

  listobatkirimpcare(a, b): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listobatkirimpcare.php?kdcabang=" +
        a +
        "&notrans=" +
        b
    );
  }
  ceksatusehat(a): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/ceksatusehat.php?notransaksi=" + a
    );
  }
  cekjadwal(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/cekjadwal.php?kddokter=" + a + "&kodepoliasli=" + b
    );
  }
  cekjadwalv222(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/cekjadwalv2.php?kddokter=" + a + "&kodepoliasli=" + b
    );
  }
}
