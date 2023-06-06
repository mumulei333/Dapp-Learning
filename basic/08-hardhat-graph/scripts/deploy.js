// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  // const Token = await ethers.getContractFactory('SimpleToken');
  // const token = await Token.deploy('HHToken', 'HHT', 1, 100000000);

  // 避免重复部署浪费测试币
  token = await ethers.getContractAt('SimpleToken', "0x512fF44311a75097cE73Feed2Fb8Bd8ca5C6FBCc")

  console.log('Contract address:', token.address);

  const receiver = '0xC74c341793536943a20C4D8f42272c932b4884F2';
  console.log('Transfer 50 to receiver ', receiver);
  let transferReceipt = await token.transfer(receiver, 50);
  await transferReceipt.wait();

  // Check the balance of receiver
  console.log('Account balance of receiver is: ', (await token.balanceOf(receiver)).toString());

  // approve transfer to receiver
  let approveRecipt = await token.approve(receiver, 1000);
  await approveRecipt.wait();
  console.log(`allowance of ${deployer.address} to ${receiver} is `, (await token.allowance(deployer.address, receiver)).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
