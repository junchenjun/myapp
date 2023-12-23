import { StyleSheet, View } from 'react-native';

import { IListItemProps, ListItem } from '~components/atoms/listItem/ListItem';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export type IBottomMenuItems = Pick<IListItemProps, 'danger' | 'iconLeft' | 'onPress' | 'title' | 'disabled'>[];

interface IProps {
  items: IBottomMenuItems;
}

export const BottomMenu = (props: IProps) => {
  const { items } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.content}>
      {items.map((i, index) => {
        return <ListItem iosScaleDownAnimation key={index} {...i} roundedBottomCorners roundedTopCorners />;
      })}
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    content: {
      gap: theme.spacing[2],
    },
  });
};
