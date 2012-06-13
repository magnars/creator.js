var creator = (function () {
  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  function extend(destination) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (name) {
        destination[name] = source[name];
      });
    });
    return destination;
  }

  function creator() {
    return function (params) {
      var instance = create(this);
      if (params) { instance = extend(instance, params); }
      return instance;
    };
  }

  return creator;
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
