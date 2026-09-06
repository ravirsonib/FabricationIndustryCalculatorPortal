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
    default: return v;
  }
};

const COMMON_UNITS = ['mm', 'cm', 'inch'];

export default function HexagonalStaggeredTriangularCalculator({ title, image }) {
  // Input States
  const [hexagonalHole, setHexagonalHole] = useState('');
  const [pitch, setPitch] = useState('');

  // Units State
  const [hexagonalHoleUnit, setHexagonalHoleUnit] = useState('mm');
  const [pitchUnit, setPitchUnit] = useState('mm');

  // Result State
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const hexHoleMm = convertToMm(hexagonalHole, hexagonalHoleUnit);
    const pitchMm = convertToMm(pitch, pitchUnit);

    if (hexHoleMm > 0 && pitchMm > 0) {
      // Standard Formula for Hexagonal Staggered Holes
      const openArea = (Math.pow(hexHoleMm, 2) / Math.pow(pitchMm, 2)) * 100;
      
      setOpenAreaPercent(openArea > 100 ? 100 : openArea);
    } else {
      setOpenAreaPercent(0);
    }
  }, [hexagonalHole, pitch, hexagonalHoleUnit, pitchUnit]);

  const handleClear = () => {
    setHexagonalHole(''); setPitch('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate the open area percentage for Hexagonal Staggered Triangular Holes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        <CustomInput 
          label="Hexagonal Hole (Width Across Flats)" 
          value={hexagonalHole} 
          onChange={setHexagonalHole} 
          placeholder="e.g. 10" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={hexagonalHoleUnit}
          onUnitChange={setHexagonalHoleUnit}
        />

        <CustomInput 
          label="Pitch" 
          value={pitch} 
          onChange={setPitch} 
          placeholder="e.g. 12" 
          icon={Activity}
          unitOptions={COMMON_UNITS}
          selectedUnit={pitchUnit}
          onUnitChange={setPitchUnit}
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