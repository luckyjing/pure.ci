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
    clientSecret: '4a67850a25c1e4c36b757da8de73fe6f420435aa',
    redirect_uri: "http://localhost:8999/api/auth/coding"
  },
  workspace: path.join(__dirname, '../../workspace'),
  hook_url: 'http://sujing.xin'
};

let specific = {
  development: {
    app: {
      port: 8999,
      name: "pure-ci",
      excluded: "excluded_path"
    },
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'sujingxin',
      database: 'pureci'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 5000,
      name: "pure-ci",
      excluded: "excluded_path"
    },
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  }
};

module.exports = _.merge(base, specific[env]);
