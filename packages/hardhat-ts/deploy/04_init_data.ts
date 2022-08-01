import {ethers} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/types';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {parseEther} from "@ethersproject/units";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
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
  const BankBondManager = await ethers.getContract('BankBondManager', deployer);
  const DebondBondTestDeployed = await ethers.getContract('DebondBondTest', deployer);
  const BankData = await ethers.getContract('BankData', deployer);
  const DGOV = await ethers.getContract('DGOV', deployer);
  const Bank = await ethers.getContract("Bank", deployer);
  const APM = await ethers.getContract("APMTest", deployer);

  console.log(DBIT.address, USDC.address, USDT.address, DAI.address);

  await BankBondManager.setDebondBondAddress(DebondBondTestDeployed.address);
  await BankBondManager.setBankDataAddress(BankData.address);
  await BankBondManager.initDatas(DBIT.address, USDT.address, DAI.address, DGOV.address, WETH.address);


  await Bank.setApmAddress(APM.address);
  await Bank.setBondManagerAddress(BankBondManager.address);
  await Bank.setBankDataAddress(BankData.address);
  await Bank.setDBITAddress(DBIT.address);
  await Bank.setDGOVAddress(DGOV.address);

};

export default func;
func.tags = ['DBIT'];
