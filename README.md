# Alcohol Impact - Educational Resource App

An educational Progressive Web App (PWA) built with Next.js, TypeScript, and Tailwind CSS that provides evidence-based information about alcohol consumption and its effects on health.

## Features

- **Impact Check**: Interactive questionnaire providing personalized educational information based on drinking patterns
- **Pause Calculator**: Estimates alcohol metabolism time based on standard guidelines
- **Privacy-First**: All data stored locally on the user's device, no external data collection
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **PWA Ready**: Can be installed on mobile devices and used offline
- **Capacitor Ready**: Configured for easy conversion to native iOS/Android apps

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: Progressive Web App capabilities
- **Mobile**: Capacitor-ready for native deployment

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alcohol-impact-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This creates an optimized static export in the `out` directory.

## Capacitor Setup (Optional)

To build native iOS/Android apps:

1. Install Capacitor:
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

2. Initialize Capacitor:
```bash
npx cap init "Alcohol Impact" "com.alcoholimpact.app" --web-dir=out
```

3. Build the web app:
```bash
npm run build
```

4. Add platforms:
```bash
npx cap add ios
npx cap add android
```

5. Open in native IDEs:
```bash
npx cap open ios
npx cap open android
```

## Project Structure

```
alcohol-impact-app/
├── src/
│   ├── app/
│   │   ├── check/         # Impact check questionnaire
│   │   ├── pause/         # Metabolism calculator
│   │   ├── results/       # Results and information page
│   │   ├── privacy/       # Privacy policy
│   │   ├── terms/         # Terms of use
│   │   ├── layout.tsx     # Root layout with header/footer
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   └── components/
│       ├── Header.tsx     # Navigation header
│       └── Footer.tsx     # Footer with disclaimer
├── public/
│   ├── manifest.json      # PWA manifest
│   └── (icons)            # PWA icons
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Key Routes

- `/` - Home page with overview and features
- `/check/` - Interactive alcohol impact questionnaire
- `/pause/` - Metabolism time calculator
- `/results/` - Personalized educational information
- `/privacy/` - Privacy policy
- `/terms/` - Terms of use

## Privacy & Data

This application prioritizes user privacy:

- **No external data collection**: All data stays on the user's device
- **Local storage only**: Uses browser localStorage for data persistence
- **No analytics**: No tracking or analytics services
- **No third-party scripts**: No external dependencies that collect data
- **User control**: Users can clear their data at any time

## Educational Disclaimer

This application provides educational information only and is not medical advice. It should not replace professional healthcare consultation. The app includes prominent disclaimers throughout the user interface.

## Mobile-First Design

The app is designed with a mobile-first approach:

- Responsive layouts that adapt to all screen sizes
- Touch-friendly interface elements
- Optimized for portrait orientation on phones
- Fast loading times
- Offline capability (PWA)

## Contributing

This is an educational project. If you'd like to contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Support Resources

If you or someone you know is struggling with alcohol use:

- SAMHSA's National Helpline: 1-800-662-4357 (24/7, free, confidential)
- National Institute on Alcohol Abuse and Alcoholism: https://www.niaaa.nih.gov/
- Alcoholics Anonymous: https://www.aa.org/

## Acknowledgments

Educational content based on research from:
- National Institute on Alcohol Abuse and Alcoholism (NIAAA)
- Centers for Disease Control and Prevention (CDC)
- World Health Organization (WHO)
- Peer-reviewed medical literature
