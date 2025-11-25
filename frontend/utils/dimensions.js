import { Dimensions,StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 430;
const guidelineBaseHeight = 932;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;
const isTablet = width >= 768;

const safeHeight = height - (StatusBar.currentHeight || 0);

export {
    width,
    height,
    scale,
    verticalScale,
    moderateScale,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    safeHeight,
};