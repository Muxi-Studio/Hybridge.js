'use strict'

var YAJB = function(){
	var options
	// get global options
	if (window.javaInterface) {
		options = JSON.parse(window.javaInterface())
	}else if (window.YAJB_INJECT){
		options = window.YAJB_INJECT
	}else {
		throw new Error('No Global Inject Object detected, please use YAJB-js in a YAJB WebView Environment.');
	}
	this.platform = options.platform
	this.data = options.data
}

YAJB.prototype.isMobile = function() {
	if (window.javaInterface || window.YAJB_INJECT) {
		return true
	}else {
		return false
	}
}

YAJB.prototype.send = function() {

}

YAJB.prototype.trigger = function() {

}

YAJB.prototype.isAndroid = function() {

}

YAJB.prototype.isiOS= function() {

}

module.exports = YAJB