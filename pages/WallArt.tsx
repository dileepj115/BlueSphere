import React, { useState } from 'react';
import { ShoppingBag, ZoomIn } from 'lucide-react';
import { WallArtOption } from '../types';
import { Link } from 'react-router-dom';

const artOptions: WallArtOption[] = [
  { id: '1', size: '12" x 18"', price: 85, description: 'Perfect for desktop or small wall spaces.', imageUrl: 'https://picsum.photos/600/600?random=50' },
  { id: '2', size: '18" x 24"', price: 140, description: 'Standard poster size, great for hallways.', imageUrl: 'https://picsum.photos/600/600?random=51' },
  { id: '3', size: '24" x 36"', price: 220, description: 'Statement piece for living rooms.', imageUrl: 'https://picsum.photos/600/600?random=52' },
  { id: '4', size: '30" x 40"', price: 300, description: 'Massive gallery canvas for maximum impact.', imageUrl: 'https://picsum.photos/600/600?random=53' },
];

const WallArt: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>(artOptions[2].id);
  const activeOption = artOptions.find(o => o.id === selectedSize) || artOptions[0];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Fine Art Canvas Prints</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Transform your favorite memories into museum-quality wall art. 
            Printed on premium archival cotton canvas with UV-resistant inks.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden lg:flex">
          {/* Visual Preview */}
          <div className="lg:w-1/2 bg-stone-100 relative h-96 lg:h-auto flex items-center justify-center p-8">
            <div className="relative shadow-2xl transition-all duration-500" style={{ 
              width: `${parseInt(activeOption.size) * 10}px`, 
              maxWidth: '90%'
            }}>
              <img 
                src={activeOption.imageUrl} 
                alt="Canvas Preview" 
                className="w-full h-auto object-cover border-8 border-white"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full cursor-pointer shadow-sm hover:bg-white text-stone-600">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 text-xs text-stone-400">Visualization only. Image depends on your selection.</p>
          </div>

          {/* Configuration */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Custom Canvas Print</h2>
            <p className="text-stone-500 mb-8">Add this to your photography package or order from your gallery.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-3">Select Size</label>
                <div className="grid grid-cols-2 gap-4">
                  {artOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedSize(opt.id)}
                      className={`border rounded-lg p-4 text-left transition-all ${
                        selectedSize === opt.id 
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-semibold text-stone-900">{opt.size}</div>
                      <div className="text-sm text-stone-500">${opt.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                <h3 className="text-sm font-semibold text-stone-900 mb-1">Product Details</h3>
                <p className="text-sm text-stone-600">{activeOption.description}</p>
                <ul className="mt-2 text-xs text-stone-500 list-disc list-inside">
                  <li>1.5" Gallery Wrap depth</li>
                  <li>Ready to hang hardware included</li>
                  <li>Satin finish for reduced glare</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-stone-100">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-stone-600">Total Price:</span>
                   <span className="text-3xl font-serif font-bold text-stone-900">${activeOption.price}</span>
                 </div>
                 
                 <Link 
                   to={`/contact?interest=canvas&size=${activeOption.size}`}
                   className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-stone-800 transition flex items-center justify-center gap-2"
                 >
                   <ShoppingBag className="h-5 w-5" />
                   Order / Inquire Now
                 </Link>
                 <p className="text-xs text-center text-stone-400 mt-3">
                   Orders are processed manually. We will contact you to select the image.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallArt;