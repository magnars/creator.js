if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var creator = require("../creator");
}

(function () {
  "use strict";

  buster.testCase('Creator', {
    "creates a function that creates objects that": {
      setUp: function () {
        this.banana = {
          create: creator("banana", []),
          color: "green"
        };
      },

      "inherit from this": function () {
        var obj = this.banana.create();
        assert.equals(obj.color, "green");
      },

      "changes independently of this": function () {
        var obj = this.banana.create();
        obj.color = "brown";
        assert.equals(this.banana.color, "green");
      },

      "is extended with the given parameters": function () {
        var obj = this.banana.create({ curvature: 23 });
        assert.equals(obj.curvature, 23);
      }
    },

    "required parameters": {
      setUp: function () {
        this.banana = {
          create: creator("banana", {
            required: ["color", "curvature"]
          })
        };
      },

      "stay quiet when all are present": function () {
        refute.exception(function () {
          this.banana.create({ color: "brown",  curvature: "42" });
        }.bind(this));
      },

      "complain when all params are missing": function () {
        try {
          this.banana.create();
        } catch (e) {
          var expected = "banana.create: missing params { color, curvature }";
          assert.equals(e.message, expected);
        }
      },

      "complain when some params are missing": function () {
        try {
          this.banana.create({ color: "green" });
        } catch (e) {
          var expected = "banana.create: missing params { curvature }";
          assert.equals(e.message, expected);
        }
      },

      "has a shorthand API": function () {
        var banana = {
          create: creator("banana", ["color", "curvature"])
        };
        try {
          banana.create({ color: "green" });
        } catch (e) {
          var expected = "banana.create: missing params { curvature }";
          assert.equals(e.message, expected);
        }
      }
    },

    "default parameters": {
      setUp: function () {
        this.banana = {
          create: creator("banana", {
            defaults: { color: "green", curvature: 23 }
          })
        };
      },

      "are added": function () {
        assert.equals(this.banana.create().color, "green");
      },

      "are overwritten": function () {
        var b = this.banana.create({ color: "yellow" });
        assert.equals(b.color, "yellow");
      }
    },

    "when strict": {
      setUp: function () {
        this.banana = {
          create: creator("banana", {
            required: ["color"],
            defaults: { curvature: 23 },
            strict: true
          })
        };
      },

      "complains about unknown parameters": function () {
        try {
          this.banana.create({
            color: "brown",
            curvature: 42,
            musical: "Which Witch"
          });
        } catch (e) {
          var expected = "banana.create: unknown params { musical }";
          assert.equals(e.message, expected);
        }
      }
    }

  });
}());
