import React from "react";
import styled from "styled-components";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { responsive } from "theme/constants";

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

const SecondaryIcon = styled.a`
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

export default function SidebarFooter() {
  return (
    <Info>
      <Link href="/about">About Onomy</Link>

      <SecondaryIcon>
        <FontAwesomeIcon icon={faLinkedin} />
      </SecondaryIcon>

      <SecondaryIcon>
        <FontAwesomeIcon icon={faTwitter} />
      </SecondaryIcon>
    </Info>
  );
}
