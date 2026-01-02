import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PortfolioItem } from '../types';
import { getPortfolioItems } from '../services/contentfulService';

const Portfolio: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-white pb-20">
      <Helmet>
        <title>Portfolio | BlueSphere Photography Canberra</title>
        <meta name="description" content="A visual collection of our latest photography work in Canberra. Weddings, Portraits, and Events." />
        <link rel="canonical" href="https://bluespherephoto.com/portfolio" />
      </Helmet>

      {/* Header - Minimalist */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Selected Works
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex justify-center py-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
          </div>
        ) : (
          /* Masonry Layout - Large gaps, clean presentation */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {photos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid mb-8">
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-auto object-cover hover:opacity-95 transition-opacity duration-300"
                  loading="lazy"
                />
                {/* Optional: Minimal caption below image (Mica style), remove if you want 100% pure image */}
                {/* <p className="mt-2 text-xs text-stone-400 uppercase tracking-widest">{photo.alt}</p> */}
              </div>
            ))}
          </div>
        )}
        
        {!loading && photos.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            No images found. Please upload content to Contentful.
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;