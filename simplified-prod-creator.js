var creator = (function () {
  var slice = Array.prototype.slice;

  var extend = Object.extend || function (obj) {
    var i, l, sources = slice.call(arguments, 1);
    for (i = 0, l = sources.length; i < l; i += 1) {
      for (var prop in sources[i]) {
        obj[prop] = sources[i][prop];
      }
    }
    return obj;
  };

  function partial(fn) {
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  }

  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  var createAndExtend = function (defaults, params) {
    return extend(create(this), defaults, params);
  };

  return function (name, options) {
    return partial(createAndExtend, options.defaults);
  };
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
