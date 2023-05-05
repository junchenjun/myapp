import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import IconMore from '../../assets/icons/IconMore';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

interface IProps {
  openedMenu: string;
  setOpenMenu: any;
  name: string;
}

const PopUpMenu = (props: IProps) => {
  const styles = useThemedStyles(themedStyles);

  const { openedMenu, setOpenMenu, name } = props;

  const isOpened = openedMenu === name;

  return (
    <Menu
      name={name}
      opened={isOpened}
      onBackdropPress={() => {
        setOpenMenu('');
      }}>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableWithoutFeedback,
          triggerTouchable: {
            onPress: () => setOpenMenu(name),
          },
        }}>
        <View style={styles.pressable}>
          <IconMore width={24} height={24} stroke={styles.icon.color} />
        </View>
      </MenuTrigger>
      <MenuOptions
        renderOptionsContainer={() => {
          return (
            <View style={styles.container}>
              <View style={styles.item}>
                <ThemedText color="white">xx</ThemedText>
              </View>
              <View style={styles.item}>
                <ThemedText color="white">mmmmmmmmmmmmmmmmmmmmm</ThemedText>
              </View>
              <View style={styles.item}>
                <ThemedText color="white">zzz</ThemedText>
              </View>
            </View>
          );
        }}
        customStyles={{
          optionsContainer: styles.wrapper,
        }}
      />
    </Menu>
  );
};

export default PopUpMenu;

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      gap: 5,
    },
    item: {
      flexDirection: 'row',
    },
    icon: {
      color: theme.color.text100,
    },
    wrapper: {
      borderRadius: theme.borders.borderRadius,
      backgroundColor: theme.color.secondary,
      width: 150,
    },
    pressable: {
      width: 40,
      height: 28,
      alignItems: 'flex-end',
    },
  });
};
