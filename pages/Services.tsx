import React from 'react';
import { Check, Camera, Zap, User, Home } from 'lucide-react';
import { ServicePackage } from '../types';
import { Link } from 'react-router-dom';

const services: ServicePackage[] = [
  {
    id: 'family',
    title: 'Family & Portrait Photography',
    price: 'From $250',
    duration: '1 - 1.5 Hours',
    description: 'Authentic moments captured in the comfort of your home or at iconic Canberra locations like the Arboretum or Lake Burley Griffin.',
    features: [
      'Newborn & Maternity Sessions',
      'Extended Family Gatherings',
      'Couple & Engagement Shoots',
      '25+ High-Res Edited Images'
    ],
    image: 'https://picsum.photos/800/600?random=10'
  },
  {
    id: 'events',
    title: 'Event & Wedding Photography',
    price: '$200/hr',
    duration: 'Min 2 Hours',
    description: 'Comprehensive coverage for life’s big celebrations. We blend into the background to capture the action as it happens.',
    features: [
      'Small Weddings & Elopements',
      'Birthday Parties (Kids & Adults)',
      'Christenings & Graduations',
      'Fast Turnaround (3-5 Days)'
    ],
    image: 'https://picsum.photos/800/600?random=11'
  },
  {
    id: 'headshots',
    title: 'Headshot & Personal Branding',
    price: '$180',
    duration: '45 Mins',
    description: 'Professional imagery designed to elevate your personal brand. Essential for Canberra’s professionals, public servants, and actors.',
    features: [
      'LinkedIn & Corporate Profiles',
      'Actor & Model Headshots',
      'Real Estate Agent Profiles',
      'Studio or On-Location',
      'Coaching on Posing & Expression'
    ],
    image: 'https://picsum.photos/800/600?random=12'
  },
  {
    id: 'commercial',
    title: 'Commercial & Property',
    price: 'Custom Quote',
    duration: 'Project Based',
    description: 'High-impact visuals for your business. From e-commerce products to architectural real estate photography.',
    features: [
      'Product Photography (E-commerce)',
      'Food & Restaurant Marketing',
      'Real Estate (Interior/Exterior)',
      'Drone / Aerial Footage',
      'Business Premises & BTS'
    ],
    image: 'https://picsum.photos/800/600?random=13'
  }
];

const Services: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-stone-900 py-20 relative overflow-hidden">
        {/* Abstract Blue Orb Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Services & Pricing</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent pricing for professional photography in Canberra. 
            Whether you need a quick headshot or full-day event coverage, we have a package for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 group">
              <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-stone-900 mb-1">{service.title}</h3>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>{service.price}</span>
                    <span className="text-stone-300">|</span>
                    <span className="text-sm text-stone-500">{service.duration}</span>
                  </div>
                </div>
                
                <p className="text-stone-600 mb-6 text-sm flex-grow leading-relaxed">{service.description}</p>
                
                <div className="mb-6 bg-stone-50 p-4 rounded-lg border border-stone-100">
                  <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Includes</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-stone-700">
                        <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full text-center bg-stone-900 text-white py-3 rounded-md font-bold hover:bg-blue-600 transition duration-300"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search Intent / SEO Helper Section */}
      <div className="max-w-5xl mx-auto px-4 pb-20 pt-8">
        <h2 className="text-2xl font-serif font-bold text-center mb-10 text-stone-800">Why Choose BlueSphere?</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                    <User className="text-blue-600 h-6 w-6"/>
                    <h3 className="font-bold text-stone-900">Personal Branding & Headshots</h3>
                </div>
                <p className="text-sm text-stone-600">
                    We understand the specific needs of Canberra's professionals. Whether you are a public servant, real estate agent, or actor, 
                    we provide "LinkedIn photos", "corporate portraits", and "business branding" that stand out.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                    <Home className="text-blue-600 h-6 w-6"/>
                    <h3 className="font-bold text-stone-900">Family & Location</h3>
                </div>
                <p className="text-sm text-stone-600">
                    Our "family portrait sessions" are relaxed and candid. We love shooting at "Lake Burley Griffin" or doing in-home "newborn shoots". 
                    We capture authentic family moments without the stiff poses.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                    <Zap className="text-blue-600 h-6 w-6"/>
                    <h3 className="font-bold text-stone-900">Commercial Impact</h3>
                </div>
                <p className="text-sm text-stone-600">
                    Need "product photos" for e-commerce or "food photography" for your restaurant? We also specialize in "drone aerials" and "real estate photography" 
                    to showcase properties and businesses in their best light.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                    <Camera className="text-blue-600 h-6 w-6"/>
                    <h3 className="font-bold text-stone-900">Events & Parties</h3>
                </div>
                <p className="text-sm text-stone-600">
                    From "birthday party photographers" to "small wedding" coverage. We handle "kids parties", "christenings", and "corporate events" 
                    with professionalism and speed.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;