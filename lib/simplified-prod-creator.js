if (typeof require === "function" && typeof module !== "undefined") {
  var _ = require("lodash");
}

var creator = (function () {
  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  var createAndExtend = function (defaults, params) {
    return _.extend(Object.create(this), defaults, params);
  };

  return function (name, options) {
    return _.partial(createAndExtend, options.defaults);
  };
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
