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
    const API_URL = "https://testnet.snapshot.org/graphql?";
    const getData = async (): Promise<any> => {
      const data = await axios({
        url: API_URL,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
        query {
    proposals (
      first: 20,
      skip: 0,
      where: {
        space_in: ["debondprotocol.eth"],
        state: "open"
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
    }
  }
      `,
          variables: {}
        }
      });
      return data;
    }

    useEffect(() => {
      const data=getData();
      console.log(data)
    })

  */
  return (
    <ContentLayout
      title={'Governance'}
      description={
        <span>
          Here is the governance part. Follow us on <a href="https://snapshot.org/#/debondprotocol.eth">Snapshot</a>
        </span>
      }>
      {/*
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "50", "100", "1000"],
          position: "bottom"
        }}
        dataSource={[{key: 0, title: "first", body: "This is a first "}]}
        renderItem={(item): any => (
          <List.Item>
            <Card
              bordered={false}
              key={item.key}
              title={item.title}
            >
              {item.body}
            </Card>
          </List.Item>)}/>
          */}
    </ContentLayout>
  );
};
