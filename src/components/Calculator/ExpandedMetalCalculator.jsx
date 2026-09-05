import React, { useState, useEffect } from 'react';
import CalculatorView from '../CalculatorView';
import CustomInput from '../CustomInput';
import SearchableMaterialSelector from '../SearchableMaterialSelector';
import { materialsData } from '../../data/materials';
import { Maximize, Divide, IndianRupee, MoveDiagonal, Layers } from 'lucide-react';

// Unit conversion helper (Same as before)
const convertToMm = (value, unit) => {
  const v = parseFloat(value) || 0;
  switch (unit) {
    case 'cm': return v * 10;
    case 'm': return v * 1000;
    case 'inch': return v * 25.4;
    case 'ft': return v * 304.8;
    default: return v; // 'mm'
  }
};

const COMMON_UNITS = ['mm', 'cm', 'm', 'inch', 'ft'];

export default function ExpandedMetalCalculator({ title, image }) {
  // Values State
  const [materialId, setMaterialId] = useState('aluminium');
  const [swd, setSwd] = useState('');
  const [lwd, setLwd] = useState('');
  const [strand, setStrand] = useState('');
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [cost, setCost] = useState('');

  // Units State
  const [swdUnit, setSwdUnit] = useState('mm');
  const [lwdUnit, setLwdUnit] = useState('mm');
  const [strandUnit, setStrandUnit] = useState('mm');
  const [thicknessUnit, setThicknessUnit] = useState('mm');
  const [widthUnit, setWidthUnit] = useState('m');
  const [lengthUnit, setLengthUnit] = useState('m');

  // Result State
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // 1. Convert all inputs to standard metric units (mm and m)
    const swdMm = convertToMm(swd, swdUnit);
    const lwdMm = convertToMm(lwd, lwdUnit);
    const strandMm = convertToMm(strand, strandUnit);
    const thicknessMm = convertToMm(thickness, thicknessUnit);
    
    // Width and Length need to be in meters for area
    const widthM = convertToMm(width, widthUnit) / 1000; 
    const lengthM = convertToMm(length, lengthUnit) / 1000; 
    
    const costKg = parseFloat(cost) || 0;

    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];

    // 2. Core Calculation from Dart code
    if (swdMm > 0 && strandMm > 0 && thicknessMm > 0 && widthM > 0 && lengthM > 0) {
      const area = widthM * lengthM;
      const thicknessM = thicknessMm / 1000;
      
      const metalRatio = strandMm / swdMm;
      
      const sheetWeight = selectedMaterial.density * thicknessM * area;
      const finalWeight = sheetWeight * metalRatio;
      
      setTotalWeight(finalWeight);
      setTotalCost(finalWeight * costKg);
    } else {
      setTotalWeight(0);
      setTotalCost(0);
    }
  }, [materialId, swd, lwd, strand, thickness, width, length, cost, swdUnit, lwdUnit, strandUnit, thicknessUnit, widthUnit, lengthUnit]);

  const handleClear = () => {
    setSwd(''); setLwd(''); setStrand(''); setThickness(''); setWidth(''); setLength(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate weight & cost for Expanded Metal sheets.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 relative">
        
        {/* Row 1 */}
        <div className="md:col-span-2">
          <SearchableMaterialSelector 
            label="Select Material" 
            value={materialId} 
            onChange={setMaterialId} 
            options={materialsData} 
          />
        </div>

        {/* Row 2 */}
        <CustomInput 
          label="Short Way Diagonal (SWD)" 
          value={swd} 
          onChange={setSwd} 
          placeholder="e.g. 20" 
          icon={MoveDiagonal}
          unitOptions={COMMON_UNITS}
          selectedUnit={swdUnit}
          onUnitChange={setSwdUnit}
        />
        <CustomInput 
          label="Long Way Diagonal (LWD)" 
          value={lwd} 
          onChange={setLwd} 
          placeholder="e.g. 40" 
          icon={MoveDiagonal}
          unitOptions={COMMON_UNITS}
          selectedUnit={lwdUnit}
          onUnitChange={setLwdUnit}
        />

        {/* Row 3 */}
        <CustomInput 
          label="Strand Width" 
          value={strand} 
          onChange={setStrand} 
          placeholder="e.g. 2" 
          icon={Divide}
          unitOptions={COMMON_UNITS}
          selectedUnit={strandUnit}
          onUnitChange={setStrandUnit}
        />
        <CustomInput 
          label="Sheet Thickness" 
          value={thickness} 
          onChange={setThickness} 
          placeholder="e.g. 1.5" 
          icon={Layers}
          unitOptions={COMMON_UNITS}
          selectedUnit={thicknessUnit}
          onUnitChange={setThicknessUnit}
        />

        {/* Row 4 */}
        <CustomInput 
          label="Sheet Width" 
          value={width} 
          onChange={setWidth} 
          placeholder="e.g. 1.2" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={widthUnit}
          onUnitChange={setWidthUnit}
        />
        <CustomInput 
          label="Sheet Length" 
          value={length} 
          onChange={setLength} 
          placeholder="e.g. 2.4" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={lengthUnit}
          onUnitChange={setLengthUnit}
        />
        
        {/* Row 5 */}
        <div className="md:col-span-2 mt-2">
          <CustomInput 
            label="Cost per Kg (Optional)" 
            value={cost} 
            onChange={setCost} 
            placeholder="e.g. 120" 
            icon={IndianRupee}
            unitOptions={['/ kg']}
            selectedUnit="/ kg"
          />
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Total Weight</span>
            <span className="text-3xl font-bold text-brand-blue">
              {totalWeight > 0 ? totalWeight.toFixed(2) : '0.00'} <span className="text-lg text-slate-400 font-medium">kg</span>
            </span>
          </div>
          
          <div className="w-px bg-slate-200 hidden md:block"></div>
          
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-semibold mb-1">Estimated Cost</span>
            <span className="text-3xl font-bold text-brand-orange">
              <span className="text-lg mr-1">₹</span>
              {totalCost > 0 ? totalCost.toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        <button 
          onClick={handleClear}
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all w-full md:w-auto"
        >
          Clear Data
        </button>
      </div>
    </CalculatorView>
  );
}