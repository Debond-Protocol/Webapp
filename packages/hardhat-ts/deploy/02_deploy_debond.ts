import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
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
  const DGOV = await ethers.getContract('DGOVTest', deployer);
  const WETH = await ethers.getContract('WETH', deployer);
  console.log(DBIT.address, USDC.address, USDT.address, DAI.address);

  await deploy('APMTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });
  const APMDeployed = await ethers.getContract('APMTest', deployer);
  await deploy('DebondBondTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });
  const DebondBondTestDeployed = await ethers.getContract('DebondBondTest', deployer);
  await deploy('FakeOracle', {
    from: deployer,
    log: true,
  });

  const FakeOracleDeployed = await ethers.getContract('FakeOracle', deployer);

  const d = new Date();
  d.setHours(0, 0, 0, 0);

  await deploy('DebondMath', {
    from: deployer,
    log: true,
  });

  await deploy('BankData', {
    from: deployer,
    log: true,
    args: [deployer, deployer, d.getTime() / 10 ** 3],
  });
  const BankData = await ethers.getContract('BankData', deployer);

  const DebondMathDeployed = await ethers.getContract('DebondMath', deployer);


  await deploy('Bank', {
    from: deployer,
    log: true,
    libraries:{"DebondMath":DebondMathDeployed.address},
    args: [
      deployer,
      APMDeployed.address,
      DebondBondTestDeployed.address,
      DBIT.address,
      DGOV.address,
      FakeOracleDeployed.address,
      USDC.address,
      WETH.address,
      BankData.address,
    ],
  });
  console.log('after');

  const BankDeployed = await ethers.getContract('Bank', deployer);
  await APMDeployed.setBankAddress(BankDeployed.address);
  await DebondBondTestDeployed.setBankAddress(BankDeployed.address);
  await DBIT.setBankContract(BankDeployed.address);
  await DGOV.setBankContract(BankDeployed.address);
  // await BankDeployed.initializeApp(DAI.address, USDT.address);
};

export default func;
func.tags = ['DBIT'];
