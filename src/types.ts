type UpdateInfo = {
  country: string;
  currentVersion: string;
  isUpdateAvailable: string;
  latestVersion: string;
  releaseNotes: string;
};
export type NeoVersionApi = {
  getUpdateInfo: () => Promise<UpdateInfo | undefined>;
};
