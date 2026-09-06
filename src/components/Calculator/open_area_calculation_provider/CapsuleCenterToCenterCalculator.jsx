import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import { Maximize, Activity } from 'lucide-react';

const convertToMm = (value, unit) => {
  const v = parseFloat(value) || 0;
  switch (unit) {
    case 'cm': return v * 10;
    case 'm': return v * 1000;
    case 'inch': return v * 25.4;
    case 'ft': return v * 304.8;
    default: return v; // 'mm'
  }
};

const COMMON_UNITS = ['mm', 'cm', 'inch'];

export default function CapsuleCenterToCenterCalculator({ title, image }) {
  // Input States
  const [widthHole, setWidthHole] = useState('');
  const [lengthHole, setLengthHole] = useState('');
  const [widthPitch, setWidthPitch] = useState('');
  const [lengthPitch, setLengthPitch] = useState('');

  // Units State
  const [widthHoleUnit, setWidthHoleUnit] = useState('mm');
  const [lengthHoleUnit, setLengthHoleUnit] = useState('mm');
  const [widthPitchUnit, setWidthPitchUnit] = useState('mm');
  const [lengthPitchUnit, setLengthPitchUnit] = useState('mm');

  // Result State 
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const wHole = convertToMm(widthHole, widthHoleUnit);
    const lHole = convertToMm(lengthHole, lengthHoleUnit);
    const wPitch = convertToMm(widthPitch, widthPitchUnit);
    const lPitch = convertToMm(lengthPitch, lengthPitchUnit);

    if (wHole > 0 && lHole > 0 && wPitch > 0 && lPitch > 0) {
      const radius = wHole / 2;
      
      const holeArea = ((lHole - wHole) * wHole) + (Math.PI * radius * radius);
      const pitchArea = wPitch * lPitch;
      
      const openArea = (holeArea / pitchArea) * 100;
      
      setOpenAreaPercent(openArea);
    } else {
      setOpenAreaPercent(0);
    }
  }, [widthHole, lengthHole, widthPitch, lengthPitch, widthHoleUnit, lengthHoleUnit, widthPitchUnit, lengthPitchUnit]);

  const handleClear = () => {
    setWidthHole(''); setLengthHole(''); setWidthPitch(''); setLengthPitch('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate the open area percentage for capsule center to center holes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        <CustomInput 
          label="Width Hole" 
          value={widthHole} 
          onChange={setWidthHole} 
          placeholder="e.g. 10" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={widthHoleUnit}
          onUnitChange={setWidthHoleUnit}
        />
        <CustomInput 
          label="Length Hole" 
          value={lengthHole} 
          onChange={setLengthHole} 
          placeholder="e.g. 20" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={lengthHoleUnit}
          onUnitChange={setLengthHoleUnit}
        />

        <CustomInput 
          label="Width Pitch" 
          value={widthPitch} 
          onChange={setWidthPitch} 
          placeholder="e.g. 15" 
          icon={Activity}
          unitOptions={COMMON_UNITS}
          selectedUnit={widthPitchUnit}
          onUnitChange={setWidthPitchUnit}
        />
        <CustomInput 
          label="Length Pitch" 
          value={lengthPitch} 
          onChange={setLengthPitch} 
          placeholder="e.g. 25" 
          icon={Activity}
          unitOptions={COMMON_UNITS}
          selectedUnit={lengthPitchUnit}
          onUnitChange={setLengthPitchUnit}
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-semibold mb-1">Open Area</span>
          <span className="text-3xl font-bold text-brand-blue">
            {openAreaPercent > 0 ? openAreaPercent.toFixed(2) : '0.00'} <span className="text-lg text-slate-400 font-medium">%</span>
          </span>
        </div>

        <button 
          onClick={handleClear}
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all w-full md:w-auto"
        >
          Clear Data
        </button>
      </div>
    </CalculatorView>
  );
}