const colors = {
  gray: {
    100: '#ffffff',
    98: '#F7F8FA',
    96: '#F4F5F6',
    95: '#F0F1F3',
    94: '#EBEDF0',
    92: '#E4E6EB',
    90: '#E1E3E5',
    87: '#D9DADD',
    80: '#C6C6C9',
    70: '#AAABAE',
    60: '#8F9193',
    40: '#5D5E61',
    30: '#454749',
    22: '#2C3033',
    20: '#26292B',
    17: '#1D1F21',
    12: '#181A1C',
    10: '#141517',
    6: '#0E1012',
    5: '#0A0B0D',
    0: '#000000',
  },
  blue: {
    100: '#FFFFFF',
    87: '#C9DAFF',
    80: '#AAC7FF',
    50: '#1275E3',
    40: '#478BFF',
    20: '#002F64',
    10: '#001B3E',
  },
  red: {
    100: '#FFFFFF',
    80: '#FFB4AB',
    40: '#BA1A1A',
    20: '#690005',
  },
} as const;

export const themeColorsLight = {
  // primary
  primary: colors.blue[50],
  primaryBright: colors.blue[40],
  onPrimary: colors.blue[100],
  // surface
  surfaceExtraBright: colors.gray[100],
  surfaceBright: colors.gray[98],
  surface: colors.gray[96],
  surfaceDim: colors.gray[94],
  surfaceExtraDim: colors.gray[92],
  onSurface: colors.blue[10],
  onSurfaceDim: colors.gray[40],
  onSurfaceExtraDim: colors.gray[70],
  // error
  error: colors.red[40],
  onError: colors.red[100],
  // outline
  outline: colors.gray[70],
  outlineDim: colors.gray[90],
  outlineExtraDim: colors.gray[95],
  // android ripple
  ripple: colors.gray[90],
  rippleDim: colors.gray[70],
} as const;

export const themeColorsDark = {
  // primary
  primary: colors.blue[80],
  primaryBright: colors.blue[87],
  onPrimary: colors.blue[20],
  // surface
  surfaceExtraBright: colors.gray[17],
  surfaceBright: colors.gray[12],
  surface: colors.gray[10],
  surfaceDim: colors.gray[6],
  surfaceExtraDim: colors.gray[5],
  onSurface: colors.gray[98],
  onSurfaceDim: colors.gray[80],
  onSurfaceExtraDim: colors.gray[60],
  // error
  error: colors.red[80],
  onError: colors.red[20],
  // outline
  outline: colors.gray[40],
  outlineDim: colors.gray[22],
  outlineExtraDim: colors.gray[20],
  // android ripple
  ripple: colors.gray[30],
  rippleDim: colors.gray[30],
} as const;

export const themeSpacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
} as const;

export const themeRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 100,
} as const;

export const themeFonts = {
  // heading
  h1Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 36,
  },
  h1Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 36,
  },
  h1Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 36,
  },
  h2Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 32,
  },
  h2Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 32,
  },
  h2Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
  },
  h3Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 28,
  },
  h3Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 28,
  },
  h3Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  h4Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 24,
  },
  h4Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  h4Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 24,
  },
  h5Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 20,
  },
  h5Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    lineHeight: 25,
  },
  h5Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
  },
  h6Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 18,
  },
  h6Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  h6Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
  },
  // paragraphs
  pLGItalic: {
    fontFamily: 'Kanit-LightItalic',
    fontSize: 18,
  },
  pLGLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 18,
  },
  pLGRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  pLGMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
  },
  pMDItalic: {
    fontFamily: 'Kanit-LightItalic',
    fontSize: 16,
  },
  pMDLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 16,
  },
  pMDRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  },
  pMDMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  pSMItalic: {
    fontFamily: 'Kanit-LightItalic',
    fontSize: 14,
  },
  pSMLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 14,
    lineHeight: 16,
  },
  pSMRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
  pSMMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 14,
  },
  pXSItalic: {
    fontFamily: 'Kanit-LightItalic',
    fontSize: 12,
  },
  pXSLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 12,
  },
  pXSRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 12,
  },
  pXSMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 12,
  },
} as const;
