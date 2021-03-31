import styled, { css } from 'styled-components';

type Props = {
  isPaid: boolean;
};

export const disabledStyles = (disabled: boolean) => {
  if (disabled)
    return css`
      color: var(--text-color-light);
      pointer-events: none;
    `;
};

export const Installments = styled.div`
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  overflow-y: auto;
  @media only screen and (max-width: 900px) {
    overflow-y: hidden;
  }
`;

export const Installment = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  flex-shrink: 0;
  color: ${(props: Props) => (props.isPaid ? 'var(--border-color)' : '#182123')};
  overflow: hidden;
  display: block;
  padding: 2px 4px;
  font-size: 11px;
  cursor: pointer;
  font-weight: 400;
  border-radius: 4px;
  margin-bottom: 4px;
  width: fit-content;
`;

export const Amount = styled.span`
  font-weight: 400;
`;
