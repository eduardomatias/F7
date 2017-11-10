/* CONFIG */
myApp.c.setAppConfig({
    pages: ['home', 'about', 'form', 'services', 'list'],
    indexPage: 'list.html',
});

myApp.c.setPanelLeft([
    {href: 'home.html', label: 'HOME', ico: 'home'},
    {href: 'form.html', label: 'FORM', ico: 'wpforms'},
    {href: 'list.html', label: 'LIST', ico: 'list-alt'},
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
    {href: 'form.html', class: '', label: 'FORM', ico: 'wpforms'},
    {href: 'list.html', class: '', label: 'LIST', ico: 'list-alt'},
    {href: 'services.html', class: '', label: 'SERVICES', ico: 'cogs'},
    {href: 'about.html', class: '', label: 'ABOUT', ico: 'info-circle'},
]);
/* CONFIG */

/* INIT */
myApp.c.init();
