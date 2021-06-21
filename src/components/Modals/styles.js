import styled from "styled-components";
import { darken, lighten } from "polished";

import { responsive } from "theme/constants";

export const Wrapper = styled.div`
  width: 500px;
  padding: 4px;

  position: absolute;
  top: 50%;
  left: 50%;

  background-color: ${(props) => props.theme.colors.bgNormal};
  border-radius: 8px;

  transform: translate(-50%, -50%);
  z-index: 11;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 400px;
  }

  @media screen and (max-width: ${responsive.smartphone}) {
    width: 100%;
    border-radius: 0;

    top: unset;
    left: 0;
    bottom: 0;

    transform: none;
  }

  main {
    padding: 32px;

    @media screen and (max-width: ${responsive.laptop}) {
      padding: 24px;
    }
  }

  footer {
    padding: 32px 36px 0;

    background-color: ${(props) => props.theme.colors.bgDarken};

    @media screen and (max-width: ${responsive.laptop}) {
      padding: 24px 24px 0;
    }
  }
`;

export const FooterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 32px;

  @media screen and (max-width: ${responsive.laptop}) {
    padding-bottom: 24px;
  }
`;

export const CloseIcon = styled.button`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 10px;
  right: 10px;

  background: transparent;
  border: none;

  svg {
    fill: ${(props) => props.theme.colors.textThirdly};
  }

  &:hover {
    svg {
      fill: ${(props) => lighten(0.1, props.theme.colors.textThirdly)};
    }
  }
`;

export const PrimaryButton = styled.button`
  width: 170px;
  height: 50px;

  background-color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-radius: 8px;

  color: ${(props) => props.theme.colors.bgDarken};
  font-weight: 600;
  font-size: 14px;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 135px;
    height: 40px;

    font-size: 12px;
  }

  @media screen and (max-width: ${responsive.smartphone}) {
    font-size: 14px;
  }

  &:hover {
    background-color: ${(props) =>
    lighten(0.1, props.theme.colors.textPrimary)};
  }

  &:active {
    background-color: ${(props) => darken(0.1, props.theme.colors.textPrimary)};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.colors.bgHighlightBorder};

  color: ${(props) => props.theme.colors.textPrimary};

  &:hover {
    background-color: ${(props) =>
    lighten(0.05, props.theme.colors.bgHighlightBorder)};
  }

  &:active {
    background-color: ${(props) =>
    darken(0.05, props.theme.colors.bgHighlightBorder)};
  }
`;

export const ExchangeResultDescription = styled.div`
  margin-bottom: 10px;

  font-size: 12px;
  color: ${(props) => props.theme.colors.textThirdly};
`;

export const ExchangeResult = styled.div`
  padding: 24px;
  margin: 32px 0 24px;

  background-color: ${(props) => props.theme.colors.bgDarken};
  border-radius: 8px;

  font-size: 28px;
  font-weight: 500;
  text-align: center;

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
    margin: 24px 0 20px;

    font-size: 24px;
  }

  sup {
    font-size: 14px;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 12px;
    }
  }
`;

export const ExchangeRateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 400;
    color: ${(props) => props.theme.colors.textThirdly};
  }

  strong {
    font-weight: 500;
  }
`;

export const ExchangeApproveText = styled.div`
  text-align: center;
`;

export const Caption = styled.h3`
  margin: 0 0 24px;

  font-size: 16px;
  font-weight: 500;

  text-align: center;

  @media screen and (max-width: ${responsive.laptop}) {
    font-size: 14px;
  }

  @media screen and (max-width: ${responsive.smartphone}) {
    font-size: 16px;
  }
`;

export const PendingCaption = styled.h3`
  margin: 0 0 24px;

  font-size: 16px;
  font-weight: 500;

  text-align: left;

  @media screen and (max-width: ${responsive.laptop}) {
    font-size: 14px;
  }

  @media screen and (max-width: ${responsive.smartphone}) {
    font-size: 16px;
  }
`;

export const ModalIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 88px;
  width: 88px;
  margin: 0 auto 16px;

  background-color: ${(props) => props.theme.colors.highlightGreen};
  border-radius: 50%;
  border: 6px solid #324946;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 72px;
    height: 72px;
  }

  svg {
    width: 35px;
    height: 35px;

    @media screen and (max-width: ${responsive.laptop}) {
      width: 24px;
      height: 24px;
    }
  }
`;

export const DetailsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  background: transparent;

  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 14px;

  @media screen and (max-width: ${responsive.laptop}) {
    font-size: 12px;
  }

  @media screen and (max-width: ${responsive.smartphone}) {
    font-size: 14px;
  }

  svg {
    width: 20px;
    height: 20px;

    transform: ${(props) => (props.active ? "rotate(180deg)" : "rotate(0deg)")};
    transition: 0.1s ease;

    @media screen and (max-width: ${responsive.laptop}) {
      width: 16px;
      height: 16px;
    }
  }

  &:hover {
    color: ${(props) => lighten(0.05, props.theme.colors.textSecondary)};
  }

  &:active {
    color: ${(props) => darken(0.05, props.theme.colors.textSecondary)};
  }
`;

export const Spent = styled.div`
  color: ${(props) => props.theme.colors.textThirdly};
`;

export const DetailsSeparator = styled.span`
  margin: 0 20px;

  color: ${(props) => props.theme.colors.iconsNormal};
`;

export const FooterDetails = styled.div`
  padding: 32px 0;

  border-top: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};
`;

export const FooterDetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  span {
    color: ${(props) => props.theme.colors.textThirdly};
  }

  strong {
    font-weight: 500;
  }
`;

export const PendingDescription = styled.div`
  font-size: 12px;
  opacity: 0.5;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

/* Bridge Modal Styles */

export const BridgeModalWrapper = styled(Wrapper)`
  width: 1300px;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 1010px;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    width: 600px;

    top: 50px;
    transform: translate( -50%, 0);
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: none;
 }
`;

export const Info = styled.aside`
  padding: 40px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bgDarken};

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
  }

  h2 {
    margin: 0 0 20px;

    font-family: Bebas Neue, sans-serif;
    font-size: 28px;
    font-weight: 300;

    @media screen and (max-width: ${responsive.laptop}) {
      margin-bottom: 16px;
      font-size: 24px;
    }
  }
`;

export const InfoRow = styled.section`
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 30px;
  justify-items: center;
  align-items: start;

  margin-bottom: 10px;

  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-columns: 1fr 150px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: flex;
    flex-direction: column;
    align-items: center;

    > img {
      width: 230px;
      margin: 32px auto;
    }
  }
`;

export const ConnectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  padding: 20px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bgDarken};

  @media screen and (max-width: ${responsive.laptop}) {
    gap: 20px;
  }

  @media screen and (max-width: ${responsive.tabletSmall}) {
    &:first-child {
      grid-column: 1/3;
    }
  }
`;

export const InfoImgWrapper = styled.div`
  padding: 40px 50px;

  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bgNormal};

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 40px;
  }
`;

export const InfoSubCaption = styled.h3`
  margin: 0 0 12px;

  font-size: 16px;
  font-weight: 500;

  @media screen and (max-width: ${responsive.laptop}) {
    font-size: 14px;
  }
`;

export const ConnectionItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  min-width: 56px;
  height: 56px;

  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.colors.bgHighlightBorder};
  background-color: ${(props) => props.theme.colors.bgNormal};

  @media screen and (max-width: ${responsive.laptop}) {
    width: 48px;
    min-width: 48px;
    height: 48px;
  }

  img {
    overflow: hidden;
  }
`;

export const ConnectionItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > strong {
    font-weight: 500;
    white-space: nowrap;
  }

  > span {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.textSecondary};

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 14px;
    }
  }
`;

export const Balance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  margin-left: auto;

  > strong {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.textSecondary};
    white-space: nowrap;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 10px;
    }
  }

  span {
    font-family: Bebas Neue, sans-serif;
    font-size: 28px;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 24px;
    }
  }
`;

export const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 40px auto;
  padding: 16px 40px;

  position: relative;

  border-radius: 8px;
  background-color: ${(props) => (props.disconnected ? "#30232e" : "#2a3438")};

  color: ${(props) =>
    props.disconnected
      ? props.theme.colors.highlightRed
      : props.theme.colors.highlightGreen};
  white-space: nowrap;

  @media screen and (max-width: ${responsive.tabletSmall}) {
    grid-column: 2/3;
    grid-row: 2/3;

    height: 100%;
    margin: 0;
    padding: 24px;

    white-space: pre-wrap;
    text-align: center;
  }

  &::before,
  &::after {
    content: "";

    display: block;
    width: 1px;
    height: 20px;

    position: absolute;
    top: -30px;
    left: 50%;

    background-color: ${(props) =>
    props.disconnected
      ? props.theme.colors.highlightRed
      : props.theme.colors.highlightGreen};

    @media screen and (max-width: ${responsive.tabletSmall}) {
      display: none;
    }
  }

  &::after {
    top: auto;
    bottom: -30px;

    background-color: ${(props) =>
    props.disconnected
      ? props.theme.colors.bgHighlightBorder
      : props.theme.colors.highlightGreen};
  }
`;


export const BridgeLayout = styled.div`
  display: grid;
  grid-template-columns: 520px 1fr;

  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-columns: 400px 1fr;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    grid-template-columns: none;
  }

  & > main {
    display: flex;
    flex-direction: column;
  }
`;

export const Desc = styled.p`
  max-width: 600px;
  margin-bottom: 40px;

  color: ${(props) => props.theme.colors.textSecondary};

  strong {
    font-weight: 500;
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;
export const List = styled.ol`
  padding-left: 1em;

  color: ${(props) => props.theme.colors.textSecondary};

  li::marker {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  li + li {
    margin-top: 12px;
  }
`;

export const FullWidthButton = styled(PrimaryButton)`
  width: 100%;
`;

export const CaptionLeft = styled(Caption)`
  text-align: left;
`;

export const BridgeContent = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);

  @media screen and (max-width: ${responsive.tabletSmall}) {
    grid-template-columns: 1fr 150px;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
  }
  
`