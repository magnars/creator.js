var config = module.exports;

config["Server tests"] = {
  tests: ["test/**/*-test.js"],
  environment: "node"
};

config["Browser tests"] = {
  sources: ["creator.js"],
  tests: ["test/**/*-test.js"],
  environment: "browser"
};
