// https://github.com/expo/expo/issues/7799
const { withAndroidStyles, XML } = require('@expo/config-plugins');

const withAppThemeStyles = config => {
  return withAndroidStyles(config, async config => {
    config.modResults = await configureFullScreenDialog(config.modResults);
    return config;
  });
};

async function configureFullScreenDialog(styles) {
  // Remove existing theme
  styles.resources.style = styles.resources.style.filter(style => style.$.name !== 'AppTheme');

  // Add theme
  const res = (
    await XML.parseXMLAsync(`<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:textColor">@android:color/black</item>
    <item name="android:editTextStyle">@style/ResetEditText</item>
    <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="android:windowBackground">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:enforceNavigationBarContrast">false</item>
    <item name="android:windowLightNavigationBar">true</item>
    <item name="android:windowDrawsSystemBarBackgrounds">true</item>
  </style>`)
  ).style;

  // Add the resource object to the styles to be written
  styles.resources.style.push(res);
  return styles;
}

module.exports = withAppThemeStyles;
