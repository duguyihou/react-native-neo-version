# react-native-neo-version

Notify users a new version of application is available and prompt them to upgrade.

## Installation

```sh
npm install react-native-neo-version
```

## Usage

```ts
import { useNeoVersionCheck } from 'react-native-neo-version';

// ...

export default function App() {
  useNeoVersionCheck();

  return (
    <View style={styles.container}>
      <Text>React Native Neo Version</Text>
    </View>
  );
}
```

You can change the behaviour by setting `configuration`

```ts
import { useNeoVersionCheck } from 'react-native-neo-version';

// ...
useNeoVersionCheck({
  frequency: 20,
  alertType: 'force',
  title: 'alert title',
  message: 'alert meessage',
});
```

## Screenshots

### iOS
- The left picture forces the user to update the app.
- The center picture gives the user the option to update the app.
- The right picture gives the user the option to skip the current update.

<img src="https://github.com/duguyihou/react-native-neo-version/assets/9347790/787e73fc-905f-4b02-b865-adb8c01bf231" width="330" height="680" />
<img src="https://github.com/duguyihou/react-native-neo-version/assets/9347790/b23e70a9-7cd2-4200-b505-fe753844f433" width="330" height="680" />
<img src="https://github.com/duguyihou/react-native-neo-version/assets/9347790/9bf85b81-a204-418d-835e-341f77d85d2d" width="330" height="680" />

### Android

<img src="https://github.com/duguyihou/react-native-neo-version/assets/9347790/463da71e-8232-4323-8b52-f590b4c34019" width="330" height="680" />



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

