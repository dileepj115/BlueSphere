import React, { useState } from 'react';
import { Sparkles, X, ChevronUp, Copy, Check } from 'lucide-react';
import { generateSEOStrategy } from '../services/geminiService';
import { SEOAdvice } from '../types';

const SEOOptimizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [focusArea, setFocusArea] = useState('Family Portraits & Weddings');
  const [location, setLocation] = useState('Canberra, ACT');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAdvice | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateSEOStrategy(focusArea, location);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate SEO strategy. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); setMinimized(false); }}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2 transition-all"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-medium text-sm">AI SEO Helper</span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out shadow-2xl border border-stone-200 bg-white ${
      minimized 
        ? "bottom-0 right-4 w-72 h-12 rounded-t-lg overflow-hidden cursor-pointer" 
        : "bottom-0 right-0 md:right-4 w-full md:w-[500px] h-[80vh] rounded-t-xl"
    }`}>
      {/* Header */}
      <div 
        className="bg-indigo-600 p-4 text-white flex justify-between items-center"
        onClick={() => minimized && setMinimized(false)}
      >
        <div className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-4 w-4" />
          {minimized ? "Click to expand AI SEO Tools" : "AI SEO Strategy Generator"}
        </div>
        <div className="flex gap-2">
          {!minimized && (
            <button onClick={() => setMinimized(true)} className="p-1 hover:bg-indigo-500 rounded">
              <ChevronUp className="h-4 w-4 rotate-180" />
            </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-indigo-500 rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!minimized && (
        <div className="p-6 h-[calc(80vh-60px)] overflow-y-auto bg-stone-50">
          <p className="text-sm text-stone-600 mb-6">
            Use Gemini AI to generate a custom SEO strategy for your photography business. Great for filling out your blog or metadata.
          </p>

          <form onSubmit={handleGenerate} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Your Niche/Focus</label>
              <input 
                type="text" 
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full rounded-md border-stone-300 border p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Newborn Photography"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Target Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border-stone-300 border p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Canberra, ACT"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-stone-900 text-white py-2 px-4 rounded-md hover:bg-stone-800 disabled:opacity-50 transition font-medium text-sm flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">Generating...</span>
              ) : "Generate Strategy"}
            </button>
          </form>

          {result && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-stone-900">Recommended Keywords</h4>
                  <button onClick={() => copyToClipboard(result.keywords.join(", "), 'keywords')} className="text-stone-400 hover:text-indigo-600">
                    {copied === 'keywords' ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw, i) => (
                    <span key={i} className="bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded-full border border-stone-200">{kw}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-stone-900">Meta Description</h4>
                  <button onClick={() => copyToClipboard(result.metaDescription, 'meta')} className="text-stone-400 hover:text-indigo-600">
                    {copied === 'meta' ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
                  </button>
                </div>
                <p className="text-sm text-stone-600 bg-stone-50 p-3 rounded italic border border-stone-100">
                  {result.metaDescription}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <h4 className="font-semibold text-stone-900 mb-2">Blog Post Ideas</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-stone-700">
                  {result.blogIdeas.map((idea, i) => (
                    <li key={i}>{idea}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                <h4 className="font-semibold text-stone-900 mb-2">Local SEO Tip</h4>
                <p className="text-sm text-stone-600">{result.localSEOStrategy}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SEOOptimizer;