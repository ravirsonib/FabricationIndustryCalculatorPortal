import React, { useState } from 'react';
import CalculatorView from '../../../CalculatorView';
import CustomInput from '../../../CustomInput';
import { ArrowDownUp, IndianRupee } from 'lucide-react';

const UNITS = [
  'Price per square Meter',
  'Price per square Foot',
  'Price per square Inch',
  'Price per circle',
]; //[cite: 4]

const MULTIPLIERS = {
  'Price per square Meter': 1.0,
  'Price per square Foot': 10.76391,
  'Price per square Inch': 1550.0031,
  'Price per circle': 1.0, 
}; //[cite: 4]

const formatValue = (value) => {
  if (value === 0) return '0'; //[cite: 4]
  let s = value.toFixed(4); //[cite: 4]
  if (s.includes('.')) {
    s = s.replace(/0+$/, ''); //[cite: 4]
    if (s.endsWith('.')) s = s.slice(0, -1); //[cite: 4]
  }
  return s; //[cite: 4]
};

export default function AreaToAreaPriceCalculator({ title, image }) {
  const [topValue, setTopValue] = useState('');
  const [bottomValue, setBottomValue] = useState('');
  const [topUnit, setTopUnit] = useState('Price per square Meter'); //[cite: 4]
  const [bottomUnit, setBottomUnit] = useState('Price per square Inch'); //[cite: 4]

  const calculateBottom = (topVal, tUnit, bUnit) => {
    if (!topVal) return '';
    const num = parseFloat(topVal);
    if (isNaN(num)) return '';
    const pricePerSqM = num * MULTIPLIERS[tUnit]; //[cite: 4]
    const result = pricePerSqM / MULTIPLIERS[bUnit]; //[cite: 4]
    return formatValue(result); //[cite: 4]
  };

  const calculateTop = (bottomVal, tUnit, bUnit) => {
    if (!bottomVal) return '';
    const num = parseFloat(bottomVal);
    if (isNaN(num)) return '';
    const pricePerSqM = num * MULTIPLIERS[bUnit]; //[cite: 4]
    const result = pricePerSqM / MULTIPLIERS[tUnit]; //[cite: 4]
    return formatValue(result); //[cite: 4]
  };

  const handleTopChange = (val) => {
    setTopValue(val);
    setBottomValue(calculateBottom(val, topUnit, bottomUnit)); //[cite: 4]
  };

  const handleBottomChange = (val) => {
    setBottomValue(val);
    setTopValue(calculateTop(val, topUnit, bottomUnit)); //[cite: 4]
  };

  const handleTopUnitChange = (newUnit) => {
    setTopUnit(newUnit);
    setBottomValue(calculateBottom(topValue, newUnit, bottomUnit)); //[cite: 4]
  };

  const handleBottomUnitChange = (newUnit) => {
    setBottomUnit(newUnit);
    setBottomValue(calculateBottom(topValue, topUnit, newUnit)); //[cite: 4]
  };

  const swapUnits = () => {
    const tempUnit = topUnit; //[cite: 4]
    const tempVal = topValue; //[cite: 4]
    setTopUnit(bottomUnit); //[cite: 4]
    setBottomUnit(tempUnit); //[cite: 4]
    setTopValue(bottomValue); //[cite: 4]
    setBottomValue(tempVal); //[cite: 4]
  }; //[cite: 4]

  const clear = () => {
    setTopValue(''); setBottomValue(''); //[cite: 4]
  };

  return (
    <CalculatorView title={title} image={image} description="Convert Price Area to Area units.">
      <div className="flex flex-col gap-4 mb-8 relative">
        <CustomInput label="From" value={topValue} onChange={handleTopChange} placeholder="Enter price" icon={IndianRupee} unitOptions={UNITS} selectedUnit={topUnit} onUnitChange={handleTopUnitChange} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center w-full max-w-[200px] pointer-events-none">
            <button onClick={swapUnits} className="pointer-events-auto bg-brand-blue text-white p-3 rounded-full hover:bg-brand-blue/90 shadow-lg transition-all active:scale-95">
                <ArrowDownUp size={20} />
            </button>
        </div>

        <CustomInput label="To" value={bottomValue} onChange={handleBottomChange} placeholder="Enter price" icon={IndianRupee} unitOptions={UNITS} selectedUnit={bottomUnit} onUnitChange={handleBottomUnitChange} />
      </div>

      <div className="flex justify-end">
        <button onClick={clear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}