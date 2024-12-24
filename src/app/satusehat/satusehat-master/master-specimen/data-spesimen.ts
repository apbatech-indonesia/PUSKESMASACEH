import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataSpecimen {
  data: any = [
    {
        code: "48469005",
        display: "Cytologic material",
        system: "http://snomed.info/sct"
    },
    {
        code: "119294007",
        display: "Dried blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119295008",
        display: "Specimen obtained by aspiration",
        system: "http://snomed.info/sct"
    },
    {
        code: "119297000",
        display: "Blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119300005",
        display: "Specimen from blood product",
        system: "http://snomed.info/sct"
    },
    {
        code: "119304001",
        display: "Specimen from blood bag",
        system: "http://snomed.info/sct"
    },
    {
        code: "119305000",
        display: "Specimen from plasma bag",
        system: "http://snomed.info/sct"
    },
    {
        code: "119307008",
        display: "Specimen from endotracheal tube",
        system: "http://snomed.info/sct"
    },
    {
        code: "119311002",
        display: "Catheter submitted as specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119312009",
        display: "Catheter tip submitted as specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119314005",
        display: "Electrode submitted as specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119317003",
        display: "Gaseous material specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119318008",
        display: "Water specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119320006",
        display: "Food specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119323008",
        display: "Pus specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119325001",
        display: "Skin (tissue) specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119327009",
        display: "Nail specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119329007",
        display: "Colostrum specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119332005",
        display: "Synovial fluid specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119334006",
        display: "Sputum specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119335007",
        display: "Coughed sputum specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119336008",
        display: "Exhaled air specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119337004",
        display: "Inhaled gas specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119339001",
        display: "Stool specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119341000",
        display: "Bile specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119342007",
        display: "Saliva specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119344008",
        display: "Specimen from genital system",
        system: "http://snomed.info/sct"
    },
    {
        code: "119345009",
        display: "Menstrual blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119349003",
        display: "Spermatozoa specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119350003",
        display: "Calculus specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119351004",
        display: "Erythrocyte specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119360007",
        display: "Dialysis fluid specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119361006",
        display: "Plasma specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119362004",
        display: "Platelet poor plasma specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119363009",
        display: "Platelet rich plasma specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119364003",
        display: "Serum specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119365002",
        display: "Specimen from wound",
        system: "http://snomed.info/sct"
    },
    {
        code: "119366001",
        display: "Specimen from wound abscess",
        system: "http://snomed.info/sct"
    },
    {
        code: "119367005",
        display: "Specimen from burn injury",
        system: "http://snomed.info/sct"
    },
    {
        code: "119370009",
        display: "Specimen from fistula",
        system: "http://snomed.info/sct"
    },
    {
        code: "119371008",
        display: "Specimen from abscess",
        system: "http://snomed.info/sct"
    },
    {
        code: "119376003",
        display: "Tissue specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "119379005",
        display: "Specimen from stomach",
        system: "http://snomed.info/sct"
    },
    {
        code: "119394009",
        display: "Specimen from vagina",
        system: "http://snomed.info/sct"
    },
    {
        code: "119395005",
        display: "Specimen from uterine cervix",
        system: "http://snomed.info/sct"
    },
    {
        code: "119401005",
        display: "Specimen from conjunctiva",
        system: "http://snomed.info/sct"
    },
    {
        code: "122552005",
        display: "Arterial blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122554006",
        display: "Capillary blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122555007",
        display: "Venous blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122556008",
        display: "Cord blood specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122560006",
        display: "Blood specimen from blood donor",
        system: "http://snomed.info/sct"
    },
    {
        code: "122565001",
        display: "Urinary catheter specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122566000",
        display: "Fluid specimen from wound",
        system: "http://snomed.info/sct"
    },
    {
        code: "122568004",
        display: "Exudate specimen from wound",
        system: "http://snomed.info/sct"
    },
    {
        code: "122571007",
        display: "Pericardial fluid specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122572000",
        display: "Vomitus specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122575003",
        display: "Urine specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122580007",
        display: "Cerumen specimen",
        system: "http://snomed.info/sct"
    },
    {
        code: "122593002",
        display: "Tissue specimen obtained from ulcer",
        system: "http://snomed.info/sct"
    },
    {
        code: "122595009",
        display: "Specimen from breast obtained by total mastectomy",
        system: "http://snomed.info/sct"
    },
    {
        code: "122609004",
        display: "Specimen from lung obtained by bronchial washing procedure",
        system: "http://snomed.info/sct"
    },
    {
        code: "122610009",
        display: "Specimen from lung obtained by biopsy",
        system: "http://snomed.info/sct"
    },
    {
        code: "122737001",
        display: "Specimen from breast obtained by core needle biopsy",
        system: "http://snomed.info/sct"
    },
    {
        code: "122738006",
        display: "Specimen obtained from breast by stereotactically guided core needle biopsy",
        system: "http://snomed.info/sct"
    },
    {
        code: "122739003",
        display: "Specimen from breast obtained by incisional biopsy of breast mass",
        system: "http://snomed.info/sct"
    },
    {
        code: "122877000",
        display: "Upper respiratory fluid specimen obtained by tracheal aspiration",
        system: "http://snomed.info/sct"
    },
    {
        code: "122880004",
        display: "Urine specimen obtained by clean catch procedure",
        system: "http://snomed.info/sct"
    },
    {
        code: "127457009",
        display: "Tissue specimen from breast",
        system: "http://snomed.info/sct"
    },
    {
        code: "128160006",
        display: "Tissue specimen from conjunctiva",
        system: "http://snomed.info/sct"
    },
    {
        code: "168137004",
        display: "Gastric aspirate sample",
        system: "http://snomed.info/sct"
    },
    {
        code: "168138009",
        display: "Gastric lavage aspirate sample",
        system: "http://snomed.info/sct"
    },
    {
        code: "168139001",
        display: "Peritoneal fluid sample",
        system: "http://snomed.info/sct"
    },
    {
        code: "168141000",
        display: "Nasal fluid sample",
        system: "http://snomed.info/sct"
    }
  ]
}