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

    listEstados(page) {
        console.log(page.url);
        myApp.c.listView ('listEstados.php', {}, 'listEstados', function (a) {
            console.log('estados');
            console.log(a);
        });
    }

    listPaises(page) {
        console.log(page.url);
        myApp.c.listView ('listPaises.php', {}, 'listPaises', function (a) {
            console.log('paises');
            console.log(a);
        });
    }

}