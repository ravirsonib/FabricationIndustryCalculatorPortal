import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Circle, Activity, Layers, IndianRupee } from 'lucide-react';

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

export default function Round90CenterToCenterWpoCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');
  
  // Inputs
  const [holeDiameter, setHoleDiameter] = useState('');
  const [widthPitch, setWidthPitch] = useState('');
  const [lengthPitch, setLengthPitch] = useState('');
  const [thickness, setThickness] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [perfDiameter, setPerfDiameter] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [holeDiameterUnit, setHoleDiameterUnit] = useState('mm');
  const [widthPitchUnit, setWidthPitchUnit] = useState('mm');
  const [lengthPitchUnit, setLengthPitchUnit] = useState('mm');
  const [thickUnit, setThickUnit] = useState('mm');
  const [odUnit, setOdUnit] = useState('mm');
  const [pdUnit, setPdUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density; // kg/m3

    const hd = convertToMm(holeDiameter, holeDiameterUnit);
    const wp = convertToMm(widthPitch, widthPitchUnit);
    const lp = convertToMm(lengthPitch, lengthPitchUnit);
    
    let openAreaPercent = 0.0;
    if (hd > 0 && wp > 0 && lp > 0) {
      const holeArea = Math.PI * (hd / 2) * (hd / 2);
      const pitchArea = wp * lp;
      if (pitchArea > 0) {
        openAreaPercent = (holeArea / pitchArea) * 100;
      }
    }

    const odM = convertToMm(outerDiameter, odUnit) / 1000.0;
    const pdM = convertToMm(perfDiameter, pdUnit) / 1000.0;
    const tM = convertToMm(thickness, thickUnit) / 1000.0;
    const costPerKg = parseFloat(cost) || 0;

    if (odM > 0 && tM > 0) {
      const totalArea = Math.PI * (odM / 2) * (odM / 2);
      const perfArea = Math.PI * (pdM / 2) * (pdM / 2);
      let solidArea = totalArea - perfArea;
      if (solidArea < 0) solidArea = 0;

      const solidWeight = solidArea * tM * density;
      const perfWeight = perfArea * tM * density * (1 - (openAreaPercent / 100.0));
      
      const finalWeight = solidWeight + perfWeight;
      setTotalWeight(finalWeight);
      setTotalCost(finalWeight * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, holeDiameter, widthPitch, lengthPitch, thickness, outerDiameter, perfDiameter, cost, holeDiameterUnit, widthPitchUnit, lengthPitchUnit, thickUnit, odUnit, pdUnit]);

  const handleClear = () => { 
    setHoleDiameter(''); setWidthPitch(''); setLengthPitch('');
    setThickness(''); setOuterDiameter(''); setPerfDiameter(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate weight per OD for Round 90° Center to Center holes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        <CustomInput label="Hole Diameter" value={holeDiameter} onChange={setHoleDiameter} placeholder="e.g. 5" icon={Circle} unitOptions={COMMON_UNITS} selectedUnit={holeDiameterUnit} onUnitChange={setHoleDiameterUnit} />
        <CustomInput label="Width Pitch" value={widthPitch} onChange={setWidthPitch} placeholder="e.g. 8" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={widthPitchUnit} onUnitChange={setWidthPitchUnit} />
        <CustomInput label="Length Pitch" value={lengthPitch} onChange={setLengthPitch} placeholder="e.g. 8" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={lengthPitchUnit} onUnitChange={setLengthPitchUnit} />
        <CustomInput label="Thickness" value={thickness} onChange={setThickness} placeholder="e.g. 2" icon={Layers} unitOptions={COMMON_UNITS} selectedUnit={thickUnit} onUnitChange={setThickUnit} />
        
        <CustomInput label="Outer Diameter (OD)" value={outerDiameter} onChange={setOuterDiameter} placeholder="e.g. 1200" icon={Circle} unitOptions={COMMON_UNITS} selectedUnit={odUnit} onUnitChange={setOdUnit} />
        <CustomInput label="Perforation Diameter" value={perfDiameter} onChange={setPerfDiameter} placeholder="e.g. 1100" icon={Circle} unitOptions={COMMON_UNITS} selectedUnit={pdUnit} onUnitChange={setPdUnit} />
        
        <div className="md:col-span-2 mt-2">
          <CustomInput label="Cost per Kg (Optional)" value={cost} onChange={setCost} placeholder="e.g. 150" icon={IndianRupee} unitOptions={['/ kg']} selectedUnit="/ kg" />
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Total Weight</span>
            <span className="text-3xl font-bold text-brand-blue">{totalWeight > 0 ? totalWeight.toFixed(2) : '0.00'} <span className="text-lg text-slate-400 font-medium">kg</span></span>
          </div>
          <div className="w-px bg-slate-200 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Estimated Cost</span>
            <span className="text-3xl font-bold text-brand-orange"><span className="text-lg mr-1">₹</span>{totalCost > 0 ? totalCost.toFixed(2) : '0.00'}</span>
          </div>
        </div>
        <button onClick={handleClear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}