'use strict'

var YAJB = function(){
	this.messageQueue= []
	this.eventQueue = []
	var options
	this.isAndroid = false
	this.isiOS = false
	// get global options
	if (window.javaInterface) {
		options = JSON.parse(window.javaInterface.toString())
		this.isAndroid = true
	}else if (window.YAJB_INJECT){
		options = window.YAJB_INJECT
		this.isiOS = true
	}
	else {
		throw new Error('No Global Inject Object detected, please use yajb-js in a YAJB WebView Environment.');
	}
	this.platform = options.platform
	this.data = options.data
	window.YAJB_INSTANCE = this 
}

YAJB.prototype._emit = function(option){

	var opt = JSON.parse(option)
	// trigger event
    //this.messageQueue.push(opt)  
    this.checkQueue(opt);
	// this.events[option.name].apply({}, option.data)
}

YAJB.prototype.isMobile = function() {
	if (window.javaInterface || window.YAJB_INJECT) {
		return true
	}else {
		return false
	}
}

YAJB.prototype._send = function(option) {
	if (this.isAndroid) {
		window.alert(JSON.stringify(option))
	}else if (this.isiOS) {
		// window.postMessage
	}
}

YAJB.prototype.checkQueue = function(option){
	this.eventQueue.forEach(function(item){
		if(item.event === option.event){
			item.callback(option.data)
		}
	})
}

// YAJB.prototype.on = function(event, callback) {
// 	//register event
//     if(!YAJB.events[event]) {
//       YAJB.events[event] = [];
//     }
//     YAJB.events[event].push(callback);
// }

YAJB.prototype.send = function(event, data) {
	var that = this;
	return new Promise(function(resolve, reject){
		that.eventQueue.push({
			event: event + "Resolved",
			callback: function(value){
				console.log("resolve")
				resolve(value)
			}
		})
		that._send({event:event, data:data});
	})
}

export default YAJB
