import type { AlertButton } from 'react-native';
import { startUpdate, presentNextTime, skipThisVersion } from './neoVersion';

export const UpdateTypeMap = {
  flexible: 0,
  immediate: 1,
} as const;

export type UpdateTypeKey = keyof typeof UpdateTypeMap;
export type UpdateTypeVal = (typeof UpdateTypeMap)[UpdateTypeKey];

export const updateButton = (updateType: UpdateTypeKey): AlertButton => {
  return {
    text: 'Update',
    onPress: () => {
      startUpdate(updateType);
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
