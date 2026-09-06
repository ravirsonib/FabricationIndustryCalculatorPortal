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

export default function HarpWireMeshOpenAreaCalculator({ title, image }) {
  // Inputs
  const [widthOpening, setWidthOpening] = useState('');
  const [wireDiameter, setWireDiameter] = useState('');
  const [lengthOpening, setLengthOpening] = useState('');
  const [lengthOpening1, setLengthOpening1] = useState('');
  const [wireDiameter2, setWireDiameter2] = useState('');

  // Units
  const [wOpgUnit, setWOpgUnit] = useState('mm');
  const [wdUnit, setWdUnit] = useState('mm');
  const [lOpgUnit, setLOpgUnit] = useState('mm');
  const [lOpg1Unit, setLOpg1Unit] = useState('mm');
  const [wd2Unit, setWd2Unit] = useState('mm');

  // Result
  const [openAreaPercent, setOpenAreaPercent] = useState(0);

  useEffect(() => {
    const wOpg = convertToMm(widthOpening, wOpgUnit);
    const wd1 = convertToMm(wireDiameter, wdUnit);
    const lOpg = convertToMm(lengthOpening, lOpgUnit);
    const lOpg1 = convertToMm(lengthOpening1, lOpg1Unit);
    const wd2 = convertToMm(wireDiameter2, wd2Unit);

    if (wOpg > 0 && wd1 > 0 && lOpg > 0 && lOpg1 > 0 && wd2 > 0) {
      // Harp Wire Mesh Open Area Calculation[cite: 15]
      const openArea = (wOpg * (lOpg + lOpg1)) / ((wOpg + wd1) * (lOpg + lOpg1 + wd2)) * 100;
      setOpenAreaPercent(openArea > 100 ? 100 : openArea);
    } else {
      setOpenAreaPercent(0);
    }
  }, [widthOpening, wireDiameter, lengthOpening, lengthOpening1, wireDiameter2, wOpgUnit, wdUnit, lOpgUnit, lOpg1Unit, wd2Unit]);

  const handleClear = () => {
    setWidthOpening(''); setWireDiameter(''); setLengthOpening(''); setLengthOpening1(''); setWireDiameter2('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Open Area (%) for Harp Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Width Opening" value={widthOpening} onChange={setWidthOpening} placeholder="e.g. 5" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={wOpgUnit} onUnitChange={setWOpgUnit} />
        <CustomInput label="Wire Diameter" value={wireDiameter} onChange={setWireDiameter} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wdUnit} onUnitChange={setWdUnit} />
        <CustomInput label="Length Opening" value={lengthOpening} onChange={setLengthOpening} placeholder="e.g. 10" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lOpgUnit} onUnitChange={setLOpgUnit} />
        <CustomInput label="Length Opening 1" value={lengthOpening1} onChange={setLengthOpening1} placeholder="e.g. 12" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lOpg1Unit} onUnitChange={setLOpg1Unit} />
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