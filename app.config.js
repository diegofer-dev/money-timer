export default ({ config }) => ({
    ...config,
    name: getAppName(),
    ios: {
        ...config.ios,
        bundleIdentifier: getUniqueIdentifier()
    },
    android: {
        ...config.android,
        package: getUniqueIdentifier()
    }
  });

  const IS_DEV = process.env.APP_VARIANT === 'development';
  const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

  const getUniqueIdentifier = () => {
    if (IS_DEV) {
      return 'com.diegodevfernandez.moneytimer.dev';
    }
  
    if (IS_PREVIEW) {
      return 'com.diegodevfernandez.moneytimer.preview';
    }
  
    return 'com.diegodevfernandez.moneytimer';
  };
  
  const getAppName = () => {
    if (IS_DEV) {
      return 'MoneyTimer (Dev)';
    }
  
    if (IS_PREVIEW) {
      return 'MoneyTimer (Preview)';
    }
  
    return 'MoneyTimer';
  };
  
  
  