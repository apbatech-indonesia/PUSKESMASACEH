
import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';

import { ApiserviceService } from 'src/app/apiservice.service';
import { ToastrService } from 'ngx-toastr';

import {
	trigger,
	state,
	style,
	animate,
	transition,
} from '@angular/animations';
import Swal from 'sweetalert2';

enum MCU_CLICK_EVENT {
	ADD,
	EDIT,
	DELETE,
	DETAIL
}

interface MCU {
	kdMCU: number,
	noKunjungan: string,
	kdProvider: string,
	tglPelayanan: string,
	tekananDarahSistole: number,
	tekananDarahDiastole: number,
	radiologiFoto: string,
	darahRutinHemo: number,
	darahRutinLeu: number,
	darahRutinErit: number,
	darahRutinLaju: number,
	darahRutinHema: number,
	darahRutinTrom: number,
	lemakDarahHDL: number,
	lemakDarahLDL: number,
	lemakDarahChol: number,
	lemakDarahTrigli: number,
	gulaDarahSewaktu: number,
	gulaDarahPuasa: number,
	gulaDarahPostPrandial: number,
	gulaDarahHbA1c: number,
	fungsiHatiSGOT: number,
	fungsiHatiSGPT: number,
	fungsiHatiGamma: number,
	fungsiHatiProtKual: number,
	fungsiHatiAlbumin: number,
	fungsiGinjalCrea: number,
	fungsiGinjalUreum: number,
	fungsiGinjalAsam: number,
	fungsiJantungABI: number,
	fungsiJantungEKG: number,
	fungsiJantungEcho: number,
	funduskopi: any,
	pemeriksaanLain: any,
	keterangan: any
}

@Component({
	selector: 'app-berita',
	templateUrl: './mcu.component.html',
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

	  .form-field-preview {
		display: block;
		border: none;
		width: 100%;
		text-align: start;
		font-size: 16px;
		font-weight: 500;
		font-family: inherit;
		border-radius: 6px;
		-webkit-appearance: none;
		color: #678EFE;
		background: #ffffff;
	}

	.preview-container {
		width: 100%;
		align-items: baseline;
		margin-top: 16px;
		display: flex; 
		flex-flow: row; 
		flex-wrap: nowrap;
		justify-content: space-evenly;	
	}

	.preview-container-wrap {
		width: 100%;
		align-items: baseline;
		margin-top: 16px;
		display: flex; 
		flex-flow: row; 
		flex-wrap: wrap;
		justify-content: space-evenly;	
	}

	.preview-container-child {
		flex: 1 0 auto;
		width: 35%;
	}

	.preview-container-child-3 {
		flex: 1 0 auto;
		width: 30%;
	}

	.preview-container-child-4 {
		width: 25%;
	}

	.preview-container-child-5 {
		width: 20%;
	}

	.preview-title {
		width: 100%; 
		text-align: start;
		color: gray;
		text-size: 14px;
	}
	

	.preview-main-title {
		width: 100%;
		margin: 8px 0;
		text-align: start;
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

		.wrapper .info-btn:hover,
		.wrapper .info-btn:hover .info,
		.wrapper .info-btn:hover .info::before {
			background: #7FBEAB;
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

		.parent {
			display: flex;
			column-gap: 12px;
			margin: 16px 0;
			 padding: 0px;
		}

		.parent-column {
			display: flex;
			flex-direction: column;
			
		}

		.child {
			flex: 1 1 200px;
		}

		.example-input-wrapper {
			margin-bottom: 16px;
		  }
		  
		  label {
			margin-right: 4px;
		  }
		
		  .btn-container {
			display: flex;
			justify-content: end;
			column-gap: 16px;
		  }

		  .btn-container > .next {

		  }

		  .button-save {
			color: #000000;
			background-color: #ACF7C1;
			padding: 24px;
			border-radius: 8px;
			cursor: pointer;
		  }
		  .button-close {
			color: #666A86;
			background-color: #B2C9AB;
			padding: 24px;
			border-radius: 8px;
			cursor: pointer;
		  }

		`
	],
	providers: [
		DatePipe,
		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	]
})
export class mcuComponent implements OnInit {
	kodeForm: FormGroup
	kunjunganForm: FormGroup
	tekananDarahForm: FormGroup
	darahRutinForm: FormGroup
	lemakDarahForm: FormGroup
	gulaDarahForm: FormGroup
	fungsiHatiForm: FormGroup
	fungsiGinjalForm: FormGroup
	fungsiJantungForm: FormGroup
	infoTambahanForm: FormGroup
	keteranganForm: FormGroup
	viewDataForm: FormGroup

	duration: any = 20000
	panelOpenState: boolean = false

	codeOfMCU: string = ""
	dateOfKunjungan: string = ""
	addDialogTitle: string = "Tambah MCU"
	addDialogContent: string = "Isi form didalam masing masing langkah dengan data yang benar"
	addDialogButtonLabel: string = "Tambah"

	selectedMCU: MCU = null
	searchKeyword: string = ""
	selectedNoTransaksi: string = ""
	selectedNoKunjungan: string = ""

	failedMsg: string = "Mohon maaf proses gagal!"
	successMsg: string = "Selamat proses berhasil dijalankan!"

	isDetailDialogShow: boolean = false

	pipe = new DatePipe('en-US');
	currentDate: any

	currentClickEvent: MCU_CLICK_EVENT = MCU_CLICK_EVENT.ADD

	listOfPasien: object[] = []
	listOfMCU: MCU[] = []
	testDataArray: string[] = []


	constructor(private fb: FormBuilder, private config: PrimeNGConfig, private authService: ApiserviceService, public toastr: ToastrService,) {
	}

	ngOnInit(): void {
		this.currentDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
		this.dateOfKunjungan = this.currentDate
		this.viewDataForm = this.fb.group({
			codeOfMCU: ['', Validators?.nullValidator],
			codeOfProvider: ['', Validators?.nullValidator],
			numberOfKunjungan: ['', Validators?.nullValidator],
			dateOfKunjungan: ['', Validators?.nullValidator],
			numberOfSistole: ['', Validators.nullValidator],
			numberOfDiastole: ['', Validators.nullValidator],
			numberOfHemo: ['', Validators.nullValidator],
			numberOfLeu: ['', Validators.nullValidator],
			numberOfErit: ['', Validators.nullValidator],
			numberOfLaju: ['', Validators.nullValidator],
			numberOfHema: ['', Validators.nullValidator],
			numberOfTrom: ['', Validators.nullValidator],
			numberOfHDL: ['', Validators.nullValidator],
			numberOfLDL: ['', Validators.nullValidator],
			numberOfChol: ['', Validators.nullValidator],
			numberOfTrigli: ['', Validators.nullValidator],
			numberOfGDSewaktu: ['', Validators.nullValidator],
			numberOfGDPuasa: ['', Validators.nullValidator],
			numberOfGDPrandial: ['', Validators.nullValidator],
			numberOfGDHba1c: ['', Validators.nullValidator],
			numberOfFHSGOT: ['', Validators.nullValidator],
			numberOfFHSGPT: ['', Validators.nullValidator],
			numberOfFHGamma: ['', Validators.nullValidator],
			numberOfFHProtKual: ['', Validators.nullValidator],
			numberOfFHAlbumin: ['', Validators.nullValidator],
			numberOfFGCrea: ['', Validators.nullValidator],
			numberOfFGUreum: ['', Validators.nullValidator],
			numberOfFGAsam: ['', Validators.nullValidator],
			numberOfFJABI: ['', Validators.nullValidator],
			numberOfFJEKG: ['', Validators.nullValidator],
			numberOfFJEcho: ['', Validators.nullValidator],
			valueOfRadiologiFoto: ['', Validators.nullValidator],
			valueOfFunduskopi: ['', Validators.nullValidator],
			valueOfPemeriksaLainnya: ['', Validators.nullValidator],
			valueOfKeterangan: ['', Validators.nullValidator],
		});
		this.kodeForm = this.fb.group({
			codeOfMCU: ['',
				[
					Validators.required,
				]
			],
			codeOfProvider: ['',
				[
					Validators.required,
				]
			],
		});
		this.kunjunganForm = this.fb.group({
			numberOfKunjungan: ['',
				[
					Validators.required,
				]
			],
			dateOfPelayanan: ['',
				[
					Validators.required
				]
			],
		});
		this.tekananDarahForm = this.fb.group({
			numberOfSistole: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfDiastole: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.darahRutinForm = this.fb.group({
			numberOfHemo: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfLeu: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfErit: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfLaju: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfHema: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfTrom: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.lemakDarahForm = this.fb.group({
			numberOfHDL: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfLDL: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfChol: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfTrigli: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.gulaDarahForm = this.fb.group({
			numberOfGDSewaktu: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfGDPuasa: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfGDPrandial: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfGDHba1c: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.fungsiHatiForm = this.fb.group({
			numberOfFHSGOT: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFHSGPT: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFHGamma: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFHProtKual: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFHAlbumin: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.fungsiGinjalForm = this.fb.group({
			numberOfFGCrea: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFGUreum: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFGAsam: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.fungsiJantungForm = this.fb.group({
			numberOfFJABI: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFJEKG: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			numberOfFJEcho: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.infoTambahanForm = this.fb.group({
			valueOfRadiologiFoto: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			valueOfFunduskopi: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
			valueOfPemeriksaLainnya: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})
		this.keteranganForm = this.fb.group({
			valueOfKeterangan: ['',
				[
					Validators.required,
					// Validators.pattern(/^[0-9]\d*$/),

				]
			],
		})

		this.getAllDataPasien()
	}

	showAddDialog() {
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading()
				this.authService.getBpjsMCUPasienDetail(this.selectedNoTransaksi).subscribe(
					(data: any) => {
						if (!data.success) { }
						this.currentClickEvent = MCU_CLICK_EVENT.ADD
						this.addDialogTitle = "Tambah MCU"
						let addMCUDialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
						if (addMCUDialog) {
							let item = data.data
							this.kodeForm.patchValue({
								codeOfMCU: item.kodemcu === null ? "-" : item.kodemcu,
								codeOfProvider: item.kdprov === null ? "-" : item.kdprov
							})
							this.kunjunganForm.patchValue({
								numberOfKunjungan: item.nokunjungan === null ? "-" : item.nokunjungan,
								dateOfPelayanan: item.tglpriksa === null ? "-" : item.tglpriksa
							})
							addMCUDialog.showModal()
							document.querySelectorAll('#save').forEach((button: Element) => {
								button.addEventListener('click', (e: MouseEvent) => {
									if (addMCUDialog) addMCUDialog.close()
									Swal.fire({
										title: 'Mohon Tunggu!',
										allowEscapeKey: false,
										allowOutsideClick: false,
										timer: 2000,
										didOpen: () => {
											addMCUDialog.close()
											this.onSubmitData(MCU_CLICK_EVENT.ADD)
											Swal.showLoading()
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

	showDetailDialog(item: MCU) {
		console.log("Data detail : " + JSON.stringify(item))
		this.viewDataForm.patchValue({
			codeOfMCU: item.kdMCU,
			codeOfProvider: item.kdProvider,
			numberOfKunjungan: item.noKunjungan,
			dateOfKunjungan: item.tglPelayanan,
			numberOfSistole: item.tekananDarahSistole,
			numberOfDiastole: item.tekananDarahSistole,
			numberOfHemo: item.darahRutinHemo,
			numberOfLeu: item.darahRutinLeu,
			numberOfErit: item.darahRutinErit,
			numberOfLaju: item.darahRutinLaju,
			numberOfHema: item.darahRutinHema,
			numberOfTrom: item.darahRutinTrom,
			numberOfHDL: item.lemakDarahHDL,
			numberOfLDL: item.lemakDarahLDL,
			numberOfChol: item.lemakDarahChol,
			numberOfTrigli: item.lemakDarahTrigli,
			numberOfGDSewaktu: item.gulaDarahSewaktu,
			numberOfGDPuasa: item.gulaDarahPuasa,
			numberOfGDPrandial: item.gulaDarahPostPrandial,
			numberOfGDHba1c: item.gulaDarahHbA1c,
			numberOfFHSGOT: item.fungsiHatiSGOT,
			numberOfFHSGPT: item.fungsiHatiSGPT,
			numberOfFHGamma: item.fungsiHatiGamma,
			numberOfFHProtKual: item.fungsiHatiProtKual,
			numberOfFHAlbumin: item.fungsiHatiAlbumin,
			numberOfFGCrea: item.fungsiGinjalCrea,
			numberOfFGUreum: item.fungsiGinjalUreum,
			numberOfFGAsam: item.fungsiGinjalAsam,
			numberOfFJABI: item.fungsiJantungABI,
			numberOfFJEKG: item.fungsiJantungEKG,
			numberOfFJEcho: item.fungsiJantungEcho,
			valueOfRadiologiFoto: item.radiologiFoto,
			valueOfFunduskopi: item.funduskopi,
			valueOfPemeriksaLainnya: item.pemeriksaanLain,
			valueOfKeterangan: item.keterangan
		})

		let detailDialog: HTMLDialogElement | null = document.getElementById("detailDialog") as HTMLDialogElement;
		if (detailDialog) {
			detailDialog.showModal()
			document.querySelectorAll('#close').forEach((button: Element) => {
				button.addEventListener('click', (e: MouseEvent) => {
					detailDialog.close()
				})
			})
		}
	}

	showingSaveDialog() {
		let addMCUDialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
		let confirmSaveDialog: HTMLDialogElement | null = document.getElementById("confirmSaveDialog") as HTMLDialogElement;
		if (confirmSaveDialog) {
			confirmSaveDialog.showModal()
		}
	}

	onSubmitData(eventType: MCU_CLICK_EVENT) {
		let addMCUDialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
		let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
		let failedDialog: HTMLDialogElement | null = document.getElementById("failedDialog") as HTMLDialogElement;

		let kode = this.kodeForm
		let kunjungan = this.kunjunganForm
		let tekananDarah = this.tekananDarahForm
		let darahRutin = this.darahRutinForm
		let lemakDarah = this.lemakDarahForm
		let gulaDarah = this.gulaDarahForm
		let fungsiHati = this.fungsiHatiForm
		let fungsiGinjal = this.fungsiGinjalForm
		let fungsiJantung = this.fungsiJantungForm
		let infoTambahan = this.infoTambahanForm
		let keterangan = this.keteranganForm

		if (kode.invalid && kunjungan.invalid && tekananDarah.invalid &&
			darahRutin.invalid && lemakDarah.invalid && gulaDarah.invalid &&
			fungsiHati.invalid && fungsiJantung.invalid && infoTambahan
		) return;

		let bodyReq = {
			"kdMCU": kode.value.codeOfMCU,
			"noKunjungan": this.selectedNoKunjungan,
			"kdProvider": kode.value.codeOfProvider,
			"tglPelayanan": this.pipe.transform(kunjungan.value.dateOfPelayanan , 'dd-MM-yyyy'),
			"tekananDarahSistole": tekananDarah.value.numberOfSistole,
			"tekananDarahDiastole": tekananDarah.value.numberOfDiastole,
			"darahRutinHemo": darahRutin.value.numberOfHemo,
			"darahRutinLeu": darahRutin.value.numberOfLeu,
			"darahRutinErit": darahRutin.value.numberOfErit,
			"darahRutinLaju": darahRutin.value.numberOfLaju,
			"darahRutinHema": darahRutin.value.numberOfHema,
			"darahRutinTrom": darahRutin.value.numberOfTrom,
			"lemakDarahHDL": lemakDarah.value.numberOfHDL,
			"lemakDarahLDL": lemakDarah.value.numberOfLDL,
			"lemakDarahChol": lemakDarah.value.numberOfChol,
			"lemakDarahTrigli": lemakDarah.value.numberOfTrigli,
			"gulaDarahSewaktu": gulaDarah.value.numberOfGDSewaktu,
			"gulaDarahPuasa": gulaDarah.value.numberOfGDPuasa,
			"gulaDarahPostPrandial": gulaDarah.value.numberOfGDPrandial,
			"gulaDarahHbA1c": gulaDarah.value.numberOfGDHba1c,
			"fungsiHatiSGOT": fungsiHati.value.numberOfFHSGOT,
			"fungsiHatiSGPT": fungsiHati.value.numberOfFHSGPT,
			"fungsiHatiGamma": fungsiHati.value.numberOfFHGamma,
			"fungsiHatiProtKual": fungsiHati.value.numberOfFHProtKual,
			"fungsiHatiAlbumin": fungsiHati.value.numberOfFHAlbumin,
			"fungsiGinjalCrea": fungsiGinjal.value.numberOfFGCrea,
			"fungsiGinjalUreum": fungsiGinjal.value.numberOfFGUreum,
			"fungsiGinjalAsam": fungsiGinjal.value.numberOfFGAsam,
			"fungsiJantungABI": fungsiJantung.value.numberOfFJABI,
			"fungsiJantungEKG": fungsiJantung.value.numberOfFJEKG,
			"fungsiJantungEcho": fungsiJantung.value.numberOfFJEcho,
			"radiologiFoto": infoTambahan.value.valueOfRadiologiFoto,
			"funduskopi": infoTambahan.value.valueOfFunduskopi,
			"pemeriksaanLain": infoTambahan.value.valueOfPemeriksaLainnya,
			"keterangan": infoTambahan.value.valueOfKeterangan
		};

		if (eventType == MCU_CLICK_EVENT.ADD) {
			this.authService.addBpjsMCU(bodyReq).subscribe(
				(data: any) => {
					if (!data.success) {
						this.failedMsg = data['message']
						if (failedDialog) {
							failedDialog.showModal()
							document.querySelectorAll('#close').forEach((button: Element) => {
								button.addEventListener('click', (e: MouseEvent) => {
									if (addMCUDialog) addMCUDialog.showModal()
								});
							});
						}

					} else {
						this.successMsg = data['message']
						if (addMCUDialog) addMCUDialog.close()
						if (successDialog) {
							successDialog.showModal()
							document.querySelectorAll('#close').forEach((button: Element) => {
								button.addEventListener('click', (e: MouseEvent) => {
									successDialog.close()
								});
							});
						}
					}
				}, (error: any) => {
					this.toastr.error(error.error.message, 'Error');
				}
			)
		} else {
			this.authService.updateBpjsMCU(bodyReq).subscribe(
				(data: any) => {
					if (!data.success) {
					} else {
						this.successMsg = data['message']
						if (addMCUDialog) addMCUDialog.close()
						if (successDialog) {
							successDialog.showModal()
							document.querySelectorAll('#close').forEach((button: Element) => {
								button.addEventListener('click', (e: MouseEvent) => {
									successDialog.close()
								});
							});
						}
					}
				}
			)
		}
	}

	getAllDataPasien() {
		let pasienDialog: HTMLDialogElement | null = document.getElementById("pasienDialog") as HTMLDialogElement;
		let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement;
		let failedDialog: HTMLDialogElement | null = document.getElementById("failedDialog") as HTMLDialogElement;
		this.authService.getBpjsMCUAllPasien().subscribe(
			(data: any) => {
				if (!data.success) {
					this.failedMsg = data['message']
					if (failedDialog) {
						failedDialog.showModal()
						document.querySelectorAll('#close').forEach((button: Element) => {
							button.addEventListener('click', (e: MouseEvent) => {
								failedDialog.close()
							});
						});
					}
				} else {
					let dataRes = data.data
					this.listOfPasien = []

					let convertedArray = dataRes.map(item => {
						return {
							noTransaksi: item.notransaksi,
							noKunjungan: item.nokunjungan,
							noRM: item.norm,
							pasien: item.pasien,
							namaPoli: item.nampoli,
							tglPeriksa: item.tglpriksa
						}
					})
					this.listOfPasien = convertedArray
					if (pasienDialog) pasienDialog.showModal()
				}
			}
		)
	}
	close(){
		let pasienDialog: HTMLDialogElement | null = document.getElementById("pasienDialog") as HTMLDialogElement;
		pasienDialog.close()
	}
	selectedPasien(noTransaksi: string = "", noKunjungan: string = "") {
		let pasienDialog: HTMLDialogElement | null = document.getElementById("pasienDialog") as HTMLDialogElement;
		this.selectedNoTransaksi = noTransaksi
		this.selectedNoKunjungan = noKunjungan
		if (pasienDialog) pasienDialog.close()
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				this.getAllMCU(noKunjungan)
				Swal.showLoading();
			}
		}).then(
			() => { },
			(dismiss) => {
				location.reload();
			}
		)
	}

	getAllMCU(noKunjungan: string = "") {
		this.authService.getBpjsMCU(noKunjungan).subscribe(
			(data: any) => {
				if (!data.success) {
					this.failedMsg = data['message']
				} else {
					let dataRes = data.data.list
					this.listOfMCU = []
					let convertedArray = dataRes.map(item => {
						return {
							kdMCU: item.kdMCU,
							noKunjungan: item.noKunjungan,
							kdProvider: item.kdProvider,
							tglPelayanan: item.tglPelayanan,
							tekananDarahSistole: item.tekananDarahSistole,
							tekananDarahDiastole: item.tekananDarahDiastole,
							radiologiFoto: item.radiologiFoto,
							darahRutinHemo: item.darahRutinHemo,
							darahRutinLeu: item.darahRutinLeu,
							darahRutinErit: item.darahRutinErit,
							darahRutinLaju: item.darahRutinLaju,
							darahRutinHema: item.darahRutinHema,
							darahRutinTrom: item.darahRutinTrom,
							lemakDarahHDL: item.lemakDarahHDL,
							lemakDarahLDL: item.lemakDarahLDL,
							lemakDarahChol: item.lemakDarahChol,
							lemakDarahTrigli: item.lemakDarahTrigli,
							gulaDarahSewaktu: item.gulaDarahSewaktu,
							gulaDarahPuasa: item.gulaDarahPuasa,
							gulaDarahPostPrandial: item.gulaDarahPostPrandial,
							gulaDarahHbA1c: item.gulaDarahHbA1c,
							fungsiHatiSGOT: item.fungsiHatiSGOT,
							fungsiHatiSGPT: item.fungsiHatiSGPT,
							fungsiHatiGamma: item.fungsiHatiGamma,
							fungsiHatiProtKual: item.fungsiHatiProtKual,
							fungsiHatiAlbumin: item.fungsiHatiAlbumin,
							fungsiGinjalCrea: item.fungsiGinjalCrea,
							fungsiGinjalUreum: item.fungsiGinjalUreum,
							fungsiGinjalAsam: item.fungsiGinjalAsam,
							fungsiJantungABI: item.fungsiJantungABI,
							fungsiJantungEKG: item.fungsiJantungEKG,
							fungsiJantungEcho: item.fungsiJantungEcho,
							funduskopi: item.funduskopi,
							pemeriksaanLain: item.pemeriksaanLain,
							keterangan: item.keterangan,
						}
					})
					this.listOfMCU = convertedArray
					console.log("Test : " + JSON.stringify(this.listOfMCU[0]))
				}
			}
		)
	}

	onSearchMCU() {
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				this.getAllMCU(this.searchKeyword)
				Swal.showLoading()
			}
		}).then(
			() => { },
			(dismiss) => {
				
			}
		)
	
	}

	readUpdateItem(item: MCU) {
		this.currentClickEvent = MCU_CLICK_EVENT.EDIT
		this.addDialogTitle = "Edit MCU"
		this.addDialogContent = "Perbaharui form didalam masing masing langkah dengan data yang benar"
		this.addDialogButtonLabel = "Perbaharui"
		console.log("Selected item : " + JSON.stringify(item))
		let dialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
		let confirmDialog: HTMLDialogElement | null = document.getElementById("confirmDialog") as HTMLDialogElement;
		if (dialog) {
			dialog.showModal()
			document.querySelectorAll('#save').forEach((button: Element) => {
				button.addEventListener('click', (e: MouseEvent) => {
					if (dialog) {
						dialog.close()
						Swal.fire({
							title: 'Mohon Tunggu!',
							allowEscapeKey: false,
							allowOutsideClick: false,
							timer: 2000,
							didOpen: () => {
								confirmDialog.close()
								this.onSubmitData(MCU_CLICK_EVENT.EDIT)
								Swal.showLoading()
							}
						}).then(
							() => { },
							(dismiss) => {
								location.reload();
							}
						)
					}
				});
			});
		}
		this.kodeForm.patchValue({
			codeOfMCU: item.kdMCU,
			codeOfProvider: item.kdProvider
		})
		this.kunjunganForm.patchValue({
			numberOfKunjungan: item.noKunjungan,
			dateOfPelayanan: item.tglPelayanan
		})
		this.tekananDarahForm.patchValue({
			numberOfSistole: item.tekananDarahSistole,
			numberOfDiastole: item.tekananDarahSistole
		})
		this.darahRutinForm.patchValue({
			numberOfHemo: item.darahRutinHemo,
			numberOfLeu: item.darahRutinLeu,
			numberOfErit: item.darahRutinErit,
			numberOfLaju: item.darahRutinLaju,
			numberOfHema: item.darahRutinHema,
			numberOfTrom: item.darahRutinTrom
		})
		this.lemakDarahForm.patchValue({
			numberOfHDL: item.lemakDarahHDL,
			numberOfLDL: item.lemakDarahLDL,
			numberOfChol: item.lemakDarahChol,
			numberOfTrigli: item.lemakDarahTrigli
		})
		this.gulaDarahForm.patchValue({
			numberOfGDSewaktu: item.gulaDarahSewaktu,
			numberOfGDPuasa: item.gulaDarahPuasa,
			numberOfGDPrandial: item.gulaDarahPostPrandial,
			numberOfGDHba1c: item.gulaDarahHbA1c
		})
		this.fungsiHatiForm.patchValue({
			numberOfFHSGOT: item.fungsiHatiSGOT,
			numberOfFHSGPT: item.fungsiHatiSGPT,
			numberOfFHGamma: item.fungsiHatiGamma,
			numberOfFHProtKual: item.fungsiHatiProtKual,
			numberOfFHAlbumin: item.fungsiHatiAlbumin,
		})
		this.fungsiGinjalForm.patchValue({
			numberOfFGCrea: item.fungsiGinjalCrea,
			numberOfFGUreum: item.fungsiGinjalUreum,
			numberOfFGAsam: item.fungsiGinjalAsam
		})
		this.fungsiJantungForm.patchValue({
			numberOfFJABI: item.fungsiJantungABI,
			numberOfFJEKG: item.fungsiJantungEKG,
			numberOfFJEcho: item.fungsiJantungEcho
		})
		this.infoTambahanForm.patchValue({
			valueOfRadiologiFoto: item.radiologiFoto,
			valueOfFunduskopi: item.funduskopi,
			valueOfPemeriksaLainnya: item.pemeriksaanLain
		})
		this.keteranganForm.patchValue({
			valueOfKeterangan: item.keterangan,
		})
	}

	deleteItem(kodeMCU: string = "", noKunjungan: string = "") {
		this.authService.deleteBpjsMCU(kodeMCU, noKunjungan).subscribe(
			(data: any) => {
				if (!data.success) return
				this.successMsg = data.message
				let successDialog: HTMLDialogElement | null = document.getElementById("successDialog") as HTMLDialogElement
				if (successDialog) {
					successDialog.showModal()
					document.querySelectorAll('#close').forEach((button: Element) => {
						button.addEventListener('click', (e: MouseEvent) => {
							successDialog.close()
							location.reload()
						})
					})
				}
			}
		)
	}

	showConfirmDialog(item: MCU): void {
		let confirmDialog: HTMLDialogElement | null = document.getElementById("confirmDialog") as HTMLDialogElement
		console.log
		// Check if the dialog element exists
		if (confirmDialog) {
			// Call the showModal() method on the dialog element
			confirmDialog.showModal();
			document.querySelectorAll('#delete').forEach((button: Element) => {
				button.addEventListener('click', (e: MouseEvent) => {
					confirmDialog.close()
					Swal.fire({
						title: 'Mohon Tunggu!',
						allowEscapeKey: false,
						allowOutsideClick: false,
						timer: 2000,
						didOpen: () => {
							this.deleteItem(item.kdMCU + "", item.noKunjungan)
							Swal.showLoading();
						}
					}).then(
						() => { },
						(dismiss) => {
							location.reload();
						}
					)
				})
			})
		} else {
			console.error("Dialog element not found.");
		}
	}
}



