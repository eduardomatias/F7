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
    // informacoes do app 
    appLogo: './assets/img/logo.png',
    appName: 'MyApp',
    appSlogan: 'MyApp Slogan',
    // infineteScroll
    infineteScrollEnable: true,
    // Itens carregados por vez
    infineteScrollQtd: 25,

    // URL utilizados nas requisicoes ajax
    urlApi: './backend/',
    // URL das imagens
    urlImg: './backend/img/',
    imgDefault: 'imgDefault.gif',
    // URL dos tamplates de lista
    urlTemplateList: './templates/list/',

    // lista com todas as paginas acessiveis do sistema
    pages: [],

    // pagina inicial
    indexPage: 'index.html',

    // Para os itens abvaixo passe TRUE ou FALSE para aplicar em todas as paginas ou informe as paginas em um array
    // Oculta barra superior (label/icones)
    navbarHide: ['form'],
    // Oculta barra inferior (label/icones)
    toolbarHide: ['about'],
    // oculta menu esquerdo (slide)
    panelLeftHide: false,
    // oculta menu direito (slide)
    panelRightHide: true,
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
    if ($.inArray(pgName, this.appConfig.navbarHide) === -1 && this.appConfig.navbarHide !== true) {
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
            console.warn('O item: ' + (itens[i].label || itens[i].ico) + ',  da Toolbar nao possui o attr "href", favor addiciona-lo!');
        } else {
            codHtml += '<a href="./pages/' + itens[i].href + '" class="link link-toolbar-bottom active-' + itens[i].href.split('.')[0] + ' ' + (itens[i].class || '') + '">';
            codHtml += '<i class="fa fa-2x fa-' + (itens[i].ico || 'question-circle-o') + '" aria-hidden="true"></i><span class="tabbar-label">' + (itens[i].label || '') + '</span>';
            codHtml += '</a>';
        }
    }
    codHtml += '</div>';
    toolbar = $('div#toolbar-bottom').html(codHtml);
};

// habilita/desabilita toolbar (barra inferior)
myApp.c.toolbarHide = function (pgName) {
    if ($.inArray(pgName, this.appConfig.toolbarHide) === -1 && this.appConfig.toolbarHide !== true) {
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
        console.warn('Pagina nao registrada, adicione-a em: myApp.c.appConfig.pages');
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
            this.initPage(pages[i], loadPage[pages[i]]);
        }
    }
    // redireciona para a pagina inicial
    this.go(this.appConfig.indexPage);
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
        myApp.hidePreloader();
        if ((error = myApp.c.errorAjaxApi(jqXHR, textStatus, errorThrown))) {
            myApp.alert(error, 'Opss');
        } else if (typeof callback == 'function') {
            callback(jqXHR);
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
            if ((typeofError = typeof jqXHR.error) != 'undefined') {
                if (typeofError == 'object') {
                    for (var i in jqXHR.error) {
                        errorStr += '&bull; ' + jqXHR.error[i] + '<br />';
                    }
                } else {
                    errorStr += '&bull; ' + String(jqXHR.error);
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
    }
    // para calendario selecao multipla (seleciona varias datas)
    paramCalendar = {};
    objCalendar = $$('input[type=text].calendar-multiple');
    for (var i = 0; i < objCalendar.length; i++) {
        this.calendar[objCalendar[i].id] = myApp.calendar($.extend(paramCalendar, paramCalendarDefault, {input: '#' + objCalendar[i].id, multiple: true}));
    }
    // para calendario com selecao de periodo (data inicio e fim)
    paramCalendar = {};
    objCalendar = $$('input[type=text].calendar-range');
    for (var i = 0; i < objCalendar.length; i++) {
        this.calendar[objCalendar[i].id] = myApp.calendar($.extend(paramCalendar, paramCalendarDefault, {input: '#' + objCalendar[i].id, rangePicker: true}));
    }
};

/*
 * Criar listView
 * action:  url do ajax
 * param:   data do ajax
 * target:  nome do template (é necessário criar o template.html templates/list/seuTarget.html) 
 *          tbm é o do destino/alvo da lista <div class="list-block" id="seuTarget"
 * callback:    callback ajax
 * search:  busca na listview
 */
myApp.c.listView = function (action, param, target, callback, search = true, infiniteScroll = true) {
    var objTarget = $('div#' + target);
	this.appConfig.infineteScrollEnable = infiniteScroll;
    if (objTarget.length == 0) {
        console.warn('[myApp.c.listView] O target informado não foi encontrado, é necessário criar uma  <div> com id="' + target + '".');
        return;
    }
    objTarget.append('<ul class="template-list" id="target-' + target + '">');
    var TemplateListView = new Template(target);
    TemplateListView.compileList(action, param, function (a) {
        if (search) myApp.c.createSearchList();
        if (myApp.c.appConfig.infineteScrollEnable) myApp.c.infiniteScroll(TemplateListView, a);
        if (typeof callback == 'function') callback(a);
    });
};

// cria searchlist
myApp.c.createSearchList = function () {
    var numObj = $('.page .page-content').length - 1,
		searchBar = '\
            <form class="searchbar searchbar-' + numObj + '">\n\
                <div class="searchbar-input">\n\
                    <input type="search" placeholder="buscar">\n\
                    <a href="#" class="searchbar-clear"></a>\n\
                </div>\n\
                <a href="#" class="searchbar-cancel">Cancelar</a>\n\
            </form>\n\
            <div class="searchbar-overlay"></div>',
        notFound = '\
            <div class="content-block searchbar-not-found">\n\
               <div class="content-block-inner">Nenhum registro encontrado.</div>\n\
            </div>',
		objHtml = $($('.page .page-content')[numObj]);
    objHtml.before(searchBar);
    objHtml.find('.list-block').addClass('list-block-search searchbar-found').before(notFound);
    searchbar = myApp.searchbar('.searchbar-' + numObj, {
        searchList: '.list-block-search',
        searchIn: '.item-title',
		onSearch: function(a){
			console.log(a);
		}
	});
};

// cria infiniteScroll
myApp.c.infiniteScroll = function (TemplateListView, data) {
    
    // verifica se é um array ou object
    var dataArray = data instanceof Array;
    var newObjectList;

    // add class infinite-scroll
    var objList = $($('.infinite-scroll')[$('.infinite-scroll').length - 1]);
    var objListBlock = objList.find('.list-block');
    var objListLi = objListBlock.find('li');
    var objListUl = objListBlock.find('ul');
    var preloaderHtml = '\n\
        <div class="infinite-scroll-preloader">\n\
            <div class="preloader"></div>\n\
        </div>';
    
    // Attach preloader
    objListBlock.append(preloaderHtml);

    // Loading flag
    var loading = false;

    // Last loaded index
    var lastIndex = objListLi.length;

    // Max items to load
    var maxItems = Object.keys(data).length;

    // Append items per load
    var itemsPerLoad = this.appConfig.infineteScrollQtd;
    
    // Attach 'infinite' event handler
    objList.on('infinite', function () {
		
		$$('.infinite-scroll-preloader').show();
		
        // Exit, if loading in progress
        if (loading)  return;

        // Set loading flag
        loading = true;

        // Emulate 0,5s loading
        setTimeout(function () {

            // Reset loading flag
            loading = false;

            if (lastIndex >= maxItems) {
				// Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
				myApp.detachInfiniteScroll(objList);
				// Remove preloader
				$$('.infinite-scroll-preloader').remove();
				return;
            }

            // Generate new object
            newObjectList = dataArray ? [] : {};
            for (var i = lastIndex; i < lastIndex + itemsPerLoad; i++) {
                if (maxItems <= i) break;
                if (dataArray) {
                    newObjectList.push(data[i]);
                } else {
                    k = Object.keys(data)[i];
                    newObjectList[k] = data[k];
                }
            }
            
            // Conpile and Append new items
            TemplateListView.compileData(newObjectList);
            TemplateListView.appendData();

            // Update last loaded index
            lastIndex = objListBlock.find('li').length;
			
			$$('.infinite-scroll-preloader').hide();
			
        }, 500);
        
    });
    
    objList.trigger('infinite');
    
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