import { NativeModules } from 'react-native';

const neoVersion = NativeModules.NeoVersion;

export function getVersionInfo(): Promise<boolean> {
  return neoVersion.getVersionInfo();
}

export async function startUpdate(): Promise<void> {
  // flexible update by default
  return await neoVersion.startUpdate(0);
}

export async function presentNextTime(day: number) {
  return await neoVersion.presentNextTime(day);
}

export async function skipThisVersion(): Promise<void> {
  return await neoVersion.skipThisVersion();
}

export default neoVersion;
