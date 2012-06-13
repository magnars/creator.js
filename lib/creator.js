if (typeof require === "function" && typeof module !== "undefined") {
  var _ = require("lodash");
}

var creator = (function (undefined) {
  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  function createAndExtend(defaults, params) {
    return _.extend(create(this), defaults, params);
  }

  function throwError(name, msg) {
    throw new TypeError(name + ".create: " + msg);
  }

  function checkRequired(required, create, fail) {
    return function (params) {
      var missing = params ? _.difference(required, _.keys(params)) : required;
      if (missing.length) {
        fail("missing params { " + missing.join(", ") + " }");
      } else {
        return create.call(this, params);
      }
    };
  }

  function creator(name, options) {
    if (_.isArray(options)) {
      options = { required: options };
    }
    var create = _.partial(createAndExtend, options.defaults);
    var fail = _.partial(throwError, name);
    if (options.required) {
      create = checkRequired(options.required, create, fail);
    }
    return create;
  }

  return creator;
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
