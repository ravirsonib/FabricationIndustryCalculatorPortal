import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import { Square, Activity } from 'lucide-react';

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

export default function SquareCenterToCenterCalculator({ title, image }) {
  // Input States[cite: 9]
  const [squareHole, setSquareHole] = useState('');
  const [widthPitch, setWidthPitch] = useState('');
  const [lengthPitch, setLengthPitch] = useState('');

  // Units State[cite: 9]
  const [squareHoleUnit, setSquareHoleUnit] = useState('mm');
  const [widthPitchUnit, setWidthPitchUnit] = useState('mm');
  const [lengthPitchUnit, setLengthPitchUnit] = useState('mm');

  // Result State
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const squareHoleMm = convertToMm(squareHole, squareHoleUnit);
    const wPitchMm = convertToMm(widthPitch, widthPitchUnit);
    const lPitchMm = convertToMm(lengthPitch, lengthPitchUnit);

    if (squareHoleMm > 0 && wPitchMm > 0 && lPitchMm > 0) {
      const holeArea = squareHoleMm * squareHoleMm;
      const pitchArea = wPitchMm * lPitchMm;
      
      const openArea = (holeArea / pitchArea) * 100;
      setOpenAreaPercent(openArea > 100 ? 100 : openArea);
    } else {
      setOpenAreaPercent(0);
    }
  }, [squareHole, widthPitch, lengthPitch, squareHoleUnit, widthPitchUnit, lengthPitchUnit]);

  const handleClear = () => {
    setSquareHole(''); setWidthPitch(''); setLengthPitch('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate the open area percentage for Square Center to Center holes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Square Hole Size" value={squareHole} onChange={setSquareHole} placeholder="e.g. 5" icon={Square} unitOptions={COMMON_UNITS} selectedUnit={squareHoleUnit} onUnitChange={setSquareHoleUnit} />
        <CustomInput label="Width Pitch" value={widthPitch} onChange={setWidthPitch} placeholder="e.g. 10" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={widthPitchUnit} onUnitChange={setWidthPitchUnit} />
        <CustomInput label="Length Pitch" value={lengthPitch} onChange={setLengthPitch} placeholder="e.g. 10" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={lengthPitchUnit} onUnitChange={setLengthPitchUnit} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-semibold mb-1">Open Area</span>
          <span className="text-3xl font-bold text-brand-blue">
            {openAreaPercent > 0 ? openAreaPercent.toFixed(2) : '0.00'} <span className="text-lg text-slate-400 font-medium">%</span>
          </span>
        </div>
        <button onClick={handleClear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}