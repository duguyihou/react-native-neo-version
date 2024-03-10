import type { AlertButton } from 'react-native';
import {
  nextTimeButton,
  skipButton,
  updateButton,
} from './alertButton.android';
import type { AlertType } from '../types';

export const generateAlertButtons = (
  alertType: AlertType,
  day: number
): AlertButton[] => {
  if (alertType === 'force') return [updateButton('immediate')];
  if (alertType === 'option')
    return [updateButton('flexible'), nextTimeButton(day)];
  return [updateButton('flexible'), skipButton(), nextTimeButton(day)];
};
