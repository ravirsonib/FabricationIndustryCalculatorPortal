import React, { useState, useEffect } from 'react';
import CalculatorView from '../../../CalculatorView';
import CustomInput from '../../../CustomInput';
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

export default function MeshCalculation({ title, image }) {
  // Inputs
  const [opening, setOpening] = useState('');
  const [wireDiameter, setWireDiameter] = useState('');

  // Units
  const [openingUnit, setOpeningUnit] = useState('mm');
  const [wireDiameterUnit, setWireDiameterUnit] = useState('mm');

  // Result
  const [meshValue, setMeshValue] = useState(0);

  useEffect(() => {
    const o = convertToMm(opening, openingUnit);
    const d = convertToMm(wireDiameter, wireDiameterUnit);

    if (o > 0 && d > 0) {
      // Mesh = 25.4 / (Opening + WireDiameter)
      const mesh = 25.4 / (o + d);
      setMeshValue(mesh);
    } else {
      setMeshValue(0);
    }
  }, [opening, wireDiameter, openingUnit, wireDiameterUnit]);

  const handleClear = () => {
    setOpening(''); setWireDiameter('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Mesh Count based on Opening and Wire Diameter.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Opening" value={opening} onChange={setOpening} placeholder="e.g. 10" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={openingUnit} onUnitChange={setOpeningUnit} />
        <CustomInput label="Wire Diameter" value={wireDiameter} onChange={setWireDiameter} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wireDiameterUnit} onUnitChange={setWireDiameterUnit} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-semibold mb-1">Mesh Count</span>
          <span className="text-3xl font-bold text-brand-blue">
            {meshValue > 0 ? meshValue.toFixed(2) : '0.00'} <span className="text-lg text-slate-400 font-medium">count</span>
          </span>
        </div>
        <button onClick={handleClear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}