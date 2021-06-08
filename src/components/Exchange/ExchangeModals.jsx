import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { responsive } from 'theme/constants';
import { SellBtn, ExchangeButton, Sending, ExchangeInput, MaxBtn, Receiving, ReceivingValue } from './exchangeStyles';

const ModalTrigger = styled.div`
  display: none;

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const ExchangeModalWrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.bgDarkest};

  header {
    padding: 20px 20px 0;

    background-color: ${props => props.theme.colors.bgNormal};
  }
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;

  h6 {
    margin: 0 auto;

    font-size: 16px;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 56px 20px;
`;

const HeaderInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: ${responsive.laptop}) {
    gap: 5px;
  }

  & + & {
    margin-left: 56px;

    @media screen and (max-width: ${responsive.laptop}) {
      margin-left: 32px;
    }
  }

  > strong {
    color: ${props => props.theme.colors.textThirdly};
    font-weight: 400;

    @media screen and (max-width: ${responsive.smartphoneLarge}) {
      font-size: 10px;
    }
  }
`;

const HeaderInfoItemValue = styled.div`
  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: flex;
    flex-direction: column;

    gap: 5px;
  }

  > strong {
    margin-right: 12px;

    color: ${props => props.theme.colors.textPrimary};
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 20px;
    }

    @media screen and (max-width: ${responsive.smartphoneLarge}) {
      font-size: 18px;
    }
  }
`;

const ModalInfo = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 32px 20px;

  background-color: ${props => props.theme.colors.bgNormal};
`;

const ModalBtn = styled.button`
  width: 44px;
  height: 44px;

  border-radius: 8px;
  border: none;
  background-color: ${props => props.theme.colors.bgHighlightBorder};

  color: #84809a;

  cursor: pointer;
`;

const modalOverride = {
  content: {
    padding: 0,
    border: 'none',
    borderRadius: 0,

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default function ExchangeModals() {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);

  return (
    <ModalTrigger>
      <ExchangeButton onClick={() => setBuyModalOpen(true)}>Buy NOM</ExchangeButton>

      <SellBtn onClick={() => setSellModalOpen(true)}>Sell NOM</SellBtn>

      <Modal isOpen={buyModalOpen} style={modalOverride} onRequestClose={() => setBuyModalOpen(false)}>
        <ExchangeModalWrapper>
          <ModalHeader>
            <ModalBtn onClick={() => setBuyModalOpen(false)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ModalBtn>
            <h6>Buy NOM</h6>
            <ModalBtn
              onClick={() => {
                setSellModalOpen(!sellModalOpen);
                setBuyModalOpen(!buyModalOpen);
              }}
            >
              <FontAwesomeIcon icon={faExchangeAlt} />
            </ModalBtn>
          </ModalHeader>

          <ModalInfo>
            <HeaderInfoItem>
              <strong>Eth Balance</strong>
              <HeaderInfoItemValue>
                <strong>12.12321</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM Balance</strong>
              <HeaderInfoItemValue>
                <strong>10,432.22</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM / USDT</strong>
              <HeaderInfoItemValue>
                <strong>$10.12</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM / ETH</strong>
              <HeaderInfoItemValue>
                <strong>0.07</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
          </ModalInfo>

          <FormWrapper>
            <strong>Buy NOM</strong>
            <Sending>
              <strong>I'm sending</strong>
              <ExchangeInput type="text" value="0.15 ETH" />
              <MaxBtn>Max</MaxBtn>
            </Sending>
            <Receiving>
              <strong>I'm receiving</strong>
              <ReceivingValue>123 NOM</ReceivingValue>
            </Receiving>
            <div>
              <ExchangeButton>Buy NOM</ExchangeButton>
            </div>
          </FormWrapper>
        </ExchangeModalWrapper>
      </Modal>

      <Modal isOpen={sellModalOpen} style={modalOverride} onRequestClose={() => setSellModalOpen(false)}>
        <ExchangeModalWrapper>
          <ModalHeader>
            <ModalBtn onClick={() => setSellModalOpen(false)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ModalBtn>
            <h6>Sell NOM</h6>
            <ModalBtn
              onClick={() => {
                setSellModalOpen(!sellModalOpen);
                setBuyModalOpen(!buyModalOpen);
              }}
            >
              <FontAwesomeIcon icon={faExchangeAlt} />
            </ModalBtn>
          </ModalHeader>

          <ModalInfo>
            <HeaderInfoItem>
              <strong>Eth Balance</strong>
              <HeaderInfoItemValue>
                <strong>12.12321</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM Balance</strong>
              <HeaderInfoItemValue>
                <strong>10,432.22</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM / USDT</strong>
              <HeaderInfoItemValue>
                <strong>$10.12</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>NOM / ETH</strong>
              <HeaderInfoItemValue>
                <strong>0.07</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
          </ModalInfo>

          <FormWrapper>
            <strong>Sell NOM</strong>
            <Sending>
              <strong>I'm sending</strong>
              <ExchangeInput type="text" value="2529 NOM" />
              <MaxBtn>Max</MaxBtn>
            </Sending>
            <Receiving>
              <strong>I'm receiving</strong>
              <ReceivingValue>123 ETH</ReceivingValue>
            </Receiving>
            <div>
              <SellBtn>Sell NOM</SellBtn>
            </div>
          </FormWrapper>
        </ExchangeModalWrapper>
      </Modal>
    </ModalTrigger>
  );
}
