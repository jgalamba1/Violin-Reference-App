import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.violin.reference',
  appName: 'Violin Reference',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    backgroundColor: '#faf8f4',
    versionName: '1.0.0',
    versionCode: 1
  }
};
export default config;
