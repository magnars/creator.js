if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var creator = require("../lib/creator");
}

(function () {
  "use strict";

  buster.testCase('Creator', {
    "does stuff": function () {
      assert(true);
    }
  });
}());
