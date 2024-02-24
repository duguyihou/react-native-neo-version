import { NativeModules } from 'react-native';
import type { NeoVersionApi } from './types';

const neoVersion = NativeModules.NeoVersion;

export const getVersionInfo = neoVersion.getVersionInfo;
export const computeDaysSincePresentation =
  neoVersion.computeDaysSincePresentation;
export const skipThisVersion = neoVersion.skipThisVersion;
export const launchAppStore = neoVersion.launchAppStore;
export const presentNextTime = neoVersion.presentNextTime;

export default neoVersion as NeoVersionApi;
