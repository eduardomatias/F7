// Initialize app
var myApp = new Framework7({
    swipeBackPage: false,
    pushState: true,
    swipePanel: 'both',
    modalTitle: 'Title',
    cache: true,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


// Para os metodos personalizados (custom)
myApp.c = {};

// configuracoes iniciais do app
myApp.c.appConfig = {
    // Informacoes do app 
    appLogo: './assets/img/logo.png',
    appName: 'MyApp',
    appSlogan: 'MyApp Slogan',

    // URL utilizados nas requisicoes ajax
    urlApi: 'http://localhost/api/frontend/web/index.php?r=api-controller/',
    
    // caminho dos tamplates de lista
    urlTemplateList: 'templates/list/',

    // lista com todas as paginas acessiveis do sistema
    pages: [],

    // pagina inicial
    indexPage: '',

    // se nao for utilizar os atributos a baixo passe FALSE / ou para aplicar em todas as paginas passe TRUE
    navbarHide: ['form'],
    panelLeftHide: false,
    panelRightHide: true,
    toolbarHide: ['home'],
};


// set configuracoes iniciais do app
myApp.c.setAppConfig = function (param) {
    $.extend(this.appConfig, param);
};

// getLocalStorage - obtem dados do localStorage - return JSON / null
myApp.c.getLocalStorage = function (name) {
    return JSON.parse(localStorage.getItem(name));
};

// setLocalStorage - altera ou cria localStorage - return void
myApp.c.setLocalStorage = function (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
    return;
};

// habilita/desabilita navbar (barra superior)
myApp.c.navbarHide = function (pgName) {
    if ($.inArray(pgName, myApp.c.appConfig.navbarHide) === -1 && myApp.c.appConfig.navbarHide !== true) {
        myApp.showNavbar('.navbar', true);
        $$('.page-content').css('padding-top', '34px');
    } else {
        myApp.hideNavbar('.navbar', true);
        $$('.page-content').css('padding-top', '0px');
    }
};

// habilita/desabilita o painel lateral (direction = "left"/"right", pgName = "nome-da-pagina")
myApp.c.panelHide = function (direction, pgName) {
    // Primeira letra maiuscula restante minusculo
    var directionU = Util.ucfirst(direction);
    var configPanel = this.appConfig['panel' + directionU + 'Hide'];
    // existe permissao para esconder o panel da pagina
    var pemissionExist = ($.inArray(pgName, configPanel) !== -1 || configPanel === true);
    if ((myApp.params.swipePanel == 'both' || myApp.params.swipePanel != direction) && pemissionExist) {
        myApp.params.swipePanel = (directionU == 'Right' ? 'left' : 'right');
    } else if (myApp.params.swipePanel == direction && pemissionExist) {
        myApp.params.swipePanel = false;
    } else if (myApp.params.swipePanel != direction && !pemissionExist) {
        myApp.params.swipePanel = 'both';
    } else {
        myApp.params.swipePanel = direction;
    }
};

// create html of panel (menu lateral)
myApp.c.createHtmlPanel = function (itens) {
    var codHtml = '<div class="content-block">';
    codHtml += '<div class="top-panel" style="background: url(' + this.appConfig.appLogo + ') no-repeat left center">';
    codHtml += '<div class="name">' + this.appConfig.appName + '</div>';
    codHtml += '<div class="slogan">' + this.appConfig.appSlogan + '</div>';
    codHtml += '</div>';
    codHtml += '<div class="list-block"><div class="list-block"><ul>';
    for (var i in itens) {
        codHtml += '<li>';
        codHtml += '<a href="' + (itens[i].href ? './pages/' + itens[i].href : '#') + '" class="item-content ' + (itens[i].class || '') + ' close-panel">';
        codHtml += '<div class="item-media">';
        codHtml += '<i class="' + (itens[i].ico ? 'fa fa-lg fa-' + itens[i].ico : '') + '"></i>';
        codHtml += '</div>';
        codHtml += '<div class="item-inner">';
        codHtml += '<div class="item-title">' + (itens[i].label || '') + '</div>';
        codHtml += '</div>';
        codHtml += '</a>';
        codHtml += '</li>';
    }
    codHtml += '</ul></div></div>';
    codHtml += '</div>';
    return codHtml;
};

// setPanel
// itens = [{href:'', class:'', label:'', ico:'http://fontawesome.io/icons/'}]
myApp.c.setPanel = function (panel, itens, replace) {
    var htmlPanel = this.createHtmlPanel(itens),
            panel = $('div.panel-' + panel);
    if (replace) {
        panel.html(htmlPanel);
    } else {
        panel.append(htmlPanel);
    }
};

// setPanelLeft
myApp.c.setPanelLeft = function (itens, replace = true) {
    this.setPanel('left', itens, replace);
};

// setPanelRight
myApp.c.setPanelRight = function (itens, replace = true) {
    this.setPanel('right', itens, replace);
};

// Set Toolbar (menu inferior)
// itens = [{href:'', class:'', label:'', ico:'http://fontawesome.io/icons/'}] - o attr "href" e obrigatorio
myApp.c.setToolbar = function (itens) {
    var codHtml = '<div class="toolbar-inner">';
    for (var i in itens) {
        if (typeof itens[i].href == 'undefined') {
            console.info('O item: ' + (itens[i].label || itens[i].ico) + ',  da Toolbar nao possui o attr "href", favor addiciona-lo!');
        } else {
            codHtml += '<a href="./pages/' + itens[i].href + '" class="link link-toolbar-bottom active-' + itens[i].href.split('.')[0] + ' ' + (itens[i].class || '') + '">';
            codHtml += '<i class="fa fa-' + (itens[i].ico || 'question-circle-o') + '" aria-hidden="true"></i><span class="tabbar-label">' + (itens[i].label || '') + '</span>';
            codHtml += '</a>';
        }
    }
    codHtml += '</div>';
    toolbar = $('div#toolbar-bottom').html(codHtml);
};

// habilita/desabilita toolbar (barra inferior)
myApp.c.toolbarHide = function (pgName) {
    if ($.inArray(pgName, myApp.c.appConfig.toolbarHide) === -1 && myApp.c.appConfig.toolbarHide !== true) {
        tabbarBottom = $('div#toolbar-bottom');
        tabbarBottom.find('.link-toolbar-bottom').removeClass('active');
        tabbarBottom.find('.link-toolbar-bottom.active-' + pgName).addClass('active');
        $('div#page-main [class*=block]').last().css('margin-bottom', '85px');
        mainView.showToolbar();
    } else {
        $('div#page-main [class*=block]').last().css('margin-bottom', '35px');
        mainView.hideToolbar();
    }
};

// loadPage - carrega pagina na view principal
myApp.c.go = function (pgName) {
    if ($.inArray(pgName.split('.')[0], this.appConfig.pages) === -1) {
        console.info('Pagina nao registrada, adicione-a em: myApp.c.appConfig.pages');
    } else {
        mainView.router.loadPage('./pages/' + pgName);
    }
};

// para todas as paginas passarem por essas regras
myApp.c.initPage = function (page, callback) {
    var page,
        callback = (typeof callback == 'function') ? callback : function () {};

    // evento antes da animacao da page
    myApp.onPageBeforeAnimation(page, function (pg) {
        // controla exibicao da "navbar" (barra superior)
        myApp.c.navbarHide(pg.name);
        // controla exibicao do "panel" (menu lateral)
        myApp.c.panelHide('left', pg.name);
        myApp.c.panelHide('right', pg.name);
        // controla exibicao da "tabbar" (barra inferior)
        myApp.c.toolbarHide(pg.name);
    });

    // evento voltar (class BACK)
    myApp.onPageBack(page, function (pg) {
        // add here your method
    });

    // evento apos a animacao da page
    myApp.onPageAfterAnimation(page, function (pg) {
        // metodos after load page
        myApp.c.afterLoadPage();
        // calback do load
        callback(pg);
    });
};

// funcoes que sempre devem ser rodar apos carregar a pagina
myApp.c.afterLoadPage = function () {
    // start calendar
    this.initCalendar();
};

// Inicia a aplicacao (regras + redireciona para o index)
myApp.c.init = function () {
    var pages = this.appConfig.pages;
    if (typeof pages === 'object') {
        var loadPage = new LoadPage();
        for (var i in pages) {
            this.initPage(pages[i], loadPage[Util.ucfirst(pages[i])]);
        }
    }
    // redireciona para a pagina inicial
    myApp.c.go(this.appConfig.indexPage);
};

// Ajax na api global (appConfig.urlApi)
myApp.c.ajaxApi = function (method, params, callback) {
    var ajaxParams = {};
    ajaxParams.type = 'POST';
    ajaxParams.dataType = 'json';
    ajaxParams.data = (params || {});
    ajaxParams.url = this.appConfig.urlApi + method;
    ajaxParams.timeout = 7000;

    myApp.showPreloader(' ');
    var ajax = $.ajax(ajaxParams);
    ajax.always(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        myApp.hidePreloader();
        if ((error = myApp.c.errorAjaxApi(jqXHR, textStatus, errorThrown))) {
            myApp.alert(error, 'Opss');
        } else if (typeof callback == 'function') {
            callback(textStatus);
        }
    });
};

// error Ajax
myApp.c.errorAjaxApi = function (jqXHR, textStatus, errorThrown) {
    var errorStr = '';
    switch (textStatus) {
        case 'timeout':
            errorStr = 'O tempo limite de conexão foi atingido.';
            break;
        default:
            if ((typeofError = typeof textStatus.error) != 'undefined') {
                if (typeofError == 'object') {
                    for (var i in textStatus.error) {
                        errorStr += '&bull; ' + textStatus.error[i] + '<br />';
                    }
                } else {
                    errorStr += '&bull; ' + String(textStatus.error);
                }
            }
    }
    ;
    return errorStr;
};

// inicializa calendarios da pagina class: calendar, calendar-multiple, calendar-range
myApp.c.initCalendar = function () {
    this.calendar = {};
    var objCalendar = {},
        paramCalendar = {},
        paramCalendarDefault = {
            dateFormat: 'dd/mm/yyyy',
            multiple: false,
            rangePicker: false,
            monthNames: Util.getMonthNames(),
            monthNamesShort: Util.getMonthNamesShort(),
            dayNames: Util.getDayNames(),
            dayNamesShort: Util.getDayNamesShort()
        };
    // para calendario padrao (seleciona uma data)
    objCalendar = $$('input[type=text].calendar');
    for (var i = 0; i < objCalendar.length; i++) {
        this.calendar[objCalendar[i].id] = myApp.calendar($.extend(paramCalendar, paramCalendarDefault, {input: '#' + objCalendar[i].id}));
        console.log(objCalendar[i].id);
    }
    // para calendario selecao multipla (seleciona varias datas)
    paramCalendar = {};
    objCalendar = $$('input[type=text].calendar-multiple');
    for (var i = 0; i < objCalendar.length; i++) {
        this.calendar[objCalendar[i].id] = myApp.calendar($.extend(paramCalendar, paramCalendarDefault, {input: '#' + objCalendar[i].id, multiple: true}));
        console.log(paramCalendar);
    }
    // para calendario com selecao de periodo (data inicio e fim)
    paramCalendar = {};
    objCalendar = $$('input[type=text].calendar-range');
    for (var i = 0; i < objCalendar.length; i++) {
        this.calendar[objCalendar[i].id] = myApp.calendar($.extend(paramCalendar, paramCalendarDefault, {input: '#' + objCalendar[i].id, rangePicker: true}));
        console.log(paramCalendar);
    }
};

// cria lista
myApp.c.listView = function (action, param, target, callback) {
    
};

/*
 Util - Lista de metodos auxiliares
 */
var Util = {

    // primeira letra da string maiuscula resto minusculo
    ucfirst: function (str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
    },

    // meses do ano - 0: Janeiro
    getMonthNames: function (a) {
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return a ? meses[a] : meses;
    },

    // meses do ano (CURTO) - 0: Janeiro
    getMonthNamesShort: function (a) {
        var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return a ? meses[a] : meses;
    },

    // dias da semana - 0: Domingo
    getDayNames: function (a) {
        var dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return a ? dias[a] : dias;
    },

    // dias da semana (CURTO) - 0: Domingo
    getDayNamesShort: function (a) {
        var dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return a ? dias[a] : dias;
    }
};







