// ==UserScript==
// @name       MushGarou
// @version    0.1.0
// @author     Ma c'hi (mush@machi.tel)
// @description  Modifications de Mush.vg pour parties dans le style "Les Loups Garous de Thiercelieux"
// @grant      GM_xmlhttpRequest
// @match      http://mush.vg
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @exclude    http://mush.vg/g/*
// @exclude    http://mush.vg/gold/*
// @exclude    http://mush.vg/group/*
// @exclude    http://mush.vg/help
// @exclude    http://mush.vg/help*
// @exclude    http://mush.vg/me
// @exclude    http://mush.vg/ranking
// @exclude    http://mush.vg/theEnd/*
// @exclude    http://mush.vg/tid/*
// @exclude    http://mush.vg/u/*
// @copyright  2012-2014+, Ma c'hi
// @updateurl  https://raw.github.com/Machi3000/MushGarou/master/mushgarou.user.js
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
var $ = unsafeWindow.jQuery;
var Main = unsafeWindow.Main;

var version = '0.1.0';

/**
 * Userscript global tools
 **/

function m_userscriptInit() {
	if($('#m_userscriptArea').size()<1) {
		var html = '<div id="m_userscriptArea">'
		+'<h2>UserScripts</h2>'
		+'<div class="m_tabs">'
		+'<ul>'
        +'<li data-id="m_tabs_reduced"><img src="http://mush.vg/img/icons/ui/up.png" alt="reduced" title="Réduire ce cadre" /></li>'
		+'<li data-id="m_tabs_warning"><img src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif" alt="warning" title="Information sur les userscripts" /></li>'
		+'</ul>'
		+'<div id="m_tabs_warning">'
		+'<p>Vous utilisez actuellement un (ou plusieurs) UserScript(s) : veuillez le(s) désactiver avant tout rapport de bug aux créateurs du jeu.<br /><a href="http://mush.blablatouar.com/help.php" target="_blank">+ d\'infos</a></p>'
		+'</div>'
        +'<div id="m_tabs_reduced"></div>'
		+'</div>'
		+'</div>';
		$('body').append(html);
	}
	
	var css = ' '
    +'#m_userscriptArea { position:absolute; top: 45px; background-color: #171C56; border: 1px solid #213578; font-size: 0.7em; padding:4px; width: 300px; right:10px; box-shadow: 0px 0px 5px #000000; overflow:hidden; }'
    +'#m_userscriptArea h2 { font-size: 1em; background: url(http://www.hordes.fr/img/icons/r_repair.gif) 1px 0px no-repeat; margin: 0px 0px 8px 0px; padding-left:20px; }'
    +'#m_userscriptArea .m_tabs ul { float:right;margin-top: -24px; }'
    +'#m_userscriptArea .m_tabs ul li { opacity: 0.6; background: #213578; padding:4px 4px 4px 4px; cursor: pointer; display:inline-block; margin: 0px 2px 0px 2px; height:16px; vertical-align:middle;  }'
    +'#m_userscriptArea .m_tabs ul li.active, #m_userscriptArea .m_tabs ul li:hover { opacity: 1; }'
    +'#m_userscriptArea .m_tabs { padding: 0px; } '
    +'#m_userscriptArea .m_tabs div { padding: 4px; background: #213578; display:none; }'
    +'#m_userscriptArea .m_tabs div h3 { font-size: 1em; border-bottom: 1px dotted #CCCCCC; margin-bottom: 2px; }'
    +'#m_userscriptArea .m_tabs div img { margin-bottom:-3px; }'
    +''
    +'#m_tabs_reduced { margin-bottom:-15px; visibility:hidden; }'
    +''
    +'#m_userscriptPopin { z-index:1000; position:absolute; top: 140px; background-color: #171C56; border: 1px solid #213578; font-size: 1em; padding:4px; width: 800px; right:0px; left:0px; margin: auto; box-shadow: 0px 0px 5px #000000; }'
    +'#m_userscriptPopin h2 { font-size: 0.7em; background: url(http://www.hordes.fr/img/icons/r_repair.gif) 1px 0px no-repeat; margin: 0px 0px 3px 0px; padding-left:20px; }'
    +'#m_userscriptPopin em { color:#84E100; }'
    +'#m_userscriptPopin #m_userscriptPopinContent { padding: 4px; background: #213578; }'
    +'#m_userscriptPopin #m_userscriptPopinContent h4 { margin:4px; }'
    +'#m_userscriptPopin #m_userscriptPopinContent p { margin: 4px 4px 4px 8px; font-size:0.9em;  }'
    +'#m_userscriptPopin #m_userscriptPopinContent a.m_userscriptPopinClose { display:block; width: 100px; margin: 15px auto 5px; background-color: #102B83; border: 1px solid #171C56; color: #CCCCCC; text-decoration: none; text-align:center;  box-shadow: 0px 0px 5px #000000; }'
    +'#m_userscriptPopin #m_userscriptPopinContent a.m_userscriptPopinClose:hover { color: #FFFFFF; box-shadow: 0px 0px 3px #000000; }'
	+'@media all and (max-width: 1700px) {'
	+' ul.kmenu { margin-right:310px; }'
	+' ul.kmenu li.kmenuel a { width: 100px; }'
	+'}'
    +'*[data-m="compatibilityData"] { display:none !important; }'
    +' ';
    $('head').append('<style type="text/css">'+css+'</style>');
    
    $('#m_userscriptArea .m_tabs ul li').click(function() {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#'+$(this).attr('data-id')).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $(this).addClass('active');
        localStorage['m_currentTab']=$(this).attr('data-id').substr(7);
    });
    
}

function m_userscriptAfterInit() {
    if(localStorage['m_currentTab']) {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#m_tabs_'+localStorage['m_currentTab']).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $('#m_userscriptArea .m_tabs ul li[data-id="m_tabs_'+localStorage['m_currentTab']+'"]').addClass('active');
    } else {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#m_tabs_warning').slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $('#m_userscriptArea .m_tabs ul li[data-id="m_tabs_warning"]').addClass('active');
    }
}

function m_updateTab(name,content) {
    $('#m_tabs_'+name).html(content);
}

function m_addTab(name,icon,content,title) {
    if($('#m_tabs_'+name).size()<1) {
       var li = '<li data-id="m_tabs_'+name+'"><img src="'+icon+'" alt="'+name+'" title="'+title+'" /></li>';
       $('#m_userscriptArea .m_tabs ul').append(li);
        var tab = '<div id="m_tabs_'+name+'" style="display:none;"></div>';
       $('#m_userscriptArea .m_tabs').append(tab);
    }
    
    $('#m_userscriptArea .m_tabs ul li[data-id="m_tabs_'+name+'"]').click(function() {
        $('#m_userscriptArea .m_tabs div').slideUp();
        $('#'+$(this).attr('data-id')).slideDown();
        $('#m_userscriptArea .m_tabs ul li').removeClass('active');
        $(this).addClass('active');
        localStorage['m_currentTab']=name;
    });
    
    m_updateTab(name,content);
}

function m_popin(title,message,button) {
    if($('#m_userscriptPopin').size()<1) {
        var html = '<div id="m_userscriptPopin"><h2>UserScripts</h2><div id="m_userscriptPopinContent"></div></div>';
        $('body').append(html);
    }
    
    $('#m_userscriptPopinContent').html('<h4>'+title+'</h4><p>'+message+'</p><a href="#" class="m_userscriptPopinClose">'+button+'</a>');    
    
    $('#m_userscriptPopin').fadeIn();
    $('.m_userscriptPopinClose').click(function(){ $('#m_userscriptPopin').fadeOut(); });
}

/**
 * Userscript specific code
 **/
function m_thisInit() {
	
}


/**
 * Userscript init
 **/
function m_init() {
    m_userscriptInit();
    m_thisInit();
    m_userscriptAfterInit();
}
window.addEventListener('load', m_init, false);
