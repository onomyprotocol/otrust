import styled from "styled-components";

export const ConnectionStatus = styled.div`
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
