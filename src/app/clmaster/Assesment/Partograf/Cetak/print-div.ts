export function printDiv(divId: string) {
    const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">`;
    const css2 = `<style>
    .svg-waktu-atas {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/waktuatas.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-denyut {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/denyutfix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-air-ketuban {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/airpenfix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-pembukaan-serviks {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/bukaservik.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-kontraksi {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/kontraksifix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-oksitosin {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/ketubanfix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-obat {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/obatcairanfixss.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-nadi {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/tdfix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-temp {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/tempfix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
    .svg-urin {
      @media print {
        visibility: visible;
        background-image: url("./assets/images/EMR/Partograf/urinefix.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>`;
    const printContents = document.getElementById(divId).innerHTML;
    const pageContent = `<!DOCTYPE html><html><head>${css}${css2}</head><body onload="window.print()">${printContents}</html>`;
    let popupWindow: Window;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      popupWindow = window.open(
        '',
        '_blank',
        'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
      );
      popupWindow.window.focus();
      popupWindow.document.write(pageContent);
        popupWindow.document.close();
      popupWindow.onbeforeunload = event => {
        popupWindow.close();
      };
      popupWindow.onabort = event => {
        popupWindow.document.close();
        popupWindow.close();
      };
    } else {
      popupWindow = window.open('', '_blank', 'width=600,height=600');
      popupWindow.document.open();
      popupWindow.document.write(pageContent);
      popupWindow.document.close();
    }
    
  }