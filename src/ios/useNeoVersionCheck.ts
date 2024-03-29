import { useEffect } from 'react';
import { Alert } from 'react-native';
import type { Configuration } from '../types';
import { generateAlertButtons, parse, shouldPresentAlert } from './rules';
import { computeDaysSincePresentation, getVersionInfo } from './neoVersion';

export const useNeoVersionCheck = (configuration?: Partial<Configuration>) => {
  useEffect(() => {
    const performVersionCheck = async () => {
      const updateType = await getVersionInfo();
      if (!updateType) return;

      const daysSincePresentation = await computeDaysSincePresentation();

      const { frequency, alertType } = parse(updateType);
      const freq = configuration?.frequency ?? frequency;
      const type = configuration?.alertType ?? alertType;

      if (shouldPresentAlert(updateType, freq, daysSincePresentation)) {
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
