# Quick Setup Guide

Get the Alcohol Impact app running in minutes.

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Create App Icons
The app needs PWA icons. See [ICONS.md](ICONS.md) for detailed instructions.

Quick option:
- Visit [RealFaviconGenerator](https://realfavicongenerator.net/)
- Upload a 512x512 icon design
- Generate and download icons
- Replace files in `public/` directory

### 2. Customize Branding (Optional)

**Colors** - Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Update these color values
  },
}
```

**App Name** - Update in these files:
- `package.json` - "name" field
- `src/app/layout.tsx` - metadata title
- `public/manifest.json` - name and short_name
- `README.md` - title and descriptions

**Content** - All educational content is in:
- `src/app/page.tsx` - Home page
- `src/app/check/page.tsx` - Questionnaire
- `src/app/pause/page.tsx` - Calculator
- `src/app/results/page.tsx` - Results information
- `src/app/privacy/page.tsx` - Privacy policy
- `src/app/terms/page.tsx` - Terms of use

### 3. Test the App

**Test all features:**
- [ ] Navigate through all pages
- [ ] Complete the impact check questionnaire
- [ ] Use the pause calculator
- [ ] View results page
- [ ] Verify data persistence (refresh page, data should remain)
- [ ] Test "Clear Data" functionality
- [ ] Check mobile responsiveness (resize browser)

**Test on mobile device:**
- [ ] Open in mobile browser
- [ ] Test "Add to Home Screen"
- [ ] Launch installed PWA
- [ ] Test offline functionality

## Building for Production

### Web (PWA)

1. **Build static export:**
   ```bash
   npm run build
   ```

2. **Test production build locally:**
   ```bash
   npx serve out
   ```

3. **Deploy to hosting:**
   Upload the `out/` directory to:
   - Vercel: `vercel deploy`
   - Netlify: Drag `out/` folder to dashboard
   - GitHub Pages: Configure to serve from `out/`
   - Any static hosting service

### Native Apps (iOS/Android)

Follow the comprehensive guide in [CAPACITOR.md](CAPACITOR.md).

Quick start:
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android

# Initialize
npx cap init

# Build web app
npm run build

# Add platforms
npx cap add ios
npx cap add android

# Sync and open
npx cap sync
npx cap open ios
npx cap open android
```

## Development Workflow

1. **Make changes** to files in `src/`
2. **View changes** in browser (auto-refreshes with dev server)
3. **Test thoroughly** before building
4. **Build** when ready: `npm run build`
5. **Deploy** the `out/` directory

## Project Structure

```
alcohol-impact-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── check/        # Questionnaire page
│   │   ├── pause/        # Calculator page
│   │   ├── results/      # Results page
│   │   ├── privacy/      # Privacy policy
│   │   ├── terms/        # Terms of use
│   │   ├── layout.tsx    # Root layout (header/footer)
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable components
│       ├── Header.tsx    # Navigation header
│       └── Footer.tsx    # Footer with disclaimer
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   └── *.png            # App icons
├── next.config.js        # Next.js config (static export enabled)
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates `out/` directory)
- `npm run start` - Start production server (requires build first)
- `npm run lint` - Run ESLint checks

## Customization Tips

### Adding a New Page

1. Create directory in `src/app/`, e.g., `src/app/about/`
2. Add `page.tsx` in that directory
3. Page will be automatically available at `/about/`

### Modifying Layout

Edit `src/app/layout.tsx` to change:
- Header/footer structure
- Meta tags
- Global layout wrapper

### Styling Changes

- **Global styles**: Edit `src/app/globals.css`
- **Component styles**: Use Tailwind classes in components
- **Theme colors**: Edit `tailwind.config.ts`
- **Custom utilities**: Add to `globals.css` in `@layer components`

### Data Storage

The app uses `localStorage` for data persistence:
- Check data: `localStorage.getItem('alcoholCheckData')`
- Clear data: `localStorage.removeItem('alcoholCheckData')`
- Add new data keys as needed in page components

## Troubleshooting

### Development Server Won't Start
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

### TypeScript Errors
```bash
# Check for errors
npm run lint
# May need to install types
npm install -D @types/node @types/react @types/react-dom
```

### Styling Not Applying
- Check Tailwind classes are correct
- Verify file is in `content` array in `tailwind.config.ts`
- Clear browser cache
- Rebuild: `npm run build`

## Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server
3. ⬜ Create app icons (see ICONS.md)
4. ⬜ Customize content and branding
5. ⬜ Test all features
6. ⬜ Build for production
7. ⬜ Deploy or convert to native app

## Getting Help

- Check documentation files (README.md, CAPACITOR.md, ICONS.md)
- Review Next.js docs: https://nextjs.org/docs
- Review Tailwind docs: https://tailwindcss.com/docs
- Review Capacitor docs: https://capacitorjs.com/docs

## Compliance & Content

Before deployment:

- [ ] Review all educational content for accuracy
- [ ] Verify disclaimers are prominent and clear
- [ ] Update privacy policy if adding analytics
- [ ] Update terms of use if changing functionality
- [ ] Ensure content maintains neutral, educational tone
- [ ] Consider legal review for health-related content
- [ ] Test on multiple devices and browsers

## License & Legal

Remember to:
- Add appropriate license to README.md
- Ensure compliance with health information regulations
- Include proper medical disclaimers (already in app)
- Consider consulting legal counsel for health apps

---

**You're all set!** Run `npm install && npm run dev` to get started.
