import { NativeModules } from 'react-native';

const neoVersion = NativeModules.NeoVersion;

type VersionInfo = {
  isUpdateAvailable: boolean;
  stalenessDays: number;
};

export function getVersionInfo(): Promise<Partial<VersionInfo>> {
  return neoVersion.getVersionInfo();
}

export function startUpdate(): Promise<void> {
  // flexible update by default
  return neoVersion.startUpdate(0);
}

export default neoVersion;
