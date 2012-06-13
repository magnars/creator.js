if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var creator = require("../lib/creator");
}

(function () {
  "use strict";

  buster.testCase('Creator', {
    "creates a function that creates objects": function () {
      var banana = {
        create: creator("banana", []),
        color: "green"
      };

      var obj = banana.create();
      assert.equals(obj.color, "green");

      obj.color = "brown";
      assert.equals(banana.color, "green");
    }
  });
}());
