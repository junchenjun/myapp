import { StyleSheet, View } from 'react-native';

import { IListItemProps, ListItem } from '~components/atoms/listItem/ListItem';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export type IBottomMenuItems = Pick<IListItemProps, 'danger' | 'iconLeft' | 'onPress' | 'title' | 'disabled'>[];

interface IProps {
  items: IBottomMenuItems;
  onItemPressCallback?: () => void;
}

export const BottomMenu = (props: IProps) => {
  const { items, onItemPressCallback } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.content}>
      {items.map((i, index) => {
        return (
          <ListItem
            key={index}
            {...i}
            roundedBottomCorners
            roundedTopCorners
            onPress={() => {
              i.onPress && i.onPress();
              onItemPressCallback && onItemPressCallback();
            }}
          />
        );
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
