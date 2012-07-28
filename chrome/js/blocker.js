/*

      _____    ___                                                                      
    /\  __`\ /\_ \                __                      __                            
      \ \ \/\ \\//\ \    __  __  __/\_\    ___ ___   _____ /\_\    ___    ____          
      \ \ \ \ \ \ \ \  /\ \/\ \/\ \/\ \ /' __` __`\/\ '__`\/\ \  /'___\ /',__\          
        \ \ \_\ \ \_\ \_\ \ \_/ \_/ \ \ \/\ \/\ \/\ \ \ \L\ \ \ \/\ \__//\__, `\        
        \ \_____\/\____\\ \___x___/'\ \_\ \_\ \_\ \_\ \ ,__/\ \_\ \____\/\____/         
          \/_____/\/____/ \/__//__/   \/_/\/_/\/_/\/_/\ \ \/  \/_/\/____/\/___/         
                                                      \ \_\                             
                                                        \/_/                            

  #######################################################################################

  Developed by Greg Leuch (@gleuch). <http://gleu.ch>
  (c) 2012. Open-sourced for non-commerical, creative uses only. Attribution required.
  
  http://fffff.at/olwimpics

  #######################################################################################


*/


jQuery.noConflict();

var Olwimpics = {

  /* --- Configuration ------------------------------------------------------------------ */

  keywords : [
    'olympics.org', 'international olympic committee', 'ioc', '(summer|winter|ancient) (games|olmpyics)', 'london(\s2012)?(\sgames)?', 'sports', '(opening|closing) ceremon(y|ies)', 'competition',
    'olympic( (games|motto))?', 'olympics',
    'gold( medal)?', 'silver( medal)?', 'bronze( medal)?',
    '([0-9\,\.]+)( |)((kilo|m)et(er|re))(s)?', '([0-9\,\.]+)( |)(km|m)',
    'track\s(and|\&amp;|\&)\sfield', 'decathalon', '(long|high|triple)\sjump', 'hurdle(s)?', 'pole\svault', 'shot(\s)?put', 'discus\sthrow', 'javelin(\sthrow)?', 'hammer throw',
    'archery', 'athletics', 'aquatics', 'badminton', 'basketball', 'boxing', 'canoeing', 'cycling', 'diving', 'equestrian', 'fencing', 'field\shockey', 'football', 'soccer', 'gymnastics', 'handball', 'judo', '(modern\s)?Pentathlon', 'rowing', 'sailing', 'shooting', '(synchronized\s)?swimming', 'table tennis', 'taekwondo', 'tennis', 'triathlon', '(beach\s)?volleyball', 'water\spolo', 'weightlifting', 'wrestling',
  ],
  colors : ['rgb(0,133,199)', 'rgb(244,195,0)', 'rgb(0,0,0)', 'rgb(0,159,61)', 'rgb(223,0,36)'],


  /* --- Settings (don't change) -------------------------------------------------------- */

  _processing : false,
  _loaded : false,
  _count : 0,
  _regexp : null,
  _class_name : 'olwimpics_block',
  _start_tag : 'body',
  _blocked_text : '',
  _replace : function(w,c) {return '<ins title="'+ (w || '').replace(/\'|\"/mg, '') +'" class="'+ Olwimpics._class_name +'" style="color: '+ c +' !important; background: '+ c +' !important; text-decoration: none !important;">'+ w +'</ins>';},
  _page_height : 0,
  _page_scroll_height : 0,
  _page_href : null,
  _recheck_intv : null,
  _recheck_intv_delay : 100,


  /* ---- Starting Block ---------------------------------------------------------------- */

  start : function() {
    console.log('start!')

    /* Ready... */
    for (var i in Olwimpics.keywords) Olwimpics.keywords[i] = '('+ Olwimpics.keywords[i] +')';
    Olwimpics._regexp = new RegExp('(^|[\\s\\\'\\"\\;\\:\\{\\[\\(\u201C\u2018“‘\\#\\/])('+ Olwimpics.keywords.join('|') +')($|[\\s\\.\\,\\?\\!\\\'\\"\\;\\:\\}\\]\\)&\u201D\u2019”’\\/])', 'img');


    /* Set... */
    try {
      try {Olwimpics._page_height = jQuery(tag).height();} catch(e) {}
      try {Olwimpics._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      Olwimpics._page_href = location.href;
    } catch(e) {console.log('whaaa?')}

    Olwimpics._recheck_intv = setTimeout(function() {Olwimpics.measure( Olwimpics._start_tag );}, Olwimpics._recheck_intv_delay);
    jQuery(window).load(function() {Olwimpics._loaded = true; Olwimpics._recheck_intv_delay = 1000;});
    setTimeout(function() {Olwimpics._recheck_intv_delay = 1000;}, 5000); // also slow down after 5 seconds


    /* Go! */
    Olwimpics.go();
  },


  /* --- Arena -------------------------------------------------------------------------- */

  go : function() {
    Olwimpics.qualify( Olwimpics._start_tag );
    Olwimpics.party( Olwimpics._start_tag );
  },

  measure : function(tag) {
    console.log('measure')
    var scroll_height = 0, page_height = 0, page_length = 0;
    try {scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
    try {page_height = jQuery(tag).height();} catch(e) {}
    try {if (Olwimpics._loaded) page_length = parseInt(document.body.innerText.length);} catch(e) {}

    if (location.href != Olwimpics._page_href || Math.abs(Olwimpics._page_height - page_height) > 20 || Math.abs(Olwimpics._page_scroll_height - scroll_height) > 20 || (Olwimpics._loaded && page_length > 0 && Math.abs(Olwimpics._page_length - page_length) > 20) || page_height == 0 || scroll_height == 0) {
      try {Olwimpics._page_height = jQuery(tag).height();} catch(e) {}
      try {Olwimpics._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      Olwimpics._page_href = location.href;
      if (page_length && page_length >= 0) Olwimpics._page_length = parseInt(page_length);
      Olwimpics.qualify(tag);
    }

    // if (Olwimpics._loaded && page_length > 2000000) return;
    Olwimpics._recheck_intv = setTimeout(function() {Olwimpics.measure(tag);}, Olwimpics._recheck_intv_delay);
  },

  qualify : function(tag) {
    jQuery(tag).each(function() { Olwimpics.filter.call(this); });
  },

  medal : function() {
    var color = Olwimpics.colors[ (Olwimpics._count % Olwimpics.colors.length) ];
    Olwimpics._count++;
    return color;
  },

  filter : function() {
    if (this.nodeType == 1) {
      if (['head', 'img', 'textarea', 'option', 'style', 'script', 'code', 'samp', 'select', 'iframe', 'input'].indexOf(this.tagName.toLowerCase()) > -1) return false;
      if (jQuery(this).hasClass(Olwimpics.class_name)) return false;
    }
    Olwimpics.block.call(this);
  },

  replace : function() { return arguments[1] + Olwimpics._replace(arguments[2], Olwimpics.medal()) + arguments[arguments.length-3]; },
  text_replace : function() {
    var s = ''; for (var i=0; i<arguments[2].length; i++) s += '*';
    return arguments[1] + s + arguments[arguments.length-3];
  },

  block : function() {
    var text, rep_text, span;

    /* Text nodes */
    if (this.nodeType == 3) {
      text = this.nodeValue;
      if (jQuery.trim(text) != '') {
        rep_text = text.replace(Olwimpics._regexp, Olwimpics.replace);
        if (text != rep_text) {
          /* We replace text node with span tag to mark as having been searched, but also to insert HTML. */
          span = document.createElement("span");
          span.innerHTML = rep_text;
          this.parentNode.replaceChild(span, this);
        }
      }

    /* HTML nodes, traverse children */
    } else if (this.nodeType == 1) {
      if (jQuery(this).children().length > 0) {
        Olwimpics.qualify( jQuery(this).contents() );
      } else {
        text = jQuery(this).html();
        if (jQuery.trim(text) != '') {
          rep_text = text.replace(Olwimpics._regexp, Olwimpics.replace);
          if (text != rep_text) jQuery(this).html(rep_text);
        }
      }
    }
  },

  party : function(tag) {
    document.title = document.title.replace(Olwimpics._regexp, Olwimpics.text_replace);

    /* image replacement */
    jQuery(tag).find('img, input[type=image]').each(function() {
      try {
        var r = jQuery(this), text = r.attr('src') +' '+ r.attr('alt') +' '+ r.attr('title');
        if (!r.hasClass(Olwimpics._class_name) && text.match(Olwimpics._regexp)) {
          var w = r.width(), h = r.height();
          r.addClass(Olwimpics._class_name).css({'background': Olwimpics.medal() +' !important', 'width': w+'px !important', 'height': h+'px !important'}).attr('src', chrome.extension.getURL('images/blank.png')).attr('title', Olwimpics._blocked_text).attr('alt', Olwimpics._blocked_text).width(w).height(h);
        }
      } catch(e) {}
    });
  }
};


/* Opening Ceremony */
try {
  Olwimpics.start();
} catch(e) {
  console.error("Olwimpics had a boo-boo. :(\n\n"+ e);
}

