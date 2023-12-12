import Apple from '~assets/icons/appleIcon.svg';
import Google from '~assets/icons/googleIcon.svg';
import Activity from '~assets/icons/iconActivity.svg';
import Back from '~assets/icons/iconBack.svg';
import Lightning from '~assets/icons/iconLightning.svg';
import More from '~assets/icons/iconMore.svg';
import Settings from '~assets/icons/iconSettings.svg';
import Zap from '~assets/icons/iconZap.svg';

const icons = {
  Lightning,
  Zap,
  Back,
  More,
  Activity,
  Settings,
  Google,
  Apple,
};

type IIcon = (typeof icons)[keyof typeof icons];

export { icons, IIcon };
