# App Icons Guide

This app needs icons for the PWA and potential native app versions. Icons have been configured in the manifest but need to be created.

## Required Icons

### PWA Icons (Web)
Located in `public/`:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

### Favicon (Optional)
- `favicon.ico` - 32x32 or 16x16 pixels

## Design Guidelines

### Visual Design
- Use a simple, recognizable symbol related to health/education
- Avoid using alcohol imagery (bottles, glasses) to maintain educational tone
- Consider: abstract droplet, shield, heart, or information symbol
- Use the app's primary blue color (#0284c7) as the main color
- Ensure good contrast with white background

### Technical Requirements
- Save as PNG with transparent background
- Use square canvas (1:1 aspect ratio)
- Leave small padding around edges (safe area)
- Test visibility at small sizes

## Creating Icons

### Option 1: Design Tools
Use design software like:
- Figma (free, web-based)
- Adobe Illustrator
- Sketch
- Canva (has icon templates)

### Option 2: Icon Generators
Use online tools:
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive icon generation
- [Favicon.io](https://favicon.io/) - Simple favicon creation
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) - CLI tool

### Option 3: PWA Asset Generator (Recommended)
Install and use the PWA Asset Generator:

```bash
npm install -g pwa-asset-generator
```

Create a source icon (1024x1024 or larger), then run:

```bash
pwa-asset-generator source-icon.png public/ \
  --icon-only \
  --favicon \
  --type png \
  --padding "10%"
```

## Sample Simple Icon (Text-Based)

If you need a quick placeholder, create a simple icon with text:

1. Create a 512x512 canvas
2. Use blue background (#0284c7)
3. Add white text: "AI" (for Alcohol Impact)
4. Use a clean sans-serif font
5. Center the text
6. Export as PNG

## Icon Checklist

- [ ] Create 192x192 icon (icon-192.png)
- [ ] Create 512x512 icon (icon-512.png)
- [ ] Create favicon.ico (optional)
- [ ] Test visibility at small sizes
- [ ] Verify manifest.json references correct paths
- [ ] Test installation as PWA
- [ ] (If using Capacitor) Add iOS app icons to Xcode
- [ ] (If using Capacitor) Add Android app icons to Android Studio

## For Native Apps (Capacitor)

### iOS Icons
Required in multiple sizes in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

Xcode can auto-generate most sizes from a 1024x1024 source.

### Android Icons
Required in `android/app/src/main/res/`:
- mipmap-mdpi: 48x48
- mipmap-hdpi: 72x72
- mipmap-xhdpi: 96x96
- mipmap-xxhdpi: 144x144
- mipmap-xxxhdpi: 192x192

## App Store Assets

When publishing to app stores, you'll also need:
- iOS App Store: 1024x1024 icon (no transparency)
- Google Play: 512x512 icon (PNG, 32-bit with alpha)
- Screenshots for various device sizes

## Testing

After creating icons:

1. Test PWA installation:
   - Build the app: `npm run build`
   - Serve locally: `npx serve out`
   - Open in mobile browser
   - Try "Add to Home Screen"
   - Verify icon appears correctly

2. Check different contexts:
   - Home screen
   - App switcher
   - Settings
   - Notifications (if applicable)

## Resources

- [PWA Icon Guidelines](https://web.dev/add-manifest/#icons)
- [iOS Icon Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Android Icon Guidelines](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)
