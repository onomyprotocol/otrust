import React, { useState } from "react";
import styled from "styled-components";
import { borderRadius } from 'context/responsive/cssSizes'

const DropDownContainer = styled("div")`
  width: 5em;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

const DropDownHeader = styled("div")`
  height: 2rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.background};
  line-height: 2rem;
  text-align: center;
  vertical-align: middle;
  border-radius: ${borderRadius};
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: ${props => props.theme.colors.background};
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: ${props => props.theme.colors.headerBackground};
  }
`;

const options = ["ETH", "NOM"];

export default function Dropdown({denom, setDenom}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setDenom(value);
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
        <DropDownHeader data-testid="dropdown-header" onClick={toggling}>
          {denom || "ETH"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer data-testid="dropdown-list-container">
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={option} data-testid={option}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
    </DropDownContainer>
  );
}
