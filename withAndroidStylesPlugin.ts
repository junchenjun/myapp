import {
  ConfigPlugin,
  AndroidConfig,
  withAndroidColorsNight,
  withAndroidColors,
  XML,
  withAndroidStyles,
} from '@expo/config-plugins';

const withAndroidStylesPlugin: ConfigPlugin = config => {
  withAndroidStyles(config, async config => {
    config.modResults = await configureFullScreenDialog(config.modResults);
    return config;
  });
  withAndroidColors(config, async config => {
    config.modResults = await configureLightColors(config.modResults);
    return config;
  });
  return withAndroidColorsNight(config, async config => {
    config.modResults = await configureDarkColors(config.modResults);
    return config;
  });
};

const colors = {
  dark: {
    navigationBarColor: '#141517',
    alertBackground: '#1D1F21',
    alertText: '#F7F8FA',
    alertTextDim: '#C6C6C9',
    primary: '#AAC7FF',
  },
  light: {
    navigationBarColor: '#F4F5F6',
    alertBackground: '#F4F5F6',
    alertText: '#001B3E',
    alertTextDim: '#5D5E61',
    primary: '#1275E3',
  },
};

// dark colors
async function configureDarkColors(
  styles: AndroidConfig.Resources.ResourceXML
): Promise<AndroidConfig.Resources.ResourceXML> {
  // Remove existing theme
  styles.resources.color = styles.resources.color
    ? styles.resources.color.filter(
        color =>
          color.$.name !== 'alertBackground' &&
          color.$.name !== 'alertText' &&
          color.$.name !== 'alertTextDim' &&
          color.$.name !== 'navigationBarColor' &&
          color.$.name !== 'primary'
      )
    : [];

  const alertBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'alertBackground',
    value: colors.dark.alertBackground,
  });

  // message
  const alertTextDim = AndroidConfig.Resources.buildResourceItem({
    name: 'alertTextDim',
    value: colors.dark.alertTextDim,
  });

  // title
  const alertText = AndroidConfig.Resources.buildResourceItem({
    name: 'alertText',
    value: colors.dark.alertText,
  });

  const primary = AndroidConfig.Resources.buildResourceItem({
    name: 'primary',
    value: colors.dark.primary,
  });

  const navigationBarColor = AndroidConfig.Resources.buildResourceItem({
    name: 'navigationBarColor',
    value: colors.dark.navigationBarColor,
  });

  styles.resources.color.push(alertBackground);
  styles.resources.color.push(alertText);
  styles.resources.color.push(alertTextDim);
  styles.resources.color.push(primary);
  styles.resources.color.push(navigationBarColor);

  return styles;
}

// light colors
async function configureLightColors(
  styles: AndroidConfig.Resources.ResourceXML
): Promise<AndroidConfig.Resources.ResourceXML> {
  styles.resources.color = styles.resources.color
    ? styles.resources.color.filter(
        color =>
          color.$.name !== 'alertBackground' &&
          color.$.name !== 'alertTextDim' &&
          color.$.name !== 'alertText' &&
          color.$.name !== 'navigationBarColor' &&
          color.$.name !== 'primary'
      )
    : [];

  const alertBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'alertBackground',
    value: colors.light.alertBackground,
  });

  const alertTextDim = AndroidConfig.Resources.buildResourceItem({
    name: 'alertTextDim',
    value: colors.light.alertTextDim,
  });

  const alertText = AndroidConfig.Resources.buildResourceItem({
    name: 'alertText',
    value: colors.light.alertText,
  });

  const navigationBarColor = AndroidConfig.Resources.buildResourceItem({
    name: 'navigationBarColor',
    value: colors.light.navigationBarColor,
  });

  const primary = AndroidConfig.Resources.buildResourceItem({
    name: 'primary',
    value: colors.light.primary,
  });

  styles.resources.color.push(alertBackground);
  styles.resources.color.push(alertTextDim);
  styles.resources.color.push(alertText);
  styles.resources.color.push(primary);
  styles.resources.color.push(navigationBarColor);

  return styles;
}

async function configureFullScreenDialog(
  styles: AndroidConfig.Resources.ResourceXML
): Promise<AndroidConfig.Resources.ResourceXML> {
  // Remove existing theme
  styles.resources.style = styles.resources.style!.filter(
    style =>
      style.$.name !== 'AppTheme' &&
      style.$.name !== 'AlertDialogTheme' &&
      style.$.name !== 'NegativeButtonStyle' &&
      style.$.name !== 'PositiveButtonStyle'
  );

  // AppTheme
  const appTheme = (
    await XML.parseXMLAsync(`
      <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:editTextStyle">@style/ResetEditText</item>
        <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="android:enforceNavigationBarContrast">false</item>
        <item name="android:alertDialogTheme">@style/AlertDialogTheme</item>
        <item name="android:windowSplashScreenBackground">@color/splashscreen_background</item>
        <item name="android:windowLightNavigationBar">true</item>
        <item name="android:navigationBarColor">@color/navigationBarColor</item>
      </style>
    `)
  ).style as AndroidConfig.Resources.ResourceGroupXML;

  // AlertDialogTheme
  const alertDialogTheme = (
    await XML.parseXMLAsync(`
      <style name="AlertDialogTheme" parent="Theme.AppCompat.DayNight.Dialog.Alert">
        <item name="android:background">@color/alertBackground</item>
        <item name="android:textColor">@color/alertText</item>
        <item name="android:textColorPrimary">@color/alertTextDim</item>
        <item name="android:buttonBarNegativeButtonStyle">@style/NegativeButtonStyle</item>
        <item name="android:buttonBarPositiveButtonStyle">@style/PositiveButtonStyle</item>
      </style>
    `)
  ).style as AndroidConfig.Resources.ResourceGroupXML;
  const negativeButtonStyle = (
    await XML.parseXMLAsync(`
      <style name="NegativeButtonStyle" parent="Widget.AppCompat.Button.ButtonBar.AlertDialog">
        <item name="android:textColor">@color/alertTextDim</item>
        <item name="android:textAllCaps">false</item>
      </style>
    `)
  ).style as AndroidConfig.Resources.ResourceGroupXML;
  const positiveButtonStyle = (
    await XML.parseXMLAsync(`
      <style name="PositiveButtonStyle" parent="Widget.AppCompat.Button.ButtonBar.AlertDialog">
        <item name="android:textColor">@color/primary</item>
        <item name="android:textAllCaps">false</item>
      </style>
    `)
  ).style as AndroidConfig.Resources.ResourceGroupXML;

  styles.resources.style.push(appTheme);
  styles.resources.style.push(alertDialogTheme);
  styles.resources.style.push(negativeButtonStyle);
  styles.resources.style.push(positiveButtonStyle);

  return styles;
}

module.exports = withAndroidStylesPlugin;

// This can be tested with npx expo prebuild -p android --no-install
// https://github.com/expo/expo/issues/7799#issuecomment-1009425322
