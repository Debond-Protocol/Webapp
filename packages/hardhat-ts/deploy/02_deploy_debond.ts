import {ethers} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/types';
import {HardhatRuntimeEnvironment} from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {getNamedAccounts, deployments} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  await deploy('TestContract', {
    from: deployer,
    args: [],
    log: true,
  });

  const DBIT = await ethers.getContract('DBIT', deployer);
  const USDC = await ethers.getContract('USDC', deployer);
  const USDT = await ethers.getContract('USDT', deployer);
  const DAI = await ethers.getContract('DAI', deployer);

  const DeBond = await deploy('DebondBond', {
    from: deployer,
    log: true,
    args: [DBIT.address, USDC.address, USDT.address, DAI.address],
  });

  const DebondData = await deploy('DebondData', {
    from: deployer,
    args: [DBIT.address, USDC.address, USDT.address, DAI.address],
    log: true,
  });

  const APM = await deploy('APM', {
    from: deployer,
    log: true,
    args: [USDC.address, DBIT.address],
  });

  const Bank = await deploy('Bank', {
    from: deployer,
    args: [APM.address, DebondData.address, DeBond.address],
    log: true,
  });

  const DebondDeployed = await ethers.getContract('DebondBond', deployer);
  const BankDeployed = await ethers.getContract('Bank', deployer);

  const bondIssueRole = await DebondDeployed.ISSUER_ROLE();
  const DBITMinterRole = await DBIT.MINTER_ROLE();
  await DebondDeployed.grantRole(bondIssueRole, Bank.address);
  await DBIT.grantRole(DBITMinterRole, Bank.address);
  await USDC.mint(deployer, 100000);
  await USDC.mint("0x632e15d35BeE185B9765a5b31550E9935a225326", 100000);

  /*await BankDeployed.buyBond(1, 0, 1000, 50, 0);*/
};


export default func;
func.tags = ['DBIT'];
