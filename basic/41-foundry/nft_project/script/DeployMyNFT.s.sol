//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import { Script, console } from "forge-std/Script.sol";
import { MyNFT } from "../src/MyNFT.sol";

contract DeployMyNFT is Script {
    function run() external {

        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));

        console.log("The Deployer address:", deployer);
        console.log("Balance is:", deployer.balance);

        vm.startBroadcast(deployer);

        MyNFT nft = new MyNFT("MyNFT", "MYT", "https://www.example.com");
        vm.stopBroadcast();

        console.log("MyNFT deployed at:", address(nft));
    }
}