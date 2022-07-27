const RedEnvelope = artifacts.require('RedEnvelope');
const fs = require('fs');
const path = require('path');

function setAddress (contractName, contractAddress) {
  const addressPath = path.resolve(__dirname, '../contract-addresses.json')
  const addresses = fs.readFileSync(addressPath, "utf8")
  const addressesJsonData = JSON.parse(addresses)

  addressesJsonData[contractName] = contractAddress
  
  // Updates file
  fs.writeFileSync(
    addressPath,
    JSON.stringify(addressesJsonData)
  )
}

module.exports = async function (deployer) {
  await deployer
    .deploy(RedEnvelope)
    .then(() => setAddress('RedEnvelope', RedEnvelope.address));
};