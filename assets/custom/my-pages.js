class LoadPage {

    constructor() {
    }

    Home(page) {
        console.log(page.url);
    }

    Form(page) {
        console.log(page.url);
    }

    Services(page) {
        console.log(page.url);
    }

    About(page) {
        console.log(page.url);
    }

    List(page) {
        new Template('listDemo').compileList();
        console.log(page.url);
    }

}