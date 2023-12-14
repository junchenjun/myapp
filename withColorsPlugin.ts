import {
  ConfigPlugin,
  AndroidConfig,
  withAndroidColorsNight,
  withAndroidColors,
  XML,
  withAndroidStyles,
} from '@expo/config-plugins';

const withColors: ConfigPlugin = config => {
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
          color.$.name !== 'splashscreen_background' &&
          color.$.name !== 'navigationBarColor' &&
          color.$.name !== 'primary'
      )
    : [];

  const alertBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'alertBackground',
    value: '#1D1F21',
  });

  const alertTextDim = AndroidConfig.Resources.buildResourceItem({
    name: 'alertTextDim',
    value: '#C6C6C9',
  });

  const alertText = AndroidConfig.Resources.buildResourceItem({
    name: 'alertText',
    value: '#F7F8FA',
  });

  const splashscreenBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'splashscreen_background',
    value: '#141517',
  });

  const primary = AndroidConfig.Resources.buildResourceItem({
    name: 'primary',
    value: '#AAC7FF',
  });

  const navigationBarColor = AndroidConfig.Resources.buildResourceItem({
    name: 'navigationBarColor',
    value: '#141517',
  });

  styles.resources.color.push(alertBackground);
  styles.resources.color.push(alertText);
  styles.resources.color.push(alertTextDim);
  styles.resources.color.push(splashscreenBackground);
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
          color.$.name !== 'splashscreen_background' &&
          color.$.name !== 'navigationBarColor' &&
          color.$.name !== 'primary'
      )
    : [];

  const alertBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'alertBackground',
    value: '#F4F5F6',
  });

  const alertTextDim = AndroidConfig.Resources.buildResourceItem({
    name: 'alertTextDim',
    value: '#5D5E61',
  });

  const alertText = AndroidConfig.Resources.buildResourceItem({
    name: 'alertText',
    value: '#001B3E',
  });

  const splashscreenBackground = AndroidConfig.Resources.buildResourceItem({
    name: 'splashscreen_background',
    value: '#F4F5F6',
  });

  const navigationBarColor = AndroidConfig.Resources.buildResourceItem({
    name: 'navigationBarColor',
    value: '#F4F5F6',
  });

  const primary = AndroidConfig.Resources.buildResourceItem({
    name: 'primary',
    value: '#1275E3',
  });

  styles.resources.color.push(alertBackground);
  styles.resources.color.push(alertTextDim);
  styles.resources.color.push(alertText);
  styles.resources.color.push(splashscreenBackground);
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
      style.$.name !== 'Theme.App.SplashScreen' &&
      style.$.name !== 'AlertDialogTheme' &&
      style.$.name !== 'NegativeButtonStyle' &&
      style.$.name !== 'PositiveButtonStyle'
  );

  // Add theme
  const appTheme = (
    await XML.parseXMLAsync(`<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
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

  // 1A. You can build the XML object using the JS API
  const SplashScreen = AndroidConfig.Resources.buildResourceGroup({
    parent: 'AppTheme',
    name: 'Theme.App.SplashScreen',
    items: [
      AndroidConfig.Resources.buildResourceItem({
        name: 'android:windowBackground',
        value: '@drawable/splashscreen',
      }),
    ],
  });

  // Add the resource object to the styles to be written
  styles.resources.style.push(appTheme);
  styles.resources.style.push(alertDialogTheme);
  styles.resources.style.push(negativeButtonStyle);
  styles.resources.style.push(positiveButtonStyle);
  styles.resources.style.push(SplashScreen);

  return styles;
}

module.exports = withColors;
