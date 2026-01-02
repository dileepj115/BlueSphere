import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio_old1';
import WallArt from './pages/WallArt';
import Contact from './pages/Contact';
import SEOOptimizer from './components/SEOOptimizer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-stone-800 bg-stone-50">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/wall-art" element={<WallArt />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <SEOOptimizer />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;