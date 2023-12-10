import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '~components/button/Button';
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
      <Button
        loading={loading}
        title='Log Out'
        onPress={() => {
          setLoading(true);
          createTwoButtonAlert();
        }}
      />
      <Button title='Log Out' onPress={() => {}} />
    </ScrollView>
  );
};

export default Settings;

const createStyles = (theme: ITheme) => {
  const styles = StyleSheet.create({
    scroll: {
      alignItems: 'flex-start',
      gap: 5,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    icon: {
      color: theme.colors.primary,
    },
  });
  return styles;
};
