import { PrimaryButton } from "components/Modals/styles";
import React from "react";
import styled from "styled-components";

import { responsive } from "theme/constants";

import { CloseIcon } from "./SidebarIcons";

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 40px;

  border-bottom: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
  }

  @media screen and (max-width: ${responsive.tabletSmall}) {
    gap: 40px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    padding: 20px;

    border: none;
  }

  strong {
    display: block;
    margin-bottom: 10px;

    font-weight: 400;
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const BalanceNumber = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-size: 28px;
  font-weight: ${(props) => (props.strong ? 700 : 400)};

  > small {
    margin-left: 5px;

    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 11px;
  }

  @media screen and (max-width: ${responsive.laptop}) {
    font-size: 20px;
  }
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BalancePrice = styled.div``;
const BalanceHint = styled.div``;

const SecondaryIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;

  background-color: ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;

  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.iconsSecondary};

  cursor: pointer;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 32px;
    height: 32px;

    font-size: 14px;
  }
`;

const Approved = styled.div`
  display: inline-block;

  padding: 4px 30px 4px 8px;
  margin-top: 6px;

  position: relative;

  background-color: #2a303f;
  border-radius: 6px;

  color: ${(props) => props.theme.colors.highlightBlue};
  font-size: 10px;
  font-weight: 400;
  font-family: Poppins, sans-serif;

  svg {
    position: absolute;
    right: 4px;
    top: 2px;

    cursor: pointer;
    * {
      fill: currentColor;
    }
  }
`;

export default function SidebarBalances({
  strong,
  weak,
  strongBalance,
  weakBalance,
}) {
  return (
    <Balances>
      <Balance>
        <BalancePrice>
          <strong>{strong} Balance</strong>
          <BalanceNumber>
            {strongBalance}
            <small> = 16,208.04 $</small>
          </BalanceNumber>
        </BalancePrice>
        <BalanceHint>
          <SecondaryIcon>i</SecondaryIcon>
        </BalanceHint>
      </Balance>
      <Balance>
        <BalancePrice>
          <strong>{weak} Balance</strong>
          <BalanceNumber strong>
            {weakBalance}
            <small> = 16,208.04 $</small>
            <Approved>
              <span>1,042 approved</span>
              <CloseIcon onClick={() => {}} />
            </Approved>
          </BalanceNumber>
        </BalancePrice>
        <BalanceHint>
          <SecondaryIcon>i</SecondaryIcon>
        </BalanceHint>
      </Balance>

      <div style={{ marginTop: 20 }}>
        <PrimaryButton style={{ width: "100%" }}>Withdraw wNOM</PrimaryButton>
      </div>
    </Balances>
  );
}
