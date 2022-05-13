import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Col, Row } from 'antd';
import { BigNumber } from 'ethers';
import React, { FC } from 'react';

import ContentLayout from '~~/components/main/layout/ContentLayout';

export interface IAirdropUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  yourCurrentBalance: BigNumber | undefined;
  price: number;
}

/**
 * Governance UI
 * @param props
 * @constructor
 */
export const AirdropUI: FC<IAirdropUIProps> = (props) => {
  return (
    <ContentLayout title={'Airdrop'} description={<span>Here you can claim your aidrop!</span>}>
      <Row>
        <Col span={24} offset={8}>
          <a
            className="e-widget no-button generic-loader"
            href="https://gleam.io/88rw6/groundbreaking-airdrop-by-dbond"
            rel="nofollow">
            Ground/Breaking Airdrop by D/Bond
          </a>
          <script type="text/javascript" src="https://widget.gleamjs.io/e.js" async={true}></script>
        </Col>
      </Row>
    </ContentLayout>
  );
};
