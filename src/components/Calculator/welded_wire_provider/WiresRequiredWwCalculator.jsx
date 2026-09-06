import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import { Maximize, Activity } from 'lucide-react';

const convertToMm = (value, unit) => { /* Same logic */ 
  const v = parseFloat(value) || 0;
  switch (unit) {
    case 'cm': return v * 10;
    case 'm': return v * 1000;
    case 'inch': return v * 25.4;
    case 'ft': return v * 304.8;
    default: return v;
  }
};

const COMMON_UNITS = ['mm', 'cm', 'inch', 'm', 'ft'];

export default function WiresRequiredWwCalculator({ title, image }) {
  // Inputs
  const [widthOpening, setWidthOpening] = useState('');
  const [wireDiameterWidth, setWireDiameterWidth] = useState('');
  const [lengthOpening, setLengthOpening] = useState('');
  const [wireDiameterLength, setWireDiameterLength] = useState('');
  const [rollWidth, setRollWidth] = useState('');
  const [rollLength, setRollLength] = useState('');

  // Units
  const [wOpgUnit, setWOpgUnit] = useState('mm');
  const [wDiaWidthUnit, setWDiaWidthUnit] = useState('mm');
  const [lOpgUnit, setLOpgUnit] = useState('mm');
  const [wDiaLengthUnit, setWDiaLengthUnit] = useState('mm');
  const [widthUnit, setWidthUnit] = useState('mm');
  const [lengthUnit, setLengthUnit] = useState('mm');

  // Results
  const [numberOfLineWires, setNumberOfLineWires] = useState(0);
  const [numberOfCrossWires, setNumberOfCrossWires] = useState(0);

  useEffect(() => {
    const wOpg = convertToMm(widthOpening, wOpgUnit) / 1000;
    const wwd = convertToMm(wireDiameterWidth, wDiaWidthUnit) / 1000;
    const lOpg = convertToMm(lengthOpening, lOpgUnit) / 1000;
    const lwd = convertToMm(wireDiameterLength, wDiaLengthUnit) / 1000;
    const widthM = convertToMm(rollWidth, widthUnit) / 1000;
    const lengthM = convertToMm(rollLength, lengthUnit) / 1000;

    const pitchWidth = wOpg + wwd;
    const pitchLength = lOpg + lwd;

    if (pitchWidth > 0 && pitchLength > 0 && widthM > 0 && lengthM > 0) {
      setNumberOfLineWires(Math.ceil(widthM / pitchWidth) + 1);
      setNumberOfCrossWires(Math.ceil(lengthM / pitchLength) + 1);
    } else {
      setNumberOfLineWires(0); setNumberOfCrossWires(0);
    }
  }, [widthOpening, wireDiameterWidth, lengthOpening, wireDiameterLength, rollWidth, rollLength, wOpgUnit, wDiaWidthUnit, lOpgUnit, wDiaLengthUnit, widthUnit, lengthUnit]);

  return (
    <CalculatorView title={title} image={image} description="Calculate Number of Wires Required for Welded Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <CustomInput label="Width Opening" value={widthOpening} onChange={setWidthOpening} placeholder="e.g. 5" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={wOpgUnit} onUnitChange={setWOpgUnit} />
        <CustomInput label="Wire Diameter (Width)" value={wireDiameterWidth} onChange={setWireDiameterWidth} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaWidthUnit} onUnitChange={setWDiaWidthUnit} />
        
        <CustomInput label="Length Opening" value={lengthOpening} onChange={setLengthOpening} placeholder="e.g. 15" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lOpgUnit} onUnitChange={setLOpgUnit} />
        <CustomInput label="Wire Diameter (Length)" value={wireDiameterLength} onChange={setWireDiameterLength} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaLengthUnit} onUnitChange={setWDiaLengthUnit} />
        
        <CustomInput label="Roll Width" value={rollWidth} onChange={setRollWidth} placeholder="e.g. 1200" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={widthUnit} onUnitChange={setWidthUnit} />
        <CustomInput label="Roll Length" value={rollLength} onChange={setRollLength} placeholder="e.g. 2400" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lengthUnit} onUnitChange={setLengthUnit} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Line Wires</span>
            <span className="text-3xl font-bold text-brand-blue">{numberOfLineWires}</span>
          </div>
          <div className="w-px bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Cross Wires</span>
            <span className="text-3xl font-bold text-brand-orange">{numberOfCrossWires}</span>
          </div>
        </div>
      </div>
    </CalculatorView>
  );
}