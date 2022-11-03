import {ethers} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/types';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {getContract} from "./00_deploy_your_contract";


const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const USDC = await getContract(deployments, "USDC")
  const USDT = await getContract(deployments, "USDT")
  const DAI = await getContract(deployments, "DAI")
  const WETH = await getContract(deployments, "WETH")
  const DebondMath = await getContract(deployments, "DebondMath")
  const Oracle = await getContract(deployments, "FakeOracle")

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

  const BankDeployed = await getContract(deployments, "Bank")

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
  const BankBondManagerDeployed = await getContract(deployments,'BankBondManager');

  await deploy('APMTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });
  const APMDeployed = await getContract(deployments,'APMTest');
  await deploy('DebondBondTest', {
    from: deployer,
    log: true,
    args: [deployer],
  });


  const DebondBondTestDeployed = await getContract(deployments, 'DebondBondTest');
  await DebondBondTestDeployed.setBankAddress(BankBondManagerDeployed.address);

  const FakeOracleDeployed = await getContract(deployments,'FakeOracle');

  const d = new Date();
  d.setHours(0, 0, 0, 0);

  await deploy('BankData', {
    from: deployer,
    log: true,
    args: [governanceAddress, BankBondManagerDeployed.address, d.getTime() / 10 ** 3],
  });

  const BankData = await getContract(deployments,'BankData');

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

  await deploy('ExchangeStorage', {
    from: deployer,
    log: true,
    args: [governanceAddress],
  });
  const exchangestorageDeployed = await getContract(deployments,'ExchangeStorage');
  const dbitDeployed = await getContract(deployments, "DBITTest");

  await deploy('Exchange', {
    from: deployer,
    log: true,
    args: [exchangestorageDeployed.address, governanceAddress, dbitDeployed.address],
  });
};

export default func;
func.tags = ['debond'];
