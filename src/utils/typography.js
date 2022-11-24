import {getHeight, getWidth} from './common';

const isRTL = false;

export const arabicFontBold = 'GESSTwoBold-Bold';
export const arabicFontLight = 'GESSUniqueLight-Light';
export const arabicEnglishFontLight = 'Helvetica-Light';
export const arabicEnglishFontBold = 'Helvetica-Bold';
export const arabicFontTextBold = 'GESSTextBold-Bold';
export const englishFontBold = 'PublicoHeadline-Bold';
export const englishFontItalic = 'PublicoHeadline-Italic';
export const englishFontLight = 'PublicoHeadline-Light';
export const englishFontLightItalic = 'PublicoHeadline-LightItalic';
export const englishFontMedium = 'PublicoHeadline-Medium';
export const englishFontRoman = 'PublicoHeadline-Roman';
export const englishFontThinBold = 'PublicSans-Bold';
export const englishFontThinRegular = 'PublicSans-Regular';
export const englishFontThinMedium = 'PublicSans-Medium';

const fonts = {
  [arabicFontBold]: {
    styles: {},
  },
  [arabicFontLight]: {
    styles: {},
  },
  [arabicEnglishFontLight]: {
    styles: {},
  },
  [arabicEnglishFontBold]: {
    styles: {},
  },
  [arabicFontTextBold]: {
    styles: {},
  },
  [englishFontBold]: {
    styles: {},
  },
  [englishFontItalic]: {
    styles: {},
  },
  [englishFontLight]: {
    styles: {},
  },
  [englishFontLightItalic]: {
    styles: {},
  },
  [englishFontMedium]: {
    styles: {},
  },
  [englishFontRoman]: {
    styles: {},
  },
  [englishFontThinBold]: {
    styles: {},
  },
  [englishFontThinRegular]: {
    styles: {},
  },
  [englishFontThinMedium]: {
    styles: {},
  },
};

// Local functions
const checkOptions = ({family, style}) => {
  const fontFamily = fonts[family];
  if (!fontFamily) {
    // eslint-disable-next-line no-console
    console.warn(`There is no ${family} font family.`);
    return;
  }

  if (style && !fontFamily.styles[style]) {
    // eslint-disable-next-line no-console
    console.warn(`There is no ${style} font style.`);
  }
};

export const getFontStyleObject = (params = {}) => {
  const {family = arabicFontBold, style} = params;
  // eslint-disable-next-line no-undef
  if (true) {
    // if (__DEV__) {
    checkOptions({family, style});
  }
  const {styles} = fonts[family];

  return {
    fontFamily: family,
    fontStyle: styles[style] || 'normal',
  };
};

const Typography = {
  actionButton: {
    fontSize: 16,
    ...getFontStyleObject({
      family: isRTL ? arabicFontTextBold : englishFontBold,
    }),
  },
  error: {
    fontSize: 12,
    ...getFontStyleObject({
      family: isRTL ? arabicFontLight : englishFontItalic,
    }),
  },
  otpVerificationEmail: {
    fontSize: 17,
    ...getFontStyleObject({
      family: isRTL ? arabicFontBold : arabicEnglishFontBold,
    }),
  },
  actionButtonText: {
    fontSize: getWidth(17),
    ...getFontStyleObject({
      family: arabicFontBold,
    }),
  },
  caption: {
    fontSize: 8,
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  captionBold: {
    fontSize: 11,
    ...getFontStyleObject({
      family: arabicFontBold,
    }),
  },
  cardTitle: {
    fontSize: 18,
    ...getFontStyleObject({
      family: arabicFontBold,
    }),
  },
  title: {
    fontSize: 35,
    ...getFontStyleObject({
      family: arabicFontTextBold,
    }),
  },
  settingsDescription: {
    fontSize: isRTL ? getWidth(15) : getWidth(17),
    ...getFontStyleObject({
      family: isRTL ? arabicFontLight : englishFontThinRegular,
    }),
  },
  scrollViewContentContainer: {
    paddingTop: getWidth(10),
    paddingBottom: getWidth(28),
  },
  settingsHeaderTitle: {
    fontSize: getWidth(20),
    lineHeight: getWidth(28),
    ...getFontStyleObject({
      family: isRTL ? arabicFontTextBold : englishFontBold,
    }),
  },
  modalTitle: {
    fontSize: getHeight(18),
    ...getFontStyleObject({
      family: arabicFontTextBold,
    }),
  },
  labelFocused: {
    fontSize: getWidth(13),
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  input: {
    fontSize: getWidth(15),
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  body: {
    fontSize: getWidth(15),
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  primaryButtonText: {
    fontSize: getWidth(17),
    ...getFontStyleObject({
      family: arabicFontBold,
    }),
  },
  description: {
    fontSize: 15,
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  categoryTitle: {
    fontSize: 15,
    ...getFontStyleObject({
      family: arabicFontLight,
    }),
  },
  subCategoryTitle: {
    fontSize: getWidth(30),
    ...getFontStyleObject({
      family: arabicFontBold,
    }),
  },
  headerTitle: {
    fontSize: 20,
    ...getFontStyleObject({
      family: arabicFontTextBold,
    }),
  },

  hints: {},
};

export const Typographies = Object.keys(Typography);

export default Typography;
