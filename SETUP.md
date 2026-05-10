# Yanvex AI Agency - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- Git (optional)

### Installation Steps

```bash
# 1. Navigate to project directory
cd yanvex

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# The app will automatically open at http://localhost:3000
```

## 📁 Complete Project Structure

```
yanvex/
├── public/                    # Static files
├── src/
│   ├── assets/               # Images, icons, videos
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx    # Navigation bar
│   │   │   └── Footer.jsx    # Footer
│   │   ├── sections/
│   │   │   ├── Hero.jsx      # Hero section
│   │   │   ├── TrustedCompanies.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── CTA.jsx
│   │   └── ui/
│   │       └── Button.jsx    # UI components
│   ├── hooks/
│   │   └── index.js          # Custom hooks
│   ├── utils/
│   │   └── index.js          # Utility functions
│   ├── constants/
│   │   └── index.js          # App constants
│   ├── animations/
│   │   └── index.js          # Framer Motion presets
│   ├── pages/                # Page components
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── vite.config.js            # Vite config
├── tailwind.config.js        # Tailwind config
├── postcss.config.js         # PostCSS config
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── .eslintrc.json            # ESLint config
├── eslint.config.js          # ESLint config (alternative)
└── README.md                 # Documentation
```

## 🎯 Key Components & Features

### 1. Navbar (`src/components/layout/Navbar.jsx`)
- **Features**: Sticky on scroll, mobile hamburger menu, smooth transitions
- **Props**: None (uses constants for navigation items)
- **Customization**: Edit `NAV_ITEMS` in `constants/index.js`

### 2. Hero Section (`src/components/sections/Hero.jsx`)
- **Features**: Full-screen, animated gradients, floating elements
- **Animations**: Fade-up, floating, stagger effects
- **Customization**: Modify text, CTA buttons, background orbs

### 3. Trusted Companies (`src/components/sections/TrustedCompanies.jsx`)
- **Features**: Infinite marquee slider with company logos
- **Animation**: Linear scrolling loop
- **Data**: `TRUSTED_COMPANIES` constant

### 4. Services (`src/components/sections/Services.jsx`)
- **Grid**: 3 columns (responsive to 2, 1 on mobile)
- **Features**: 6 service cards with hover effects
- **Data**: `SERVICES` constant

### 5. Portfolio (`src/components/sections/Portfolio.jsx`)
- **Features**: Category filtering with smooth animations
- **Layout**: 3-column grid responsive to 2, then 1
- **Data**: `PORTFOLIO_PROJECTS` constant

### 6. Testimonials (`src/components/sections/Testimonials.jsx`)
- **Features**: Carousel with auto-play, manual navigation
- **Animation**: Smooth transitions between testimonials
- **Data**: `TESTIMONIALS` constant

## 🎨 Customization Guide

### Update Company Information

Edit `src/constants/index.js`:

```javascript
// Change navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  // Add more items...
];

// Update services
export const SERVICES = [
  {
    id: 1,
    title: 'Your Service',
    description: 'Service description',
    icon: '🎯',
  },
  // Add more services...
];
```

### Modify Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  dark: {
    900: '#050816',  // Main background
    800: '#0B1120',  // Secondary background
  },
  cyan: {
    400: '#00D4FF',  // Primary accent
  },
  purple: {
    600: '#7C3AED',  // Secondary accent
  },
  // Modify as needed
}
```

### Customize Animations

Edit `src/animations/index.js` or add new animation presets:

```javascript
export const customAnimation = {
  initial: { /* ... */ },
  animate: { /* ... */ },
  transition: { /* ... */ },
};
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production (creates /dist)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📊 Performance Optimization

### Already Implemented:
- ✅ Code splitting with Vite
- ✅ Minimal CSS with Tailwind
- ✅ Optimized animations (Framer Motion)
- ✅ Lazy component loading
- ✅ Image optimization ready
- ✅ Smooth scrolling

### Additional Optimization:
```javascript
// Add lazy loading for images
<img loading="lazy" src="image.jpg" alt="description" />

// Code splitting for large components
const HeavyComponent = lazy(() => import('./components/Heavy'));
```

## 🔐 Security Checklist

- [ ] Remove console.log statements for production
- [ ] Set up environment variables (.env)
- [ ] Enable CORS properly
- [ ] Sanitize user inputs
- [ ] Use HTTPS in production
- [ ] Set Security headers
- [ ] Regular dependency updates

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* Default: Mobile (0px) */
/* md: (768px) - Tablet */
/* lg: (1024px) - Laptop */
/* xl: (1280px) - Desktop */
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Tailwind styles not loading
- Ensure `index.css` is imported in `main.jsx`
- Check `tailwind.config.js` content paths

### Framer Motion animations not working
- Verify component is wrapped with `motion.div`
- Check animation variants are properly defined

### Build fails
```bash
npm run build -- --debug
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🎓 Learning Path

1. Start with `src/App.jsx` - understand the component structure
2. Explore `src/components/sections/Hero.jsx` - see animation implementation
3. Check `src/animations/index.js` - understand animation presets
4. Review `tailwind.config.js` - see custom design system
5. Modify content in `src/constants/index.js` - customize your data

## 📞 Support & Contact

For issues or questions:
- Create a GitHub issue
- Contact: hello@yanvex.ai
- Check README.md for more info

---

**Happy Coding! 🚀**
