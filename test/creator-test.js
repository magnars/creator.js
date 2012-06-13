if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var creator = require("../lib/creator");
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
    }

  });
}());
