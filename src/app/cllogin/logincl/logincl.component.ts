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
  styleUrls: ['./logincl.component.css']
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