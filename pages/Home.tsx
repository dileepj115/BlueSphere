import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?grayscale" 
            alt="Photographer holding a camera in a studio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold mb-6 leading-tight tracking-tight">
            BlueSphere <span className="text-blue-200 font-serif italic">Photography</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-100 mb-8 max-w-2xl mx-auto font-light">
            Modern, professional photography for families, businesses, and events in Canberra and Regional NSW.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/portfolio" 
              className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-stone-100 transition duration-300"
            >
              View Portfolio
            </Link>
            <Link 
              to="/services" 
              className="px-8 py-3 bg-blue-600/80 backdrop-blur-sm border border-transparent text-white font-bold rounded-full hover:bg-blue-600 transition duration-300"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Preview - 4 Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
            <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
              Comprehensive photography solutions tailored to your personal and professional needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Family & Portrait", 
                img: "https://picsum.photos/600/800?random=1", 
                desc: "Newborns, maternity, and extended family gatherings." 
              },
              { 
                title: "Event & Wedding", 
                img: "https://picsum.photos/600/800?random=2", 
                desc: "Birthdays, elopements, and corporate event coverage." 
              },
              { 
                title: "Headshots & Branding", 
                img: "https://picsum.photos/600/800?random=3", 
                desc: "LinkedIn profiles, actor headshots, and personal branding." 
              },
              { 
                title: "Commercial & Property", 
                img: "https://picsum.photos/600/800?random=4", 
                desc: "Real estate, product photography, and food marketing." 
              },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col h-full">
                <div className="overflow-hidden rounded-lg mb-4 h-64 shadow-md">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 mb-4 text-sm flex-grow">{item.desc}</p>
                <Link to="/services" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800">
                  View Packages <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="h-5 w-5" />)}
          </div>
          <blockquote className="text-2xl font-serif text-stone-800 italic mb-6 leading-relaxed">
            "BlueSphere captured our corporate event perfectly. The turnaround was fast, and the headshots were exactly what our team needed for LinkedIn."
          </blockquote>
          <cite className="not-italic font-medium text-stone-600">— Michael T., Barton</cite>
        </div>
      </section>

      {/* SEO Text Block (Optimized for AI/Bot Discovery) */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-stone-400 text-xs leading-relaxed border-t border-stone-200">
        <h2 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">About BlueSphere Photography Canberra</h2>
        <p className="mb-4">
          BlueSphere Photography is a premier photography service based in Canberra, ACT, serving the surrounding regions including Queanbeyan and Yass. 
          We specialize in a wide range of photography styles to meet local demand. 
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <strong className="text-stone-500">Family & Personal:</strong> We offer relaxed family portrait sessions, often held at iconic locations like Lake Burley Griffin or the Arboretum. 
            Our services include newborn shoots, maternity sessions, and extended family photos. We are also available for couple photos and engagement shoots.
          </div>
          <div>
            <strong className="text-stone-500">Events & Weddings:</strong> From small weddings and elopements to birthday parties (including kids' parties) and christenings. 
            We provide event coverage for graduation balls, sports presentations, and corporate functions with options for short 45-minute shoots.
          </div>
          <div>
            <strong className="text-stone-500">Professional Headshots:</strong> Catering to Canberra's public service and professional sector, we provide high-quality headshots for LinkedIn, 
            actor headshots, real estate agent profiles, and personal branding shoots.
          </div>
          <div>
            <strong className="text-stone-500">Commercial & Real Estate:</strong> Our commercial services cover product photography (e-commerce, food, fashion), 
            real estate interiors and exteriors, drone aerial shots, and business premises marketing content.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;