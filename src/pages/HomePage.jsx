import React, { Suspense, lazy } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { SEO } from '../components/seo/index.js';
import { RouteTransition } from '../components/system/index.js';

const Hero = lazy(() => import('../components/sections/Hero.jsx'));
const TrustedCompanies = lazy(() => import('../components/sections/TrustedCompanies.jsx'));
const About = lazy(() => import('../components/sections/About.jsx'));
const Services = lazy(() => import('../components/sections/Services.jsx'));
const Process = lazy(() => import('../components/sections/Process.jsx'));
const Portfolio = lazy(() => import('../components/sections/Portfolio.jsx'));
const Testimonials = lazy(() => import('../components/sections/Testimonials.jsx'));
const CTA = lazy(() => import('../components/sections/CTA.jsx'));

// ADDED: Lazy import for the new Contact section
const Contact = lazy(() => import('../components/sections/Contact.jsx'));

const SectionFallback = ({ className = 'min-h-[45vh]' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="h-24 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-inner shadow-white/[0.03]" />
  </div>
);

const HomePage = () => (
  <RouteTransition routeKey="home">
    <SEO
      title="Premium AI Agency"
      description="Premium AI product design, machine learning systems, and cinematic digital experiences for modern startups and enterprise teams."
      path="/"
      breadcrumbs={[{ name: 'Home', path: '/' }]}
    />
    <div className="min-h-screen overflow-hidden bg-dark-900 text-white">
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<SectionFallback className="min-h-screen" />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <TrustedCompanies />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        {/* ADDED: The Contact Section connection point */}
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <CTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  </RouteTransition>
);

export default HomePage;