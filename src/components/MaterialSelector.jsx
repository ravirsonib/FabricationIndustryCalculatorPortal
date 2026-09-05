import React from 'react';
import { Layers } from 'lucide-react';

export default function MaterialSelector({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-brand-orange pointer-events-none">
          <Layers size={18} strokeWidth={2.5} />
        </div>
        
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800 font-medium appearance-none bg-white cursor-pointer"
        >
          {options.map((mat) => (
            <option key={mat.id} value={mat.id}>
              {mat.name}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute right-4 text-slate-400 pointer-events-none flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}