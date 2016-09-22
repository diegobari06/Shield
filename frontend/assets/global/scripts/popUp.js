/**
 * This tiny script just helps us demonstrate
 * what the various example callbacks are doing
 */
var popUp = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.showdown = function(text) {
        clearTimeout(hideHandler);
        $("html").find("#"+"popUp").html(text);
        $("html").find("#"+"popUp").css({"right": "0%", "bottom": "25%","top":'',"background-color":'rgba(244,67,54,0.8)'});
        $("html").find("#"+"popUp").delay(200).fadeIn().delay(3000).fadeOut();
    };

    that.show = function(text) {
        clearTimeout(hideHandler);
        $("html").find("#"+"popUp").html(text);

        $("html").find("#"+"popUp").css({"right": "40.9%", "top": "5%","bottom":'',"background-color":'rgba(244,67,54,0.9)',"z-index":"99999999"});
        $("html").find("#"+"popUp").delay(200).fadeIn().delay(3000).fadeOut();
    };

    that.success = function(text) {
        clearTimeout(hideHandler);
        $("html").find("#"+"popUp").html(text);

        $("html").find("#"+"popUp").css({"right": "40.9%", "top": "5%","bottom":'',"background-color":'rgba(10,164,31,0.9)' });
        $("html").find("#"+"popUp").delay(200).fadeIn().delay(3000).fadeOut();
    };

    return that;
}());
