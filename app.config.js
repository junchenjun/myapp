const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  android: {
    googleServicesFile: IS_DEV
      ? process.env.GOOGLE_SERVICES_JSON_DEV
      : IS_PREVIEW
      ? process.env.GOOGLE_SERVICES_JSON_PREVIEW
      : process.env.GOOGLE_SERVICES_JSON_PRODUCTION,
    package: IS_DEV ? 'com.myapp.dev' : IS_PREVIEW ? 'com.myapp.preview' : 'com.myapp',
    backgroundColor: '#000000',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/foreground.png',
      backgroundImage: './src/assets/images/background.png',
      monochromeImage: './src/assets/images/monochrome.png',
    },
  },
  ios: {
    bundleIdentifier: IS_DEV ? 'com.myapp.dev' : IS_PREVIEW ? 'com.myapp.preview' : 'com.myapp',
    googleServicesFile: IS_DEV
      ? process.env.GOOGLE_SERVICES_PLIST_DEV
      : IS_PREVIEW
      ? process.env.GOOGLE_SERVICES_PLIST_PREVIEW
      : process.env.GOOGLE_SERVICES_PLIST_PRODUCTION,
  },
  splash: {
    backgroundColor: '#000000',
    image: './src/assets/images/splash.png',
  },
  icon: IS_DEV ? './src/assets/images/iconDev.png' : './src/assets/images/icon.png',
  plugins: [
    '@react-native-firebase/app',
    '@react-native-google-signin/google-signin',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  experiments: {
    tsconfigPaths: true,
  },
  userInterfaceStyle: 'automatic',
  scheme: 'acme',
  name: IS_DEV ? 'MyApp (Dev)' : IS_PREVIEW ? 'MyApp (Preview)' : 'MyApp',
  slug: 'my-app',
  extra: {
    eas: {
      projectId: 'd07f4ce2-9833-4bd3-88c7-b86067f065cc',
    },
  },
};
