(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.YAJBJS = factory());
}(this, (function () { 'use strict';

var YAJB = function(){
	this.eventQueue = [];
	this.counter = 1;
	var options;
	this.isAndroid = false;
	this.isiOS = false;
	// get global options
	if (window.javaInterface) {
		options = JSON.parse(window.javaInterface.toString());
		this.isAndroid = true;
	}else if (window.YAJB_INJECT){
		options = window.YAJB_INJECT;
		this.isiOS = true;
	}
	else {
		throw new Error('No Global Inject Object detected, please use yajb-js in a YAJB WebView Environment.');
	}
	this.platform = options.platform;
	this.data = options.data;
	window.YAJB_INSTANCE = this; 
};

YAJB.prototype._emit = function(option){

	var opt = JSON.parse(option);
	// trigger event
    //this.messageQueue.push(opt)  
    this.checkQueue(opt);
	// this.events[option.name].apply({}, option.data)
};

YAJB.prototype.isMobile = function() {
	if (window.javaInterface || window.YAJB_INJECT) {
		return true
	}else {
		return false
	}
};

YAJB.prototype._send = function(option) {
	if (this.isAndroid) {
		// window.alert(JSON.stringify(option))
		window.location = "hybrid://" + option.event + ':' + option.id + '/'+ option.data;
	}else if (this.isiOS) {
		// window.postMessage
	}
};

YAJB.prototype.checkQueue = function(option){
	// this.eventQueue.forEach(function(item){
	// 	if(item.id === option.id){
	// 		item.callback(option.data)
	// 	}
	// })
	var event = this.eventQueue.find(function(item){
		return item.id === option.id
	});
	event.callback(option.data);
};

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
			id : that.counter,
			callback: function(value){
				console.log("resolve");
				resolve(value);
			}
		});
		that._send({event:event,id:that.counter,data:data});
		that.counter++;
	})
};

return YAJB;

})));
