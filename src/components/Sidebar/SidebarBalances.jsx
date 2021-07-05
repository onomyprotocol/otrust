import React, { useState } from 'react';
import styled from 'styled-components';

import { PrimaryButton } from 'components/Modals/styles';
import { responsive } from 'theme/constants';
// import { CloseIcon } from './SidebarIcons';

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 40px;

  border-bottom: 1px solid ${props => props.theme.colors.bgHighlightBorder};

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    flex-direction: row;
    align-items: center;
    grid-column: 1/3;
    grid-row: 2/3;

    border: none;
  }

  @media screen and (max-width: ${responsive.tabletSmall}) {
    gap: 40px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    padding: 20px;
  }

  strong {
    display: block;
    margin-bottom: 10px;

    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const BalanceNumber = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  font-weight: ${props => (props.strong ? 700 : 400)};

  > small {
    margin-left: 5px;

    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.colors.textSecondary};
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

const BalanceHint = styled.div`
  position: relative;
`;

const SecondaryIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;

  background-color: ${props => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;
  border: none;

  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.colors.iconsSecondary};

  cursor: pointer;
  user-select: none;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 32px;
    height: 32px;

    font-size: 14px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    margin-left: 24px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.iconsNormal};
    color: ${props => props.theme.colors.bgDarken};
  }

  &:active {
    background-color: ${props => props.theme.colors.bgHighlightBorder_darken};
  }
`;

const Approved = styled.div`
  display: inline-block;

  padding: 4px 8px;
  /* padding: 4px 30px 4px 8px; */
  margin-top: 6px;

  position: relative;

  background-color: #2a303f;
  border-radius: 6px;

  color: ${props => props.theme.colors.highlightBlue};
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins, sans-serif;

  @media screen and (max-width: ${responsive.tablet}) {
    margin: 0 0 0 12px;
  }

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

const WithdrawBtnWrapper = styled.div`
  margin-top: 20px;
  min-width: 150px;

  @media screen and (max-width: ${responsive.tablet}) {
    margin: 0 0 0 auto;
  }
`;

const TooltipWrapper = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};

  width: 360px;
  padding: 32px 40px;

  position: absolute;
  right: 72px;
  top: -52px;

  background-color: ${props => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;
  box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.36);

  z-index: 1;
  cursor: pointer;

  &:after {
    content: '';
    display: block;

    position: absolute;
    right: -20px;
    top: 42px;

    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;

    border-left: 30px solid ${props => props.theme.colors.bgHighlightBorder};
  }
`;

const TooltipCaption = styled.h5`
  margin-bottom: 16px;

  font-size: 16px;
  font-weight: 500;
`;

const TooltipDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`;

function Hint({ children }) {
  const [active, setActive] = useState(false);

  return (
    <BalanceHint onPointerOver={() => setActive(true)} onPointerLeave={() => setActive(false)}>
      <TooltipWrapper active={active}>{children}</TooltipWrapper>
      <SecondaryIcon active={active}>i</SecondaryIcon>
    </BalanceHint>
  );
}

export default function SidebarBalances({ strong, weak, strongBalance, weakBalance }) {
  return (
    <Balances>
      <Balance>
        <BalancePrice>
          <strong>{strong} Balance</strong>
          <BalanceNumber>
            {strongBalance}
            <small> = $16,208.04</small>
          </BalanceNumber>
        </BalancePrice>
        <Hint>
          <TooltipCaption>ETH Balance</TooltipCaption>
          <TooltipDesc>This is your connected wallet Ether balance.</TooltipDesc>
        </Hint>
      </Balance>
      <Balance>
        <BalancePrice>
          <strong>{weak} Balance</strong>
          <BalanceNumber strong>
            {weakBalance}
            <small> = $16,208.04</small>
            <Approved>
              <span>1,042 approved</span>
              {/* <CloseIcon onClick={() => {}} /> */}
            </Approved>
          </BalanceNumber>
        </BalancePrice>
        <Hint>
          <TooltipCaption>wNOM Balance</TooltipCaption>
          <TooltipDesc>
            This shows your total wNOM balance and the amount approved for selling. You must approve wNOM for selling
            before it can be sold.
          </TooltipDesc>
        </Hint>
      </Balance>

      <WithdrawBtnWrapper>
        <PrimaryButton style={{ width: '100%' }}>Withdraw wNOM</PrimaryButton>
      </WithdrawBtnWrapper>
    </Balances>
  );
}
