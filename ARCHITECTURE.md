# Architecture Documentation

This document explains the technical architecture and design decisions for the Alcohol Impact educational app.

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
  - Chosen for: Static export capability, SEO, performance
  - App Router for modern file-based routing
  - Static generation for PWA compatibility

### Language & Type Safety
- **TypeScript** - Strict type checking
  - Enhances code quality and maintainability
  - Catches errors at compile time
  - Improves IDE support and autocomplete

### Styling
- **Tailwind CSS** - Utility-first CSS framework
  - Mobile-first responsive design
  - Consistent design system
  - Small bundle size with purging
  - Custom color palette for branding

## Architecture Patterns

### Static Site Generation (SSG)
The app uses Next.js static export (`output: 'export'`):
- All pages pre-rendered at build time
- No server required for hosting
- Fast loading and excellent performance
- Compatible with PWA requirements
- Easy deployment to CDNs and static hosts

### Client-Side Data Management
Since this is a static app with no backend:
- **localStorage** for data persistence
- All data stays on user's device
- No API calls or database
- Privacy-first by design

### Component Structure

```
Layout Hierarchy:
├── RootLayout (layout.tsx)
│   ├── Header (navigation)
│   ├── Main Content (children)
│   └── Footer (disclaimer + links)
```

### Pages Architecture

#### Home Page (`/`)
- Hero section with value proposition
- Feature cards linking to main tools
- Educational content overview
- Important disclaimers
- Fully static, no client-side state

#### Check Page (`/check`)
- **Client component** (uses state and localStorage)
- Multi-step questionnaire form
- Form validation
- Data stored locally on submit
- Redirects to results page

#### Pause Page (`/pause`)
- **Client component** (uses state for calculator)
- Interactive calculator using Widmark formula
- Real-time calculation results
- No data persistence (session only)
- Educational content sections

#### Results Page (`/results`)
- **Client component** (reads from localStorage)
- Personalized information display
- Risk level assessment logic
- Conditional content based on concerns
- Data management (view/clear)

#### Privacy & Terms Pages
- Static server components
- Legal and informational content
- No interactivity needed

## Data Flow

```
User Input (Check Page)
    ↓
localStorage.setItem('alcoholCheckData', data)
    ↓
Navigate to Results Page
    ↓
localStorage.getItem('alcoholCheckData')
    ↓
Display Personalized Information
    ↓
User can clear data (localStorage.removeItem)
```

## State Management

### Why No State Management Library?
- Simple data flow doesn't require Redux/Zustand/etc.
- Only one piece of shared data (check results)
- localStorage sufficient for persistence
- Reduces bundle size and complexity

### Local State Usage
- React `useState` for form inputs
- React `useEffect` for data loading
- `useRouter` for navigation
- No complex state synchronization needed

## Routing Strategy

### App Router Structure
```
app/
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Home (/)
├── check/
│   └── page.tsx        # Check (/check/)
├── pause/
│   └── page.tsx        # Pause (/pause/)
├── results/
│   └── page.tsx        # Results (/results/)
├── privacy/
│   └── page.tsx        # Privacy (/privacy/)
└── terms/
    └── page.tsx        # Terms (/terms/)
```

### Trailing Slashes
Configured in `next.config.js` for Capacitor compatibility:
- All routes end with `/`
- Ensures consistent behavior in native apps
- Prevents routing issues in WebView

## Styling Architecture

### Tailwind Configuration
Custom theme extending Tailwind defaults:
- Primary color palette (blue shades)
- Custom utility classes
- Mobile-first breakpoints (default Tailwind)

### Custom CSS Classes
Defined in `globals.css`:
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Content card containers
- `.input-field` - Form input fields

### Responsive Design Strategy
Mobile-first approach:
1. Base styles for mobile (320px+)
2. `sm:` breakpoint for larger phones (640px+)
3. `md:` breakpoint for tablets (768px+)
4. `lg:` and above for desktop (1024px+)

## PWA Configuration

### Manifest (`public/manifest.json`)
- App name and description
- Display mode: `standalone` (looks like native app)
- Theme color matching brand
- Icons configuration
- Portrait orientation preferred

### Service Worker
Not implemented yet (optional future enhancement):
- Could add offline caching
- Background sync capabilities
- Push notifications (if needed)

### Why Static Export?
- PWA-compatible without server
- Can be hosted anywhere (CDN, GitHub Pages, etc.)
- Fast loading (pre-rendered HTML)
- Works offline with service worker (if added)

## Capacitor Compatibility

### Configuration Choices
- `output: 'export'` - Static files for WebView
- `images: { unoptimized: true }` - No server-side image optimization
- `trailingSlash: true` - Consistent URLs in native apps
- HTTPS scheme for iOS and Android

### Why Capacitor-Ready?
- Can convert to native apps without code changes
- Same codebase for web and mobile
- Access to native APIs if needed later
- Better app store presence

## Security & Privacy

### Privacy-First Design
- No analytics or tracking
- No external API calls
- No cookies (except essential session)
- No third-party scripts
- All data stored locally

### Security Considerations
- No sensitive data transmitted
- No authentication required
- XSS protection via React (JSX escaping)
- No user-generated content (no XSS vectors)
- HTTPS-only in production (enforced by PWA requirements)

## Performance Optimizations

### Build Optimizations
- Static generation (fast initial load)
- Tree shaking (removes unused code)
- Code splitting (loads only needed JS)
- Tailwind purge (removes unused CSS)
- Image optimization disabled (not needed for simple app)

### Runtime Performance
- Minimal JavaScript bundle
- No heavy dependencies
- localStorage is synchronous but fast
- No network requests after initial load

### Lighthouse Scores (Expected)
- Performance: 95-100
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 90-100
- PWA: Should pass all checks

## Accessibility

### WCAG Compliance Targets
- Semantic HTML (headings, lists, navigation)
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Focus indicators on interactive elements
- Mobile touch targets (44x44px minimum)

### Form Accessibility
- Labels associated with inputs
- Required field indicators
- Error messages (if validation added)
- Logical tab order

## Browser Support

### Target Browsers
- Chrome/Edge (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Android (last 2 versions)

### Progressive Enhancement
- Core functionality works without JS
- Enhanced with client-side features
- Graceful degradation for older browsers

## Future Enhancements (Ideas)

### Potential Features
1. **Service Worker**
   - Offline functionality
   - Cache educational content
   - Update notifications

2. **Data Export**
   - Download personal data as JSON/CSV
   - Share results (privacy-conscious)

3. **Tracking Over Time**
   - Store historical check results
   - Visualize trends
   - Weekly/monthly summaries

4. **Localization**
   - Multi-language support
   - Region-specific guidelines
   - Unit conversions (metric/imperial)

5. **Advanced Calculator**
   - More factors (food, time, etc.)
   - Better accuracy models
   - Blood alcohol content estimates

6. **Resources Directory**
   - Support group finder
   - Healthcare provider locator
   - Educational articles library

### Scalability Considerations
If the app grows:
- Could add CMS for content management
- API for dynamic content updates
- Database for aggregate anonymous statistics
- User accounts (optional, privacy-preserving)

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- Functional components only
- Hooks for state management
- Clear component boundaries
- Props typed with interfaces/types

### File Naming
- Components: PascalCase (Header.tsx)
- Pages: lowercase (page.tsx)
- Utilities: camelCase
- Types: PascalCase with Type/Interface suffix

### Component Design Principles
1. **Single Responsibility**: Each component does one thing well
2. **Composition**: Build complex UIs from simple components
3. **Reusability**: Extract common patterns
4. **Accessibility**: Consider a11y from the start
5. **Mobile-First**: Design for small screens first

## Testing Strategy (Not Implemented)

### Recommended Testing Approach
1. **Unit Tests**: Jest + React Testing Library
   - Test utility functions
   - Test component rendering
   - Test user interactions

2. **E2E Tests**: Playwright or Cypress
   - Test complete user flows
   - Test across devices
   - Test PWA installation

3. **Manual Testing**
   - Test on real devices
   - Test in different browsers
   - Test offline functionality
   - Test accessibility with screen readers

## Deployment

### Static Hosting Options
- **Vercel**: Optimized for Next.js
- **Netlify**: Simple deploy from Git
- **GitHub Pages**: Free for public repos
- **Cloudflare Pages**: Fast CDN
- **AWS S3 + CloudFront**: Enterprise option

### CI/CD Recommendations
```yaml
# Example GitHub Actions workflow
on: [push]
jobs:
  build:
    - npm install
    - npm run lint
    - npm run build
    - npm test (if tests added)
    - Deploy to hosting
```

## Monitoring & Analytics (Future)

If adding analytics (with user consent):
- Privacy-friendly options: Plausible, Fathom
- Self-hosted: Umami, Matomo
- Avoid: Google Analytics (privacy concerns)
- Always: Get user consent, provide opt-out

## Documentation Maintenance

Keep these files updated:
- README.md - Overview and getting started
- SETUP.md - Quick setup instructions
- ARCHITECTURE.md (this file) - Technical decisions
- CAPACITOR.md - Native app guide
- ICONS.md - Asset creation guide

---

**Last Updated**: January 2026
**Maintainer**: [Add your name/team]
**Questions**: [Add contact method]
