import { NativeModules } from 'react-native';

const neoVersion = NativeModules.NeoVersion;

export function getVersionInfo(): Promise<boolean> {
  return neoVersion.getVersionInfo();
}

export function startUpdate(): Promise<void> {
  // flexible update by default
  return neoVersion.startUpdate(0);
}

export function presentNextTime(day: number) {
  return neoVersion.presentNextTime(day);
}

export default neoVersion;
