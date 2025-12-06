import React, { useState } from 'react';
import { ShoppingBag, ZoomIn, Ruler, Armchair, MoveHorizontal, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// ==========================================
// 🔧 ADMIN: CONFIGURE PRICES & SIZES HERE
// ==========================================
const CONFIG = {
  discountPercentage: 50, // 50% OFF
  // Define sizes in INCHES. The app calculates CM automatically.
  // Base Price is the ORIGINAL price (before discount).
  options: [
    { id: 'small',  w: 12, h: 18, basePrice: 170, desc: 'Perfect for desktop or small wall spaces.' },
    { id: 'medium', w: 18, h: 24, basePrice: 280, desc: 'Standard poster size, great for hallways.' },
    { id: 'large',  w: 24, h: 36, basePrice: 440, desc: 'Statement piece for living rooms.' },
    { id: 'extra',  w: 30, h: 40, basePrice: 600, desc: 'Massive gallery canvas for maximum impact.' },
  ]
};
// ==========================================

const WallArt: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(CONFIG.options[2].id); // Default to Large
  const [isMetric, setIsMetric] = useState(false); // Default to Inches
  const [viewMode, setViewMode] = useState<'detail' | 'room'>('detail');

  const activeOption = CONFIG.options.find(o => o.id === selectedId) || CONFIG.options[0];
  
  // Calculate Prices
  const originalPrice = activeOption.basePrice;
  const currentPrice = Math.round(originalPrice * (1 - CONFIG.discountPercentage / 100));

  // Helper to format dimensions
  const formatDim = (val: number) => {
    if (isMetric) return `${Math.round(val * 2.54)}cm`;
    return `${val}"`;
  };

  const getSizeString = (opt: typeof activeOption) => {
    return `${formatDim(opt.w)} x ${formatDim(opt.h)}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Fine Art Canvas Prints</h1>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6">
            Transform your favorite memories into museum-quality wall art. 
            Printed on premium archival cotton canvas with UV-resistant inks.
          </p>
          
          {/* Discount Banner */}
          <div className="inline-block bg-stone-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg animate-pulse">
            LIMITED TIME: {CONFIG.discountPercentage}% OFF ALL PRINTS
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden lg:flex">
          
          {/* ==========================
              LEFT: VISUALIZER 
             ========================== */}
          <div className="lg:w-3/5 bg-stone-100 relative h-[500px] flex flex-col items-center justify-center p-8 overflow-hidden transition-colors duration-500">
            
            {/* View Mode Toggle (Top Right of Image) */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-stone-200 p-1 flex z-20">
              <button 
                onClick={() => setViewMode('detail')}
                className={`p-2 rounded-md transition ${viewMode === 'detail' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
                title="Detail View"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('room')}
                className={`p-2 rounded-md transition ${viewMode === 'room' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
                title="Room Size Reference"
              >
                <Armchair className="h-4 w-4" />
              </button>
            </div>

            {viewMode === 'detail' ? (
              // --- DETAIL VIEW ---
              <div 
                className="relative shadow-2xl transition-all duration-500 ease-in-out" 
                style={{ 
                  // Scale width purely for visual effect based on inches
                  width: `${activeOption.w * 10}px`, 
                  maxWidth: '90%',
                  aspectRatio: `${activeOption.w}/${activeOption.h}`
                }}
              >
                <img 
                  src="https://picsum.photos/800/1000?random=50" // Placeholder
                  alt="Canvas Preview" 
                  className="w-full h-full object-cover border-8 border-white"
                />
              </div>
            ) : (
              // --- ROOM VIEW (Smart Scale) ---
              <div className="relative w-full h-full flex items-end justify-center pb-12">
                {/* Wall Background */}
                <div className="absolute inset-0 bg-stone-200 opacity-50 border-b border-stone-300"></div>
                
                {/* The "Couch" Reference (Assuming standard couch is ~84 inches wide) */}
                <div className="relative z-10 text-stone-400 flex flex-col items-center">
                   {/* The Art */}
                   <div 
                     className="bg-white shadow-xl mb-8 relative transition-all duration-500"
                     style={{
                       // Logic: (Art Width / Couch Width 84") * Couch Visual Width (300px) * Scale Factor
                       width: `${(activeOption.w / 84) * 100}%`, // Percentage relative to container
                       maxWidth: '600px', // Cap it so it doesn't break layout
                       minWidth: '80px',
                       aspectRatio: `${activeOption.w}/${activeOption.h}`
                     }}
                   >
                      <img 
                        src="https://picsum.photos/800/1000?random=50" 
                        className="w-full h-full object-cover border-4 border-white"
                        alt="Room Preview"
                      />
                   </div>
                   
                   {/* Couch Icon as reference */}
                   <div className="w-64 md:w-96 text-stone-800 opacity-80 flex justify-center border-b-4 border-stone-400 pb-1">
                      <Armchair className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                      <Armchair className="h-24 w-24 md:h-32 md:w-32 -ml-8" strokeWidth={1} />
                      <Armchair className="h-24 w-24 md:h-32 md:w-32 -ml-8" strokeWidth={1} />
                   </div>
                   <p className="text-[10px] uppercase tracking-widest mt-2 text-stone-500">Standard 3-Seater Size Reference</p>
                </div>
              </div>
            )}
          </div>

          {/* ==========================
              RIGHT: CONFIGURATION
             ========================== */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                 <h2 className="text-2xl font-bold text-stone-900">Custom Canvas Print</h2>
                 <p className="text-stone-500 text-sm mt-1">Ready to hang, gallery wrapped.</p>
              </div>
              {/* Unit Toggle */}
              <button 
                onClick={() => setIsMetric(!isMetric)}
                className="flex items-center gap-2 text-xs font-bold border border-stone-300 rounded-full px-3 py-1 hover:bg-stone-50 transition"
              >
                <Ruler className="h-3 w-3" />
                {isMetric ? 'Switch to Inches' : 'Switch to CM'}
              </button>
            </div>

            {/* Size Selector */}
            <div className="space-y-4 mb-8">
              <label className="block text-sm font-medium text-stone-900">Select Size</label>
              <div className="grid grid-cols-1 gap-3">
                {CONFIG.options.map((opt) => {
                   const isSelected = selectedId === opt.id;
                   const optPrice = Math.round(opt.basePrice * (1 - CONFIG.discountPercentage / 100));
                   
                   return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedId(opt.id)}
                      className={`relative flex justify-between items-center border rounded-lg p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                          : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border border-stone-300 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'bg-white'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-stone-900'}`}>
                             {getSizeString(opt)}
                          </div>
                          <div className="text-xs text-stone-500 hidden sm:block">{opt.desc}</div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-stone-400 line-through text-xs">${opt.basePrice}</div>
                         <div className="font-bold text-stone-900">${optPrice}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 mb-8">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-stone-500 text-sm">Regular Price</span>
                 <span className="text-stone-400 line-through">${originalPrice}</span>
               </div>
               <div className="flex justify-between items-center mb-2 text-green-600">
                 <span className="text-sm font-medium">Summer Sale ({CONFIG.discountPercentage}% Off)</span>
                 <span>-${originalPrice - currentPrice}</span>
               </div>
               <div className="border-t border-stone-200 my-4"></div>
               <div className="flex justify-between items-end">
                 <span className="font-bold text-stone-900">Total</span>
                 <span className="text-4xl font-serif font-bold text-stone-900">${currentPrice}</span>
               </div>
            </div>

            {/* CTA */}
            <Link 
              to={`/contact?interest=canvas&size=${encodeURIComponent(getSizeString(activeOption))}`}
              className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-lg transform active:scale-[0.99]"
            >
              <ShoppingBag className="h-5 w-5" />
              Order This Size
            </Link>
            <p className="text-xs text-center text-stone-400 mt-3 flex items-center justify-center gap-1">
               <Check className="h-3 w-3" /> Includes hanging hardware
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WallArt;