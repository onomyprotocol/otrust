import React from 'react';
import styled from 'styled-components';

import { AccentButton } from 'components/UI/Button';
import logo from '../assets/images/onomy.png';
import rightCursor from '../assets/images/rightCursor.png';
import metamask from '../assets/images/metamask.png';
import ledger from '../assets/images/ledger.png';
import coinbase from '../assets/images/coinbase.png';
import walletConnect from '../assets/images/walletConnect.png';
import { SUPPORTED_WALLETS } from '../connectors';

export const wallets = [
  { title: 'Metamask', img: metamask },
  { title: 'Ledger', img: ledger },
  { title: 'Wallet Connect', img: walletConnect },
  { title: 'Coinbase Wallet', img: coinbase },
];

const Wrapper = styled.div`
  text-align: center;
`;

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.bgNormal};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledTopPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  background-color: ${props => props.theme.colors.bgDarken};
  width: 100%;
`;

const StyledLogo = styled.img`
  width: 120px;
  height: 95.21px;
  margin-bottom: 26px;
`;

const StyledLogoText = styled.span`
  text-align: left;
  font: normal normal bold 40px/21px 'Bebas Neue';
  letter-spacing: 1.6px;
  color: #e1dfeb;
  opacity: 1;
`;

const StyledBottomPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const BottomTitleText = styled.span`
  text-align: center;
  font: normal normal medium 22px/30px Poppins;
  letter-spacing: 0px;
  color: ${props => props.theme.colors.txtPrimary};
`;

const BottomDescriptionText = styled.span`
  font: normal normal normal 14px/20px Poppins;
  letter-spacing: 0px;
  color: ${props => props.theme.colors.txtSecondary};
  width: 300px;
  margin-top: 16px;
  margin-bottom: 40px;
`;

const WalletWrapper = styled(AccentButton)`
  width: 385px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.bgDarken};
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const IconWrapper = styled.div`
  width: 43px;
`;

const WalletIcon = styled.img`
  height: 27px;
`;

const WalletText = styled.span`
  font: normal normal medium 16px/25px Poppins;
  color: ${props => props.theme.colors.txtSecondary};
`;

const RightIcon = styled.img`
  width: 24px;
`;

export default function Landing({ connectWallet }) {
  const onWalletClick = wallet => {
    Object.values(SUPPORTED_WALLETS).forEach(sWallet => {
      if (sWallet.name === wallet.title) {
        // This part of code never can be executed with SUPPORTED_WALLETS constants. Can it be deleted?
        if (sWallet.name === 'Injected') {
          if (typeof web3 !== 'undefined') {
            connectWallet(sWallet.connector);
          } else {
            window.open('https://metamask.io/download.html');
          }
        } else {
          connectWallet(sWallet.connector);
        }
      }
    });
  };

  return (
    <Wrapper>
      <StyledHeader>
        <StyledTopPart>
          <StyledLogo src={logo} alt="logo" />
          <StyledLogoText>ONOMY</StyledLogoText>
        </StyledTopPart>
        <StyledBottomPart>
          <BottomTitleText>Connect Your Wallet</BottomTitleText>
          <BottomDescriptionText>
            To participate bonding curve process and buy NOM tokens you need to connect your Eth wallet
          </BottomDescriptionText>
          {wallets.map(wallet => (
            <WalletWrapper key={wallet.title} onClick={() => onWalletClick(wallet)}>
              <IconWrapper>
                <WalletIcon alt={`${wallet.title} Icon`} src={wallet.img} />
              </IconWrapper>
              <WalletText>{wallet.title}</WalletText>
              <RightIcon alt="Right Cursor" src={rightCursor} />
            </WalletWrapper>
          ))}
        </StyledBottomPart>
      </StyledHeader>
    </Wrapper>
  );
}
