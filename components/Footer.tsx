import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Aperture } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Aperture className="h-6 w-6 text-blue-500" />
              <h3 className="text-2xl font-bold tracking-tight">BLUESPHERE</h3>
            </div>
            <p className="text-sm text-stone-400 max-w-xs">
              Professional photography services in Canberra, Queanbeyan, and Regional NSW. 
              Specializing in family portraits, events, headshots, and commercial imagery.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-blue-400 transition">Services & Pricing</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-400 transition">Portfolio</Link></li>
              <li><Link to="/wall-art" className="hover:text-blue-400 transition">Wall Art Store</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Book a Session</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" /> Canberra, ACT & Surrounds
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" /> hello@bluespherephoto.com.au
              </li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="hover:text-blue-400 transition"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-blue-400 transition"><Facebook className="h-5 w-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} BlueSphere Photography. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;