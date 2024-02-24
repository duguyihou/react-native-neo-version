const AlertTypeMap = {
  force: 'force',
  option: 'option',
  skip: 'skip',
} as const;

export const FrequencyMap = {
  immediately: 0,
  daily: 1,
  weekly: 7,
} as const;

export const UpdateTypeMap = {
  major: 'major',
  minor: 'minor',
  patch: 'patch',
} as const;

export type AlertType = keyof typeof AlertTypeMap;
export type FrequencyKey = keyof typeof FrequencyMap;
export type FrequencyVal = (typeof FrequencyMap)[FrequencyKey];
export type UpdateType = keyof typeof UpdateTypeMap;
export type Rules = {
  alertType: AlertType;
  frequency: FrequencyVal | number;
};

export type NeoVersionApi = {
  getVersionInfo: () => Promise<UpdateType | undefined>;
  computeDaysSincePresentation: () => Promise<number | undefined>;
  skipThisVersion: () => void;
  launchAppStore: () => void;
  presentNextTime: (day: number) => void;
};
