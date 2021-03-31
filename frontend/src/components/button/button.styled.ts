import styled, { css } from 'styled-components';

const getTypeStyles = (primary: boolean) => {
  if (primary) {
    return css`
      color: white;
      background-color: #1ea7fd;
    `;
  }

  return css`
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  `;
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 12px;
        padding: 10px 16px;
      `;
    case 'large':
      return css`
        font-size: 16px;
        padding: 12px 24px;
      `;
    default:
      return css`
        font-size: 14px;
        padding: 11px 20px;
      `;
  }
};

export const StyledButton = styled.button<{
  backgroundColor?: string;
  primary: boolean;
  size: string;
}>`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${(props) => getTypeStyles(props.primary)};
  ${(props) => getSizeStyles(props.size)};

  background-color: ${(props) => props.backgroundColor};
`;
