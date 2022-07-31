import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const USDC = await ethers.getContract('USDC', deployer);
  const USDT = await ethers.getContract('USDT', deployer);
  const DAI = await ethers.getContract('DAI', deployer);
  const WETH = await ethers.getContract('WETH', deployer);
  const DebondMath = await ethers.getContract('DebondMath', deployer);
  const Oracle = await ethers.getContract('FakeOracle', deployer);
  console.log(USDC.address, USDT.address, DAI.address);

  const governanceAddress = deployer;

  await deploy('Bank', {
    from: deployer,
    log: true,
    libraries: { DebondMath: DebondMath.address },
    args: [
      governanceAddress,
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      USDC.address,
      WETH.address,
      Oracle.address,
    ],
  });

  const BankDeployed = await ethers.getContract('Bank', deployer);

  await deploy('BankBondManager', {
    from: deployer,
    log: true,
    libraries: { DebondMath: DebondMath.address },
    args: [
      governanceAddress,
      '0x0000000000000000000000000000000000000000',
      BankDeployed.address,
      '0x0000000000000000000000000000000000000000',
      Oracle.address,
      USDC.address,
    ],
  });
  const BankBondManagerDeployed = await ethers.getContract('BankBondManager', deployer);

  await deploy('APMTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });
  const APMDeployed = await ethers.getContract('APMTest', deployer);

  await APMDeployed.setBankAddress(BankDeployed.address);

  await deploy('DebondBondTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });

  const DebondBondTestDeployed = await ethers.getContract('DebondBondTest', deployer);
  await DebondBondTestDeployed.setBankAddress(BankBondManagerDeployed.address);

  const FakeOracleDeployed = await ethers.getContract('FakeOracle', deployer);

  const d = new Date();
  d.setHours(0, 0, 0, 0);

  await deploy('BankData', {
    from: deployer,
    log: true,
    args: [governanceAddress, BankBondManagerDeployed.address, d.getTime() / 10 ** 3],
  });

  const BankData = await ethers.getContract('BankData', deployer);

  await deploy('DBITTest', {
    from: deployer,
    log: true,
    args: [governanceAddress, BankDeployed.address, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
  });
  await deploy('DGOV', {
    from: deployer,
    log: true,
    args: [governanceAddress, BankDeployed.address, '0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
  });
};

export default func;
func.tags = ['DBIT'];
