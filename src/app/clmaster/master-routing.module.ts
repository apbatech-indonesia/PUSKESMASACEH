import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tulisermComponent } from './tuliserm/tuliserm.component';
import { BukuKontrasepsiComponent } from './Kebidanan/BukuKontrasepsi/BukuKontrasepsi.component';
import { tulisermriComponent } from './tulisermri/tulisermri.component';
import { kajianperawatComponent } from './Assesment/kajianperawat/kajianperawat.component';

const routes: Routes = [
  {path:'tuliserm/:notrans/:kddokter/:dariklik/:norm',component:tulisermComponent},
  {path:'tulisermri/:notrans/:kddokter/:dariklik/:norm',component:tulisermriComponent},
  {path : 'kajianperawat/:notrans/:norm/:kddokter',component:kajianperawatComponent},
  { 
    path: 'Kebidanan/BukuKontrasepsi/:tanggal_mulai/:tanggal_akhir', 
    loadChildren:() => import('./Kebidanan/BukuKontrasepsi/Cetak/Cetak.module').then(m => m.CetakModule )
  },
  
  { 
    path: 'Kebidanan/CatatanImunisasi/:tanggal_mulai/:tanggal_akhir', 
    loadChildren:() => import('./Kebidanan/CatatanImunisasi/Cetak/Cetak.module').then(m => m.CetakModule )
  },
  { 
    path: 'Kebidanan/KunjunganBumil/:tanggal_mulai/:tanggal_akhir', 
    loadChildren:() => import('./Kebidanan/KunjunganBumil/Cetak/Cetak.module').then(m => m.CetakModule )
  },

  { 
    path: 'cetakpartograf', 
    loadChildren:() => import('./Assesment/Partograf/Cetak/PartografCetak.module').then(m => m.PartografCetakModule )
  },{
    path: 'icbidan', 
    loadChildren:() => import('./Assesment/Medis/Cetak/PersetujuanTindakanMedisCetak.module').then(m => m.PersetujuanTindakanMedisCetakModule )
  },
{
  path:'',
  data:{
    title : 'master',
    status :false
  },
 
  children :[
    // {
      
    //   path : 'tuliserm/:notrans/:kddokter/:dariklik',
    //   loadChildren:() => import('./tuliserm/tuliserm.module').then(m => m.tulisermModule )
    // },
    // {
      
    //   path : 'tulisermri/:notrans/:kddokter/:dariklik',
    //   loadChildren:() => import('./tulisermri/tulisermri.module').then(m => m.tulisermriModule )
    // }
    // ,

    {
      path : 'bkelompok',
      loadChildren:() => import('./bkelompok/kelompok.module').then(m => m.kelompokModule )
    },

    {
      path : 'bmcu',
      loadChildren:() => import('./bmcu/mcu.module').then(m => m.mcuModule )
    },

    {
      path : 'bobat',
      loadChildren:() => import('./bobat/obat.module').then(m => m.obatModule )
    },
   
    {
      path : 'tulisermkoreksi/:notrans/:kddokter',
      loadChildren:() => import('./tulisermkoreksi/tulisermkoreksi.module').then(m => m.tulisermkoreksiModule )
    },
    {
      
      path : 'tulisermrm/:notrans/:kddokter',
      loadChildren:() => import('./tulisermrm/tulisermrm.module').then(m => m.tulisermrmModule )
    },
    
    {
      
      path : 'mdokterprofil/:kddokter/:dokter',
      loadChildren:() => import('./mdokterprofil/mdokterprofil.module').then(m => m.mdokterprofilModule )
    },
    {
      path : 'muser',
      loadChildren:() => import('./muser/muser.module').then(m => m.MuserModule )
      
    },
    {
      path : 'mcabang',
      loadChildren:() => import('./mcabang/mcabang.module').then(m => m.McabangModule )
    },
    {
      path : 'mgudang',
      loadChildren:() => import('./mgudang/mgudang.module').then(m => m.MgudangModule )
    },
    {
      path : 'mobat',
      loadChildren:() => import('./mobat/mobat.module').then(m => m.MobatModule )
    }
    ,
    {
      path : 'mdiagnosa',
      loadChildren:() => import('./mdiagnosa/mdiagnosa.module').then(m => m.MdiagnosaModule )
    },
    {
      path : 'mpoli',
      loadChildren:() => import('./mpoli/mpoli.module').then(m => m.MpoliModule )
    },
    {
      path : 'mcoa',
      loadChildren:() => import('./mcoa/mcoa.module').then(m => m.McoaModule )
    },
    
    {
      path : 'mpasien',
      loadChildren:() => import('./mpasien/mpasien.module').then(m => m.MpasienModule )
    }
    ,
    {
      path : 'mpdaftarpasien',
      loadChildren:() => import('./mpdaftarpasien/mpdaftarpasien.module').then(m => m.MpdaftarpasienModule )
    },

    
    {
      path : 'mpdaftarpasienri',
      loadChildren:() => import('./mpdaftarpasienri/mpdaftarpasienri.module').then(m => m.mpdaftarpasienriModule )
    },


    {
      path : 'mrekening',
      loadChildren:() => import('./mpolirekening/mrekening.module').then(m => m.MrekeningModule )
    },
    {
      path : 'Mtamplate',
      loadChildren:() => import('./mtamplateerm/mtamplateerm.module').then(m => m.MtamplateermModule )
    }
    ,
    {
      path : 'mdokter',
      loadChildren:() => import('./mdokter/mdokter.module').then(m => m.MdokterModule )
    },
    {
      path : 'mcustumer',
      loadChildren:() => import('./mcustumer/mcustumer.module').then(m => m.McustumerModule )
    },
    {
      path : 'mtarif',
      loadChildren:() => import('./mtarif/mtarif.module').then(m => m.MtarifModule )
    },
    {
      path : 'kasirrj',
      loadChildren:() => import('./kasirrj/kasirrj.module').then(m => m.kasirrjModule )
    },
    {
      path : 'kasirri',
      loadChildren:() => import('./kasirri/kasirri.module').then(m => m.kasirriModule )
    },
    {
      path : 'rkasirri',
      loadChildren:() => import('./rkasirri/rkasirri.module').then(m => m.rkasirriModule )
    },

    {
      path : 'kasirlab',
      loadChildren:() => import('./kasirlab/kasirlab.module').then(m => m.kasirlabModule )
    },
    {
      path : 'mlab',
      loadChildren:() => import('./mtamplatelab/mtamplatelab.module').then(m => m.MtamplatelabModule )
    }
    ,
    {
      path : 'kasirrad',
      loadChildren:() => import('./kasirrad/kasirrad.module').then(m => m.kasirradModule )
    },
    {
      path : 'ermdokter',
      loadChildren:() => import('./ermdokter/ermdokter.module').then(m => m.ermdokterModule )
    },
    
    {
      path : 'ermdokterpasienri',
      loadChildren:() => import('./ermdokterpasienri/ermdokterpasienri.module').then(m => m.ermdokterpasienriModule )
    },
    {
      path : 'ermdokteridemo',
      loadChildren:() => import('./ermdokteridemo/ermdokteridemo.module').then(m => m.ermdokteridemoModule )
    },

    {
      path : 'kasirfarmasibeli',
      loadChildren:() => import('./kasirfarmasibeli/kasirfarmasibeli.module').then(m => m.kasirfarmasibeliModule )
    },
    {
      path : 'ermdokterrm',
      loadChildren:() => import('./ermdokterrm/ermdokterrm.module').then(m => m.ermdokterrmModule )
    },
    {
      path : 'kasirfarmasibelir',
      loadChildren:() => import('./kasirfarmasibelir/kasirfarmasibelir.module').then(m => m.kasirfarmasibelirModule )
    },
    {
      path : 'kasirfarmasijual',
      loadChildren:() => import('./kasirfarmasijual/kasirfarmasijual.module').then(m => m.kasirfarmasijualModule )
    },
    {
      path : 'returfarmasijual',
      loadChildren:() => import('./returfarmasijual/returfarmasijual.module').then(m => m.returfarmasijualModule )
    },
    {
      path : 'mutasifarmasi',
      loadChildren:() => import('./mutasifarmasi/mutasifarmasi.module').then(m => m.mutasifarmasiModule )
    },
    {
      path : 'mutasifarmasiin',
      loadChildren:() => import('./mutasifarmasiin/mutasifarmasiin.module').then(m => m.mutasifarmasiinModule )
    },
    {
      path : 'laporanrj',
      loadChildren:() => import('./laporanrj/laporanrj.module').then(m => m.laporanrjModule )
    }
    ,
    {
      path : 'laporanlab',
      loadChildren:() => import('./laporanlab/laporanlab.module').then(m => m.laporanlabModule )
    }, 
    {
      path : 'laporanrad',
      loadChildren:() => import('./laporanrad/laporanrad.module').then(m => m.laporanradModule )
    },
    {
      path : 'laporanfarmasi',
      loadChildren:() => import('./laporanfarmasi/laporanfarmasi.module').then(m => m.laporanfarmasiModule )
    }
    ,
    {
      path : 'laporanrm',
      loadChildren:() => import('./laporanrm/laporanrm.module').then(m => m.laporanrmModule )
    },
    {
      path:'bayarpiutangrj',
      loadChildren:() => import('./bayarpiutangrj/bayarpiutangrj.module').then(m => m.bayarpiutangrjModule )
    },
    {
      path:'bayarhutangfarmasi',
      loadChildren:() => import('./bayarhutangfarmasi/bayarhutangfarmasi.module').then(m => m.bayarhutangfarmasiModule )
    },
    {
      path:'perminobat',
      loadChildren:() => import('./perminobat/perminobat.module').then(m => m.perminobatModule )
    },

    {
      path:'perminobatri',
      loadChildren:() => import('./perminobatri/perminobatri.module').then(m => m.perminobatriModule )
    },
    {
      path:'glmini',
      loadChildren:() => import('./glmini/glmini.module').then(m => m.glminiModule )
    }
    ,
    {
      path:'verifmobile',
      loadChildren:() => import('./verifmobile/verifmobile.module').then(m => m.verifmobileModule )
    } ,
    {
      path:'mjadwal',
      loadChildren:() => import('./mjadwal/mjadwal.module').then(m => m.mjadwalModule )
    },
    {
      path:'mobatid',
      loadChildren:() => import('./mobatid/mobatid.module').then(m => m.MobatidModule )
    },
    {
      path:'promo',
      loadChildren:() => import('./promo/promo.module').then(m => m.promoModule )
    },
    {
      path:'berita',
      loadChildren:() => import('./berita/berita.module').then(m => m.beritaModule )
    },
    {
      path:'laporanlr',
      loadChildren:() => import('./laporanlr/laporanlr.module').then(m => m.laporanlrModule )
    },
    {


    path:'mutasifarmasiout',
    loadChildren:() => import ('./mutasifarmasiout/mutasifarmasiout.module').then(m => m.mutasifarmasioutModule)
  }   ,
  {
  path:'mtariflihat',
  loadChildren:() => import ('./mtariflihat/mtariflihat.module').then(m => m.mtariflihatModule)
},

{
path:'adjustobat',
loadChildren:() => import ('./adjustobat/adjustobat.module').then(m => m.adjustobattModule)
},
{
  path:'mtamplatebhp',
  loadChildren:() => import ('./mtamplatebhp/mtamplatebhp.module').then(m => m.mtamplatebhpModule)
  },
  {
    path:'mkamar',
    loadChildren:() => import ('./mkamar/mkamar.module').then(m => m.mkamarModule)
    },
    {
      path:'oktindakan',
      loadChildren:() => import ('./oktindakan/oktindakan.module').then(m => m.oktindakanModule)
      },
      {
        path:'spesialisasi',
        loadChildren:() => import ('./spesialisasi/spesialisasi.module').then(m => m.spesialisasiModule)
      }
      ,
      {
        path:'assperawat',
        loadChildren:() => import ('./assperawat/assperawat.module').then(m => m.assperawatModule)
      }

      ,
      {
        path:'tree',
        loadChildren:() => import ('./tree/tree.module').then(m => m.TreeModule)
      }
      ,
      {
        path:'pemanggilan',
        loadChildren:() => import ('./pemanggilanadmisi/pemanggilanadmisi.module').then(m => m.pemanggilanadmisiModule)
      },
      {
        path:'laporanri',
        loadChildren:() => import ('./laporanri/laporanri.module').then(m => m.llaporanriModule)
      }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
