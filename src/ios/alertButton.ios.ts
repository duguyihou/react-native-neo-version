import type { AlertButton } from 'react-native';
import {
  launchAppStore,
  presentNextTime,
  skipThisVersion,
} from './neoVersion.ios';

export const updateButton = (): AlertButton => {
  return {
    text: 'Update',
    onPress: () => {
      launchAppStore();
    },
    style: 'default',
  };
};

export const skipButton = (): AlertButton => {
  return {
    text: 'Skip this version',
    onPress: () => {
      skipThisVersion();
    },
    style: 'default',
  };
};

export const nextTimeButton = (day: number): AlertButton => {
  return {
    text: 'Next Time',
    onPress: () => {
      presentNextTime(day);
    },
    style: 'default',
  };
};
