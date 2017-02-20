'use strict'

var YAJB = function(){
	var options
	this.isAndroid = false
	this.isiOS = false
	// get global options
	if (window.javaInterface) {
		options = JSON.parse(window.javaInterface())
		this.isAndroid = true
	}else if (window.YAJB_INJECT){
		options = window.YAJB_INJECT
		this.isiOS = true
	}else {
		throw new Error('No Global Inject Object detected, please use yajb-js in a YAJB WebView Environment.');
	}
	this.platform = options.platform
	this.data = options.data
	window.YAJB = this
}

YAJB.prototype.isMobile = function() {
	if (window.javaInterface || window.YAJB_INJECT) {
		return true
	}else {
		return false
	}
}

YAJB.prototype.send = function(option) {
	if (this.isAndroid) {
		window.alert(JSON.stringfiy(option))
	}else if (this.isiOS) {
		// window.postMessage
	}
}

YAJB.prototype.on = function() {

}

YAJB.prototype.trigger = function() {

}


export default YAJB