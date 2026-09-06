import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, IndianRupee } from 'lucide-react';

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

const COMMON_UNITS = ['mm', 'cm', 'inch', 'm', 'ft'];

export default function WeightPerRollWwCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');

  // Inputs
  const [widthOpening, setWidthOpening] = useState('');
  const [wireDiameterWidth, setWireDiameterWidth] = useState('');
  const [lengthOpening, setLengthOpening] = useState('');
  const [wireDiameterLength, setWireDiameterLength] = useState('');
  const [rollWidth, setRollWidth] = useState('');
  const [rollLength, setRollLength] = useState('');
  const [wastage, setWastage] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [wOpgUnit, setWOpgUnit] = useState('mm');
  const [wDiaWidthUnit, setWDiaWidthUnit] = useState('mm');
  const [lOpgUnit, setLOpgUnit] = useState('mm');
  const [wDiaLengthUnit, setWDiaLengthUnit] = useState('mm');
  const [widthUnit, setWidthUnit] = useState('mm');
  const [lengthUnit, setLengthUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density; // kg/m3

    const wOpg = convertToMm(widthOpening, wOpgUnit) / 1000;
    const wwd = convertToMm(wireDiameterWidth, wDiaWidthUnit) / 1000;
    const lOpg = convertToMm(lengthOpening, lOpgUnit) / 1000;
    const lwd = convertToMm(wireDiameterLength, wDiaLengthUnit) / 1000;
    const widthM = convertToMm(rollWidth, widthUnit) / 1000;
    const lengthM = convertToMm(rollLength, lengthUnit) / 1000;
    const wast = parseFloat(wastage) || 0;
    const costPerKg = parseFloat(cost) || 0;

    const pitchWidth = wOpg + wwd;
    const pitchLength = lOpg + lwd;

    if (pitchWidth > 0 && pitchLength > 0 && widthM > 0 && lengthM > 0) {
      const numberOfLineWires = Math.ceil(widthM / pitchWidth) + 1;
      const numberOfCrossWires = Math.ceil(lengthM / pitchLength) + 1;

      const widthWireArea = (Math.PI * Math.pow(wwd, 2)) / 4;
      const totalWidthWireLength = numberOfLineWires * lengthM;
      const widthWireVolume = totalWidthWireLength * widthWireArea;

      const lengthWireArea = (Math.PI * Math.pow(lwd, 2)) / 4;
      const totalLengthWireLength = numberOfCrossWires * widthM;
      const lengthWireVolume = totalLengthWireLength * lengthWireArea;

      const totalVolume = widthWireVolume + lengthWireVolume;
      const baseWeight = totalVolume * density;

      const weightWithWastage = baseWeight * (1 + (wast / 100));

      setTotalWeight(weightWithWastage);
      setTotalCost(weightWithWastage * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, widthOpening, wireDiameterWidth, lengthOpening, wireDiameterLength, rollWidth, rollLength, wastage, cost, wOpgUnit, wDiaWidthUnit, lOpgUnit, wDiaLengthUnit, widthUnit, lengthUnit]);

  const handleClear = () => { /* Clear states */ };

  return (
    <CalculatorView title={title} image={image} description="Calculate Weight Per Roll for Welded Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        <CustomInput label="Width Opening" value={widthOpening} onChange={setWidthOpening} placeholder="e.g. 5" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={wOpgUnit} onUnitChange={setWOpgUnit} />
        <CustomInput label="Wire Diameter (Width)" value={wireDiameterWidth} onChange={setWireDiameterWidth} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaWidthUnit} onUnitChange={setWDiaWidthUnit} />
        
        <CustomInput label="Length Opening" value={lengthOpening} onChange={setLengthOpening} placeholder="e.g. 15" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lOpgUnit} onUnitChange={setLOpgUnit} />
        <CustomInput label="Wire Diameter (Length)" value={wireDiameterLength} onChange={setWireDiameterLength} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaLengthUnit} onUnitChange={setWDiaLengthUnit} />
        
        <CustomInput label="Roll Width" value={rollWidth} onChange={setRollWidth} placeholder="e.g. 1200" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={widthUnit} onUnitChange={setWidthUnit} />
        <CustomInput label="Roll Length" value={rollLength} onChange={setRollLength} placeholder="e.g. 2400" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lengthUnit} onUnitChange={setLengthUnit} />
        
        <CustomInput label="Wastage (%)" value={wastage} onChange={setWastage} placeholder="e.g. 5" icon={Activity} unitOptions={['%']} selectedUnit="%" />
        <CustomInput label="Cost per Kg (Optional)" value={cost} onChange={setCost} placeholder="e.g. 150" icon={IndianRupee} unitOptions={['/ kg']} selectedUnit="/ kg" />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Total Weight</span>
            <span className="text-3xl font-bold text-brand-blue">{totalWeight > 0 ? totalWeight.toFixed(3) : '0.000'} <span className="text-lg text-slate-400 font-medium">kg</span></span>
          </div>
          <div className="w-px bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Estimated Cost</span>
            <span className="text-3xl font-bold text-brand-orange"><span className="text-lg mr-1">₹</span>{totalCost > 0 ? totalCost.toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>
    </CalculatorView>
  );
}