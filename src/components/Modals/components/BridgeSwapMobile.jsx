import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { responsive } from "theme/constants";
import { Sending, ExchangeInput, MaxBtn } from "../../Exchange/exchangeStyles";
import { ConnectionStatus } from "../../Sidebar/Sidebar";
import * as Modal from "../styles";

import oneWayBridgeImg from "./assets/one-way-bridge.svg";
import whyBridgeImg from "./assets/why-bridge.svg";

const BridgeSwapModalWrapper = styled.div`
  @media screen and (min-width: 701px) {
    display: none;
  }
`;

const BridgeSwapModal = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.bgDarkest};

  header {
    padding: 20px 20px 0;

    background-color: ${(props) => props.theme.colors.bgNormal};
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
    color: ${(props) => props.theme.colors.textThirdly};
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

    color: ${(props) => props.theme.colors.textPrimary};
    font-family: "Bebas Neue", sans-serif;
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

  background-color: ${(props) => props.theme.colors.bgNormal};
`;

const ModalBtn = styled.button`
  width: 44px;
  height: 44px;

  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.bgHighlightBorder};

  color: #84809a;

  cursor: pointer;
`;

const modalOverride = {
  content: {
    padding: 0,
    border: "none",
    borderRadius: 0,

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default function BridgeSwapMobile() {
  const [swapModal, setSwapModal] = useState(true);
  const [infoModal, setInfoModal] = useState(false);

  return (
    <BridgeSwapModalWrapper>
      <ReactModal isOpen={infoModal} style={modalOverride}>
        <BridgeSwapModal>
          <ModalHeader>
            <ModalBtn
              onClick={() => {
                setSwapModal(true);
                setInfoModal(false);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </ModalBtn>
            <h6>What Is Onomy Bridge?</h6>
          </ModalHeader>

          <ModalInfo>
            <Modal.Info>
              <h2>What is Onomy Bridge?</h2>

              <Modal.Desc>
                The Onomy Bonding Curve platform is a gateway into the Onomy
                Network. This is achieved by participants purchasing
                wrapped-NOM, an ERC-20 token on the Ethereum Network, and
                swapping for NOM on the Onomy Network.
              </Modal.Desc>

              <Modal.InfoRow>
                <div>
                  <Modal.InfoSubCaption>One Way Bridge</Modal.InfoSubCaption>

                  <Modal.Desc>
                    Choose to bridge when you are ready to do so to finalize
                    your purchase of NOM!{" "}
                    <strong>
                      After bridging, you can no longer sell back to the bonding
                      curve or bridge back for wNOM.
                    </strong>{" "}
                    There are no guarantees of liquid markets.
                  </Modal.Desc>
                </div>

                <img src={oneWayBridgeImg} alt="" />
              </Modal.InfoRow>

              <Modal.InfoRow>
                <div>
                  <Modal.InfoSubCaption>Why Bridge?</Modal.InfoSubCaption>

                  <Modal.List>
                    <li>
                      You must hold NOM to participate in the Onomy Network.{" "}
                    </li>
                    <li>
                      Early stakers of NOM take advantage of larger staking
                      yield.{" "}
                    </li>
                    <li>
                      NOM is used for governance, staking, and collateral to
                      mint stablecoins.
                    </li>
                    <li>
                      All bridged wNOM is burned from the bonding curve supply.{" "}
                    </li>
                    <li>NOM would be listed on exchanges rather than wNOM. </li>
                  </Modal.List>
                </div>

                <Modal.InfoImgWrapper>
                  <img src={whyBridgeImg} alt="" />
                </Modal.InfoImgWrapper>
              </Modal.InfoRow>
            </Modal.Info>
          </ModalInfo>
        </BridgeSwapModal>
      </ReactModal>
      <ReactModal
        isOpen={swapModal}
        style={modalOverride}
        // onRequestClose={() => {}}
      >
        <BridgeSwapModal>
          <ModalHeader>
            <ModalBtn onClick={() => setSwapModal(false)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ModalBtn>
            <h6>Onomy Bridge</h6>
          </ModalHeader>

          <ModalInfo>
            <HeaderInfoItem>
              <strong>wNom Balance</strong>
              <HeaderInfoItemValue>
                <strong>10,429.22</strong>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>Bridge</strong>
              <HeaderInfoItemValue>
                <ConnectionStatus>Connected</ConnectionStatus>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
            <HeaderInfoItem>
              <strong>Onomy Wallet</strong>
              <HeaderInfoItemValue>
                <span>0xk3210230x…223</span>
              </HeaderInfoItemValue>
            </HeaderInfoItem>
          </ModalInfo>

          <FormWrapper>
            <Sending>
              <strong>Swap to NOM</strong>
              <ExchangeInput type="text" />
              wNOM
              <MaxBtn>Max</MaxBtn>
            </Sending>

            <Modal.FullWidthButton>Swap wNOM for NOM</Modal.FullWidthButton>
            <Modal.SecondaryButton
              style={{ width: "100%" }}
              onClick={() => {
                setInfoModal(true);
                setSwapModal(false);
              }}
            >
              What is Onomy Bridge?
            </Modal.SecondaryButton>
          </FormWrapper>
        </BridgeSwapModal>
      </ReactModal>
    </BridgeSwapModalWrapper>
  );
}
