# creator.js

A tiny library for creating create-methods for your objects.

These are some things I like:

 * Using `Object.create`.
 * Having objects with their own `create` method.
 * Create-methods that take named parameters.
 * Failing early.

Creator.js helps with this. Instead of writing:

    var banana = {
        create: function (params) {
          if (!params) { throw new TypeError("banana.create: missing params { color, brand }"); }
          if (!params.color) { throw new TypeError("banana.create: missing param { color }"); }
          if (!params.brand) { throw new TypeError("banana.create: missing param { brand }"); }

          return Object.extend(Object.create(this), params);
        }
    };

You have:

    var banana = {
        create: creator("banana", ["color", "brand"])
    };

Or if you need more options:

    var banana = {
        create: creator("banana", {
            required: ["color", "brand"],
            defaults: { curvature: 23 },
            strict: true
        }
    };

In which

* `required` is a list of parameters that are required,
* `defaults` is a map of parameter:value pairs that are optional with defaults, and
* `strict` makes it complain about unknown parameters.

## Won't someone think of the performance

In a production environment, you can use the simplified version of creator,
which works like this:

    var create = function (defaults, params) {
        return extend(Object.create(this), defaults, params);
    };

    var creator = function (name, options) {
        return partial(create, options.defaults);
    };

That way you get meaningful error messages and early failures while developing
and testing, without sacrificing performance in production.

In areas of code that needs to be highly optimized, you should of course use
whatever is optimized better by current JavaScript engines. At the time of
writing that would be the pseudo-classical function constructors and `new`.

## License

BSD 2-clause license. http://www.opensource.org/licenses/bsd-license.php
