import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(deployer);

  const DBIT = await ethers.getContract('DBIT', deployer);
  const USDC = await ethers.getContract('USDC', deployer);
  const USDT = await ethers.getContract('USDT', deployer);
  const DAI = await ethers.getContract('DAI', deployer);
  console.log(DBIT.address, USDC.address, USDT.address, DAI.address )



  const DeBond = await deploy('DebondBond', {
    from: deployer,
    log: true,
    args: [DBIT.address, USDC.address, USDT.address, DAI.address],
  });

  const DebondData = await deploy('DebondData', {
    from: deployer,
    args: [DBIT.address, USDC.address, USDT.address, DAI.address],
    log: true
  });

  const APM = await deploy('APM', {
    from: deployer,
    log: true,
    args: [],
  });

  console.log(APM.address, DebondData.address, DeBond.address, DBIT.address)
  const Bank = await deploy('Bank', {
    from: deployer,
    log: true,
    args: [APM.address,DebondData.address,DeBond.address,DBIT.address],
  });

  const Exchange = await deploy('Exchange', {
    from: deployer,
    args: [DebondData.address, DeBond.address, DBIT.address],
    log: true,
  });

  const DebondDeployed = await ethers.getContract('DebondBond', deployer);
  const APMDeployed = await ethers.getContract('APM', deployer);
  const USDCDeployed = await ethers.getContract('USDC', deployer);
  const USDTDeployed = await ethers.getContract('USDT', deployer);
  const DBITDeployed = await ethers.getContract('DBIT', deployer);

  const bondIssueRole = await DebondDeployed.ISSUER_ROLE();
  const DBITMinterRole = await DBIT.MINTER_ROLE();
  await DebondDeployed.grantRole(bondIssueRole, Bank.address);
  await DBIT.grantRole(DBITMinterRole, Bank.address);

  await USDC.mint(deployer, BigNumber.from('1000000000000000000'));
  await USDT.mint(deployer, BigNumber.from('1000000000000000000'));
  await DAI.mint(deployer, BigNumber.from('3000000000000000000'));

  await APMDeployed.updateWhenAddLiquidity(100, 10000, USDCDeployed.address, DBIT.address); // adding reserve
  await APMDeployed.updateWhenAddLiquidity(100, 100000, USDTDeployed.address, DBIT.address); // adding reserve

  // await USDC.mint("0x632e15d35BeE185B9765a5b31550E9935a225326", 100000);

  /* await BankDeployed.buyBond(1, 0, 1000, 50, 0);*/
};

export default func;
func.tags = ['DBIT'];
