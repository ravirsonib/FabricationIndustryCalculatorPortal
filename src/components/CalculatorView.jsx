import React from 'react';
import { Calculator } from 'lucide-react';

export default function CalculatorView({ title, image, description, children }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
        
        {image ? (
          <div className="w-full h-40 md:h-56 bg-slate-100 relative">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 md:left-10 text-white">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h2>
              {description && <p className="text-slate-200 mt-2 text-sm md:text-base font-medium opacity-90">{description}</p>}
            </div>
          </div>
        ) : (
          /* Fallback Header (If no image is passed) */
          <div className="p-6 md:p-10 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
            <div className="p-3 bg-orange-50 text-brand-orange rounded-2xl shadow-sm border border-orange-100">
              <Calculator size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h2>
              {description && <p className="text-slate-500 mt-1 font-medium">{description}</p>}
            </div>
          </div>
        )}

        {/* Dynamic Calculator Content (Inputs & Logic) */}
        <div className="p-6 md:p-10 bg-white">
          {children}
        </div>
        
      </div>
    </div>
  );
}