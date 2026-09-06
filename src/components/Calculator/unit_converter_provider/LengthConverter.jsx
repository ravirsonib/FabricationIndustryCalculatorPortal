import React, { useState } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import { ArrowDownUp, Activity } from 'lucide-react';

const UNITS = [
  'Meter(m)', 'Centimeter(cm)', 'Millimeter(mm)', 'Foot(ft)', 
  'Inch(in)', 'Micron (u)', 'FtInch', 'Yard (Y)'
]; //[cite: 3]

const MULTIPLIERS = {
  'Meter(m)': 1.0,
  'Centimeter(cm)': 0.01,
  'Millimeter(mm)': 0.001,
  'Foot(ft)': 0.3048,
  'Inch(in)': 0.0254,
  'Micron (u)': 0.000001,
  'FtInch': 0.3048,
  'Yard (Y)': 0.9144,
}; //[cite: 3]

const formatValue = (value) => {
  if (value === 0) return '0';
  let s = value.toString();
  if (s.includes('e')) return s; //[cite: 3]
  if (s.includes('.')) {
    s = s.replace(/0+$/, ''); //[cite: 3]
    if (s.endsWith('.')) s = s.slice(0, -1); //[cite: 3]
  }
  return s;
}; //[cite: 3]

export default function LengthConverter({ title, image }) {
  const [topValue, setTopValue] = useState('');
  const [bottomValue, setBottomValue] = useState('');
  const [topUnit, setTopUnit] = useState('Meter(m)'); //[cite: 3]
  const [bottomUnit, setBottomUnit] = useState('Millimeter(mm)'); //[cite: 3]

  const calculateBottom = (topVal, tUnit, bUnit) => {
    if (!topVal) return '';
    const num = parseFloat(topVal);
    if (isNaN(num)) return '';
    const meter = num * MULTIPLIERS[tUnit]; //[cite: 3]
    const result = meter / MULTIPLIERS[bUnit]; //[cite: 3]
    return formatValue(result); //[cite: 3]
  };

  const calculateTop = (bottomVal, tUnit, bUnit) => {
    if (!bottomVal) return '';
    const num = parseFloat(bottomVal);
    if (isNaN(num)) return '';
    const meter = num * MULTIPLIERS[bUnit]; //[cite: 3]
    const result = meter / MULTIPLIERS[tUnit]; //[cite: 3]
    return formatValue(result); //[cite: 3]
  };

  const handleTopChange = (val) => {
    setTopValue(val);
    setBottomValue(calculateBottom(val, topUnit, bottomUnit));
  };

  const handleBottomChange = (val) => {
    setBottomValue(val);
    setTopValue(calculateTop(val, topUnit, bottomUnit));
  };

  const handleTopUnitChange = (newUnit) => {
    setTopUnit(newUnit);
    setBottomValue(calculateBottom(topValue, newUnit, bottomUnit)); //[cite: 3]
  };

  const handleBottomUnitChange = (newUnit) => {
    setBottomUnit(newUnit);
    setBottomValue(calculateBottom(topValue, topUnit, newUnit)); //[cite: 3]
  };

  const swapUnits = () => {
    const tempUnit = topUnit; //[cite: 3]
    const tempVal = topValue; //[cite: 3]
    setTopUnit(bottomUnit); //[cite: 3]
    setBottomUnit(tempUnit); //[cite: 3]
    setTopValue(bottomValue); //[cite: 3]
    setBottomValue(tempVal); //[cite: 3]
  }; //[cite: 3]

  const clear = () => {
    setTopValue(''); setBottomValue('');
  }; //[cite: 3]

  return (
    <CalculatorView title={title} image={image} description="Convert Length units effortlessly.">
      <div className="flex flex-col gap-4 mb-8 relative">
        <CustomInput label="From" value={topValue} onChange={handleTopChange} placeholder="Enter value" icon={Activity} unitOptions={UNITS} selectedUnit={topUnit} onUnitChange={handleTopUnitChange} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center w-full max-w-[200px] pointer-events-none">
            <button onClick={swapUnits} className="pointer-events-auto bg-brand-blue text-white p-3 rounded-full hover:bg-brand-blue/90 shadow-lg transition-all active:scale-95">
                <ArrowDownUp size={20} />
            </button>
        </div>

        <CustomInput label="To" value={bottomValue} onChange={handleBottomChange} placeholder="Enter value" icon={Activity} unitOptions={UNITS} selectedUnit={bottomUnit} onUnitChange={handleBottomUnitChange} />
      </div>

      <div className="flex justify-end">
        <button onClick={clear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}