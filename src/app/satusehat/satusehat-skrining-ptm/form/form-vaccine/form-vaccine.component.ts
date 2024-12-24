import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vaccine',
  templateUrl: './form-vaccine.component.html',
  styleUrls: ['./form-vaccine.component.sass']
})
export class FormVaccineComponent implements OnInit {
  @Input() title: any 
  @Input() max: number = 5
  @Input() list: any
  @Output() onSelected = new EventEmitter()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initData()
  }

  form = this.fb.group({
    vaccine: this.fb.array([])
  });

  get vaccine() {
    return this.form.controls["vaccine"] as FormArray;
  }
  
  addVaccine()
   {
    const vaccineForm = this.fb.group({
        system: [''],
        code: [''],
        display: [''],
    });
  
    if (this.vaccine.length < this.max) {
      this.vaccine.push(vaccineForm);
    }
  }
  
  deleteVaccine(vaccineIndex: number) {
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus vaksin?",
      showDenyButton: true,
      confirmButtonText: "Ya",
      denyButtonText: `Tidak`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.vaccine.removeAt(vaccineIndex);
        this.onSelected.emit(this.form.controls["vaccine"].value)
      }
    });
  }
  
  onChange(vaccineForm: any, data: any) {
    vaccineForm.controls['system'].setValue(data.source.source_url);
    vaccineForm.controls['code'].setValue(data.terminology_code);
    vaccineForm.controls['display'].setValue(data.terminology_name);
    this.onSelected.emit(this.form.controls["vaccine"].value);
  }

  initData() {
    if (this.list && this.list.vacine) {
      this.list.vacine.forEach(item => {
        const vaccineForm = this.fb.group({
          code: [item.code],
          display: [item.display],
        })
        this.vaccine.push(vaccineForm)
      })
    }
  }
}

