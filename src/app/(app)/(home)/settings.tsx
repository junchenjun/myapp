import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EdgeInsets } from 'react-native-safe-area-context';

import { ThemedButton } from '~components/ThemedButton';
import { ThemedText } from '~components/ThemedText';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { ITheme } from '~redux/themeSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

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
        <ThemedText text='Settings' size='heading1' />
        <ThemedButton
          loading={loading}
          title='Log Out'
          onPress={() => {
            setLoading(true);
            createTwoButtonAlert();
          }}
          type='secondary'
        />
        <ThemedButton title='Log Out' onPress={() => {}} type='secondary' />
      </ScrollView>
    </View>
  );
};

export default Settings;

const createStyles = (theme: ITheme, insets: EdgeInsets) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.surface200,
      paddingTop: insets.top,
    },
    scroll: {
      alignItems: 'flex-start',
      gap: 5,
      paddingHorizontal: 15,
    },
    icon: {
      color: theme.color.primary,
    },
  });
  return styles;
};
