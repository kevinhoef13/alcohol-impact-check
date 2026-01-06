# Capacitor Integration Guide

This guide explains how to convert the Alcohol Impact web app into native iOS and Android applications using Capacitor.

## Prerequisites

- Completed Next.js web app (already configured in this project)
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio installed
- Node.js and npm installed

## Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
```

## Step 2: Initialize Capacitor

```bash
npx cap init
```

When prompted:
- App name: `Alcohol Impact`
- App package ID: `com.alcoholimpact.app` (or your preferred bundle ID)
- Web asset directory: `out`

This creates a `capacitor.config.ts` file.

## Step 3: Install Platform-Specific Packages

### For iOS:
```bash
npm install @capacitor/ios
npx cap add ios
```

### For Android:
```bash
npm install @capacitor/android
npx cap add android
```

## Step 4: Build the Web App

Before syncing to native platforms, build the static export:

```bash
npm run build
```

This creates optimized files in the `out` directory.

## Step 5: Sync Web Code to Native Projects

After each build, sync the changes:

```bash
npx cap sync
```

This copies the web app into the native iOS and Android projects.

## Step 6: Open in Native IDEs

### For iOS (requires macOS):
```bash
npx cap open ios
```

This opens Xcode. From there:
1. Select a development team in the Signing & Capabilities tab
2. Choose a simulator or connected device
3. Click the Run button

### For Android:
```bash
npx cap open android
```

This opens Android Studio. From there:
1. Wait for Gradle sync to complete
2. Select an emulator or connected device
3. Click the Run button

## Configuration

The `capacitor.config.ts` file is already optimized for this app:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alcoholimpact.app',
  appName: 'Alcohol Impact',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
```

## Adding Native Features (Optional)

If you want to add native capabilities:

### Status Bar Styling:
```bash
npm install @capacitor/status-bar
```

### Splash Screen:
```bash
npm install @capacitor/splash-screen
```

### App Icon & Splash Screen Assets

#### iOS:
1. Create app icons: 1024x1024px PNG
2. Use Xcode's asset catalog to add icons
3. Place in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

#### Android:
1. Create app icons in various sizes
2. Place in `android/app/src/main/res/` subdirectories:
   - mipmap-mdpi (48x48)
   - mipmap-hdpi (72x72)
   - mipmap-xhdpi (96x96)
   - mipmap-xxhdpi (144x144)
   - mipmap-xxxhdpi (192x192)

## Development Workflow

1. Make changes to the web app in `src/`
2. Test in browser: `npm run dev`
3. Build for production: `npm run build`
4. Sync to native: `npx cap sync`
5. Test on native platforms

## Live Reload (Development)

To enable live reload during development:

1. Start the dev server:
```bash
npm run dev
```

2. Update `capacitor.config.ts` temporarily:
```typescript
server: {
  url: 'http://localhost:3000',
  cleartext: true
}
```

3. Sync and run:
```bash
npx cap sync
npx cap run ios
# or
npx cap run android
```

Remember to remove the server URL before production builds!

## Publishing

### iOS App Store:
1. Configure app in App Store Connect
2. Archive in Xcode
3. Upload and submit for review
4. Ensure compliance with App Store guidelines

### Google Play Store:
1. Create app in Google Play Console
2. Generate signed APK/AAB in Android Studio
3. Upload and submit for review
4. Ensure compliance with Play Store policies

## Important Notes

- The app is configured with `output: 'export'` in `next.config.js` for static export
- All routes use trailing slashes for compatibility
- Images are unoptimized for static export
- Local storage works seamlessly in native apps
- No server-side features are available (API routes, etc.)

## Updating the App

When you need to release updates:

1. Make changes to source code
2. Update version in `package.json`
3. Build: `npm run build`
4. Sync: `npx cap sync`
5. Test on both platforms
6. Build release versions in Xcode/Android Studio
7. Submit updates to app stores

## Troubleshooting

### Build Errors:
- Clear the out directory: `rm -rf out .next`
- Rebuild: `npm run build`
- Re-sync: `npx cap sync`

### iOS Issues:
- Clean build folder in Xcode: Product > Clean Build Folder
- Delete derived data
- Ensure correct team signing

### Android Issues:
- Invalidate caches in Android Studio
- Clean project: Build > Clean Project
- Rebuild: Build > Rebuild Project

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Design Guidelines](https://developer.android.com/design)
