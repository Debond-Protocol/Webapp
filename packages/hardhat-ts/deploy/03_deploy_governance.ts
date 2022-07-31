import { parseEther } from '@ethersproject/units';
import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  /*
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(deployer);

  const USDC = await ethers.getContract('USDC', deployer);
  const USDT = await ethers.getContract('USDT', deployer);
  const DAI = await ethers.getContract('DAI', deployer);
  const DBIT = await ethers.getContract('DBITTest', deployer);
  //const DGOV = await ethers.getContract('DGOVTest', deployer);
  const WETH = await ethers.getContract('WETH', deployer);
  console.log(DBIT.address, USDC.address, USDT.address, DAI.address);


  await deploy('Governance', {
    from: deployer,
    log: true,
    args: [deployer, deployer],
  });

  await deploy('VoteCounting', {
    from: deployer,
    log: true,
  });

  await deploy('VoteToken', {
    from: deployer,
    log: true,
    args: ["Debond Vote Token", "DVT", deployer],
  });

  const governance = await ethers.getContract('Governance', deployer);


  /!*await deploy('DGOV', {
  from: deployer,
  log: true,
});
*!/

  const dgov = await ethers.getContract('DGOVTest', deployer);
  const voteToken = await ethers.getContract('VoteToken', deployer);
  await deploy('StakingDGOV', {
    from: deployer,
    log: true,
    args: [governance.address,voteToken.address ],
  });
  await deploy('GovSettings', {
    from: deployer,
    log: true,
    args: [2,2 ],
  });
  const stakingDGOV = await ethers.getContract('StakingDGOV', deployer);
  const settings = await ethers.getContract('GovSettings', deployer);
  const bank = await ethers.getContract('Bank', deployer);

  await voteToken.setStakingDGOVContract(stakingDGOV.address);
  await voteToken.setGovernanceContract(governance.address);
  await dgov.setGovernanceContract(governance.address);
  await dgov.setBankContract(deployer);

  await governance.firstSetUp(
    governance.address,
    dgov.address,
    DBIT.address,
    stakingDGOV.address,
    voteToken.address,
    settings.address,
    deployer,
    deployer,
    {from: deployer}
  );
  console.log("deployment done")
  const account="0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const amount =parseEther("100")
  const amountToMint=parseEther("200")
  const amountToStake=parseEther("50")
  //await DBIT.setBankContract(deployer)
  //await DBIT.mintCollateralisedSupply(account, amount, {from: deployer});
  console.log("db")
  //await dgov.mintCollateralisedSupply(account, amountToMint, {from: deployer});
  //console.log("db2")
  await DBIT.setBankContract(bank.address)

  //await dgov.transfer(account, amountToStake, {from: deployer});

  await dgov.transfer(account, amountToStake, {from: account});
*/
};

export default func;
func.tags = ['DBIT'];
