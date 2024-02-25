import { useEffect } from 'react';
import { getVersionInfo, startUpdate } from './neoVersion.android';
import { Alert } from 'react-native';
import type { Configuration } from '../types';

export const useNeoVersionCheck = (configuration?: Partial<Configuration>) => {
  useEffect(() => {
    const performVersionCheck = async () => {
      const info = await getVersionInfo();
      if (info.isUpdateAvailable) {
        Alert.alert(
          configuration?.title ?? 'Update Available',
          configuration?.message ??
            'Please update the app to have the best experience',
          [
            {
              text: 'Update',
              onPress: () => {
                startUpdate();
              },
              style: 'default',
            },
            {
              text: 'Next time',
              style: 'default',
            },
          ]
        );
      }
    };
    performVersionCheck();
  }, [configuration?.message, configuration?.title]);
};
