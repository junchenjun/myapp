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
      <Text text='Account' color='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem iconLeft={icons.zap} withBorder roundedTopCorners title='Jun Chen' desc='junchen.cq@gmail.com' />
        <MenuItem
          danger
          onPress={() => {
            setLoading(true);
            createTwoButtonAlert();
          }}
          iconLeft={icons.zap}
          roundedBottomCorners
          title='Sign Out'
        />
      </View>
      <Text text='Preferences' color='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem iconLeft={icons.zap} withBorder roundedTopCorners title='Appearance' desc='System Default' />
        <MenuItem iconLeft={icons.zap} withBorder title='Rest Timer' desc='Default' />
        <MenuItem iconLeft={icons.zap} withBorder title='Units' desc='kg' />
        <MenuItem iconLeft={icons.zap} withBorder title='First Day of the week' desc='Monday' />
        <MenuItem iconLeft={icons.zap} roundedBottomCorners title='Keep screen on during workout' desc='ON' />
      </View>
      <Text text='Help' color='onSurfaceDim' style={styles.label} />
      <View style={styles.menu}>
        <MenuItem iconLeft={icons.zap} withBorder roundedTopCorners title='Contact Us' />
        <MenuItem iconLeft={icons.zap} withBorder title='License' />
        <MenuItem iconLeft={icons.zap} withBorder title='Privacy Policy' />
        <MenuItem iconLeft={icons.zap} withBorder title='Terms of Service' />
        <MenuItem
          danger
          onPress={() => {
            setLoading(true);
            createTwoButtonAlert();
          }}
          iconLeft={icons.zap}
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
