// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  // const Token = await ethers.getContractFactory('GameItem');
  // const token = await Token.deploy();

  const token = await ethers.getContractAt('GameItem', "0xf85daf73366e169d57c619cebe2db55fbcaf2838")

  // await token.awardItem(deployer.address, "https://live---metadata-5covpqijaa-uc.a.run.app/metadata/1");

  console.log('Token address:', token.address);


  console.log('Token abi:', token.abi);

  let totalSupply = await token.balanceOf(deployer.address);
  console.log('totalSupply:', totalSupply.toString());

  let balance = await token.balanceOf(deployer.address);
  console.log('deployer.address:', balance.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
