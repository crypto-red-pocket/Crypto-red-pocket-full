const { expect } = require("chai");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // INTERACTION WITH ERC721 
  const RedEnvelope = await ethers.getContractFactory("RedEnvelope");
  const redEnvelope = await RedEnvelope.deploy();
  console.log("RedEnvelope address:", redEnvelope.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });