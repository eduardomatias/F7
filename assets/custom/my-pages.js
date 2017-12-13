class LoadPage {

    constructor() {
    }

    home(page) {
        console.log(page.url);
    }

    form(page) {
        console.log(page.url);
        // bar code
        $('.open-barcode').on('click', function () {

           cordova.plugins.barcodeScanner.scan(
              function (result) {
                  $('.open-barcode').val(result.text);
              },
              function (error) {},
              {
                  preferFrontCamera : false, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  saveHistory: true, // Android, save scan history (default false)
                  prompt : "Coloque um código de barras dentro da área de varredura", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE,DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED,MSI,AZTEC", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
              }
           );
        });
    }

    services(page) {
        console.log(page.url);
    }

    about(page) {
        console.log(page.url);
    }
	
    modal(page) {
        console.log(page.url);
		
		// form
        var formTeste = new Form('form-teste');	
		
        // abre modal
		$('.open-modal').on('click', function () {
			myApp.c.openModal('modalTeste');
		});
		
        // fechar modal
        $('.close-modal').on('click', function(){
			formTeste.clear();
            myApp.c.closeModal('modalTeste');
        });
    }

    listEstados(page) {
        console.log(page.url);
        myApp.c.listView ('listEstados.php', {}, 'listEstados', function (a) {
            console.log('estados');
            console.log(a);
        }, true, false);
    }

    listPaises(page) {
        console.log(page.url);
        myApp.c.listView ('listPaises.php', {}, 'listPaises', function (a) {
            console.log('paises');
            console.log(a);
        }, false, true);
    }

}