import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const DAI = await deploy('DAI', {
    from: deployer,
    log: true,
  });

  const USDT = await deploy('USDT', {
    from: deployer,
    log: true,
  });

  const USDC = await deploy('USDC', {
    from: deployer,
    log: true,
  });

  const WETH = await deploy('WETH', {
    from: deployer,
    log: true,
  });

  const DBIT = await deploy('DBITTest', { from: deployer, log: true, args: [deployer, deployer, deployer] });

  const DGOV = await deploy('DGOVTest', { from: deployer, log: true, args: [deployer, deployer, deployer] });
};
export default func;
func.tags = ['Tokens'];
