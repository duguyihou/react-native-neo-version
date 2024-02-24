import { useEffect } from 'react';
import { Alert } from 'react-native';
import NeoVersion from '.';
import type { AlertType } from './types';
import { generateAlertButtons, parse, shouldPresentAlert } from './rules';

type Configuration = {
  title: string;
  message: string;
  alertType: AlertType;
  frequency: number;
  countryCode: string;
};

const useNeoVersionCheck = (configuration?: Partial<Configuration>) => {
  useEffect(() => {
    const func = async () => {
      const updateType = await NeoVersion.getVersionInfo(
        configuration?.countryCode ?? 'AU'
      );
      if (!updateType) return;

      const daysSincePresentation =
        await NeoVersion.computeDaysSincePresentation();

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
    func();
  }, [
    configuration?.alertType,
    configuration?.countryCode,
    configuration?.frequency,
    configuration?.message,
    configuration?.title,
  ]);
};

export default useNeoVersionCheck;
