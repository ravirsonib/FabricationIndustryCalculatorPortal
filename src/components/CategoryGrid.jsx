import React from 'react';
import { ArrowRight, Box } from 'lucide-react';

export default function CategoryGrid({ items, onNavigate }) {
  return (
    <div className="w-full px-6 md:px-12 py-8 max-w-screen-2xl mx-auto">
      {/* Reduced grid columns to make cards significantly larger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.keys(items).map((key) => {
          const item = items[key];
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 text-left border border-slate-100 hover:border-brand-orange shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 h-[22rem]"
            >
              {/* Image Area - Takes up majority of the card */}
              <div className="w-full h-48 bg-white relative overflow-hidden border-b border-gray-300">
                <img 
                  src={item.image} 
                  alt={key} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-10">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-slate-400 group-hover:text-brand-blue transition-colors">
                    <Box size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-tight">
                    {key}
                  </span>
                </div>

                {/* Hidden Button that reveals on hover */}
                <div className="overflow-hidden mt-4">
                  <div className="flex items-center gap-2 text-brand-orange font-semibold text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <span>Open Category</span>
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                </div>
              </div>
              
              {/* Bottom decorative line */}
              <div className="h-1 w-0 bg-brand-orange transition-all duration-300 ease-out group-hover:w-full"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}