const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x6bE7d3f5eDC269E2E79ba057531Df3eAE84B9c9f";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("STERC721");
  const contract = contractFactory.attach(contractAddress);

  const mint = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("mint"),
    0
  );

  await mint.wait();

  console.log("Transaction Receipt: ", mint.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});