import { useEffect } from 'react';
import { getVersionInfo } from './neoVersion.android';
import { Alert } from 'react-native';
import type { Configuration } from '../types';
import { generateAlertButtons } from './rules.android';

export const useNeoVersionCheck = (configuration?: Partial<Configuration>) => {
  useEffect(() => {
    const performVersionCheck = async () => {
      const isUpdateAvailable = await getVersionInfo();
      const freq = configuration?.frequency ?? 7;
      const type = configuration?.alertType ?? 'skip';
      if (isUpdateAvailable) {
        Alert.alert(
          configuration?.title ?? 'Update Available',
          configuration?.message ??
            'Please update the app to have the best experience',
          generateAlertButtons(type, freq)
        );
      }
    };
    performVersionCheck();
  }, [
    configuration?.alertType,
    configuration?.frequency,
    configuration?.message,
    configuration?.title,
  ]);
};
