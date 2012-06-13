var creator = (function () {
  function F() {}

  function create(o) {
    F.prototype = o;
    return new F();
  }

  function creator() {
    return function () {
      return create(this);
    };
  }

  return creator;
}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = creator;
}
