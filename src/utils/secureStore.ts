import * as SecureStore from 'expo-secure-store';

export const secureStoreKeys = {
  colorscheme: 'colorscheme',
} as const;

export async function saveToSecureStore(key: (typeof secureStoreKeys)[keyof typeof secureStoreKeys], value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureStoreValue<T>(
  key: (typeof secureStoreKeys)[keyof typeof secureStoreKeys]
): Promise<T | null> {
  const result = await SecureStore.getItemAsync(key);
  return result as T | null;
}
