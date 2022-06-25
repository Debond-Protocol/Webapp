import { Menu } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => (
  <Menu
    style={{
      textAlign: 'center',
    }}
    selectedKeys={[props.route]}
    mode="vertical">
    <Menu.Item key="/" icon={<img src={'./menu/dashboard.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/');
        }}
        to="/">
        Dashboard
      </Link>
    </Menu.Item>
    <Menu.Item key="/bank" icon={<img src={'./menu/bond.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/bank');
        }}
        to="/bank">
        Bonds
      </Link>
    </Menu.Item>
    <Menu.Item key="/governance" icon={<img src={'./menu/governance.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/governance');
        }}
        to="/governance">
        Ops governance
      </Link>
    </Menu.Item>
    <Menu.Item key="/swap" icon={<img src={'./menu/swap.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/swap');
        }}
        to="/swap">
        Swap
      </Link>
    </Menu.Item>
    <Menu.Item key="/wallet" icon={<img src={'./menu/wallet.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/wallet');
        }}
        to="/wallet">
        Wallet
      </Link>
    </Menu.Item>
    <Menu.Item key="/dex" icon={<img src={'./menu/exchange.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/dex');
        }}
        to="/dex">
        Bond Exchange
      </Link>
    </Menu.Item>
    <Menu.Item key="/loan" icon={<img src={'./menu/loan.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/loan');
        }}
        to="/loan">
        Loan
      </Link>
    </Menu.Item>

    <Menu.Item key="/nft" icon={<img src={'./menu/nft.png'} />}>
      <Link
        onClick={(): void => {
          props.setRoute('/nft');
        }}
        to="/nft">
        NFT
      </Link>
    </Menu.Item>
  </Menu>
);
