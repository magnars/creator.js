# creator.js

A tiny library for creating create-methods for your objects.

These are some things I like:

 * Using `Object.create`
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
