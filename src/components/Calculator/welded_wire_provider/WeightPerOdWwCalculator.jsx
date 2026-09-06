import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, Circle, IndianRupee } from 'lucide-react';

const convertToMm = (value, unit) => { /* Same convert function */ 
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

export default function WeightPerOdWwCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');

  // Inputs
  const [widthOpening, setWidthOpening] = useState('');
  const [wireDiameterWidth, setWireDiameterWidth] = useState('');
  const [lengthOpening, setLengthOpening] = useState('');
  const [wireDiameterLength, setWireDiameterLength] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [wastage, setWastage] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [wOpgUnit, setWOpgUnit] = useState('mm');
  const [wDiaWidthUnit, setWDiaWidthUnit] = useState('mm');
  const [lOpgUnit, setLOpgUnit] = useState('mm');
  const [wDiaLengthUnit, setWDiaLengthUnit] = useState('mm');
  const [odUnit, setOdUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density;

    const wOpg = convertToMm(widthOpening, wOpgUnit) / 1000;
    const wwd = convertToMm(wireDiameterWidth, wDiaWidthUnit) / 1000;
    const lOpg = convertToMm(lengthOpening, lOpgUnit) / 1000;
    const lwd = convertToMm(wireDiameterLength, wDiaLengthUnit) / 1000;
    const od = convertToMm(outerDiameter, odUnit) / 1000;
    const wast = parseFloat(wastage) || 0;
    const costPerKg = parseFloat(cost) || 0;

    const pitchWidth = wOpg + wwd;
    const pitchLength = lOpg + lwd;

    if (pitchWidth > 0 && pitchLength > 0 && od > 0) {
      // Per sq meter calculation
      const widthM = 1.0;
      const lengthM = 1.0;
      
      const numberOfLineWires = Math.ceil(widthM / pitchWidth) + 1;
      const numberOfCrossWires = Math.ceil(lengthM / pitchLength) + 1;

      const widthWireVolume = numberOfLineWires * lengthM * ((Math.PI * Math.pow(wwd, 2)) / 4);
      const lengthWireVolume = numberOfCrossWires * widthM * ((Math.PI * Math.pow(lwd, 2)) / 4);

      const weightPerM2 = (widthWireVolume + lengthWireVolume) * density;

      // Circular Area
      const areaOfMesh = (Math.PI * Math.pow(od, 2)) / 4;

      const weightWithWastage = (weightPerM2 * areaOfMesh) * (1 + (wast / 100));

      setTotalWeight(weightWithWastage);
      setTotalCost(weightWithWastage * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, widthOpening, wireDiameterWidth, lengthOpening, wireDiameterLength, outerDiameter, wastage, cost, wOpgUnit, wDiaWidthUnit, lOpgUnit, wDiaLengthUnit, odUnit]);

  return (
    <CalculatorView title={title} image={image} description="Calculate Weight Per OD for Welded Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        <CustomInput label="Width Opening" value={widthOpening} onChange={setWidthOpening} placeholder="e.g. 5" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={wOpgUnit} onUnitChange={setWOpgUnit} />
        <CustomInput label="Wire Diameter (Width)" value={wireDiameterWidth} onChange={setWireDiameterWidth} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaWidthUnit} onUnitChange={setWDiaWidthUnit} />
        
        <CustomInput label="Length Opening" value={lengthOpening} onChange={setLengthOpening} placeholder="e.g. 15" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lOpgUnit} onUnitChange={setLOpgUnit} />
        <CustomInput label="Wire Diameter (Length)" value={wireDiameterLength} onChange={setWireDiameterLength} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wDiaLengthUnit} onUnitChange={setWDiaLengthUnit} />
        
        <CustomInput label="Outer Diameter (OD)" value={outerDiameter} onChange={setOuterDiameter} placeholder="e.g. 1200" icon={Circle} unitOptions={COMMON_UNITS} selectedUnit={odUnit} onUnitChange={setOdUnit} />
        <div className="hidden md:block"></div>
        
        <CustomInput label="Wastage (%)" value={wastage} onChange={setWastage} placeholder="e.g. 5" icon={Activity} unitOptions={['%']} selectedUnit="%" />
        <CustomInput label="Cost per Kg" value={cost} onChange={setCost} placeholder="e.g. 150" icon={IndianRupee} unitOptions={['/ kg']} selectedUnit="/ kg" />
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