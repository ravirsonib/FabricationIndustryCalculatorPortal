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

export default function RectangularWireMeshOpenAreaCalculator({ title, image }) {
  // Inputs[cite: 15]
  const [widthMesh, setWidthMesh] = useState('');
  const [wireDiameter1, setWireDiameter1] = useState('');
  const [lengthMesh, setLengthMesh] = useState('');
  const [wireDiameter2, setWireDiameter2] = useState('');

  // Units[cite: 15]
  const [wmUnit, setWmUnit] = useState('mm');
  const [wd1Unit, setWd1Unit] = useState('mm');
  const [lmUnit, setLmUnit] = useState('mm');
  const [wd2Unit, setWd2Unit] = useState('mm');

  // Result
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const wm = convertToMm(widthMesh, wmUnit);
    const wd1 = convertToMm(wireDiameter1, wd1Unit);
    const lm = convertToMm(lengthMesh, lmUnit);
    const wd2 = convertToMm(wireDiameter2, wd2Unit);

    if (wm > 0 && wd1 > 0 && lm > 0 && wd2 > 0) {
      // Rectangular Wire Mesh Open Area Calculation[cite: 15]
      const openArea = (wm * lm) / ((wm + wd1) * (lm + wd2)) * 100;
      setOpenAreaPercent(openArea > 100 ? 100 : openArea);
    } else {
      setOpenAreaPercent(0);
    }
  }, [widthMesh, wireDiameter1, lengthMesh, wireDiameter2, wmUnit, wd1Unit, lmUnit, wd2Unit]);

  const handleClear = () => {
    setWidthMesh(''); setWireDiameter1(''); setLengthMesh(''); setWireDiameter2('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Open Area (%) for Rectangular Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Mesh Width" value={widthMesh} onChange={setWidthMesh} placeholder="e.g. 10" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={wmUnit} onUnitChange={setWmUnit} />
        <CustomInput label="Wire Diameter 1" value={wireDiameter1} onChange={setWireDiameter1} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wd1Unit} onUnitChange={setWd1Unit} />
        <CustomInput label="Mesh Length" value={lengthMesh} onChange={setLengthMesh} placeholder="e.g. 20" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lmUnit} onUnitChange={setLmUnit} />
        <CustomInput label="Wire Diameter 2" value={wireDiameter2} onChange={setWireDiameter2} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wd2Unit} onUnitChange={setWd2Unit} />
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