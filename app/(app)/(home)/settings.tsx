import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StyleSheet, View } from 'react-native';

import ThemedButton from '../../../components/ThemedButton';
import ThemedText from '../../../components/ThemedText';
import { auth } from '../../../firebaseConfig';

export default function Settings() {
  const logout = async () => {
    try {
      const resp = await GoogleSignin.signOut();
      const resp2 = await auth.signOut();
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <ThemedText text="settings" />
      <ThemedButton type="secondary" title="Log Out" onPress={logout} />
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
