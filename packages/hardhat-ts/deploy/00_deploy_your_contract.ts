import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log('nft');
  console.log(deployer);

  await deploy('MysteryBoxToken', {
    from: deployer,
    args: ['MysteryBox', 'MBOX', 432000],
    log: true,
  });
};
export default func;
func.tags = ['MysteryBox'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
