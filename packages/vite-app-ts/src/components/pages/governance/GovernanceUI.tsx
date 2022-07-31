import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';

import ContentLayout from '~~/components/main/layout/ContentLayout';

export interface IGovernanceUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'transparent',
  fontSize: '32px',
};

/**
 * Governance UI
 * @param props
 * @constructor
 */
export const GovernanceUI: FC<IGovernanceUIProps> = (props) => {
  /*
    const ethersContext = useEthersContext();
    const provider = ethersContext.provider!;
    const [address] = useSignerAddress(ethersContext.signer);
    const governanceContract = useAppContracts('Governance', ethersContext.chainId);
    const ethComponentsSettings = useContext(EthComponentsSettingsContext);
    const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast');
    const tx: any = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

    const stake = async (): Promise<void> => {
      await tx?.(governanceContract?.stakeDGOV(1, 10), (v:any)=>{console.log(v)});
    }

    /!**
     * temporary: get Vote token
     *!/
    const handleFaucet = async (): Promise<void> => {
      const account: string | undefined = ethersContext?.account;
      await purchasableInfos
        .get(selectedPurchaseClass?.token as string)
        ?.contract!.mint(account, BigNumber.from('1000000000000000000000'));
    };

    const createProposal = (): void => {
      const callData = governanceContract!.interface.encodeFunctionData("updateBenchmarkInterestRate", [
        '10',
        address!]
      )
      console.log(callData, "calldata")
      console.log(governanceContract?.address, "address");
      console.log()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const res = tx?.(governanceContract?.createProposal(
        0,
        ['0xb9Bf0a43968aEfE2F233dfc4d0aCeEF0Fe5eE19A'],
        [0],
        [
          '0xc29a92f8000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000aa060a02d15fbb6824834cc2ef514a5435666584'
        ],
        'Propsal-1: Update the benchMark interest rate'
      ))
    }

    useEffect(() => {
      async function _init(): Promise<void> {

        const filters = governanceContract!.filters.ProposalCreated();
        console.log(filters)

        const events = await governanceContract!.queryFilter(filters);
        console.log(events)
        console.log("tes")
      }

      if (provider && governanceContract && address) {
        void _init();
      }
    }, [provider, governanceContract, address]);


    return (
      <ContentLayout
        title={'Governance'}
        description={
          <span>
            Here is the governance part. Follow us on <a href="https://snapshot.org/#/debondprotocol.eth">Snapshot</a>
          </span>
        }>
        <Button
          style={{position: 'fixed', left: 40}}
          onClick={async (): Promise<void> => {
            await handleFaucet();
          }}>
          {`Get some Vote tokens`}
        </Button>

        <Button onClick={(): void => createProposal()}>Create Proposal</Button>
        <Button onClick={async (): Promise<void> => stake()}>Stake</Button>

      </ContentLayout>
    );*/
  return <ContentLayout title={'Governance'} description={<span>Here is the governance.</span>}></ContentLayout>;
};
