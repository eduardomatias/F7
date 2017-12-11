class LoadPage {

    constructor() {
    }

    home(page) {
        console.log(page.url);
    }

    form(page) {
        console.log(page.url);
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