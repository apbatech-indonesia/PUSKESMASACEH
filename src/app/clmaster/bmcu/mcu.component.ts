
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

interface Pasien {
	notransaksi: string,
	nokunjungan: string,
	norm: string,
	tglpriksa: string,
	pasien: string,
	nampoli: string,
	kdprov: string,
	kodemcu: string,
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

		::ng-deep .my-swal {
			z-index: 2000 !important;
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
	viewDataForm: FormGroup

	duration: any = 20000
	panelOpenState: boolean = false

	codeOfMCU: string = ""
	dateOfKunjungan: string = ""
	addDialogTitle: string = "MCU"
	addDialogContent: string = "Isi form didalam masing masing langkah dengan data yang benar"
	dialogButtonLabel: string = ""
	dialogAction: string = ""

	selectedMCU: MCU = null
	searchKeyword: string = ""
	searchTglPeriksa: string = new Date().toISOString().split('T')[0]
	selectedNoTransaksi: string = ""
	selectedNoKunjungan: string = ""

	failedMsg: string = "Mohon maaf proses gagal!"
	successMsg: string = "Selamat proses berhasil dijalankan!"

	isDetailDialogShow: boolean = false
	isShowedForm: boolean = false

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
			codeOfMCU: ['', [ Validators.required ] ],
			codeOfProvider: ['', [ Validators.required ] ],
			numberOfKunjungan: ['', [ Validators.required ] ],
			dateOfPelayanan: ['', [ Validators.required ] ],
			numberOfSistole: ['', [ Validators.required ] ],
			numberOfDiastole: ['', [ Validators.required ] ],
			numberOfHemo: ['', [ Validators.required ] ],
			numberOfLeu: ['', [ Validators.required ] ],
			numberOfErit: ['', [ Validators.required ] ],
			numberOfLaju: ['', [ Validators.required ] ],
			numberOfHema: ['', [ Validators.required ] ],
			numberOfTrom: ['', [ Validators.required ] ],
			numberOfHDL: ['', [ Validators.required ] ],
			numberOfLDL: ['', [ Validators.required ] ],
			numberOfChol: ['', [ Validators.required ] ],
			numberOfTrigli: ['', [ Validators.required ] ],
			numberOfGDSewaktu: ['', [ Validators.required ] ],
			numberOfGDPuasa: ['', [ Validators.required ] ],
			numberOfGDPrandial: ['', [ Validators.required ] ],
			numberOfGDHba1c: ['', [ Validators.required ] ],
			numberOfFHSGOT: ['', [ Validators.required ] ],
			numberOfFHSGPT: ['', [ Validators.required ] ],
			numberOfFHGamma: ['', [ Validators.required ] ],
			numberOfFHProtKual: ['', [ Validators.required ] ],
			numberOfFHAlbumin: ['', [ Validators.required ] ],
			numberOfFGCrea: ['', [ Validators.required ] ],
			numberOfFGUreum: ['', [ Validators.required ] ],
			numberOfFGAsam: ['', [ Validators.required ] ],
			numberOfFJABI: ['', [ Validators.required ] ],
			numberOfFJEKG: ['', [ Validators.required ] ],
			numberOfFJEcho: ['', [ Validators.required ] ],
			valueOfRadiologiFoto: ['', [ Validators.required ] ],
			valueOfFunduskopi: ['', [ Validators.required ] ],
			valueOfPemeriksaLainnya: ['', [ Validators.required ] ],
			valueOfKeterangan: ['', [ Validators.required ] ],
		})

		this.getAllPasien()
	}

	showAddDialog(pasien: Pasien) {
		this.addDialogTitle = "Mendaftar MCU"
		this.addDialogContent = "isi form dibawah dengan data yang benar"
		this.dialogButtonLabel = "Tambah"
		this.dialogAction = "add"
		this.isShowedForm = true

		

		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading()
				this.kodeForm.patchValue({
					codeOfMCU: pasien.kodemcu ?? '',
					codeOfProvider: pasien.kdprov ?? '-',
					numberOfKunjungan: pasien.nokunjungan ?? '-',
					dateOfPelayanan: this.pipe.transform(pasien.tglpriksa, 'dd-MM-yyyy') ?? '-',
					numberOfSistole: '0',
					numberOfDiastole: '0',
					numberOfHemo: '0',
					numberOfLeu: '0',
					numberOfErit: '0',
					numberOfLaju: '0',
					numberOfHema: '0',
					numberOfTrom: '0',
					numberOfHDL: '0',
					numberOfLDL: '0',
					numberOfChol: '0',
					numberOfTrigli: '0',
					numberOfGDSewaktu: '0',
					numberOfGDPuasa: '0',
					numberOfGDPrandial: '0',
					numberOfGDHba1c: '0',
					numberOfFHSGOT: '0',
					numberOfFHSGPT: '0',
					numberOfFHGamma: '0',
					numberOfFHProtKual: '0',
					numberOfFHAlbumin: '0',
					numberOfFGCrea: '0',
					numberOfFGUreum: '0',
					numberOfFGAsam: '0',
					numberOfFJABI: '0',
					numberOfFJEKG: '0',
					numberOfFJEcho: '0',
					valueOfRadiologiFoto: '0',
					valueOfFunduskopi: '0',
					valueOfPemeriksaLainnya:'0',
					valueOfKeterangan:'0',
				})
			}
		}).then(
			() => { },
			(dismiss) => {
				location.reload();
			}
		)
	}

	showEditDialog(pasien: Pasien) {
		this.addDialogTitle = "Perbaharui Data MCU"
		this.addDialogContent = "Perbaharui form dibawah dengan data yang benar"
		this.dialogButtonLabel = "Perbaharui"
		this.dialogAction = "edit"
		this.isShowedForm = true
		
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading()
				this.authService.getBpjsMCU(pasien.nokunjungan).subscribe(
					(data: any) => {
						if (!data.success) { 
							this.failedMsg = "data mcu tidak ditemukan"
							this.toastr.error(this.failedMsg, 'Error');
						} else {
							this.addDialogTitle = "Edit MCU"
							let listMcu = data.data.list
							listMcu.map(item => {
								this.kodeForm.patchValue({
									codeOfMCU: item.kdMCU,
									codeOfProvider: item.kdProvider,
									numberOfKunjungan: item.noKunjungan,
									dateOfPelayanan: item.tglPelayanan,
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
									valueOfKeterangan: item.keterangan,
								})
							})
						}
					},
					error => {
						this.failedMsg = error.error.err ?? "Gagal mendapatkan data mcu"
						this.toastr.error(this.failedMsg, 'Error', {
							timeOut: 2000,
						})
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

	showDetailDialog(pasien: any) {
		Swal.fire({
			title: 'Mohon Tunggu!',
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 2000,
			didOpen: () => {
				Swal.showLoading()
				this.authService.getBpjsMCU(pasien.nokunjungan).subscribe(
					(data: any) => {
						if (!data.success) {
							this.listOfMCU = []
							this.failedMsg = data['message']
						} else {
							let dataRes = data.data.list
							dataRes.map(item => {
								this.viewDataForm.patchValue({
									codeOfMCU: item.kdMCU,
									codeOfProvider: item.kdProvider,
									numberOfKunjungan: item.tglPelayanan,
									dateOfKunjungan: item.tglPelayanan,
									numberOfSistole: item.tekananDarahSistole,
									numberOfDiastole: item.tekananDarahDiastole,
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
							})
							let detailDialog: HTMLDialogElement | null = document.getElementById("detailDialog") as HTMLDialogElement;
							if (detailDialog) {
								detailDialog.showModal()
								document.querySelectorAll('#close').forEach((button: Element) => {
									button.addEventListener('click', (e: MouseEvent) => {
										Swal.close()
										detailDialog.close()
									})
								})
							}
						}
					},
					(error: any) => {
						this.listOfMCU = []
						this.failedMsg = error.error.err ?? null
						this.toastr.error(this.failedMsg, 'Error')
					}
				)
			}
		})
	}

	doSaveMcu(action: string) {
		console.log(action)
		Swal.fire({
			title: "Apakah anda yakin ingin mengirim data?",
			showCancelButton: true,
			confirmButtonText: "Ya, yakin",
			cancelButtonColor: "#DD6B55",
			confirmButtonColor: "#91a7d0",
			customClass: {
				container: 'my-swal'
			}
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Mohon tunggu!')
				Swal.showLoading()

				let kode = this.kodeForm

				let bodyReq = {
					kdMCU: kode.value.codeOfMCU,
					kdProvider: kode.value.codeOfProvider,
					noKunjungan: kode.value.numberOfKunjungan,
					tglPelayanan:  kode.value.dateOfPelayanan,
					tekananDarahSistole: kode.value.numberOfSistole,
					tekananDarahDiastole: kode.value.numberOfDiastole,
					darahRutinHemo: kode.value.numberOfHemo,
					darahRutinLeu: kode.value.numberOfLeu,
					darahRutinErit: kode.value.numberOfErit,
					darahRutinLaju: kode.value.numberOfLaju,
					darahRutinHema: kode.value.numberOfHema,
					darahRutinTrom: kode.value.numberOfTrom,
					lemakDarahHDL: kode.value.numberOfHDL,
					lemakDarahLDL: kode.value.numberOfLDL,
					lemakDarahChol: kode.value.numberOfChol,
					lemakDarahTrigli: kode.value.numberOfTrigli,
					gulaDarahSewaktu: kode.value.numberOfGDSewaktu,
					gulaDarahPuasa: kode.value.numberOfGDPuasa,
					gulaDarahPostPrandial: kode.value.numberOfGDPrandial,
					gulaDarahHbA1c: kode.value.numberOfGDHba1c,
					fungsiHatiSGOT: kode.value.numberOfFHSGOT,
					fungsiHatiSGPT: kode.value.numberOfFHSGPT,
					fungsiHatiGamma: kode.value.numberOfFHGamma,
					fungsiHatiProtKual: kode.value.numberOfFHProtKual,
					fungsiHatiAlbumin: kode.value.numberOfFHAlbumin,
					fungsiGinjalCrea: kode.value.numberOfFGCrea,
					fungsiGinjalUreum: kode.value.numberOfFGUreum,
					fungsiGinjalAsam: kode.value.numberOfFGAsam,
					fungsiJantungABI: kode.value.numberOfFJABI,
					fungsiJantungEKG: kode.value.numberOfFJEKG,
					fungsiJantungEcho: kode.value.numberOfFJEcho,
					radiologiFoto: kode.value.valueOfRadiologiFoto,
					funduskopi: kode.value.valueOfFunduskopi,
					pemeriksaanLain: kode.value.valueOfPemeriksaLainnya,
					keterangan: kode.value.valueOfKeterangan
				}

console.log(bodyReq)

				if(action === 'edit') {

					console.log("asdasdasd")
					this.authService.updateBpjsMCU(bodyReq).subscribe(
						(data: any) => {
							Swal.close()
							if (data.success) {
								const msg = data.message && data.message != '' ? data.message : 'Berhasil Menyimpan Data'
								this.toastr.success(msg, 'Sukses', {
									timeOut: 2000,
								})
								
								this.isShowedForm = false
								this.getAllPasien()
							}
						},
						error => {
							Swal.close()
							const msg = error.error.err && error.error.err != '' ? error.error.err : 'Gagal Menyimpan Data'
							this.toastr.error(msg, 'Error', {
								timeOut: 2000,
							})
						}
					)
				} else {
					this.authService.addBpjsMCU(bodyReq).subscribe(
						(data: any) => {
							Swal.close()
							if (data.success) {
								const msg = data.message && data.message != '' ? data.message : 'Berhasil Menyimpan Data'
								this.toastr.success(msg, 'Sukses', {
									timeOut: 2000,
								})

								this.isShowedForm = false
								this.getAllPasien()
							}
						},
						error => {
							Swal.close()
							const msg = error.error.err && error.error.err != '' ? error.error.err : 'Gagal Menyimpan Data'
							this.toastr.error(msg, 'Error', {
								timeOut: 2000,
							})
						}
					)
				}
			}
		})
	}

	getAllPasien() {
		Swal.fire('Mohon tunggu!')
		Swal.showLoading()
		
		this.authService.getBpjsMCUAllPasien(this.searchKeyword, this.searchTglPeriksa).subscribe(
			(data: any) => {
				Swal.close()
				if (!data.success) {
					this.listOfPasien = []
					this.failedMsg = data['message']
				} else {
					let dataRes = data.data
					this.listOfPasien = []

					let convertedArray = dataRes.map(item => {
						return {
							...item
						}
					})
					this.listOfPasien = convertedArray
				}
			},
			err => {
				Swal.close()
			}
		)
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
					this.listOfMCU = []
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
				}

				setTimeout(function() {
					console.log("Test : " + JSON.stringify(this.listOfMCU[0]))
				}, 2000)
				let pasienDialog: HTMLDialogElement | null = document.getElementById("pasienDialog") as HTMLDialogElement;
				pasienDialog.showModal()
			},
			(error: any) => {
				this.listOfMCU = []
				this.failedMsg = error.error.err ?? null
				this.toastr.error(this.failedMsg, 'Error');
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
				Swal.showLoading()
				this.authService.getBpjsMCUAllPasien(this.searchKeyword, this.searchTglPeriksa).subscribe(
					(data: any) => {
						this.listOfPasien = []
						if (!data.success) {
							this.failedMsg = data['message']
						} else {
							let dataRes = data.data
							let convertedArray = dataRes.map(item => {
								return {
									...item
								}
							})
							this.listOfPasien = convertedArray
						}
					},
					(error: any) => {
						this.listOfPasien = []
						this.failedMsg = error.error.err ?? null
						this.toastr.error(this.failedMsg, 'Error');
					}
				)
			}
		}).then(
			() => { },
			(dismiss) => {
				
			}
		)
	}
	
	showDeleteDialog(kodeMCU: string = "", noKunjungan: string = "") {
		let dialog: HTMLDialogElement | null = document.getElementById("dialog") as HTMLDialogElement;
		dialog.close()
		Swal.fire({
			title: "Apakah anda yakin ingin menghapus data mcu ini?",
			showCancelButton: true,
			confirmButtonText: "Ya, yakin",
			cancelButtonColor: "#DD6B55",
			confirmButtonColor: "#91a7d0"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Mohon tunggu!')
				Swal.showLoading()
				this.authService.deleteBpjsMCU(kodeMCU, noKunjungan).subscribe(
					(data: any) => {
						Swal.close()
						if (data.success) {
							const msg = data.message && data.message != '' ? data.message : 'Berhasil Menghapus Data Mcu'
							this.toastr.success(msg, 'Sukses', {
								timeOut: 2000,
							})

							this.getAllPasien()
						}
					},
					err => {
						Swal.close()
						const msg = err.error.err && err.error.err != '' ? err.error.err : 'Gagal Menghapus Data Mcu'
						this.toastr.error(msg, 'Error', {
							timeOut: 2000,
						})
					}
				)
			}
		})
	}

	doHideForm() {
		this.isShowedForm = false
		this.getAllPasien()
	}
}



