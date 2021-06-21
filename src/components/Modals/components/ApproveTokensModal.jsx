import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "@use-it/interval";

import { Close } from "../Icons";
import * as Modal from "../styles";
import { responsive } from "theme/constants";
import { useModal } from "context/modal/ModalContext";
import { MaxBtn } from "components/Exchange/exchangeStyles";

const Message = styled.div`
  margin: 32px 0 0;

  color: ${(props) => props.theme.colors.textSecondary};

  @media screen and (max-width: ${responsive.smartphone}) {
    font-size: 14px;
  }
`;

const Caption = styled(Modal.Caption)`
  text-align: left;
`;

const ApproveTokensWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px;
  margin-top: 24px;

  background-color: ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;

  > div {
    margin-left: 8px;

    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 6px;

    color: ${(props) => props.theme.colors.textThirdly};
    font-size: 12px;
  }

  input {
    display: block;

    background: none;
    border: none;

    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }
`;

export default function ApproveTokensModal({ onApprove }) {
  const [count, setCount] = useState(60);
  const [delay, setDelay] = useState(1000);
  const { handleModal } = useModal();

  const increaseCount = () => {
    if (count === 0) {
      setDelay(null);
      handleModal();
    } else {
      setCount(count - 1);
    }
  };

  useInterval(increaseCount, delay);

  return (
    <Modal.Wrapper>
      <Modal.CloseIcon onClick={() => handleModal()}>
        <Close />
      </Modal.CloseIcon>

      <main>
        <Caption>Approve Tokens</Caption>

        <Message>
          You want to sell <strong>1600 wNOM</strong>, but you approved for sale
          only 1000 wNOM. Would you like to approve the rest{" "}
          <strong>600 (or more) wNOM</strong> and complete selling?
        </Message>

        <ApproveTokensWrapper>
          <div>
            <label htmlFor="">Approve tokens (wNOM)</label>
            <input type="text" placeholder="0.00" />
          </div>
          <MaxBtn>MAX</MaxBtn>
        </ApproveTokensWrapper>
      </main>
      <footer>
        <Modal.FooterControls>
          <Modal.SecondaryButton onClick={() => handleModal()}>
            Cancel
          </Modal.SecondaryButton>
          <Modal.PrimaryButton onClick={onApprove}>
            Approve ({count})
          </Modal.PrimaryButton>
        </Modal.FooterControls>
      </footer>
    </Modal.Wrapper>
  );
}
