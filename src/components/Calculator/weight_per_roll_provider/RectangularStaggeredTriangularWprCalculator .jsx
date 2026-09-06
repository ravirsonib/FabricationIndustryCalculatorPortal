import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, Layers, IndianRupee } from 'lucide-react';

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

export default function RectangularStaggeredTriangularWprCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');
  
  // Inputs
  const [widthHole, setWidthHole] = useState('');
  const [lengthHole, setLengthHole] = useState('');
  const [widthPitch, setWidthPitch] = useState('');
  const [lengthPitch, setLengthPitch] = useState('');
  const [thickness, setThickness] = useState('');
  const [sheetWidth, setSheetWidth] = useState('');
  const [sheetLength, setSheetLength] = useState('');
  const [perfWidth, setPerfWidth] = useState('');
  const [perfLength, setPerfLength] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [whUnit, setWhUnit] = useState('mm');
  const [lhUnit, setLhUnit] = useState('mm');
  const [wpUnit, setWpUnit] = useState('mm');
  const [lpUnit, setLpUnit] = useState('mm');
  const [thickUnit, setThickUnit] = useState('mm');
  const [swUnit, setSwUnit] = useState('mm');
  const [slUnit, setSlUnit] = useState('mm');
  const [pwUnit, setPwUnit] = useState('mm');
  const [plUnit, setPlUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density; // kg/m3

    const wh = convertToMm(widthHole, whUnit);
    const lh = convertToMm(lengthHole, lhUnit);
    const wp = convertToMm(widthPitch, wpUnit);
    const lp = convertToMm(lengthPitch, lpUnit);
    
    let openAreaPercent = 0.0;
    if (wh > 0 && lh > 0 && wp > 0 && lp > 0) {
      const radius = wh / 2;
      const holeArea = ((lh - wh) * wh) + (Math.PI * radius * radius);
      const pitchArea = wp * lp;
      if (pitchArea > 0) openAreaPercent = (holeArea / pitchArea) * 100;
    }

    const swM = convertToMm(sheetWidth, swUnit) / 1000.0;
    const slM = convertToMm(sheetLength, slUnit) / 1000.0;
    const pwM = convertToMm(perfWidth, pwUnit) / 1000.0;
    const plM = convertToMm(perfLength, plUnit) / 1000.0;
    const tM = convertToMm(thickness, thickUnit) / 1000.0;
    const costPerKg = parseFloat(cost) || 0;

    if (swM > 0 && slM > 0 && tM > 0) {
      const totalArea = swM * slM;
      const perfArea = pwM * plM;
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
  }, [materialId, widthHole, lengthHole, widthPitch, lengthPitch, thickness, sheetWidth, sheetLength, perfWidth, perfLength, cost, whUnit, lhUnit, wpUnit, lpUnit, thickUnit, swUnit, slUnit, pwUnit, plUnit]);

  const handleClear = () => { 
    setWidthHole(''); setLengthHole(''); setWidthPitch(''); setLengthPitch('');
    setThickness(''); setSheetWidth(''); setSheetLength(''); setPerfWidth(''); setPerfLength(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate weight per roll for Rectangular Staggered Triangular holes.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        {/* Hole & Pitch */}
        <CustomInput label="Width Hole" value={widthHole} onChange={setWidthHole} placeholder="e.g. 5" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={whUnit} onUnitChange={setWhUnit} />
        <CustomInput label="Length Hole" value={lengthHole} onChange={setLengthHole} placeholder="e.g. 15" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lhUnit} onUnitChange={setLhUnit} />
        <CustomInput label="Width Pitch" value={widthPitch} onChange={setWidthPitch} placeholder="e.g. 10" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wpUnit} onUnitChange={setWpUnit} />
        <CustomInput label="Length Pitch" value={lengthPitch} onChange={setLengthPitch} placeholder="e.g. 20" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={lpUnit} onUnitChange={setLpUnit} />
        
        {/* Dimensions */}
        <CustomInput label="Thickness" value={thickness} onChange={setThickness} placeholder="e.g. 2" icon={Layers} unitOptions={COMMON_UNITS} selectedUnit={thickUnit} onUnitChange={setThickUnit} />
        <div className="hidden md:block"></div>
        <CustomInput label="Sheet Width" value={sheetWidth} onChange={setSheetWidth} placeholder="e.g. 1200" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={swUnit} onUnitChange={setSwUnit} />
        <CustomInput label="Sheet Length" value={sheetLength} onChange={setSheetLength} placeholder="e.g. 2400" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={slUnit} onUnitChange={setSlUnit} />
        <CustomInput label="Perforation Width" value={perfWidth} onChange={setPerfWidth} placeholder="e.g. 1100" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={pwUnit} onUnitChange={setPwUnit} />
        <CustomInput label="Perforation Length" value={perfLength} onChange={setPerfLength} placeholder="e.g. 2300" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={plUnit} onUnitChange={setPlUnit} />
        
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
      </div>
    </CalculatorView>
  );
}