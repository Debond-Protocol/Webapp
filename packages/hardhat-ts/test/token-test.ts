import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('testing mystery box token ', function () {
  it('Should verify signature on chain', async function () {
    const mysteryBoxTokenFactory = await ethers.getContractFactory('MysteryBoxToken');
    const signer = mysteryBoxTokenFactory.signer;
    const mysteryBoxToken = await mysteryBoxTokenFactory.deploy('MysteryBox', 'MBOX', 432000);

    // const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
    const contractAddress = mysteryBoxToken.address;
    const userAddress = '0xd59276C2A56B19b678c4D22e3eeE148F5a816c37';
    const discountRate = 10;
    const messageHash = ethers.utils.solidityKeccak256(['address', 'address', 'uint256'], [contractAddress, userAddress, discountRate]);
    const messageHashBytes = ethers.utils.arrayify(messageHash);
    const signature = await signer.signMessage(messageHashBytes);

    expect(await mysteryBoxToken.verifySignature(discountRate, signature)).to.equal(await signer.getAddress());
  });
});
