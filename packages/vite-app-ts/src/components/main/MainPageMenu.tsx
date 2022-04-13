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
    <Menu.Item key="/" icon={<img src={"./menu/dashboard.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/');
        }}
        to="/">
        Dashboard
      </Link>
    </Menu.Item>
    <Menu.Item key="/bank" icon={<img src={"./menu/bond.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/bank');
        }}
        to="/bank">
        Bonds
      </Link>
    </Menu.Item>
    <Menu.Item key="/governance" icon={<img src={"./menu/governance.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/governance');
        }}
        to="/governance">
        Ops governance
      </Link>
    </Menu.Item>
    <Menu.Item key="/swap" icon={<img src={"./menu/swap.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/swap');
        }}
        to="/swap">
        Swap
      </Link>
    </Menu.Item>
    <Menu.Item key="/wallet" icon={<img src={"./menu/wallet.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/wallet');
        }}
        to="/wallet">
        Wallet
      </Link>
    </Menu.Item>
    <Menu.Item key="/dex" icon={<img src={"./menu/exchange.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/dex');
        }}
        to="/dex">
        Bond Exchange
      </Link>
    </Menu.Item>
    <Menu.Item key="/loan" icon={<img src={"./menu/loan.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/loan');
        }}
        to="/loan">
        Loan
      </Link>
    </Menu.Item>
    <Menu.Item key="/airdrop" icon={<img src={"./menu/airdrop.png"}/>}>
      <Link
        onClick={(): void => {
          props.setRoute('/airdrop');
        }}
        to="/airdrop">
        Claim Airdrop
      </Link>
    </Menu.Item>
    {/*
    <Menu.Item key="/">
      <Link
        onClick={(): void => {
          props.setRoute('/');
        }}
        to="/">
        Contracts
      </Link>
    </Menu.Item>

    <Menu.Item key="/hints">
      <Link
        onClick={(): void => {
          props.setRoute('/hints');
        }}
        to="/hints">
        Hints
      </Link>
    </Menu.Item>
    <Menu.Item key="/exampleui">
      <Link
        onClick={(): void => {
          props.setRoute('/exampleui');
        }}
        to="/exampleui">
        ExampleUI
      </Link>
    </Menu.Item>
    <Menu.Item key="/mainnetdai">
      <Link
        onClick={(): void => {
          props.setRoute('/mainnetdai');
        }}
        to="/mainnetdai">
        Mainnet DAI
      </Link>
    </Menu.Item>
    */}
    {/* <Menu.Item key="/subgraph">
      <Link
        onClick={() => {
          props.setRoute('/subgraph');
        }}
        to="/subgraph">
        Subgraph
      </Link>
    </Menu.Item> */}
  </Menu>
);
