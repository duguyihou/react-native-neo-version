import type { AlertButton } from 'react-native';
import NeoVersion from '.';

export const updateButton = (): AlertButton => {
  return {
    text: 'Update',
    onPress: () => {
      NeoVersion.launchAppStore();
    },
    style: 'default',
  };
};

export const skipButton = (): AlertButton => {
  return {
    text: 'Skip this version',
    onPress: () => {
      NeoVersion.skipThisVersion();
    },
    style: 'default',
  };
};

export const nextTimeButton = (day: number): AlertButton => {
  return {
    text: 'Next Time',
    onPress: () => {
      NeoVersion.presentNextTime(day);
    },
    style: 'default',
  };
};
