import { StyleProp, View, ViewStyle } from 'react-native';

import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';

interface IProps {
  title: string;
  content?: string;
  styles?: StyleProp<ViewStyle>;
}

export const InfoConatiner = (props: IProps) => {
  const { content, title, styles: customStyles } = props;

  return (
    <View style={[customStyles]}>
      <Card>
        <Text size='body4' color='text100'>
          {title}
        </Text>
        <Text size='body2' color='text300'>
          {content || 'NA'}
        </Text>
      </Card>
    </View>
  );
};
