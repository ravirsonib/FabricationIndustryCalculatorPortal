import React from 'react';
import { Calculator } from 'lucide-react';

export default function CalculatorView({ title, image, description, children }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col">
        
        {image ? (
          /* Premium Header with Full Image Visibility */
          <div className="relative w-full bg-slate-50 border-b border-slate-100 overflow-hidden">
            
            {/* Decorative Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-orange-200/30 blur-[80px] rounded-full"></div>
              <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-blue-200/30 blur-[80px] rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-12">
              
              {/* Image Section - Fully Visible, No Cropping */}
              <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto max-h-[250px] md:max-h-[320px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Text & Title Section */}
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="inline-flex p-3.5 bg-white text-orange-500 rounded-2xl shadow-sm border border-slate-200 mb-5 md:mb-6">
                  <Calculator size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {title}
                </h2>
                {description && (
                  <p className="text-slate-500 mt-3 md:mt-5 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                    {description}
                  </p>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Fallback Header (If no image is passed) */
          <div className="p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 bg-slate-50 text-center md:text-left">
            <div className="p-4 bg-white text-orange-500 rounded-2xl shadow-sm border border-slate-200 shrink-0">
              <Calculator size={32} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
              {description && <p className="text-slate-500 mt-2 text-base md:text-lg font-medium max-w-2xl">{description}</p>}
            </div>
          </div>
        )}

        {/* Dynamic Calculator Content (Inputs & Logic) */}
        <div className="p-6 md:p-12 bg-white">
          <div className="max-w-4xl mx-auto">
             {children}
          </div>
        </div>
        
      </div>
    </div>
  );
}