var creator = (function (undefined) {
  var arrayProto = Array.prototype;
  var slice = arrayProto.slice;

  var isArray = Array.isArray || function (value) {
    return Object.prototype.toString.call(value) == "[object Array]";
  };

  var keys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys[keys.length] = key;
      }
    }
    return keys;
  };

  var extend = function (obj) {
    var i, l, sources = slice.call(arguments, 1);
    for (i = 0, l = sources.length; i < l; i += 1) {
      for (var prop in sources[i]) {
        obj[prop] = sources[i][prop];
      }
    }
    return obj;
  };

  var indexOf = arrayProto.indexOf || function (item) {
    var i, l;
    for (i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  };

  function difference(a1, a2) {
    var i, l, d = [];
    for (i = 0, l = a1.length; i < l; i++) {
      if (indexOf.call(a2, a1[i]) < 0) {
        d[d.length] = a1[i];
      }
    }
    return d;
  }

  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  function partial(fn) {
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  }

  function createAndExtend(defaults, params) {
    return extend(create(this), defaults, params);
  }

  function throwError(name, msg) {
    throw new TypeError(name + ".create: " + msg);
  }

  function checkRequired(required, create, fail) {
    return function (params) {
      var missing = params ? difference(required, keys(params)) : required;
      if (missing.length) {
        fail("missing params { " + missing.join(", ") + " }");
      } else {
        return create.call(this, params);
      }
    };
  }

  function beStrict(required, defaults, create, fail) {
    var known = required.concat(keys(defaults));
    return function (params) {
      var unknown = params ? difference(keys(params), known) : [];
      if (unknown.length) {
        fail("unknown params { " + unknown.join(", ") + " }");
      } else {
        return create.call(this, params);
      }
    };
  }

  function sanitize(options) {
    if (isArray(options)) {
      options = { required: options };
    }
    options.required = options.required || [];
    options.defaults = options.defaults || {};
    return options;
  }

  function creator(name, options) {
    options = sanitize(options);

    var create = partial(createAndExtend, options.defaults);
    var fail = partial(throwError, name);
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
