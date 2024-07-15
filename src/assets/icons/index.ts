import { IconActivity } from '~assets/icons/IconActivity';
import { IconAppearance } from '~assets/icons/IconAppearance';
import { IconApple } from '~assets/icons/IconApple';
import { IconBack } from '~assets/icons/IconBack';
import { IconCalendar } from '~assets/icons/IconCalendar';
import { IconChecked } from '~assets/icons/IconChecked';
import { IconCollections } from '~assets/icons/IconCollections';
import { IconConfig } from '~assets/icons/IconConfig';
import { IconDisable } from '~assets/icons/IconDisable';
import { IconEdit } from '~assets/icons/IconEdit';
import { IconExpandDown } from '~assets/icons/IconExpandDown';
import { IconExpandRight } from '~assets/icons/IconExpandRight';
import { IconExpandUp } from '~assets/icons/IconExpandUp';
import { IconExternal } from '~assets/icons/IconExternal';
import { IconFile } from '~assets/icons/IconFile';
import { IconFolder } from '~assets/icons/IconFolder';
import { IconFolderPlus } from '~assets/icons/IconFolderPlus';
import { IconGoogle } from '~assets/icons/IconGoogle';
import { IconLightbulb } from '~assets/icons/IconLightbulb';
import { IconLightning } from '~assets/icons/IconLightning';
import { IconLogo } from '~assets/icons/IconLogo';
import { IconMail } from '~assets/icons/IconMail';
import { IconMoon } from '~assets/icons/IconMoon';
import { IconMore } from '~assets/icons/IconMore';
import { IconPlus } from '~assets/icons/IconPlus';
import { IconRemove } from '~assets/icons/IconRemove';
import { IconRuler } from '~assets/icons/IconRuler';
import { IconSearch } from '~assets/icons/IconSearch';
import { IconSettings } from '~assets/icons/IconSettings';
import { IconSignOut } from '~assets/icons/IconSignOut';
import { IconStar } from '~assets/icons/IconStar';
import { IconSun } from '~assets/icons/IconSun';
import { IconSwitch } from '~assets/icons/IconSwitch';
import { IconTimer } from '~assets/icons/IconTimer';
import { IconTrash } from '~assets/icons/IconTrash';
import { IconUnchecked } from '~assets/icons/IconUnchecked';
import { IconUser } from '~assets/icons/IconUser';
import { IconZap } from '~assets/icons/IconZap';

const icons = {
  Logo: IconLogo,
  Remove: IconRemove,
  Lightning: IconLightning,
  Zap: IconZap,
  Back: IconBack,
  More: IconMore,
  Activity: IconActivity,
  Settings: IconSettings,
  Google: IconGoogle,
  Apple: IconApple,
  Appearance: IconAppearance,
  Ruler: IconRuler,
  Timer: IconTimer,
  Calender: IconCalendar,
  SignOut: IconSignOut,
  User: IconUser,
  LightBulb: IconLightbulb,
  Trash: IconTrash,
  Mail: IconMail,
  ExpandRight: IconExpandRight,
  ExpandDown: IconExpandDown,
  ExpandUp: IconExpandUp,
  File: IconFile,
  Edit: IconEdit,
  Switch: IconSwitch,
  External: IconExternal,
  Checked: IconChecked,
  Unchecked: IconUnchecked,
  Sun: IconSun,
  Moon: IconMoon,
  Plus: IconPlus,
  Collections: IconCollections,
  Search: IconSearch,
  FolderPlus: IconFolderPlus,
  Folder: IconFolder,
  Config: IconConfig,
  Star: IconStar,
  Disable: IconDisable,
};

type IIcon = (typeof icons)[keyof typeof icons];

export { icons, IIcon };
