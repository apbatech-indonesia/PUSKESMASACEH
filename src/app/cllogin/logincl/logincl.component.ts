import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import {
  GlobalConfig,
  ToastrService,
  ToastContainerDirective,
  ToastNoAnimation,
} from 'ngx-toastr';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logincl',
  templateUrl: './logincl.component.html',
  styles: [`
  *{
    padding: 0px;
    margin: 0px;
  }
    body{
      padding: 0px;
      margin: 0px;
    }
    #content_right {
      height: 100%;
      padding: 0;
      margin: 0;
      background-color: #fff;
      border-radius: 24px 0 0 24px;   
    }

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .illust_responsive {
      width: 500px;
      height: 300px;
      padding: 16px;    
      aspect-ratio: 16/9;
      padding: 0px;
      margin: 0;
    }
    .responsive {
      width: 120px;
      height: 120px;
      padding: 16px;    
      aspect-ratio: auto;
    }
    .show_pass {
      display: flex;
      justify-content: flex-end;
    }
    .flex-container {
      display: flex;
      margin-bottom: 10px;
    }
    .flex-container > div {
      flex: 1;
      font-size: 20px;
      font-family: tahoma;
      line-height: 40px;
      margin: 10px;
      padding: 16px;
      width: 60px;
    }
    
    #container {
      height: 100%; 
      width: 100%;
      padding: 0px;
      margin: 0px;
      opacity: .2;
    }


    // INPUT FIELD 
    :root {

      --input-color: #99A3BA;
      --input-border: #CDD9ED;
      --input-background: #fff;
      --input-placeholder: #CBD1DC;
  
      --input-border-focus: #275EFE;
  
      --group-color: var(--input-color);
      --group-border: var(--input-border);
      --group-background: #C2C2C2;
  
      --group-color-focus: #fff;
      --group-border-focus: var(--input-border-focus);
      --group-background-focus: #678EFE;
  
  }
  
  .form-field {
      display: block;
      width: 100%;
      padding: 8px 16px;
      line-height: 25px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      border-radius: 6px;
      -webkit-appearance: none;
      color: #000;
      border: 1px solid #CDD9ED;
      background: #ffffff;
      transition: border .3s ease;
      &::placeholder {
          color: #CBD1DC;
      }
      &:focus {
          outline: none;
          border-color: #678EFE;
      }
  }
  
  .form-group {
      position: relative;
      display: flex;
      width: 100%;
      & > span,
      .form-field {
          white-space: nowrap;
          display: block;
          &:not(:first-child):not(:last-child) {
              border-radius: 0 6px 6px 0;
          }
          &:first-child {
              border-radius: 6px 0 0 6px;
          }
          &:last-child {
              border-radius: 0 6px 6px 0;
          }
          &:not(:first-child) {
              margin-left: -1px;
          }
      }
      .form-field {
          position: relative;
          z-index: 1;
          flex: 1 1 auto;
          width: 1%;
          margin-top: 0;
          margin-bottom: 0;
      }
      & > span {
          text-align: center;
          padding: 8px 12px;
          font-size: 14px;
          line-height: 25px;
          color: #99A3BA;
          background: #EEF4FF;
          border: 1px solid #CDD9ED;
          transition: background .3s ease, border .3s ease, color .3s ease;
      }
      &:focus-within {
          & > span {
              color: #fff;
              background: #678EFE;
              border-color: #678EFE;
          }
      }
  }
  
  html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
  }
  
  * {
      box-sizing: inherit;
      &:before,
      &:after {
          box-sizing: inherit;
      }
  }
  
  // Center
  body {
      min-height: 100vh;
      font-family: 'Mukta Malar', Arial;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
       
      .form-group {
          max-width: 360px;
          &:not(:last-child) {
              margin-bottom: 32px;
          }
      }
  }
  `]
})
export class LoginclComponent implements OnInit {

  appVersion = "test"
  username: string
  password: string

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  userData = { "username": "", "password": "", "kdcabang": "" };
  resposeData: any;
  dataku: any;

  angForm: FormGroup
  loginForm: FormGroup

  


  // kdcabang: any = ''

  constructor(
    public toastr: ToastrService, public fb: FormBuilder, private router: Router, private http: HttpClient,
    private authService: ApiserviceService
  ) {

    this.loginForm = this.fb.group({
      username :['',[Validators.required,Validators.minLength(1),Validators.email]],
      password : ['',Validators.required],
      kdcabang: ['', [Validators.required, Validators.minLength(3), Validators.nullValidator]]
    })

    this.angForm = this.fb.group({
      username :['', [Validators.required,Validators.minLength(1),Validators.email]],
      password : ['', Validators.required]
    })

  }

  ngOnInit(): void {


    if (localStorage.getItem('userDatacl')) {
      this.router.navigate(['/dashboards/management']);
    }
    // this.lg()
    // this.tmpil()
  }

  // handleValidSubmit() {
  //   console.log(this.formGroup.value);


  // }

  handleReset() {
    this.loginForm.reset();
  }

  getBaseUrlConfig(branchCode: string) {
    console.log("Branch code : " + branchCode)
    this.authService.getBaseUrlConfig(branchCode)
      .subscribe(
        data => {
          if (data !== null) {
            this.authService.setBaseUrlConfig(data.data.slug_cabang)
            Swal.fire({
              title: 'Mohon Tunggu',
              allowEscapeKey: false,
              allowOutsideClick: false,
              timer: 2000,
              didOpen: () => {
                Swal.showLoading();
                this.authService.postData(this.loginForm.value, "login").then((result) => {
                  this.resposeData = result;
                  // loader.present();
                  if (this.resposeData.userData) {


                    if (this.resposeData.userData.status === '0') {
                      this.toastr.error('User Ini Sudah Login Di browser Lain,Silahkan Keluar Login dulu pada browser sebelumnya', 'Gagal Login', {
                        timeOut: 2000,
                      });
                    } else {

                      this.toastr.success('Berhasil Login', 'Sukses', {
                        timeOut: 2000,
                      });



                      let body = {
                        "kdcabang": this.resposeData.userData.kdcabang, "kduser": this.resposeData.userData.username, "stssimpan": '1', "status": '0'
                      }

                      console.log(body)

                      this.authService.keluar(body)
                        .subscribe(response => {

                        })



                      this.router.navigate(['/dashboards/management']);

                      localStorage.setItem('userDatacl', JSON.stringify(this.resposeData))

                      localStorage.setItem('dokterkolom1', JSON.stringify({
                        kddokter1: '',
                        namadokter1: '',
                        kolom1: '',
                      }))



                      localStorage.setItem('dokterkolom2', JSON.stringify({
                        kddokter2: '',
                        namadokter2: '',
                        kolom2: '',
                      }))



                      localStorage.setItem('dokterkolom3', JSON.stringify({
                        kddokter3: '',
                        namadokter3: '',
                        kolom3: '',
                      }))


                    }






                  } else {
                    this.toastr.error('Username atau Password Salah', 'Error');
                  }




                }, (err) => {
                  //Connection failed message
                  this.toastr.error('Username atau Password Salah', 'Error');
                });

              }
            }).then(
            )

          } else {
            console.log("Data tidak ditemukan / kosong!")
          }
        }
      )
  }


  tmpil() {
    this.authService.getall()
      .subscribe(
        data => {

          this.dataku = data;


          //  this.common.closeLoading()
        },
        Error => {

          console.log(Error)
        }

      )
  }

  salah: any;

  signUp() {
    let kdCabang = this.loginForm.value['kdcabang']
    console.log(kdCabang)
    this.getBaseUrlConfig(kdCabang);
  }

}