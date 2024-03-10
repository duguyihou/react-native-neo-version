import { NativeModules } from 'react-native';
import { UpdateTypeMap, type UpdateTypeKey } from './alertButton.android';

const neoVersion = NativeModules.NeoVersion;

export function getVersionInfo(): Promise<boolean> {
  return neoVersion.getVersionInfo();
}

// flexible update by default
export async function startUpdate(
  updateType: UpdateTypeKey = 'flexible'
): Promise<void> {
  const type = UpdateTypeMap[updateType];
  return await neoVersion.startUpdate(type);
}

export async function presentNextTime(day: number) {
  return await neoVersion.presentNextTime(day);
}

export async function skipThisVersion(): Promise<void> {
  return await neoVersion.skipThisVersion();
}

export default neoVersion;
