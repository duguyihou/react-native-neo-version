import type { AlertButton } from 'react-native';
import { nextTimeButton, skipButton, updateButton } from './alertButton';
import { type AlertType, type UpdateType, type Rules } from './types';

const criticalRules: Rules = {
  alertType: 'force',
  frequency: 0,
};
const defaultRules: Rules = {
  alertType: 'option',
  frequency: 7,
};
const persistentRules: Rules = {
  alertType: 'option',
  frequency: 1,
};
const hintingRules: Rules = {
  alertType: 'skip',
  frequency: 7,
};

export const parse = (updateType: UpdateType): Rules => {
  switch (updateType) {
    case 'major':
      return criticalRules;
    case 'minor':
      return persistentRules;
    case 'patch':
      return hintingRules;
    default:
      return defaultRules;
  }
};

export const generateAlertButtons = (
  alertType: AlertType,
  day: number
): AlertButton[] => {
  if (alertType === 'force') return [updateButton()];
  if (alertType === 'option') return [updateButton(), nextTimeButton(day)];
  return [updateButton(), skipButton(), nextTimeButton(day)];
};

export const shouldPresentAlert = (
  updateType: UpdateType,
  freq: number,
  interval: number | undefined
) => {
  // interval === 0 means the first presentation
  // freq < (interval ?? 0) means the rest presentation
  return updateType && (freq < (interval ?? 0) || interval === 0);
};
