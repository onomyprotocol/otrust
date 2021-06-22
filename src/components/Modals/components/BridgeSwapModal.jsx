import React from 'react';
import styled from 'styled-components';

import { Close } from '../Icons';
import * as Modal from '../styles';
import { responsive } from 'theme/constants';
import { Sending, ExchangeInput, MaxBtn } from '../../Exchange/exchangeStyles';
import oneWayBridgeImg from './assets/one-way-bridge.svg';
import whyBridgeImg from './assets/why-bridge.svg';
import bridgeCurveImg from './assets/icon-bridge-curve.svg';
import walletImg from './assets/icon-onomy-wallet.svg';

const InputWrapper = styled.div`
  margin: 0 0 25px;
`;

const FormWrapper = styled.form`
  padding: 32px 32px 0;
  margin: 32px -32px 0 -36px;

  border-top: 1px solid ${props => props.theme.colors.bgHighlightBorder};

  @media screen and (max-width: ${responsive.laptop}) {
    margin-left: -28px;
    margin-right: -24px;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    margin-left: -28px;
    margin-right: -28px;
  }
`;

export default function BridgeSwapModal() {
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

            <Modal.ConnectionStatus>Bridge Connected</Modal.ConnectionStatus>

            <Modal.ConnectionItem>
              <Modal.ConnectionItemIcon>
                <img src={walletImg} alt="" />
              </Modal.ConnectionItemIcon>
              <Modal.ConnectionItemContent>
                <strong>My Onomy Wallet</strong>
                <span>0x5262f6ef7cbdsad334123sdas8b</span>
              </Modal.ConnectionItemContent>
            </Modal.ConnectionItem>
          </Modal.BridgeContent>

          <FormWrapper>
            <InputWrapper>
              <Sending>
                <strong>Swap to NOM</strong>
                <ExchangeInput type="text" />
                wNOM
                <MaxBtn>Max</MaxBtn>
              </Sending>
            </InputWrapper>

            <Modal.FullWidthButton>Swap wNOM for NOM</Modal.FullWidthButton>
          </FormWrapper>
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
