"use strict";
const path = require("path");
const _ = require("lodash");

let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

let base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env
  },
  coding: {
    clientId: 'eb1f4fffdad9ebae384f83e1de7ba4d7',
    clientSecret: '4a67850a25c1e4c36b757da8de73fe6f420435aa'
  }
};

let specific = {
  development: {
    app: {
      port: 9000,
      name: "pure-ci",
      excluded: "excluded_path"
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'sujingxin',
      database: 'pureci'
    },
    mongodb: {
      host: 'mongodb://localhost/pureCI'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 5000,
      name: "pure-ci",
      excluded: "excluded_path"
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  },
};

module.exports = _.merge(base, specific[env]);
