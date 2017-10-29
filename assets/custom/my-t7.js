
// Custom
Template7.registerHelper('count', function (a, options) {
  return a.length;
});

Template7.registerHelper('checked_html', function (a, b) {
  return (a == b ? 'checked="true"' : '');
});

Template7.registerHelper('percent', function (a, b) {
    a = parseFloat(a.replace(',','.'));
    b = parseFloat(b.replace(',','.'));
  return String(parseFloat(a * (b / 100)).toFixed(2)).replace('.',',');
});

Template7.registerHelper('percent2', function (a, b) {
    a = parseFloat(a.replace(',','.'));
    b = parseFloat(b.replace(',','.'));
  return String(parseFloat((a / b) * 100).toFixed(2)).replace('.',',');
});

Template7.registerHelper('foto', function (a, options) {
  return appConfig.urlFoto + (a || appConfig.urlFotoDefault);
});

Template7.registerHelper('data', function (a) {
    d = new Date(a);
    month = String(d.getMonth() + 1);
    day = String(d.getDate());
    year = String(d.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return day + '/' + month + '/' + year;
});

Template7.registerHelper('real', function (a, options) {
    var aParse = String(parseFloat(a).toFixed(2)).replace('.',',');
    return (aParse === 'NaN') ? '0,00' : aParse;
});

Template7.registerHelper('distancia', function (a, options) {
	// recebe "a" em km Ex.: 0,5 retorna "500 metros"
    if (a < 1) {
        a = a * 1000;
        unidadeMedida = "metros"
        aParse = String(parseFloat(a)).replace('.',',');
    } else {
        unidadeMedida = "Km"
        aParse = String(parseFloat(a).toFixed(2)).replace('.',',');
    }
    return (aParse === 'NaN') ? '' : aParse + ' ' + unidadeMedida;
});

// Class Template --------------------------------------------------------------
class Template {

    constructor (templateId, i) {
        this.templateId = templateId;
        this.templateCompiled = Template7(document.getElementById(this.templateId).innerHTML).compile();
        this.dataCompiled = '';
		// controle de destino - para destinos dinamicos
        this.i = (i || '');
    }

    clear () {
        document.getElementById('destino-' + this.templateId + this.i).innerHTML = '';
    }
    
    compileData (data) {
        this.dataCompiled = this.templateCompiled({data: data});
    }
    
    loadData () {
        return (typeof this.dataCompiled == 'string' ? document.getElementById('destino-' + this.templateId + this.i).innerHTML = this.dataCompiled : false);
    }
    
    appendData () {
        return (typeof this.dataCompiled == 'string' ? $('#destino-' + this.templateId + this.i).append(this.dataCompiled) : false);
    }
    
    compileAndLoadData (data) {
        var data = (data || {});
        this.compileData (data);
        this.loadData();
    }
    
    compileAjax (method, params, callback) {
        var templateCompiled = this;
        myApp.c.ajaxApi(method, params, function(a) {
            templateCompiled.compileAndLoadData(a);
            if (typeof callback == "function") {
                callback(a);
            }
        });
    }
    
}
