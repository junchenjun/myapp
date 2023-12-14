import 'ts-node/register';
import { ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const IS_PROD = process.env.APP_VARIANT === 'production';
const USE_LOCAL_FILES = process.env.USE_LOCAL_FILES === 'true';

let config = {
  file: {
    ios: './GoogleService-Info.plist',
    android: './google-services.json',
  },
  icon: './src/assets/images/iconDev.png',
  package: 'com.myapp.dev',
  name: 'Pump(dev)',
};
if (IS_DEV) {
  config = {
    file: {
      ios: process.env.GOOGLE_SERVICES_PLIST_DEV || './GoogleService-Info.plist',
      android: process.env.GOOGLE_SERVICES_JSON || './google-services.json',
    },
    icon: './src/assets/images/iconDev.png',
    package: 'com.myapp.dev',
    name: 'Pump(dev)',
  };
} else if (IS_PREVIEW) {
  config = {
    file: {
      ios: process.env.GOOGLE_SERVICES_PLIST_PRE || './GoogleService-Info.plist',
      android: process.env.GOOGLE_SERVICES_JSON || './google-services.json',
    },
    icon: './src/assets/images/icon.png',
    package: 'com.myapp.preview',
    name: 'Pump(Preview)',
  };
} else if (IS_PROD) {
  config = {
    file: {
      ios: process.env.GOOGLE_SERVICES_PLIST_PRO || './GoogleService-Info.plist',
      android: process.env.GOOGLE_SERVICES_JSON || './google-services.json',
    },
    icon: './src/assets/images/icon.png',
    package: 'com.myapp',
    name: 'Pump',
  };
}

if (USE_LOCAL_FILES) {
  config = {
    ...config,
    file: {
      ios: './GoogleService-Info.plist',
      android: './google-services.json',
    },
  };
}

const appConfig: ExpoConfig = {
  userInterfaceStyle: 'automatic',
  scheme: 'acme',
  name: config.name,
  slug: 'my-app',
  orientation: 'portrait',
  icon: config.icon,
  backgroundColor: '#000000',
  android: {
    userInterfaceStyle: 'automatic',
    googleServicesFile: config.file.android,
    package: config.package,
    backgroundColor: '#000000',
    adaptiveIcon:
      IS_PROD || IS_PREVIEW
        ? {
            foregroundImage: './src/assets/images/foreground.png',
            backgroundImage: './src/assets/images/background.png',
            monochromeImage: './src/assets/images/monochrome.png',
          }
        : undefined,
    splash: {
      backgroundColor: '#F4F5F6',
      image: './src/assets/images/splash.png',
      resizeMode: 'native',
      dark: {
        backgroundColor: '#141517',
        image: './src/assets/images/splashDark.png',
        resizeMode: 'native',
      },
    },
  },
  ios: {
    bundleIdentifier: config.package,
    googleServicesFile: config.file.ios,
  },
  splash: {
    backgroundColor: '#F4F5F6',
    image: './src/assets/images/splash.png',
  },
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
    // [
    //   'expo-font',
    //   {
    //     fonts: [
    //       './src/assets/fonts/Kanit-Medium.ttf',
    //       './src/assets/fonts/Kanit-Regular.ttf',
    //       './src/assets/fonts/Kanit-SemiBold.ttf',
    //     ],
    //   },
    // ],
    ['./withColorsPlugin', 'withColorsPlugin'],
  ],
  experiments: {
    tsconfigPaths: true,
  },
  extra: {
    eas: {
      projectId: 'd07f4ce2-9833-4bd3-88c7-b86067f065cc',
    },
  },
};

export default appConfig;
