import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';
import { Text } from '~components/text/Text';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

const Settings = () => {
  const styles = useThemedStyles(createStyles);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await firebaseAuth().signOut();
      await GoogleSignin.signOut();
    } catch (e) {
      setLoading(false);
    }
  };

  const createTwoButtonAlert = () =>
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
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* Account */}
      <Text text='Account' color='onSurfaceDim' style={styles.label} />
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
          onPress={() => {
            setLoading(true);
            createTwoButtonAlert();
          }}
          iconLeft={icons.SignOut}
          roundedBottomCorners
          title='Sign Out'
        />
      </View>
      {/* Preferences */}
      <Text text='Preferences' color='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem
          iconRight={icons.ExpandRight}
          iconLeft={icons.Appearance}
          withBorder
          roundedTopCorners
          title='Appearance'
          desc='System Default'
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
      {/* Help */}
      <Text text='Help' color='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem iconRight={icons.ExpandRight} iconLeft={icons.Mail} withBorder roundedTopCorners title='Contact Us' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='License' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Privacy Policy' />
        <MenuItem iconRight={icons.External} iconLeft={icons.File} withBorder title='Terms of Service' />
        <MenuItem
          danger
          onPress={() => {
            setLoading(true);
            createTwoButtonAlert();
          }}
          iconLeft={icons.Trash}
          roundedBottomCorners
          title='Delete Account'
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
      paddingBottom: 100,
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
