'use strict'

var Event = function() {
  this.listeners = {};
}

Event.prototype.on = function(event, fn) {
  event = '$' + event;
  (listeners[event] || (listeners[event] = [])).push(fn)
}

Event.prototype.emit = function(event) {
  event = '$' + event
  let cbs = listeners[event]
  if (cbs) {
    const args = [].slice.call(arguments, 1)
    cbs = cbs.slice()
    for (let i = 0, l = cbs.length; i < l; i++) {
      cbs[i].apply(this, args)
    }
  }
}

Event.prototype.off =  function(event, fn) {
  event = '$' + event
  if (!arguments.length) {
    listeners = {}
  } else {
    const cbs = listeners[event]
    if (cbs) {
      if (!fn) {
        listeners[event] = null
      } else {
        for (let i = 0, l = cbs.length; i < l; i++) {
          const cb = cbs[i]
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1)
            break
          }
        }
      }
    }
  }
}

export default Event
