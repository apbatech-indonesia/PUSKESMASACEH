export interface IGudang {
  kdgudang: string;
  nama: string;
  utama?: number; // Optional karena data lama mungkin tidak memiliki field ini
}
