// src/app/models/related-person.model.ts
export interface RelatedPerson {
  nama_ibu: string;
  nik_ibu: string;
  tl_ibu: string;
  hp_ibu: string;
  kota_ibu: string;
  alamat_jalan_ibu: string;
  postal_code_ibu: string;
  province_id_ibu: string;
  city_id_ibu: string;
  district_id_ibu: string;
  village_id_ibu: string;
  rt_ibu: string;
  rw_ibu: string;
  nama_ayah: string;
  nik_ayah: string;
  tl_ayah: string;
  hp_ayah: string;
  kota_ayah: string;
  alamat_jalan_ayah: string;
  postal_code_ayah: string;
  province_id_ayah: string;
  city_id_ayah: string;
  district_id_ayah: string;
  village_id_ayah: string;
  rt_ayah: string;
  rw_ayah: string;
}

export interface RelatedPersonRequest {
  data: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    rmno: string;
    related_person: RelatedPerson;
  };
}
