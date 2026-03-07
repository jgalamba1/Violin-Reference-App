import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.violin.reference',
  appName: 'Violin Reference',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    backgroundColor: '#faf8f4',
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#1a1510',
      style: 'LIGHT',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
