// pages/Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { getPortfolioItems } from '../services/contentfulService';

const categories = ["All", "Portraits", "Events", "Headshots", "Commercial"];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [photos, setPhotos] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getPortfolioItems();
      setPhotos(items);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPhotos = filter === "All" 
    ? photos 
    : photos.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Portfolio</h1>
          <p className="text-stone-500 max-w-2xl mx-auto mb-8">
            A collection of stories told through light and shadow.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? "bg-stone-900 text-white shadow-md" 
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid group relative overflow-hidden rounded-lg shadow-sm">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 text-stone-900 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm uppercase tracking-wide">
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            No photos found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;