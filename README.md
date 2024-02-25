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

You can change the behaviour by configuration

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

### Android

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

