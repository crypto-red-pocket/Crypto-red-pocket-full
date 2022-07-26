const RedEnvelope = artifacts.require('RedEnvelope');

module.exports = async function (deployer) {
  await deployer.deploy(RedEnvelope);
};