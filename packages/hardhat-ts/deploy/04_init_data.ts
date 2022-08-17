import { parseEther } from '@ethersproject/units';
import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(deployer);

  const USDC = await ethers.getContract('USDC', deployer);
  const USDT = await ethers.getContract('USDT', deployer);
  const DAI = await ethers.getContract('DAI', deployer);
  const DBIT = await ethers.getContract('DBITTest', deployer);
  // const DGOV = await ethers.getContract('DGOVTest', deployer);
  const WETH = await ethers.getContract('WETH', deployer);
  const BankBondManager = await ethers.getContract('BankBondManager', deployer);
  const DebondBondTestDeployed = await ethers.getContract('DebondBondTest', deployer);
  const BankData = await ethers.getContract('BankData', deployer);
  const DGOV = await ethers.getContract('DGOV', deployer);
  const Bank = await ethers.getContract('Bank', deployer);
  const APM = await ethers.getContract('APMTest', deployer);
  const ExchangeDeployed = await ethers.getContract('Exchange', deployer);
  const ExchangeStorage = await ethers.getContract('ExchangeStorage', deployer);

  console.log(DBIT.address, USDC.address, USDT.address, DAI.address);
  console.log('minting');
  await USDC.mint(APM.address, parseEther('100'));
  await USDT.mint(APM.address, parseEther('200'));
  await DAI.mint(APM.address, parseEther('400'));

  console.log(1);
  await DGOV.setBankAddress(deployer);
  await DBIT.setBankAddress(deployer);
  await APM.setBankAddress(deployer);
  await DGOV.mintCollateralisedSupply(APM.address, parseEther('500'));
  console.log(2);
  await DBIT.mintCollateralisedSupply(APM.address, parseEther('700'));
  console.log('end minting');

  await APM.updateWhenAddLiquidity(parseEther('100'), parseEther('100'), DBIT.address, USDC.address);
  console.log('updated');
  await APM.updateWhenAddLiquidity(parseEther('100'), parseEther('100'), DBIT.address, USDT.address);

  await APM.updateWhenAddLiquidity(parseEther('100'), parseEther('100'), DBIT.address, DAI.address);

  await APM.updateWhenAddLiquidity(parseEther('50'), parseEther('100'), DBIT.address, WETH.address);

  await ExchangeStorage.setExchangeAddress(ExchangeDeployed.address);
  await BankBondManager.setDebondBondAddress(DebondBondTestDeployed.address);
  await BankBondManager.setBankDataAddress(BankData.address);
  await BankBondManager.initDatas(DBIT.address, USDT.address, DAI.address, DGOV.address, WETH.address);

  await Bank.setApmAddress(APM.address);
  await Bank.setBondManagerAddress(BankBondManager.address);
  await Bank.setBankDataAddress(BankData.address);
  await Bank.setDBITAddress(DBIT.address);
  await Bank.setDGOVAddress(DGOV.address);

  await APM.setBankAddress(Bank.address);
  await DBIT.setBankAddress(Bank.address);
  await DGOV.setBankAddress(Bank.address);
};

export default func;
func.tags = ['DBIT'];
