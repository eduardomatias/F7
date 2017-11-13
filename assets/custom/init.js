/* CONFIG */
myApp.c.setAppConfig({
    pages: ['home', 'about', 'form', 'services', 'listEstados', 'listPaises'],
    indexPage: 'home.html',
});

myApp.c.setPanelLeft([
    {href: 'home.html', label: 'HOME', ico: 'home'},
    {href: 'form.html', label: 'FORM', ico: 'wpforms'},
    {href: 'listEstados.html', label: 'ESTADOS', ico: 'list-alt'},
    {href: 'listPaises.html', label: 'PAÍSES', ico: 'list-alt'},
    {href: 'about.html', label: 'ABOUT', ico: 'info-circle'},
    {href: 'services.html', label: 'SERVICES', ico: 'cogs'},
    {label: 'FECHAR', ico: 'close'}
]);

myApp.c.setPanelRight([
    {href: 'form.html', class: '', label: 'FORM'},
    {href: 'about.html', class: '', label: 'ABOUT'},
    {href: '#', class: '', label: 'FECHAR'}
]);

myApp.c.setToolbar([
    {href: 'home.html', class: '', label: 'HOME', ico: 'home'},
    {href: 'form.html', class: '', label: 'FORM', ico: 'wpforms'},
    {href: 'about.html', class: '', label: 'ABOUT', ico: 'info-circle'},
]);
/* CONFIG */

/* INIT */
myApp.c.init();
