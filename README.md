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
* `defaults` is a list of parameters that are optional with defaults, and
* `strict` makes it complain about unknown parameters.

## Won't someone think of the performance

In a production environment, you can use a much simplified version of creator,
pretty much like this:

    var create = function (defaults, params) {
        return _.extend(Object.create(this), defaults, params);
    };

    var creator = function (name, options) {
        return _.partial(create, options.defaults);
    };

That way you get meaningful error messages and early failures while developing
and testing, without sacrificing performance in production.

In areas of code that needs to be highly optimized, you should of course use
whatever is optimized better by current JavaScript engines. At the time of
writing that would be the pseudo-classical function constructors and `new`.

## Dependencies

Right now creator.js is dependent on
[lodash](https://github.com/bestiejs/lodash), a drop-in replacement for
underscore that has a suite of unit tests, supports AMD and to top it off has
some significant performance improvements.

I am considering removing the dependency given enough pressure to do so. :-P

## License

BSD 2-clause license. http://www.opensource.org/licenses/bsd-license.php
