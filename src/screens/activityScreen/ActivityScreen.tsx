import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useScrollToTop } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { ListItem } from '~components/atoms/listItem/ListItem';
import { Modal } from '~components/atoms/modal/Modal';
import { Text } from '~components/atoms/text/Text';
import { ChangeAppearance } from '~components/organisms/changeAppearance/ChangeAppearance';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { ITheme, appColorScheme, useTheme, useThemedStyles } from '~theme/ThemeContext';

export const ActivityScreen = () => {
  const scrollViewRef = useRef(null);
  const appearanceModalRef = useRef<BottomSheetModal>(null);
  const appearanceModalPress = useCallback(() => {
    appearanceModalRef.current?.present();
  }, []);
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  useScrollToTop(scrollViewRef);

  const colorschemeName = theme.systemDefault
    ? 'System Default'
    : theme.id === appColorScheme.dark
    ? 'Dark Mode'
    : 'Light Mode';

  const logout = async () => {
    try {
      await firebaseAuth().signOut();
      await GoogleSignin.signOut();
    } catch (e) {}
  };

  const logoutAlert = () =>
    Alert.alert(
      'Log out of App',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: logout },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Modal modalRef={appearanceModalRef} title='Appearance'>
        <ChangeAppearance />
      </Modal>
      {/* Help */}
      <Text text='Help' colorKey='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <ListItem iconRight={icons.ExpandRight} iconLeft={icons.Mail} withBorder roundedTopCorners title='Contact Us' />
        <ListItem iconRight={icons.External} iconLeft={icons.File} withBorder title='License' />
        <ListItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Privacy Policy' />
        <ListItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Terms of Service' />
        <ListItem danger iconLeft={icons.Trash} roundedBottomCorners title='Delete Account' />
      </View>
      {/* Account */}
      <Text text='Account' colorKey='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <ListItem
          iconLeft={icons.User}
          iconRight={icons.ExpandRight}
          withBorder
          roundedTopCorners
          title='Jun Chen'
          desc='junchen.cq@gmail.com'
        />
        <ListItem
          onPress={() => {
            logoutAlert();
          }}
          iconLeft={icons.SignOut}
          roundedBottomCorners
          title='Sign Out'
        />
      </View>
      {/* Preferences */}
      <Text text='Preferences' colorKey='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <ListItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Appearance}
          withBorder
          roundedTopCorners
          title='Appearance'
          desc={colorschemeName}
          onPress={appearanceModalPress}
        />
        <ListItem iconRight={icons.ExpandRight} iconLeft={icons.Timer} withBorder title='Rest Timer' desc='Default' />
        <ListItem iconRight={icons.ExpandRight} iconLeft={icons.Ruler} withBorder title='Units' desc='kg' />
        <ListItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Calender}
          withBorder
          title='First Day of the week'
          desc='Monday'
        />
        <ListItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.LightBulb}
          roundedBottomCorners
          title='Keep screen on during workout'
          desc='ON'
        />
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: ITheme) => {
  const styles = StyleSheet.create({
    scroll: {
      paddingHorizontal: theme.spacing[4],
      backgroundColor: theme.colors.surfaceExtraDim,
      paddingBottom: theme.spacing[4],
    },
    label: {
      marginTop: theme.spacing[3],
      marginBottom: theme.spacing[2],
    },
    icon: {
      color: theme.colors.primary,
    },
    menu: {
      width: '100%',
    },
  });
  return styles;
};
