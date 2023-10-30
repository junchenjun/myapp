export default {
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    package: 'com.junchenjun.myapp',
    backgroundColor: '#000000',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/foreground.png',
      backgroundImage: './src/assets/images/background.png',
      monochromeImage: './src/assets/images/monochrome.png',
    },
  },
  ios: {
    bundleIdentifier: 'com.junchenjun.myapp',
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
  },
  splash: {
    backgroundColor: '#000000',
    image: './src/assets/images/splash.png',
  },
  icon: './src/assets/images/icon.png',
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
  name: 'my-app',
  slug: 'my-app',
  extra: {
    eas: {
      projectId: 'd07f4ce2-9833-4bd3-88c7-b86067f065cc',
    },
  },
};
