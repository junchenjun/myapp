import { IconActivity } from '~assets/icons/IconActivity';
import { IconAppearance } from '~assets/icons/IconAppearance';
import { IconApple } from '~assets/icons/IconApple';
import { IconBack } from '~assets/icons/IconBack';
import { IconCalendar } from '~assets/icons/IconCalendar';
import { IconChecked } from '~assets/icons/IconChecked';
import { IconCollections } from '~assets/icons/IconCollections';
import { IconEdit } from '~assets/icons/IconEdit';
import { IconExpandDown } from '~assets/icons/IconExpandDown';
import { IconExpandRight } from '~assets/icons/IconExpandRight';
import { IconExpandUp } from '~assets/icons/IconExpandUp';
import { IconExternal } from '~assets/icons/IconExternal';
import { IconFile } from '~assets/icons/IconFile';
import { IconGoogle } from '~assets/icons/IconGoogle';
import { IconHourglass } from '~assets/icons/IconHourglass';
import { IconLightbulb } from '~assets/icons/IconLightbulb';
import { IconLightning } from '~assets/icons/IconLightning';
import { IconMail } from '~assets/icons/IconMail';
import { IconMoon } from '~assets/icons/IconMoon';
import { IconMore } from '~assets/icons/IconMore';
import { IconPlus } from '~assets/icons/IconPlus';
import { IconRuler } from '~assets/icons/IconRuler';
import { IconSettings } from '~assets/icons/IconSettings';
import { IconSignOut } from '~assets/icons/IconSignOut';
import { IconSun } from '~assets/icons/IconSun';
import { IconSwitch } from '~assets/icons/IconSwitch';
import { IconTrash } from '~assets/icons/IconTrash';
import { IconUnchecked } from '~assets/icons/IconUnchecked';
import { IconUser } from '~assets/icons/IconUser';
import { IconZap } from '~assets/icons/IconZap';

const icons = {
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
  Hourglass: IconHourglass,
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
};

type IIcon = (typeof icons)[keyof typeof icons];

export { icons, IIcon };
