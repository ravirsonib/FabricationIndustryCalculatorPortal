import React, { useState, useEffect } from 'react';
import CalculatorView from '../../../CalculatorView';
import CustomInput from '../../../CustomInput';
import { IndianRupee, Maximize } from 'lucide-react';

const UNITS = [
  'PRICE PER SQUARE METER',
  'PRICE PER SQUARE FOOT',
  'PRICE PER SQUARE INCH',
]; //[cite: 4]

export default function AreaToRunningPriceCalculator({ title, image }) {
  const [price, setPrice] = useState(''); //[cite: 4]
  const [width, setWidth] = useState(''); //[cite: 4]
  const [selectedUnit, setSelectedUnit] = useState('PRICE PER SQUARE METER'); //[cite: 4]
  const [resultText, setResultText] = useState('0'); //[cite: 4]

  const getWidthLabel = () => {
    switch (selectedUnit) {
      case 'PRICE PER SQUARE METER': return 'WIDTH IN METER:'; //[cite: 4]
      case 'PRICE PER SQUARE FOOT': return 'WIDTH IN FOOT:'; //[cite: 4]
      case 'PRICE PER SQUARE INCH': return 'WIDTH IN INCH:'; //[cite: 4]
      default: return 'WIDTH:'; //[cite: 4]
    }
  };

  const getResultLabel = () => {
    switch (selectedUnit) {
      case 'PRICE PER SQUARE METER': return 'PRICE PER RUNNING METER:'; //[cite: 4]
      case 'PRICE PER SQUARE FOOT': return 'PRICE PER RUNNING FOOT:'; //[cite: 4]
      case 'PRICE PER SQUARE INCH': return 'PRICE PER RUNNING INCH:'; //[cite: 4]
      default: return 'PRICE PER RUNNING:'; //[cite: 4]
    }
  };

  useEffect(() => {
    const p = parseFloat(price) || 0.0; //[cite: 4]
    const w = parseFloat(width) || 0.0; //[cite: 4]

    if (price === '' || width === '') {
      setResultText('0'); //[cite: 4]
    } else {
      const result = p * w; //[cite: 4]
      let s = result.toFixed(2); //[cite: 4]
      if (s.includes('.')) {
        s = s.replace(/0+$/, ''); //[cite: 4]
        if (s.endsWith('.')) s = s.slice(0, -1); //[cite: 4]
      }
      setResultText(s); //[cite: 4]
    }
  }, [price, width, selectedUnit]);

  const clear = () => {
    setPrice(''); setWidth(''); //[cite: 4]
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Price from Area to Running length.">
      <div className="grid grid-cols-1 gap-5 mb-8">
        
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-600 mb-2">Select Unit</label>
          <select 
            value={selectedUnit} 
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full h-[50px] px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-slate-700 font-medium appearance-none"
          >
            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <CustomInput label="Price" value={price} onChange={setPrice} placeholder="e.g. 150" icon={IndianRupee} />
        <CustomInput label={getWidthLabel()} value={width} onChange={setWidth} placeholder="e.g. 10" icon={Maximize} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-semibold mb-1 uppercase">{getResultLabel()}</span>
          <span className="text-3xl font-bold text-brand-orange">
            <span className="text-lg mr-1">₹</span>{resultText}
          </span>
        </div>
        <button onClick={clear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}