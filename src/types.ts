export const FrequencyMap = {
  immediately: 0,
  daily: 1,
  weekly: 7,
} as const;

export type FrequencyKey = keyof typeof FrequencyMap;
export type FrequencyVal = (typeof FrequencyMap)[FrequencyKey];
export type AlertType = 'force' | 'option' | 'skip';
export type UpdateType = 'major' | 'minor' | 'patch' | 'unknown';

export type Rules = {
  alertType: AlertType;
  frequency: FrequencyVal | number;
};

export type Configuration = {
  title: string;
  message: string;
  alertType: AlertType;
  frequency: number;
};
