import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log('nft');

  await deploy('MysteryBoxToken', {
    from: deployer,
    args: ['MysteryBox', 'MBOX', 432000],
    log: true,
  });
};

export default func;
func.tags = ['MysteryBoxToken'];
