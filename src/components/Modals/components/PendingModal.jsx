import styled from "styled-components";

import LoadingSpinner from "components/UI/LoadingSpinner";
import { Metamask } from "components/Modals/Icons";
import * as Modal from "../styles";

const TransactionDetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  span {
    font-weight: 400;
    color: ${(props) => props.theme.colors.textThirdly};
  }

  strong {
    font-weight: 500;
  }
`;

const WalletIcon = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.bgDarken};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FeeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;

  color: ${(props) => props.theme.colors.textThirdly};

  strong {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

export default function PendingModal() {
  return (
    <Modal.Wrapper>
      <main>
        <Modal.PendingCaption>Transaction pending...</Modal.PendingCaption>

        <Modal.ExchangeResult>
          <Modal.ExchangeResultDescription>
            You're selling
          </Modal.ExchangeResultDescription>
          1239 <sup>wNOM</sup>
        </Modal.ExchangeResult>

        <TransactionDetailsRow>
          <span>Current Exchange Rate</span>
          <strong>1 wNOM = 0.07102 ETH</strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <span>You're Sending</span>
          <strong>~0.15 ETH</strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <div>
            <span>Wallet</span>

            <div>
              <strong>0x293s92dsd3h4gh9bvn61...931</strong>
            </div>
          </div>

          <WalletIcon>
            <Metamask />
          </WalletIcon>
        </TransactionDetailsRow>

        <FeeWrapper>
          <span>Transaction fee</span>
          <span>
            <strong>$5.4</strong> (0.00032 ETH)
          </span>
        </FeeWrapper>
      </main>
      <footer>
        <Modal.LoadingWrapper>
          <LoadingSpinner />
        </Modal.LoadingWrapper>
      </footer>
    </Modal.Wrapper>
  );
}
