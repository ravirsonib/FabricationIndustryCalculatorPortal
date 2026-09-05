import React, { useState, useRef, useEffect } from 'react';
import { Layers, Search, ChevronDown, Check } from 'lucide-react';

export default function SearchableMaterialSelector({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedMaterial = options.find(m => m.id === value) || options[0];
  const filteredOptions = options.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      
      {/* Selected Value Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all text-left"
      >
        <div className="flex items-center gap-3">
          <Layers size={18} className="text-brand-orange" strokeWidth={2.5} />
          <span className="font-medium text-slate-800">{selectedMaterial?.name}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Search Input */}
          <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Search size={16} className="text-slate-400 ml-2" />
            <input
              type="text"
              autoFocus
              placeholder="Search material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent p-1.5 outline-none text-sm font-medium text-slate-700"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => {
                    onChange(mat.id);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-orange-50 transition-colors flex items-center justify-between ${value === mat.id ? 'bg-orange-50/50 text-brand-orange' : 'text-slate-700'}`}
                >
                  {mat.name}
                  {value === mat.id && <Check size={16} strokeWidth={3} />}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">No materials found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}