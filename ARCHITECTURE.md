# Yanvex - Project Architecture

## 🏗️ Component Architecture

```
App.jsx (Main Container)
├── Navbar (Navigation & Scroll Progress)
│   ├── Logo (Gradient Text)
│   ├── Desktop Menu (Links)
│   ├── Mobile Menu (Hamburger)
│   └── CTA Buttons
│
├── Hero (Full-screen Hero)
│   ├── Animated Background Orbs
│   ├── Main Headline (Gradient Text)
│   ├── Subheading
│   ├── CTA Buttons
│   ├── Statistics Row
│   └── Scroll Indicator
│
├── TrustedCompanies (Logo Marquee)
│   ├── Infinite Slider
│   └── Statistics Grid
│
├── About (Company Info)
│   ├── Section Title
│   ├── Content & Features
│   ├── Visual Element
│   ├── Statistics Cards Grid
│   └── Mission Statement
│
├── Services (6 Service Cards)
│   ├── Section Title
│   ├── Service Cards Grid
│   │   ├── Icon
│   │   ├── Title
│   │   ├── Description
│   │   └── Link
│   └── Explore Button
│
├── Process (Timeline)
│   ├── Section Title
│   ├── Process Steps Grid
│   │   ├── Step Number Circle
│   │   ├── Title
│   │   ├── Description
│   │   └── Progress Bar
│   └── Implementation Timeline
│
├── Portfolio (Project Showcase)
│   ├── Section Title
│   ├── Category Filter Buttons
│   ├── Project Cards Grid
│   │   ├── Visual/Icon
│   │   ├── Badge
│   │   ├── Title
│   │   ├── Description
│   │   └── Link
│   └── View All Button
│
├── Testimonials (Carousel)
│   ├── Section Title
│   ├── Main Testimonial Card
│   │   ├── Avatar
│   │   ├── Rating Stars
│   │   ├── Quote
│   │   └── Author Info
│   ├── Navigation Controls
│   │   ├── Previous Button
│   │   ├── Dot Indicators
│   │   └── Next Button
│   └── Stats Grid
│
├── CTA (Call to Action)
│   ├── Background Effects
│   ├── Main Heading
│   ├── Subheading
│   ├── CTA Buttons
│   ├── Stats Row
│   └── Contact Form
│       ├── Name Input
│       ├── Email Input
│       ├── Phone Input
│       ├── Industry Select
│       └── Submit Button
│
└── Footer (Website Footer)
    ├── Top CTA Section
    ├── Main Footer Content
    │   ├── Logo & Description
    │   ├── Social Links
    │   └── Footer Links Grid (4 columns)
    │       ├── Product
    │       ├── Company
    │       ├── Resources
    │       └── Legal
    ├── Divider
    ├── Bottom Bar
    │   ├── Copyright
    │   └── Policy Links
    └── Glow Effect
```

## 🎨 Styling System

```
Tailwind CSS Configuration
├── Custom Colors
│   ├── Dark Theme (900, 800, 700)
│   ├── Cyan Accents (400, 500)
│   ├── Purple Accents (500, 600)
│   └── Text Colors (Slate variants)
│
├── Custom Animations
│   ├── float (3s ease-in-out)
│   ├── glow-pulse (2s ease-in-out)
│   ├── slide (20s linear)
│   └── slide-reverse (20s linear)
│
├── Custom Shadows
│   ├── glow (cyan)
│   ├── glow-lg (cyan larger)
│   ├── glow-purple
│   └── inner (inset glow)
│
├── Gradients
│   ├── gradient-radial
│   ├── gradient-hero
│   └── gradient-card
│
└── Typography
    ├── Font: Inter (400, 500, 600, 700, 800)
    └── Sizes: xs to 6xl
```

## 🎬 Animation System

```
Framer Motion Animations
├── Entrance Animations
│   ├── fadeUp (opacity + y)
│   ├── fadeIn (opacity only)
│   ├── scaleUp (scale + opacity)
│   ├── slideInLeft (x + opacity)
│   └── slideInRight (x + opacity)
│
├── Container Animations
│   ├── staggerContainer (sequential children)
│   ├── scrollContainer (scroll-triggered)
│   └── scrollItem (for scroll containers)
│
├── Interactive Animations
│   ├── hoverScale (hover effect)
│   ├── hoverLift (hover with shadow)
│   └── whileTap (tap animation)
│
├── Loop Animations
│   ├── floating (y-axis loop)
│   ├── pulse (opacity loop)
│   ├── glow (shadow loop)
│   └── rotate (rotation loop)
│
└── Special Effects
    ├── rotate (360° rotation)
    └── gradient (multi-step gradients)
```

## 🪝 Custom Hooks

```
React Hooks
├── useScrollProgress()
│   └── Returns: scrollProgress (0-100)
│
├── useInView(ref, options)
│   └── Returns: { inView, hasBeenInView }
│
├── useWindowSize()
│   └── Returns: { width, height }
│
└── useMousePosition()
    └── Returns: { x, y }
```

## 🛠️ Utility Functions

```
Utils
├── cn(...classes) - Class combiner
├── scrollToElement(elementId) - Smooth scroll
├── debounce(func, delay) - Debounce function
├── throttle(func, limit) - Throttle function
├── getScrollProgress() - Get page scroll %
├── isElementInViewport(element) - Viewport check
├── formatNumber(num) - Format with commas
└── delay(ms) - Promise-based delay
```

## 📊 Data Structure

```
Constants (src/constants/index.js)
├── NAV_ITEMS (5 items)
├── TRUSTED_COMPANIES (6 companies)
├── SERVICES (6 services)
├── PROCESS_STEPS (4 steps)
├── PORTFOLIO_PROJECTS (6 projects)
├── TESTIMONIALS (3 testimonials)
├── STATISTICS (4 stats)
└── SOCIAL_LINKS (4 links)
```

## 📱 Responsive Breakpoints

```
Mobile First Approach
├── Default (0px) - Mobile
├── md: (768px) - Tablet
├── lg: (1024px) - Laptop  
└── xl: (1280px) - Desktop
```

## 🔄 Data Flow

```
App.jsx
└── Passes props/constants down to:
    ├── Navbar
    │   └── Uses: NAV_ITEMS, useScrollProgress
    ├── Hero
    │   └── Uses: staggerContainer, fadeUpVariants
    ├── Services
    │   └── Uses: SERVICES, hoverLift
    ├── Portfolio
    │   └── Uses: PORTFOLIO_PROJECTS
    ├── Testimonials
    │   └── Uses: TESTIMONIALS
    ├── Process
    │   └── Uses: PROCESS_STEPS
    ├── About
    │   └── Uses: STATISTICS
    ├── TrustedCompanies
    │   └── Uses: TRUSTED_COMPANIES
    ├── CTA
    │   └── Uses: Form state
    └── Footer
        └── Uses: SOCIAL_LINKS, footerLinks
```

## 🎯 Component Hierarchy

```
Level 1: Layout (Full Page)
└── App.jsx

Level 2: Major Sections (Full Width)
├── Navbar
├── Hero
├── Services
├── Portfolio
├── ...
└── Footer

Level 3: Section Components (Container)
├── GlassCard
├── SectionTitle
└── Divider

Level 4: UI Components (Atomic)
├── Button
├── Badge
├── Counter
├── GradientText
├── IconButton
└── Divider
```

## 🎨 Design Token Hierarchy

```
Design Tokens
├── Colors
│   ├── Primary: Cyan (#00D4FF)
│   ├── Secondary: Purple (#7C3AED)
│   ├── Background: Dark Navy (#050816)
│   └── Text: White/Slate
│
├── Typography
│   ├── Font: Inter
│   ├── Font Weights: 300-800
│   └── Sizes: 12px - 60px
│
├── Spacing
│   ├── Uses Tailwind scale (4px base)
│   └── Padding/Margins: 4px to 32px+
│
├── Shadows
│   ├── Glow Effects (Cyan/Purple)
│   ├── Regular Shadows
│   └── Inner Shadows
│
├── Borders
│   ├── Radius: 4px - 32px
│   ├── Width: 1px - 2px
│   └── Color: White with opacity
│
└── Effects
    ├── Blur: 2px - 64px
    ├── Opacity: 5% - 100%
    └── Transforms: Scale, Rotate, Translate
```

## 🚀 Performance Optimization

```
Built-in Optimizations
├── Vite (Fast builds)
├── Code splitting (Components)
├── Lazy loading ready
├── Optimized CSS (Tailwind)
├── Minimal JS (Framer Motion)
├── Smooth animations (60fps)
├── CSS Modules ready
└── Image optimization ready
```

## 🔒 Security Features

```
Security Considerations
├── No sensitive data in frontend
├── Environment variables supported (.env)
├── Input sanitization ready
├── CORS configuration ready
├── HTTPS recommended
├── Secure form handling
└── No hardcoded credentials
```

---

This architecture provides a **scalable, maintainable, and professional** foundation for your AI agency website!
