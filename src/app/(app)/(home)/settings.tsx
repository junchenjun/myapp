import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Button } from '~components/button/Button';
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text text='Settings' size='heading1' />
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
    </View>
  );
};

export default Settings;

const createStyles = (theme: ITheme, insets: EdgeInsets) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface200,
      paddingTop: insets.top,
    },
    scroll: {
      alignItems: 'flex-start',
      gap: 5,
      paddingHorizontal: 15,
    },
    icon: {
      color: theme.colors.primary,
    },
  });
  return styles;
};
