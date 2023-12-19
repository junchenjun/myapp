import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';
import { Text } from '~components/text/Text';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { AppearanceModal } from '~modals/appearanceModal/AppearanceModal';
import { ITheme, appColorScheme, useTheme, useThemedStyles } from '~theme/ThemeContext';

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const appearanceModalRef = useRef<BottomSheetModal>(null);
  const appearanceModalPress = useCallback(() => {
    appearanceModalRef.current?.present();
  }, []);
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

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
          onPress: () => setLoading(false),
        },
        { text: 'Confirm', onPress: logout },
      ],
      {
        cancelable: true,
        onDismiss: () => setLoading(false),
      }
    );

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <AppearanceModal modalRef={appearanceModalRef} />
      {/* Help */}
      <Text text='Help' colorKey='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem iconRight={icons.ExpandRight} iconLeft={icons.Mail} withBorder roundedTopCorners title='Contact Us' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='License' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Privacy Policy' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Terms of Service' />
        <MenuItem danger iconLeft={icons.Trash} roundedBottomCorners title='Delete Account' />
      </View>
      {/* Account */}
      <Text text='Account' colorKey='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem
          iconLeft={icons.User}
          iconRight={icons.ExpandRight}
          withBorder
          roundedTopCorners
          title='Jun Chen'
          desc='junchen.cq@gmail.com'
        />
        <MenuItem
          disabled={loading}
          disabledOnPress
          onPress={() => {
            setLoading(true);
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
        <MenuItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Appearance}
          withBorder
          roundedTopCorners
          title='Appearance'
          desc={colorschemeName}
          onPress={appearanceModalPress}
        />
        <MenuItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Hourglass}
          withBorder
          title='Rest Timer'
          desc='Default'
        />
        <MenuItem iconRight={icons.ExpandRight} iconLeft={icons.Ruler} withBorder title='Units' desc='kg' />
        <MenuItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Calender}
          withBorder
          title='First Day of the week'
          desc='Monday'
        />
        <MenuItem
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

export default Settings;

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
