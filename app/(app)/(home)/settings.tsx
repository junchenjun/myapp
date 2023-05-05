import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StyleSheet, View } from 'react-native';

import ThemedButton from '../../../components/element/ThemedButton';
import ThemedText from '../../../components/element/ThemedText';
import { auth } from '../../../firebase/firebaseConfig';

export default function Settings() {
  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth.signOut();
    } catch {}
  };
  return (
    <View style={styles.container}>
      <ThemedText text="settings" />
      <ThemedButton type="secondary" title="Log Out" onPress={logout} />
      <ThemedText text="" />
      <ThemedButton type="secondary" title="fake" onPress={() => null} />
      <ThemedText text="" />
      <ThemedButton title="Start" onPress={() => null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
});
