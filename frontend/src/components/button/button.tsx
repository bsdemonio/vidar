import React from 'react';

import { StyledButton } from './button.styled';

type Props = {
  primary?: boolean;
  backgroundColor?: string;
  size?: string;
  label: string;
};

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<Props> = ({
  primary = false,
  backgroundColor,
  size = 'medium',
  label,
  ...props
}: Props) => {
  return (
    <StyledButton backgroundColor={backgroundColor} primary={primary} size={size} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
