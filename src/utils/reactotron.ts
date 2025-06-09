import Reactotron from 'reactotron-react-native';

Reactotron.configure({ name: 'App' })
  .useReactNative({
    devTools: true,
    editor: false,
    errors: true,
    log: true,
    networking: { ignoreUrls: /symbolicate|generate_204/u },
    overlay: false,
  })
  .connect();
