var elem = document.createElement('script');
elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
(function() {
var gdprAppliesGlobally = false;
function addFrame() {
    if (!window.frames['__cmpLocator']) {
    if (document.body) {
        var body = document.body,
            iframe = document.createElement('iframe');
        iframe.style = 'display:none';
        iframe.name = '__cmpLocator';
        body.appendChild(iframe);
    } else {
        // In the case where this stub is located in the head,
        // this allows us to inject the iframe more quickly than
        // relying on DOMContentLoaded or other events.
        setTimeout(addFrame, 5);
    }
    }
}
addFrame();
function cmpMsgHandler(event) {
    var msgIsString = typeof event.data === "string";
    var json;
    if(msgIsString) {
    json = event.data.indexOf("__cmpCall") != -1 ? JSON.parse(event.data) : {};
    } else {
    json = event.data;
    }
    if (json.__cmpCall) {
    var i = json.__cmpCall;
    window.__cmp(i.command, i.parameter, function(retValue, success) {
        var returnMsg = {"__cmpReturn": {
        "returnValue": retValue,
        "success": success,
        "callId": i.callId
        }};
        console.log("event ", event.source );

       if(event.source){
                event.source.postMessage(msgIsString ?
               JSON.stringify(returnMsg) : returnMsg, '*');
       }

    });
    }
}
window.__cmp = function (c) {
    var b = arguments;
    if (!b.length) {
    return __cmp.a;
    }
    else if (b[0] === 'ping') {
    b[2]({"gdprAppliesGlobally": gdprAppliesGlobally,
        "cmpLoaded": false}, true);
    } else if (c == '__cmp')
    return false;
    else {
    if (typeof __cmp.a === 'undefined') {
        __cmp.a = [];
    }
    __cmp.a.push([].slice.apply(b));
    }
}
window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
window.__cmp.msgHandler = cmpMsgHandler;
if (window.addEventListener) {
    window.addEventListener('message', cmpMsgHandler, false);
}
else {
    window.attachEvent('onmessage', cmpMsgHandler);
}
})();

var layoutPopup = "banner";
/*
if($.cookie("cc_cookie_accept")) {
layoutPopup = '';
}
*/
window.__cmp('init', {
        'Initial Screen Title Text': 'Il rispetto della tua privacy è la nostra priorità',
    'Initial Screen Reject Button Text': 'Non Accetto',
    'Initial Screen Accept Button Text': 'Accetto',
    'Initial Screen Purpose Link Text': 'Mostra tutte le finalità di utilizzo',
    'Purpose Screen Title Text': 'Il rispetto della tua privacy è la nostra priorità',
    'Purpose Screen Header Title Text': 'Impostazioni sulla privacy',
    'Purpose Screen Body Text': 'È possibile impostare le tue preferenze sul consenso e scegliere come i tuoi dati vengono utilizzati in relazione alle diverse finalità riportate di seguito. Inoltre, potrai configurare le impostazioni per il nostro sito indipendentemente da quelle per i nostri partner. Troverai una descrizione per ciasuna delle finalità di utilizzo, in modo che tu sia a conoscenza di come noi e i nostri partner utilizziamo i tuoi dati.',
    'Purpose Screen Vendor Link Text': 'Visualizza la lista completa dei partner',
    'Purpose Screen Cancel Button Text': 'Annullare',
    'Purpose Screen Save and Exit Button Text': 'Salva e Chiudi',
    'Vendor Screen Title Text': 'Il rispetto della tua privacy è la nostra priorità',
    'Vendor Screen Body Text': 'È possibile impostare le preferenze sul consenso per ogni singola società partner riportata di seguito. Per facilitare la tua decisione, puoi espandere l&#039;elenco di ciascun partner e visualizzare per quali finalità utilizza i dati. In alcuni casi, le società possono affermare che utilizzano i tuoi dati senza chiedere il consenso, in quanto esiste un legittimo interesse. Puoi fare clic sulle loro politiche sulla privacy per ottenere maggiori informazioni e per revocare il consenso.',
    'Vendor Screen Accept All Button Text': 'Accettare tutto',
    'Vendor Screen Reject All Button Text': 'Rifiutare tutto',
    'Vendor Screen Purposes Link Text': 'Ritorna alle finalità di utilizzo',
    'Vendor Screen Cancel Button Text': 'Annullare',
    'Vendor Screen Save and Exit Button Text': 'Salva e Chiudi',
    'Initial Screen Body Text': 'Noi e i nostri partner utilizziamo, sul nostro sito, tecnologie come i cookie per personalizzare contenuti e annunci, fornire funzionalità per social media e analizzare il nostro traffico. Facendo clic di seguito si acconsente all&#039;utilizzo di questa tecnologia. Puoi cambiare idea e modificare le tue scelte sul consenso in qualsiasi momento ritornando su questo sito.',
    'Initial Screen Body Text Option': 1,
    'Publisher Name': 'Libero Quotidiano',
    'Publisher Logo': 'https://www.liberoquotidiano.it/images/logos/1/logo_black.jpg?v=1448285597000',
    'Publisher Purpose IDs': [1,2,3,4,5],
    'Consent Scope': 'service',
    'Post Consent Page': 'https://www.liberoquotidiano.it/',
    //'No Option': false,
    'UI Layout': layoutPopup,
            //'Default Value for Toggles': 'on',
});

/*$(document).on("click","#qcCmpButtons button.qc-cmp-button:nth-child(2), button.qc-cmp-button.qc-cmp-save-and-exit", function(event){
event.preventDefault();
window.__cmpui("setAndSaveAllConsent",!0);
//console.log("Quantcast");
acceptAllCookies();
//console.log("Nostri cookies");
document.location.reload(true);
});*/

/*$( document ).ready(function() {
if (find('.qc-cmp-showing').length === 0) {
$('body').addClass(".vc_show_cmp");
}
});*/


$( window ).scroll(function() {

    if($(this).scrollTop()>0 && (! $("body").hasClass("drag_and_drop")) && $("body").hasClass("qc-cmp-ui-showing") ){
        window.__cmpui("setAndSaveAllConsent",!0);
        acceptAllCookies();
        location.reload();
    }
});  


if((! $.cookie("cc_cookie_accept")) ){
    $( window ).scroll(function() {
        if($(this).scrollTop()>0 && (! $("body").hasClass("drag_and_drop")) ){
        window.__cmpui("setAndSaveAllConsent",!0);
        acceptAllCookies();
        location.reload();
        }
    });  
}


//Accept all cookies of cms

$(document).on("ready",function(){
//Primi due bottoni di "Non accetto" e "Accetto"
$(document).on("click",".qc-cmp-buttons.qc-cmp-primary-buttons .qc-cmp-button.qc-cmp-secondary-button", function(event){
    document.location.reload(true);
});
$(document).on("click","#qcCmpButtons button.qc-cmp-button[onclick]", function(){
    acceptAllCookies();
    document.location.reload(true);
});
//Settings privacy
var weEdit = false;
$(document).on("click",".qc-cmp-horizontal-buttons button.qc-cmp-button.qc-cmp-button-small:last-child", function(event){
    btnQuantcastAcceptAll();
});
function btnQuantcastAcceptAll(){
    cookie_law_settings = [];
    for(var i=0;i<cookies.length;i++){
        var provider_tag = getCookieProvider(cookies[i].provider_id).tag;
        var userCookie = {};
        userCookie.tag = cookies[i].tag;
        userCookie.accepted = true;
        userCookie.provider_tag=provider_tag;
        cookie_law_settings.push(userCookie);
    }
    saveCookieLawSettings();
    weEdit = true;
}
$(document).on("click",".qc-cmp-horizontal-buttons .qc-cmp-button.qc-cmp-button-small.qc-cmp-secondary-button", function(event){
    btnQuantcastRejectAll();
});
function btnQuantcastRejectAll(){
    cookie_law_settings = [];
    for(var i=0;i<cookies.length;i++){
        var provider_tag = getCookieProvider(cookies[i].provider_id).tag;
        var userCookie = {};
        userCookie.tag = cookies[i].tag;
        userCookie.accepted = false;
        userCookie.provider_tag=provider_tag;
        cookie_law_settings.push(userCookie);
    }
    saveCookieLawSettings();
    weEdit = true;
}

function acceptAllCookies(){
    cookie_law_settings = [];
    for(var i=0;i<cookies.length;i++){
        var provider_tag = getCookieProvider(cookies[i].provider_id).tag;
        var userCookie = {};
        userCookie.tag = cookies[i].tag;
        userCookie.accepted = true;
        userCookie.provider_tag=provider_tag;
        cookie_law_settings.push(userCookie);
    }
    saveCookieLawSettings();
    //weEdit = true;
}

function saveCookieLawSettings(){
$.cookie(cookie_name, JSON.stringify(cookie_law_settings), { path: '/', expires: 365});
$.cookie('cc_cookie_accept', 'cc_cookie_accept', { path: '/', expires: 365});
}
//click on "salva e chiudi"
$(document).on("click",".qc-cmp-nav-bar.qc-cmp-bottom .qc-cmp-button.qc-cmp-save-and-exit", function(event){
    if (weEdit) {
        document.location.reload(true);
    }
});
});

