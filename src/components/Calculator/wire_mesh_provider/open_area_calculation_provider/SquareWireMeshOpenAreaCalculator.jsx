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

export default function SquareWireMeshOpenAreaCalculator({ title, image }) {
  // Inputs
  const [meshCount, setMeshCount] = useState('');
  const [wireDiameter, setWireDiameter] = useState('');

  // Units
  const [wdUnit, setWdUnit] = useState('mm');

  // Result
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const m = parseFloat(meshCount) || 0;
    const dMm = convertToMm(wireDiameter, wdUnit);

    if (m > 0 && dMm > 0) {
      const dInch = dMm / 25.4;
      
      // Handle case where wire diameter is larger than pitch
      if (m * dInch >= 1.0) {
        setOpenAreaPercent(0);
      } else {
        const openArea = Math.pow((1 - (m * dInch)), 2) * 100;
        setOpenAreaPercent(openArea);
      }
    } else {
      setOpenAreaPercent(0);
    }
  }, [meshCount, wireDiameter, wdUnit]);

  const handleClear = () => {
    setMeshCount(''); setWireDiameter('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Open Area (%) for Square Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Mesh (Count)" value={meshCount} onChange={setMeshCount} placeholder="e.g. 10" icon={Maximize} unitOptions={['count']} selectedUnit="count" />
        <CustomInput label="Wire Diameter" value={wireDiameter} onChange={setWireDiameter} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wdUnit} onUnitChange={setWdUnit} />
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