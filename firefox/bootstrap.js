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


            !!! FINAL VERSION ### OLYMPICS ARE OVER, SO IS THIS BLOCKER !!!

*/


/* --- DEFAULTS --------------------------------------------------------------- */

const global = this;
const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/NetUtil.jsm");


/* --- STARTUP ---------------------------------------------------------------- */

function startup({id}) AddonManager.getAddonByID(id, function(addon) {
  /* We don't need to startup anything. Olympics is over! */
});


/* --- SHUTDOWN --------------------------------------------------------------- */

function shutdown(data, reason) {
  /* We don't need to shutdown anything. Everything is handled in the startup */
};


/* --- INSTALL ---------------------------------------------------------------- */

function install(data, reason) {
  /* We don't install anything. Everything is handled in the startup */
};


/* --- UNINSTALL -------------------------------------------------------------- */

function uninstall(data, reason) {
  /* We don't install anything. Everything is handled in the shutdown */
};