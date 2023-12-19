import React, { ReactElement } from 'react';

import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';
import { useTheme } from '~theme/ThemeContext';

interface IProps {
  title: string;
  content?: string | ReactElement;
}

export const InfoContainer = (props: IProps) => {
  const { content, title } = props;
  const theme = useTheme();

  return (
    <Card style={{ gap: theme.spacing[2] }}>
      <Text variant='pSMRegular' colorKey='onSurfaceDim'>
        {title}
      </Text>
      {typeof content === 'string' ? <Text variant='pMDRegular'>{content || 'NA'}</Text> : <></>}
      {React.isValidElement(content) ? content : <></>}
    </Card>
  );
};
