
import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { ErrorHandler } from './error.handler';



interface pattern {
	name: string,
	code: string
}


@Component({
	selector: 'app-berita',
	templateUrl: './kelompok.component.html',
	styles: [
		`
    .flex-container {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    }

	.item-kegiatan:hover {
		cursor: pointer;
	}

	.flex-container:active {
		
	}

	ul#nav li:hover,ul#nav li.active{
		background-color: yellow;
		color: #fff
	   }
    
    /* Style buttons */
    .btn {
      background-color: #ffffff; /* Blue background */
      border: 2px; /* Remove borders */
      color: white; /* White text */
      margin: 8px 0;
      font-size: 16px; /* Set a font size */
      cursor: pointer; /* Mouse pointer on hover */
      border-radius: 30px;
    }

    .btn > .fa {
      color: #000;
    }

    .btn:hover > .fa {
      color: #fff;
    }

    /* Darker background on mouse-over */
    .btn:hover {
      background-color: #678EFE;
    }


    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
:root {
	--vs-primary: 29 92 255;
}

.data-header {
	background-color: #92a8d1;
}
h6 {
	line-height: 25px;
      font-size: 14px;
      font-weight: 700;
	  color: #fff;
}

div, h6 > p {
	text-align: center;
	height: 100%;
}

/*Dialog Styles*/
dialog {
	padding: 1rem 2rem;
	background: white;
	width: 600px;
	padding-top: 2rem;
	border-radius: 20px;
	border: 0;
	box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);
	animation: fadeIn 1s ease both;
	&::backdrop {
		animation: fadeIn 1s ease both;
		background: rgb(255 255 255 / 40%);
		z-index: 2;
		backdrop-filter: blur(20px);
	}
	.x {
		filter: grayscale(1);
		border: none;
		background: none;
		position: absolute;
		top: 15px;
		right: 10px;
		transition: ease filter, transform 0.3s;
		cursor: pointer;
		transform-origin: center;
		&:hover {
			filter: grayscale(0);
			transform: scale(1.1);
		}
	}
	h3 {
		font-weight: 600;
		font-size: 1.5rem;
		padding-bottom: .1rem;
	}
	p {
		font-size: 1rem;
		line-height: 1rem;
		padding: 0.5rem 0;
		a {
			&:visited {
				color: rgb(var(--vs-primary));
			}
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}


/* INPUT FIELD */
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

.form-field {
	padding: 0 8px;
}



/* TOMBOL HAPUS */

/* .button {
	width: 20%;
    --background: #2b3044;
    --background-hover: #1e2235;
    --text: #fff;
    --shadow: rgba(0, 9, 61, .2);
    --paper: #5c86ff;
    --paper-lines: #fff;
    --trash: #e1e6f9;
    --trash-lines: #bbc1e1;
    --check: #fff;
    --check-background: #5c86ff;
    position: relative;
    border: none;
    outline: none;
    background: none;
    padding: 10px 24px;
    border-radius: 7px;
    min-width: 142px;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    display: flex;
    color: var(--text);
    background: var(--btn, var(--background));
    box-shadow: 0 var(--shadow-y, 4px) var(--shadow-blur, 8px) var(--shadow);
    transform: scale(var(--scale, 1));
    transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
}
.button span {
    display: block;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
    opacity: var(--span-opacity, 1);
    transform: translateX(var(--span-x, 0)) translateZ(0);
    transition: transform 0.4s ease var(--span-delay, 0.2s), opacity 0.3s ease var(--span-delay, 0.2s);
}
.button .trash {
    display: block;
    position: relative;
    left: -8px;
    transform: translate(var(--trash-x, 0), var(--trash-y, 1px)) translateZ(0) scale(var(--trash-scale, 0.64));
    transition: transform 0.5s;
}
.button .trash:before, .button .trash:after {
    content: '';
    position: absolute;
    height: 8px;
    width: 2px;
    border-radius: 1px;
    background: var(--icon, var(--trash));
    bottom: 100%;
    transform-origin: 50% 6px;
    transform: translate(var(--x, 3px), 2px) scaleY(var(--sy, 0.7)) rotate(var(--r, 0deg));
    transition: transform 0.4s, background 0.3s;
}
.button .trash:before {
    left: 1px;
}
.button .trash:after {
    right: 1px;
    --x: -3px;
}
.button .trash .top {
    position: absolute;
    overflow: hidden;
    left: -4px;
    right: -4px;
    bottom: 100%;
    height: 40px;
    z-index: 1;
    transform: translateY(2px);
}
.button .trash .top:before, .button .trash .top:after {
    content: '';
    position: absolute;
    border-radius: 1px;
    background: var(--icon, var(--trash));
    width: var(--w, 12px);
    height: var(--h, 2px);
    left: var(--l, 8px);
    bottom: var(--b, 5px);
    transition: background 0.3s, transform 0.4s;
}
.button .trash .top:after {
    --w: 28px;
    --h: 2px;
    --l: 0;
    --b: 0;
    transform: scaleX(var(--trash-line-scale, 1));
}
.button .trash .top .paper {
    width: 14px;
    height: 18px;
    background: var(--paper);
    left: 7px;
    bottom: 0;
    border-radius: 1px;
    position: absolute;
    transform: translateY(-16px);
    opacity: 0;
}
.button .trash .top .paper:before, .button .trash .top .paper:after {
    content: '';
    width: var(--w, 10px);
    height: 2px;
    border-radius: 1px;
    position: absolute;
    left: 2px;
    top: var(--t, 2px);
    background: var(--paper-lines);
    transform: scaleY(0.7);
    box-shadow: 0 9px 0 var(--paper-lines);
}
.button .trash .top .paper:after {
    --t: 5px;
    --w: 7px;
}
.button .trash .box {
    width: 20px;
    height: 25px;
    border: 2px solid var(--icon, var(--trash));
    border-radius: 1px 1px 4px 4px;
    position: relative;
    overflow: hidden;
    z-index: 2;
    transition: border-color 0.3s;
}
.button .trash .box:before, .button .trash .box:after {
    content: '';
    position: absolute;
    width: 4px;
    height: var(--h, 20px);
    top: 0;
    left: var(--l, 50%);
    background: var(--b, var(--trash-lines));
}
.button .trash .box:before {
    border-radius: 2px;
    margin-left: -2px;
    transform: translateX(-3px) scale(0.6);
    box-shadow: 10px 0 0 var(--trash-lines);
    opacity: var(--trash-lines-opacity, 1);
    transition: transform 0.4s, opacity 0.4s;
}
.button .trash .box:after {
    --h: 16px;
    --b: var(--paper);
    --l: 1px;
    transform: translate(-0.5px, -16px) scaleX(0.5);
    box-shadow: 7px 0 0 var(--paper), 14px 0 0 var(--paper), 21px 0 0 var(--paper);
}
.button .trash .check {
    padding: 4px 3px;
    border-radius: 50%;
    background: var(--check-background);
    position: absolute;
    left: 2px;
    top: 24px;
    opacity: var(--check-opacity, 0);
    transform: translateY(var(--check-y, 0)) scale(var(--check-scale, 0.2));
    transition: transform var(--check-duration, 0.2s) ease var(--check-delay, 0s), opacity var(--check-duration-opacity, 0.2s) ease var(--check-delay, 0s);
}
.button .trash .check svg {
    width: 8px;
    height: 6px;
    display: block;
    fill: none;
    stroke-width: 1.5;
    stroke-dasharray: 9px;
    stroke-dashoffset: var(--check-offset, 9px);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--check);
    transition: stroke-dashoffset 0.4s ease var(--checkmark-delay, 0.4s);
}
.button.delete {
    --span-opacity: 0;
    --span-x: 16px;
    --span-delay: 0s;
    --trash-x: 46px;
    --trash-y: 2px;
    --trash-scale: 1;
    --trash-lines-opacity: 0;
    --trash-line-scale: 0;
    --icon: #fff;
    --check-offset: 0;
    --check-opacity: 1;
    --check-scale: 1;
    --check-y: 16px;
    --check-delay: 1.7s;
    --checkmark-delay: 2.1s;
    --check-duration: 0.55s;
    --check-duration-opacity: 0.3s;
}
.button.delete .trash:before, .button.delete .trash:after {
    --sy: 1;
    --x: 0;
}
.button.delete .trash:before {
    --r: 40deg;
}
.button.delete .trash:after {
    --r: -40deg;
}
.button.delete .trash .top .paper {
    animation: paper 1.5s linear forwards 0.5s;
}
.button.delete .trash .box:after {
    animation: cut 1.5s linear forwards 0.5s;
}
.button.delete, .button:hover {
    --btn: var(--background-hover);
    --shadow-y: 5px;
    --shadow-blur: 9px;
}
.button:active {
    --shadow-y: 2px;
    --shadow-blur: 5px;
    --scale: 0.94;
}
@keyframes paper {
    10%, 100% {
        opacity: 1;
   }
    20% {
        transform: translateY(-16px);
   }
    40% {
        transform: translateY(0);
   }
    70%, 100% {
        transform: translateY(24px);
   }
}
@keyframes cut {
    0%, 40% {
        transform: translate(-0.5px, -16px) scaleX(0.5);
   }
    100% {
        transform: translate(-0.5px, 24px) scaleX(0.5);
   }
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}
* {
    box-sizing: inherit;
}
*:before, *:after {
    box-sizing: inherit;
}
body {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', Arial;
    justify-content: center;
    align-items: center;
    background: #0f172a;
}

.check > i {
	width: 8px;
	height: 8px;
	aspect-ratio: 1/1;
}

.box {
	display: flex;
	align-items: center;
	justify-content: center;
  }
  
  .box div {
	width: 100px;
	height: 100px;
  }

  */



/* BUTTON WITH TOOLTIPS */
.wrapper {
	display: inline-flex;
	list-style: none;
  }
  
  .wrapper .icon {
	position: relative;
	background: #ffffff;
	border-radius: 50%;
	padding: 15px;
	margin: 10px;
	width: 50px;
	height: 50px;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .wrapper .tooltip {
	position: absolute;
	top: 0;
	font-size: 14px;
	background: #ffffff;
	color: #ffffff;
	padding: 5px 8px;
	border-radius: 5px;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .wrapper .tooltip::before {
	position: absolute;
	content: "";
	height: 8px;
	width: 8px;
	background: #ffffff;
	bottom: -3px;
	left: 50%;
	transform: translate(-50%) rotate(45deg);
	transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .wrapper .icon:hover .tooltip {
	top: -45px;
	opacity: 1;
	visibility: visible;
	pointer-events: auto;
  }
  
  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
	text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }
  
  .wrapper .youtube:hover,
  .wrapper .youtube:hover .tooltip,
  .wrapper .youtube:hover .tooltip::before {
	background: #CD201F;
	color: #ffffff;
  }

  /* END OF BUTTON WITH TOOLTIP */

  .button {
	padding: 16px 42px;
	border-radius: 3px;
	box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
	line-height: 1.25;
	background: #CD201F;
	text-decoration: none;
	color: white;
	font-size: 16px;
	letter-spacing: .08em;
	text-transform: uppercase;
	position: relative;
	transition: background-color .6s ease;
	overflow: hidden;
	&:after {
	  content: "";
	  position: absolute;
	  width: 0;
	  height: 0;
	  top: 50%;
	  left: 50%;
	  top: var(--mouse-y);
	  left: var(--mouse-x);
	  transform-style: flat;
	  transform: translate3d(-50%,-50%,0);
	  background: rgba(white,.1);
	  border-radius: 100%;
	  transition: width .3s ease, height .3s ease;
	}
	&:focus,
	&:hover {
		background: darken(#CD201F,7%);
		cursor: pointer;
	}
	&:active {
	  &:after {
		width: 300px;
		height: 300px;
	  }
	}
  }

  :host ::ng-deep .width-100 {
	width: 100%;
  }

  .input-error {
	border: red 1px solid;
  }

  .button-save {
	color: #000000;
	background-color: #ACF7C1;
	padding: 24px;
	border-radius: 8px;
	cursor: pointer;
  }
  .button-close {
	color: #ffffff;
	background-color: #5C0029;
	padding: 24px;
	border-radius: 8px;
	cursor: pointer;
  }
  
  `
	], providers: [
		DatePipe,
		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	]
})
export class kelompokComponent implements OnInit {

	addKegiatan: FormGroup
	addPesertaForm: FormGroup
	chooseClubScreen: FormGroup
	formAddKegiatanScreen: FormGroup


	isLinear: boolean = true
	isProccessFailed: boolean = false
	isShowConfirmDialog: boolean = false
	isClubSelected: boolean = false

	deleteType: string = "kegiatan"
	addType: string = "kegiatan"
	currentDate: string = "15-11-2016"
	addDate: any

	isEduIDSelected: string = null
	currentEduID: string = null
	currentCardNumber: string = null
	pipe = new DatePipe('en-US');
	selected: string = null;
	date: any = null;
	selectedClub: string = ""
	selectedClubID: string = ""
	successMsg: string = ""
	searchKeyword: string = ""
	searchPesertaKeyword: string = ""
	errors: any = {};

	selectedKegiatan: any

	// CONTENT RIGHT
	listOfKegiatan: object[] = []
	listOfClub: object[] = []
	listOfPesertaKegiatan: object[] = []
	listOfClubDD: object[] = []
	listOfKegiatanDD: pattern[] = []
	// listOfKegiatan: { eduID: string, namaKelompok: string, namaKegiatan: string, deskripsiKegiatan: string, biaya: string }[] = [];

	selectClubForm = this.fb.group({
		currentClub: ['', Validators.required]
	})

	addKegiatanForm = this.fb.group({
		clubID: ['', [Validators.nullValidator]],
		// selectedKegiata: ['', Validators.required],
		selectedClub: ['', [Validators.required]],
		materi: ['', Validators.required],
		pembicara: ['', Validators.required],
		tglKegiatan: ['', Validators.required],
		lokasi: ['', Validators.required],
		biaya: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[0-9]\d*$/)]],
		keterangan: ['', Validators.nullValidator,],
	})

	// addKegiatanForm = new FormGroup({
	// 	clubID: new FormControl('', Validators.required),
	// 	selectedKegiatan: new FormControl('', Validators.required),
	// 	selectedClub: new FormControl('', Validators.required),
	// 	materi: new FormControl('', Validators.required),
	// 	pembicara: new FormControl('', Validators.required),
	// 	tglKegiatan: new FormControl('', Validators.required),
	// 	lokasi: new FormControl('', Validators.required),
	// 	biaya: new FormControl(null, {
	// 		validators: [Validators.required, ],
	// 		updateOn: 'blur'
	// 	}),
	// 	keterangan: new FormControl('', Validators.required),
	// })

	constructor(private errorHandler: ErrorHandler,public fb: FormBuilder, private config: PrimeNGConfig, private authService: ApiserviceService, public toastr: ToastrService,) {
		this.onLoadDataDropdownKegiatan()
	}

	ngOnInit(): void {
		this.errorHandler.handleErrors(this.addKegiatanForm, this.errors);
		this.chooseClubScreen = new FormGroup({

		})
		this.formAddKegiatanScreen = new FormGroup({

		})
		this.addKegiatan = new FormGroup({
			keterangan: new FormControl('', Validators.required)
		})
		this.currentDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
		this.addDate = this.currentDate
		this.showCalendarDialog()
		this.test()
		this.processSubmitData()
		this.addPesertaForm = new FormGroup({
			eduID: new FormControl(this.currentEduID, [Validators.nullValidator]),
			noKartu: new FormControl({ value: '', disabled: false, updateOn: blur },
				[
					Validators.required,
					// Validators.minLength(6),
					// Validators.maxLength(6),
					Validators.pattern(/^[0-9]\d*$/),
				]
			),
		})
	}

	onChange(keyword: string = "") {
		let clubCode = this.selectClubForm.value.currentClub
		console.log("Current Club Selected: " + clubCode)
		let calendarDialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
		if (calendarDialog) {
			// Call the showModal() method on the dialog element
			calendarDialog.close();
		}
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading();
				let key = keyword !== "" ? keyword : clubCode
				this.authService.getAllBpjsClub(key).subscribe(
					(data: any) => {
						if (!data.success) {
							this.isProccessFailed = true
						} else {
							this.isClubSelected = true
							console.log("Response body : " + JSON.stringify(data.data))

							let dataRes = data.data.list
							this.listOfClub = []

							let convertedArray = dataRes.map(item => {
								return {
									clubId: item.clubId,
									namaKelompok: item.nama,
									namaKetua: item.ketua_nama,
									alamat: item.alamat,
									tanggalMulai: item.tglMulai,
									tanggalAkhir: item.tglAkhir
								}
							})
							this.listOfClub = convertedArray
							calendarDialog.showModal()
						}
					}
				)
			}
		}).then(
			() => { },
			(dismiss) => {
				location.reload();
			}
		)

	}

	selectClubItem(stepper: MatStepper, clubID: any) {
		console.log("Selected club id : " + JSON.stringify(clubID))
		this.selectedClubID = clubID['clubId']
		stepper.next()
	}

	showCalendarDialog() {
		let calendarDialog: HTMLDialogElement | null = document.getElementById("calendarDialog") as HTMLDialogElement;
		if (calendarDialog) {
			// Call the showModal() method on the dialog element
			calendarDialog.showModal();
		} else {
			console.error("Dialog element not found.");
		}
	}

	chooseDate() {
		let calendarDialog: HTMLDialogElement | null = document.getElementById("calendarDialog") as HTMLDialogElement;
		if (calendarDialog) {
			// Call the showModal() method on the dialog element
			calendarDialog.close();
			this.currentDate = this.date !== null ? this.pipe.transform(this.date, 'dd-MM-yyyy') : this.pipe.transform(Date.now(), 'dd-MM-yyyy')
			this.loadData(this.currentDate)
			console.log("Selected date : " + this.currentDate)
		} else {
			console.error("Dialog element not found.");
		}
	}

	showConfirmDialog(delType: string = "test", eduID: string = "-", cardNumber: string = "-"): void {


		this.deleteType = delType
		this.currentEduID = eduID
		this.currentCardNumber = cardNumber
		console.log("Selected delete type : " + this.deleteType)
		console.log("Current Edu ID : " + this.currentEduID)
		let confirmDialog: HTMLDialogElement | null = document.getElementById("confirmDialog") as HTMLDialogElement;

		// Check if the dialog element exists
		if (confirmDialog) {
			// Call the showModal() method on the dialog element
			confirmDialog.showModal();
		} else {
			console.error("Dialog element not found.");
		}
	}

	test() {
		console.log("delete delete type : " + this.deleteType)
		let confirmDialog: HTMLDialogElement | null = document.getElementById("confirmDialog") as HTMLDialogElement;
		let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
		let failedDialog: HTMLDialogElement | null = document.getElementById("failedDialog") as HTMLDialogElement;
		document.querySelectorAll('#delete').forEach((button: Element) => {
			button.addEventListener('click', (e: MouseEvent) => {
				Swal.fire({
					title: 'Mohon Tunggu!',
					allowEscapeKey: false,
					allowOutsideClick: false,
					timer: 2000,
					didOpen: () => {
						confirmDialog.close()
						this.deleteType === "kegiatan" ? this.onDeleteKegiatan(this.currentEduID) : this.onDeletePesertaKegiatan(this.currentEduID, this.currentCardNumber)
						Swal.showLoading();
					}
				}).then(
					() => { },
					(dismiss) => {
						location.reload();
					}
				)
			});
		});
		document.querySelectorAll('#close').forEach((button: Element) => {
			button.addEventListener('click', (e: MouseEvent) => {
				if(successDialog) successDialog.close()
				if(failedDialog) failedDialog.close()
				this.onLoadDataKegiatan(this.currentDate)
				location.reload()
			});
		});
	}

	processSubmitData() {
		let confirmSaveDialog: HTMLDialogElement | null = document.getElementById("confirmSaveDialog") as HTMLDialogElement;
		
		document.querySelectorAll('#save').forEach((button: Element) => {
			button.addEventListener('click', (e: MouseEvent) => {
				Swal.fire({
					title: 'Mohon Tunggu!',
					allowEscapeKey: false,
					allowOutsideClick: false,
					timer: 2000,
					didOpen: () => {
						confirmSaveDialog.close()
						Swal.showLoading()
						this.addType === "kegiatan" ? this.onSubmitKegiatan() : this.onSubmitPeserta()
					}
				}).then(
					() => { },
					(dismiss) => {
						location.reload();
					}
				)
			});
		});
	}

	loadData(date: string) {
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading();
				this.onLoadDataKegiatan(date)
			}
		}).then(
			() => { },
			(dismiss) => {
				document.querySelector(".data-header").scrollIntoView();
			}
		)
	}

	selectItem(eduID: string) {
		this.currentEduID = eduID
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				this.listOfPesertaKegiatan = []
				this.currentEduID = eduID
				this.onLoadDataPesertaKegiatan(eduID)
				Swal.showLoading();
			}
		}).then(
			() => { },
			(dismiss) => {
				document.querySelector(".data-header").scrollIntoView();
			}
		)
		this.isEduIDSelected = eduID
	}

	onLoadDataKegiatan(date: string): any {
		this.authService.getAllBpjsKegiatan(date).subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
				} else {
					let dataRes = data.data.list
					this.listOfKegiatan = []

					let convertedArray = dataRes.map(item => {
						return {
							eduID: item.eduId,
							namaKelompok: item.kelompok.nama,
							namaKegiatan: item.kegiatan.nama,
							deskripsiKegiatan: item.materi,
							biaya: item.biaya
						}
					})
					this.listOfKegiatan = convertedArray
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
	}

	onLoadDataDropdownKegiatan() {
		this.authService.getAllBpjsKegiatanDropdown().subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
				} else {
					let dataResKelompok = data.data.kelompok
					let dataResKegiatan = data.data.kegiatan

					let arrayKelompok = dataResKelompok.map(item => {
						return {
							code: item.kode,
							name: item.nama
						}
					})
					let arrayKegiatan = dataResKegiatan.map(item => {
						return {
							code: item.kode,
							name: item.nama
						}
					})

					this.listOfKegiatanDD = arrayKelompok
					this.listOfClubDD = arrayKegiatan
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
	}

	onLoadDataPesertaKegiatan(eduID: string): any {
		this.authService.getAllBpjsPesertaKegiatan(eduID).subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
				} else {
					let dataRes = data.data.list


					let convertedArray = dataRes.map(item => {
						return {
							noKartu: item.peserta.noKartu ? item.peserta.noKartu : "-",
							nama: item.peserta.nama ? item.peserta.nama : "-",
							jenisKelamin: item.peserta.sex ? item.peserta.sex : "-",
							namaKelas: item.peserta.jnsKelas.nama ? item.peserta.jnsKelas.nama : "-",
							namaJenisPeserta: item.peserta.jnsPeserta.nama === null ? item.peserta.jnsPeserta.nama : "-",
							namaAsuransi: item.peserta.asuransi.nmAsuransi ? item.peserta.asuransi.nmAsuransi : "-",
							pstprol: item.peserta.pstProl ? item.peserta.pstProl.nama : "-",
							pstprb: item.peserta.pstPrb ? item.peserta.pstPrb.nama : "-",
							eduId: item.eduId,
						}
					})
					this.listOfPesertaKegiatan = convertedArray
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
	}

	onSearchClubID() {
		console.log("Club ID : " + this.searchKeyword)
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				this.onLoadDataKegiatan(this.searchKeyword)
				Swal.showLoading();
			}
		}).then(
			() => { },
			(dismiss) => {
				document.querySelector(".data-header").scrollIntoView();
			}
		)
	}

	onSearchPeserta() {
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				this.onLoadDataPesertaKegiatan(this.searchPesertaKeyword)
				Swal.showLoading();
			}
		}).then(
			() => { },
			(dismiss) => {
				document.querySelector(".data-header").scrollIntoView();
			}
		)
	}

	showSavingDialog(savingType: string = "kegiatan") {
		this.addType = savingType
		let confirmDialog: HTMLDialogElement | null = document.getElementById("confirmSaveDialog") as HTMLDialogElement;
		let addPesertaDialog: HTMLDialogElement | null = document.getElementById("dialogKegiatan") as HTMLDialogElement;
		
		if(addPesertaDialog) addPesertaDialog.close()
		if (confirmDialog) confirmDialog.showModal()
	}
	kdkegiatan:any=''
	onSubmitKegiatan(): void {

		let formValue = this.addKegiatanForm

		if(formValue.invalid) return;

		let bodyReq = {
			"eduId": null,
			"clubId": this.selectedClubID,
			"tglPelayanan": this.pipe.transform(formValue.value.tglKegiatan, 'dd-MM-yyyy'),
			"kdKegiatan": '01',
			"kdKelompok": formValue.value.selectedClub,
			"materi": formValue.value.materi,
			"pembicara": formValue.value.pembicara,
			"lokasi": formValue.value.lokasi,
			"keterangan": formValue.value.keterangan,
			"biaya": formValue.value.biaya,
		};

		console.log("Body Req : " + bodyReq)
		this.authService.addBpjsKegiatan(bodyReq).subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
				} else {
					let addFormDialog: HTMLDialogElement | null = document.getElementById("calendarDialog") as HTMLDialogElement;
					let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;

					if (addFormDialog) addFormDialog.close();
					this.successMsg = data['message']
					successDialog.showModal();
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
		
	}
	showDialogKegiatan() {
		console.log("Current Edu ID : " + this.currentEduID)
		let dialogKegiatan: HTMLDialogElement | null = document.getElementById("dialogKegiatan") as HTMLDialogElement;

		// Check if the dialog element exists
		if (dialogKegiatan) {
			dialogKegiatan.showModal()
		}
	}

	onSubmitPeserta() {
		let formValue = this.addPesertaForm
		let bodyReq = {
			"eduId": formValue.get("eduID").value,
			"noKartu": formValue.get("noKartu").value,
		};
		this.authService.addBpjsPesertaKegiatan(bodyReq).subscribe(
			(data: any) => {
				if (!data.success) {

					// this.isProccessFailed = true
				} else {
					let dialogKegiatan: HTMLDialogElement | null = document.getElementById("dialogKegiatan") as HTMLDialogElement;
					let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
					// Check if the dialog element exists
					if(dialogKegiatan) dialogKegiatan.close()
					this.successMsg = data['message']
					successDialog.showModal();
				} (error: any) => {
					this.toastr.error(error.error.message, 'Error');
				}
			}
		)
	}

	onDeleteKegiatan(eduID: string): any {
		let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
		let failedDialog: HTMLDialogElement | null = document.getElementById("failedDialog") as HTMLDialogElement;

		// Check if the dialog element exists

		this.authService.deleteBpjsKegiatan(eduID).subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
					if (failedDialog) {
						// Call the showModal() method on the dialog element
						failedDialog.showModal();
					} else {
						console.error("Dialog element not found.");
					}
				} else {
					this.isProccessFailed = false
					if (successDialog) {
						// Call the showModal() method on the dialog element
						successDialog.showModal();
					} else {
						console.error("Dialog element not found.");
					}
					this.onLoadDataKegiatan(this.currentDate)
					location.reload
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
	}


	onDeletePesertaKegiatan(eduID: string, noKartu: string): any {
		let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
		let failedDialog: HTMLDialogElement | null = document.getElementById("failedDialog") as HTMLDialogElement;

		// Check if the dialog element exists

		this.authService.deleteBpjsPesertaKegiatan(eduID, noKartu).subscribe(
			(data: any) => {
				if (!data.success) {
					this.isProccessFailed = true
					if (failedDialog) {
						// Call the showModal() method on the dialog element
						failedDialog.showModal();
					} else {
						console.error("Dialog element not found.");
					}
				} else {
					this.isProccessFailed = false
					if (successDialog) {
						// Call the showModal() method on the dialog element
						successDialog.showModal();
					} else {
						console.error("Dialog element not found.");
					}
					this.onLoadDataPesertaKegiatan(eduID)
					location.reload
				}
			}, (error: any) => {
				this.toastr.error(error.error.message, 'Error');
			}
		)
	}

}



