var creator = (function () {
  function F() {}

  function extend(destination) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (name) {
        destination[name] = source[name];
      });
    });
    return destination;
  }

  function create(params) {
    F.prototype = this;
    var instance = new F();
    if (params) { instance = extend(instance, params); }
    return instance;
  }

  return function () { return create; };
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
