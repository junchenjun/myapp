import * as SecureStore from 'expo-secure-store';
import * as Sentry from 'sentry-expo';

export const secureStoreKeys = {
  colorscheme: 'colorscheme',
} as const;

export async function saveToSecureStore(key: (typeof secureStoreKeys)[keyof typeof secureStoreKeys], value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

export async function getSecureStoreValue<T>(
  key: (typeof secureStoreKeys)[keyof typeof secureStoreKeys]
): Promise<T | null> {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result as T | null;
  } catch (error) {
    Sentry.Native.captureException(error);
    return null;
  }
}
