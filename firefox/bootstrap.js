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


/* --- DEFAULTS --------------------------------------------------------------- */

const global = this;
const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/NetUtil.jsm");


/* --- STARTUP ---------------------------------------------------------------- */

function startup({id}) AddonManager.getAddonByID(id, function(addon) {
  /*
    Load up watcher window:
      * Although "scriptloader" gives warning in validation, is noted as being not dangerous:
        - Noted this as flag for reviewer, not as being harmful, by eviljeff: https://forums.mozilla.org/addons/viewtopic.php?p=13146
        - Listed as not being dangerous anymore, by Jorge Villalobos: https://groups.google.com/d/msg/mozilla.dev.extensions/TMFWetkVEDQ/fbrHUI3CrWgJ
  */
  Services.scriptloader.loadSubScript(addon.getResourceURI('content/js/watch.js').spec, global);
  
  watchWindows(function(win) {
    win.addon = addon;
    win.gBrowser.tabContainer.addEventListener("TabAttrModified", function(e) {
      try {
        var tab = this.gBrowser.getBrowserForTab(e.target);
        if (tab === undefined || !tab.currentURI.spec.match(/^http/i)) return false;

        if (!tab.contentDocument._olwimpics_loaded) {
          Services.scriptloader.loadSubScript(this.addon.getResourceURI('content/js/jquery-1.7.2.min.js').spec, tab.contentDocument);
          Services.scriptloader.loadSubScript(this.addon.getResourceURI('content/js/blocker.js').spec, tab.contentDocument);
          tab.contentDocument._olwimpics_loaded = true;
        }
      } catch(e) {}
    }.bind(win), false);
  });
});


/* --- SHUTDOWN --------------------------------------------------------------- */

function shutdown(data, reason) {
  /* We don't nee to shutdown anything. Everything is handled in the startup */
};


/* --- INSTALL ---------------------------------------------------------------- */

function install(data, reason) {
  /* We don't install anything. Everything is handled in the startup */
};


/* --- UNINSTALL -------------------------------------------------------------- */

function uninstall(data, reason) {
  /* We don't install anything. Everything is handled in the shutdown */
};