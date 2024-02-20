import { NativeModules, Platform } from 'react-native';
import type { NeoVersionApi } from './types';

const LINKING_ERROR =
  `The package 'react-native-neo-version' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NeoVersion = NativeModules.NeoVersion
  ? NativeModules.NeoVersion
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default NeoVersion as NeoVersionApi;
