import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { responsive } from 'theme/constants';
import { CogIcon, LogoutIcon } from './SidebarIcons';

const PrimaryIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  width: 44px;

  background-color: ${props => props.theme.colors.bgDarken};
  border: 1px solid ${props => props.theme.colors.bgHighlightBorder};
  border-radius: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
  color: ${props => props.theme.colors.iconsNormal};

  cursor: pointer;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 32px;
    height: 32px;

    svg {
      width: 16px;
      height: 16px;
    }
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

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &:hover {
    background-color: ${props => lighten(0.02, props.theme.colors.bgNormal)};
  }

  &:active {
    background-color: ${props => darken(0.02, props.theme.colors.bgNormal)};
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

  background-color: ${props => props.theme.colors.bgDarken};
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

    background-color: ${props => props.theme.colors.bgNormal};
    border-bottom: 1px solid ${props => props.theme.colors.bgHighlightBorder};
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
  border: 3px solid ${props => props.theme.colors.bgHighlightBorder};

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
    color: ${props => props.theme.colors.textSecondary};

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 14px;
    }
  }
`;

export default function SidebarHeader({ account, onLogout }) {
  return (
    <Header>
      <PrimaryIcon>
        <CogIcon />
      </PrimaryIcon>
      <Avatar src="https://picsum.photos/72" alt="" />
      <PrimaryIcon onClick={onLogout}>
        <LogoutIcon />
      </PrimaryIcon>
      <AccountNumber>
        <p>My Account</p>
        <span>
          {account === null
            ? '-'
            : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
        </span>
      </AccountNumber>
    </Header>
  );
}
