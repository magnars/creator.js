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

  function beStrict(required, defaults, create, fail) {
    var known = required.concat(_.keys(defaults));
    return function (params) {
      var unknown = params ? _.difference(_.keys(params), known) : [];
      if (unknown.length) {
        fail("unknown params { " + unknown.join(", ") + " }");
      } else {
        return create.call(this, params);
      }
    };
  }

  function sanitize(options) {
    if (_.isArray(options)) {
      options = { required: options };
    }
    options.required = options.required || [];
    options.defaults = options.defaults || {};
    return options;
  }

  function creator(name, options) {
    options = sanitize(options);

    var create = _.partial(createAndExtend, options.defaults);
    var fail = _.partial(throwError, name);
    if (options.strict) {
      create = beStrict(options.required, options.defaults, create, fail);
    }
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
