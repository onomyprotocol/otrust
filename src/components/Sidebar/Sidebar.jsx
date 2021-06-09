import React from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";

import { Panel } from "components/UI";
import { useChain } from "context/chain/ChainContext";
import { useExchange } from "context/exchange/ExchangeContext";
import { responsive } from "theme/constants";
import { format18 } from "utils/math";
import SidebarHeader from "./SidebarHeader";
import SidebarBalances from "./SidebarBalances";
import SidebarFooter from "./SidebarFooter";
import SidebarConnection from "./SidebarConnection";

const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  @media screen and (max-width: ${responsive.tablet}) {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 100px 100px;
    justify-content: space-between;
  }

  @media screen and (max-width: ${responsive.tabletSmall}) {
    grid-template-columns: 1fr 250px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    grid-template-columns: 100%;
    grid-template-rows: repeat(3, auto);
  }
`;

export default function AcctDash() {
  const { active, error, chainId, account } = useWeb3React();
  const { blockNumber, strongBalance, weakBalance } = useChain();
  const { strong, weak } = useExchange();

  return (
    <Panel>
      <SidebarLayout>
        <SidebarHeader account={account} />
        <SidebarBalances
          strong={strong}
          weak={weak}
          strongBalance={
            BigNumber.isBigNumber(strongBalance)
              ? `${format18(strongBalance).toFixed(6)}`
              : "Loading"
          }
          weakBalance={
            BigNumber.isBigNumber(weakBalance)
              ? `${format18(weakBalance).toFixed(6)}`
              : "Loading"
          }
        />
        <SidebarConnection
          active={active}
          error={error}
          chainId={chainId}
          blockNumber={blockNumber}
        />
        <SidebarFooter />
      </SidebarLayout>
    </Panel>
  );
}
