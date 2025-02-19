export function cetak(divId: any, judul:string, tanggal:any, filter:any) {
    const css = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">`;
    
    let forPage = `<style>
        .chapter {
            page-break-after: always;
        }
        @media print {
            @page {
                margin: 1cm;
            }
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                margin: 0;
                padding: 0;
                font-size: 12pt;
            }
        }
        /* Tambahkan styling tambahan jika perlu */
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    </style>`;

    const js = `<script>
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelector(".table-borderless")?.classList.replace("table-borderless", "table-bordered");
        }); 
    </script>`;

    const pageTitle = "&nbsp;";
    const pageContent = `<!DOCTYPE html>
        <html>
        <head>
            <title>${pageTitle}</title>
            ${css}
            ${forPage}
        </head>
        <body onload="window.print(); window.close();">
            <div class="row">
                <div class="col-12 text-center">
                    <h5>${judul}</h5>
                </div>
                <div class="col-12 text-center">
                    <h5>${tanggal}</h5>
                </div>
                <div class="col-12 mb-3">
                    <div class="row">
                        <div class="col-2">Difilter berdasarkan</div>
                        <div class="col-auto">:</div>
                        <div class="col-9">${filter}</div>
                    </div>
                </div>
            </div>
            ${divId}
            ${js}
        </body>
        </html>`;

    let popupWindow: Window | null;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        popupWindow = window.open(
            '',
            '_blank',
            'width=900,height=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
        );
        if (popupWindow) {
            popupWindow.focus();
            popupWindow.document.write(pageContent);
            popupWindow.document.close();
            popupWindow.onload = () => {
                popupWindow?.print();
                popupWindow?.close();
            };
        }
    } else {
        popupWindow = window.open('', '_blank', 'width=900,height=900');
        if (popupWindow) {
            popupWindow.document.open();
            popupWindow.document.write(pageContent);
            popupWindow.document.close();
            popupWindow.onload = () => {
                popupWindow?.print();
                popupWindow?.close();
            };
        }
    }
}
