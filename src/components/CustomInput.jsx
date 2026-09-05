import React from 'react';

export default function CustomInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  type = "number",
  // New props for units
  unitOptions = [], 
  selectedUnit = "", 
  onUnitChange = null 
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative flex items-center">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        
        <input 
          type={type} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 font-medium ${Icon ? 'pl-10' : ''} ${unitOptions.length > 0 ? 'pr-20' : ''}`}
        />
        
        {/* Right Unit Selector */}
        {unitOptions.length > 0 && onUnitChange && (
          <div className="absolute right-2 flex items-center">
            <select
              value={selectedUnit}
              onChange={(e) => onUnitChange(e.target.value)}
              className="bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded-lg px-2 py-1 outline-none cursor-pointer border border-transparent hover:border-slate-300 transition-all appearance-none text-center"
            >
              {unitOptions.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}