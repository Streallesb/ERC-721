
const hre = require("hardhat");

async function main() {

  const contract = await hre.ethers.deployContract("STERC721");

  await contract.waitForDeployment();

  console.log(`STERC721 contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});