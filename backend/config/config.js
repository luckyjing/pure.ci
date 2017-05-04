"use strict";
const path = require("path");
const _ = require("lodash");
let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log(`运行环境：${env}`);
let base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env
  },
  workspace: path.join(__dirname, '../../workspace'),
  hook_url: 'http://sujing.xin:8000/api/code/recievehook'
};

let specific = {
  development: {
    coding: {
      clientId: 'eb1f4fffdad9ebae384f83e1de7ba4d7',
      clientSecret: '4a67850a25c1e4c36b757da8de73fe6f420435aa',
      redirect_uri: "http://localhost:8999/auth/coding"
    },
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
    },
    deploy_key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtsi9IwPdTS2oeLbahQKp8in8NUbcscFin3c0Oo/2Q' +
        'l1FYTL+2ZHly2xUPRg996k/PeMdnkxLnIhoOJyHPrPTwdjslB5/A6WvVwMzEUwlru+h/Mb2H6fi13Jgf' +
        'X7m/P7ataJ7JFltU79hbUgN8T8m5uSq+vrS/ZjuncU69ThStqnPiZvl+ASRhyE7KFXdstKwjym2IZv9g' +
        'E24/jUyPks3XtfqFEdzMU5goFjDE30k9gLjaqXPQcJA6gRB80B4aOZj5b0DczPUwsBitMPkhg3eD40OJ' +
        'yqtPbLdwsMN57LyLrsQYeClCQkSE6vfaH09BMdTCaos//L/UdjM+BK9HHJxn jingxin.sjx@alibaba' +
        '-inc.com'
  },
  production: {
    coding: {
      clientId: 'eb1f4fffdad9ebae384f83e1de7ba4d7',
      clientSecret: '4a67850a25c1e4c36b757da8de73fe6f420435aa',
      redirect_uri: "http://sujing.xin/auth/coding"
    },
    app: {
      port: 8000,
      name: "pure-ci",
      excluded: "excluded_path"
    },
    mysql: {
      host: 'sujing.xin',
      port: 3306,
      user: 'root',
      password: 'sujingxin',
      database: 'pureci'
    },
    deploy_key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCfVzlagIpPLuGWLehFD+MNiTZkfjVNsnZUy3wVKXQ5' +
        'Kk5dVo4v4uY432Xkl/vO/moZbGean/8liuN7WWefTwrhml558oSEPobPXyLVuT/3N5QlBli73bPeviNF' +
        'izmEfFK+bH4ytdqSrOTfEn75BRlVAY8dHqurYgFYViK/3NwRVe+7MRRNYP1vMVEP5p0OzIBYJHt7IkGt' +
        '7rylOwBcD3KC4uj3Mt3vYoCB+jBZf0CYCKy+dnE7mHt1Q1jn98Xu2ROmtaUQTeIHsBpSWl3fFmY+odLG' +
        'ynNUGRFOXbVhVWP+R7NPavLu/Aa1U6YkFFRZfxcDoVMqzIyz2dFLNHdGbkZP root@iZ2zehrpp1ttwj' +
        '37fkdd24Z'
  }
};

module.exports = _.merge(base, specific[env]);
