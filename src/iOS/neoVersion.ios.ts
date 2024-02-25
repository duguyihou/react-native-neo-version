import { NativeModules } from 'react-native';
import type { UpdateType } from '../types';

const neoVersion = NativeModules.NeoVersion;

export function getVersionInfo(): Promise<UpdateType | undefined> {
  return neoVersion.getVersionInfo();
}
export function computeDaysSincePresentation(): Promise<number | undefined> {
  return neoVersion.computeDaysSincePresentation();
}
export function skipThisVersion(): void {
  return neoVersion.skipThisVersion();
}
export function launchAppStore(): void {
  return neoVersion.launchAppStore();
}
export function presentNextTime(day: number): void {
  return neoVersion.presentNextTime(day);
}

export default neoVersion;
