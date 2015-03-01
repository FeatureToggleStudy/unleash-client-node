var UnleashClient   = require('./lib/client');
var repository      = require('./lib/repository');
var Strategy        = require('./lib/strategy');
var DefaultStrategy = require('./lib/default-strategy');
var backupPath      = require('os').tmpdir();

var client;

function initialize(opt) {
  if(!opt || !opt.url) {
    throw new Error("You must specify the Unleash api url");
  }

  repository.initalize({
    url: opt.url,
    refreshIntervall: opt.refreshIntervall || 15000,
    backupPath: opt.backupPath || backupPath
  });

  var strategies = [
    new DefaultStrategy()
  ].concat(opt.strategies || []);

  client = new UnleashClient(repository, strategies);
}

function destroy() {
  repository.destroy();
  client = undefined;
}

function getClient() {
  if(!client) {
    throw new Error("Did you initalize Unleash?");
  }
  return client;
}

module.exports = {
  initialize: initialize,
  destroy: destroy,
  getClient: getClient,
  Strategy: Strategy
};
