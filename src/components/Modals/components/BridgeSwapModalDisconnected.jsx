import React from 'react';
import styled from 'styled-components';

import { Close } from '../Icons';
import * as Modal from '../styles';
import { responsive } from 'theme/constants';
import oneWayBridgeImg from '../assets/one-way-bridge.svg';
import whyBridgeImg from '../assets/why-bridge.svg';
import bridgeCurveImg from '../assets/icon-bridge-curve.svg';

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 100px 32px;

  border-radius: 8px;
  background-color: ${props => props.theme.colors.bgDarken};

  @media screen and (max-width: ${responsive.tabletSmall}) {
    padding: 24px;
  }
`;

export default function BridgeSwapModalDisconnected() {
  return (
    <Modal.BridgeModalWrapper>
      <Modal.CloseIcon>
        <Close />
      </Modal.CloseIcon>

      <Modal.BridgeLayout>
        <main>
          <Modal.CaptionLeft>Onomy Bridge</Modal.CaptionLeft>

          <Modal.BridgeContent>
            <Modal.ConnectionItem>
              <Modal.ConnectionItemIcon>
                <img src={bridgeCurveImg} alt="" />
              </Modal.ConnectionItemIcon>
              <Modal.ConnectionItemContent>
                <strong>Onomy Bonding Curve</strong>
                <span>0x526..123sdas8b</span>
              </Modal.ConnectionItemContent>
              <Modal.Balance>
                <strong>wNOM Balance</strong>
                <span>10,429.22</span>
              </Modal.Balance>
            </Modal.ConnectionItem>

            <Modal.ConnectionStatus disconnected>Onomy wallet is not connected</Modal.ConnectionStatus>

            <ConnectWalletWrapper>
              <Modal.FullWidthButton>Connect Onomy Wallet</Modal.FullWidthButton>
            </ConnectWalletWrapper>
          </Modal.BridgeContent>
        </main>
        <Modal.Info>
          <h2>What is Onomy Bridge?</h2>

          <Modal.Desc>
            The Onomy Bonding Curve platform is a gateway into the Onomy Network. This is achieved by participants
            purchasing wrapped-NOM, an ERC-20 token on the Ethereum Network, and swapping for NOM on the Onomy Network.
          </Modal.Desc>

          <Modal.InfoRow>
            <div>
              <Modal.InfoSubCaption>One Way Bridge</Modal.InfoSubCaption>

              <Modal.Desc>
                Choose to bridge when you are ready to do so to finalize your purchase of NOM!{' '}
                <strong>
                  After bridging, you can no longer sell back to the bonding curve or bridge back for wNOM.
                </strong>{' '}
                There are no guarantees of liquid markets.
              </Modal.Desc>
            </div>

            <img src={oneWayBridgeImg} alt="" />
          </Modal.InfoRow>

          <Modal.InfoRow>
            <div>
              <Modal.InfoSubCaption>Why Bridge?</Modal.InfoSubCaption>

              <Modal.List>
                <li>You must hold NOM to participate in the Onomy Network. </li>
                <li>Early stakers of NOM take advantage of larger staking yield. </li>
                <li>NOM is used for governance, staking, and collateral to mint stablecoins.</li>
                <li>All bridged wNOM is burned from the bonding curve supply. </li>
                <li>NOM would be listed on exchanges rather than wNOM. </li>
              </Modal.List>
            </div>

            <Modal.InfoImgWrapper>
              <img src={whyBridgeImg} alt="" />
            </Modal.InfoImgWrapper>
          </Modal.InfoRow>
        </Modal.Info>
      </Modal.BridgeLayout>
    </Modal.BridgeModalWrapper>
  );
}
