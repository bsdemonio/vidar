import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from '../button';

storiesOf('Button', module)
  .add('Primary', () => <Button primary label="Button" />)
  .add('Secondary', () => <Button label="Button" />)
  .add('Large', () => <Button label="Button" size="large" />)
  .add('Small', () => <Button label="Button" size="small" />);
