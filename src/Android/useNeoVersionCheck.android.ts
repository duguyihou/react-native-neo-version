import { useEffect } from 'react';
import {
  getVersionInfo,
  presentNextTime,
  skipThisVersion,
  startUpdate,
} from './neoVersion.android';
import { Alert } from 'react-native';
import type { Configuration } from '../types';

export const useNeoVersionCheck = (configuration?: Partial<Configuration>) => {
  useEffect(() => {
    const performVersionCheck = async () => {
      const isUpdateAvailable = await getVersionInfo();
      if (isUpdateAvailable) {
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
              text: 'Skip this version',
              onPress: () => {
                skipThisVersion();
              },
              style: 'default',
            },
            {
              text: 'Next time',
              onPress: () => {
                presentNextTime(configuration?.frequency ?? 7);
              },
              style: 'default',
            },
          ]
        );
      }
    };
    performVersionCheck();
  }, [configuration?.frequency, configuration?.message, configuration?.title]);
};
