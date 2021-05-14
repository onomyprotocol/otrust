import React from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { Panel } from "components/UI";
import { useChain } from "context/chain/ChainContext";
import { responsive } from "theme/constants";

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

const Header = styled.header`
  display: grid;
  grid-template-columns: 44px 72px 44px;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: center;
  gap: 32px 60px;

  height: 240px;
  padding: 40px 48px;

  background-color: ${(props) => props.theme.colors.bgDarken};
  border-radius: 4px;

  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-columns: 32px 56px 32px;
    gap: 24px 32px;

    height: 180px;
    padding: 24px 48px;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    grid-template-columns: 32px 56px 32px;
    gap: 24px;

    padding: 24px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    grid-template-rows: none;
    grid-template-columns: 56px 250px 32px 32px;
    justify-items: start;
    justify-content: start;
    gap: 10px;

    height: 100px;

    background-color: ${(props) => props.theme.colors.bgNormal};
    border-bottom: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};
    border-radius: 0;
  }

  @media screen and (max-width: ${responsive.tabletSmall}) {
    grid-template-columns: 56px 150px 32px 32px;

    border-radius: 0;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    grid-template-columns: 56px 1fr 44px 44px;
    gap: 16px;

    padding: 20px;
  }

  @media screen and (max-width: ${responsive.smartphoneSmall}) {
    grid-column: 1fr 44px 44px;
  }
`;

const Avatar = styled.img`
  height: 72px;
  width: 72px;

  border-radius: 12px;
  border: 3px solid ${(props) => props.theme.colors.bgHighlightBorder};

  @media screen and (max-width: ${responsive.laptop}) {
    height: 56px;
    width: 56px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  @media screen and (max-width: ${responsive.smartphoneSmall}) {
    grid-column: none;

    display: none;
  }
`;

const AccountNumber = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  grid-column: 1/4;

  @media screen and (max-width: ${responsive.tablet}) {
    align-items: flex-start;
    grid-column: 2/3;
    grid-row: 1/2;

    padding-left: 14px;
  }

  @media screen and (max-width: ${responsive.smartphoneSmall}) {
    grid-column: 1/2;

    padding: 0;
  }

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.textSecondary};

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 14px;
    }
  }
`;

const Balances = styled.div`
  display: flex;
  gap: 56px;

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
    margin-bottom: 12px;

    font-weight: 400;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  span {
    font-family: "Bebas Neue", sans-serif;
    font-size: 28px;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 20px;
    }
  }
`;

const Connection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 40px;

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    flex-direction: row;
    gap: 40px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: none;
  }
`;

const ConnectionRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${responsive.laptop}) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }

  > strong {
    font-weight: 400;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  > span {
    font-weight: 500;
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${(props) => props.theme.colors.highlightGreen};
  font-weight: 500;

  &:before {
    content: "";
    display: block;

    width: 12px;
    height: 12px;

    background-color: currentColor;
    border-radius: 50%;
  }
`;

const Info = styled.footer`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 50px 40px;
  margin-top: auto;

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 40px 24px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    gap: 12px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    padding: 24px 20px;

    background-color: ${(props) => props.theme.colors.bgDarken};
  }
`;

const Link = styled.a`
  display: block;
  margin-right: auto;

  color: ${(props) => props.theme.colors.textSecondary};
  text-decoration: none;
`;

const ControlsBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  width: 44px;

  background-color: ${(props) => props.theme.colors.bgDarken};
  border: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;

  font-size: 16px;
  color: ${(props) => props.theme.colors.iconsNormal};

  cursor: pointer;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 32px;
    height: 32px;

    font-size: 12px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    &:first-child {
      grid-column: 3/4;
    }
    &:nth-child(3) {
      grid-column: 4/5;
    }
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    width: 44px;
    height: 44px;

    font-size: 16px;
  }
`;

const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;

  background-color: ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;

  font-size: 20px;
  color: ${(props) => props.theme.colors.iconsSecondary};

  cursor: pointer;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 32px;
    height: 32px;

    font-size: 14px;
  }
`;

export default function AcctDash() {
  const { active, error, chainId, account } = useWeb3React();
  const { ETHbalance, NOMallowance, NOMbalance, blockNumber } = useChain();
  console.log("NOM allownce: ", NOMallowance)
  return (
    <Panel>
      <SidebarLayout>
        <Header>
          <ControlsBtn>
            <FontAwesomeIcon icon={faCog} />
          </ControlsBtn>
          <Avatar src="https://picsum.photos/72" alt="" />
          <ControlsBtn>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </ControlsBtn>
          <AccountNumber>
            <p>My Account</p>
            <span>
                {account === null
                  ? "-"
                  : account
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`
                  : ""}
            </span>
          </AccountNumber>
        </Header>
        <Balances>
          <div>
            <strong>ETH Balance</strong>
            <span>
              {ETHbalance === null
                ? "Error"
                : ETHbalance
                ? `${ETHbalance.toPrecision(8)}`
                : ""}
            </span>
          </div>
          <div>
            <strong>NOM Balance</strong>
            <span>
              {NOMbalance === null
                ? "Error"
                : NOMbalance
                ? `${NOMbalance.toPrecision(8)}`
                : "0"}
            </span>
          </div>
          {/* <Balance /> */}
        </Balances>
        <Connection>
          <ConnectionRow>
            <strong>Connection</strong>
            <ConnectionStatus>
              {active ? "Connected" : error ? "Error" : "Loading"}
            </ConnectionStatus>
          </ConnectionRow>
          <ConnectionRow>
            <strong>Chain Id</strong>
            <span>{chainId ?? ""}</span>
          </ConnectionRow>
          <ConnectionRow>
            <strong>Block Number</strong>
            <span>{blockNumber === null ? "Error" : blockNumber ?? ""}</span>
          </ConnectionRow>
        </Connection>
        <Info>
          <Link href="/about">About Onomy</Link>

          <SocialBtn>
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialBtn>

          <SocialBtn>
            <FontAwesomeIcon icon={faTwitter} />
          </SocialBtn>
        </Info>
      </SidebarLayout>
    </Panel>
  );
}
