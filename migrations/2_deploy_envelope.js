const RedEnvelope = artifacts.require('RedEnvelope');
const { create } = require('domain');
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
  redEnvelope = await RedEnvelope.deployed()
  await redEnvelope.createEnvelope(3,"Hello there", "Juanda", {value: 1000000});
  receipt = await redEnvelope.getCreatorEnvelopes("0x9b17C9E2AA27F93b1d0e71b872069e096cB41233")
  console.log(receipt[0].envelopeId)
};