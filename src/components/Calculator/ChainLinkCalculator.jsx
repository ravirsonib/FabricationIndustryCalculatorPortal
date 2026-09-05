import React, { useState, useEffect } from 'react';
import CalculatorView from '../CalculatorView';
import CustomInput from '../CustomInput';
import SearchableMaterialSelector from '../SearchableMaterialSelector';
import { materialsData } from '../../data/materials';
import { Maximize, Divide, IndianRupee, Trash2 } from 'lucide-react';

// Unit conversion helper
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

export default function ChainLinkCalculator({ title, image }) {
  // Values State
  const [materialId, setMaterialId] = useState('aluminium');
  const [opening, setOpening] = useState('');
  const [diameter, setDiameter] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [wastage, setWastage] = useState('');
  const [cost, setCost] = useState('');

  // Units State
  const [openingUnit, setOpeningUnit] = useState('mm');
  const [diameterUnit, setDiameterUnit] = useState('mm');
  const [widthUnit, setWidthUnit] = useState('m');
  const [lengthUnit, setLengthUnit] = useState('m');

  // Result State
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // 1. Convert all inputs to standard metric units (mm and m)[cite: 2]
    const openingMm = convertToMm(opening, openingUnit);
    const diameterMm = convertToMm(diameter, diameterUnit);
    // Width and Length need to be in meters for the area calculation[cite: 2]
    const widthM = convertToMm(width, widthUnit) / 1000; 
    const lengthM = convertToMm(length, lengthUnit) / 1000; 
    
    const wastagePerc = parseFloat(wastage) || 0;
    const costKg = parseFloat(cost) || 0;

    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];

    // 2. Core Calculation
    if (openingMm > 0 && diameterMm > 0 && widthM > 0 && lengthM > 0) {
      const area = widthM * lengthM; //[cite: 2]
      
      const factor = (selectedMaterial.constant * Math.pow(diameterMm, 2)) / (openingMm + diameterMm); //[cite: 2]
      
      const netWeight = factor * area; //[cite: 2]
      const finalWeight = netWeight * (1 + (wastagePerc / 100)); //[cite: 2]
      
      setTotalWeight(finalWeight);
      setTotalCost(finalWeight * costKg);
    } else {
      setTotalWeight(0);
      setTotalCost(0);
    }
  }, [materialId, opening, diameter, width, length, wastage, cost, openingUnit, diameterUnit, widthUnit, lengthUnit]);

  return (
    <CalculatorView title={title} image={image} description="Calculate weight & cost based on dimensions and material constant.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 relative">
        
        {/* Row 1 */}
        <SearchableMaterialSelector 
          label="Select Material" 
          value={materialId} 
          onChange={setMaterialId} 
          options={materialsData} 
        />
        <CustomInput 
          label="Mesh Opening" 
          value={opening} 
          onChange={setOpening} 
          placeholder="e.g. 50" 
          icon={Divide}
          unitOptions={COMMON_UNITS}
          selectedUnit={openingUnit}
          onUnitChange={setOpeningUnit}
        />

        {/* Row 2 */}
        <CustomInput 
          label="Wire Diameter" 
          value={diameter} 
          onChange={setDiameter} 
          placeholder="e.g. 3.15" 
          icon={Divide}
          unitOptions={COMMON_UNITS}
          selectedUnit={diameterUnit}
          onUnitChange={setDiameterUnit}
        />
        <CustomInput 
          label="Roll Width" 
          value={width} 
          onChange={setWidth} 
          placeholder="e.g. 1.5" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={widthUnit}
          onUnitChange={setWidthUnit}
        />

        {/* Row 3 */}
        <CustomInput 
          label="Roll Length" 
          value={length} 
          onChange={setLength} 
          placeholder="e.g. 15" 
          icon={Maximize}
          unitOptions={COMMON_UNITS}
          selectedUnit={lengthUnit}
          onUnitChange={setLengthUnit}
        />
        <CustomInput 
          label="Wastage Margin" 
          value={wastage} 
          onChange={setWastage} 
          placeholder="e.g. 5" 
          icon={Trash2}
          unitOptions={['%']}
          selectedUnit="%"
        />
        
        {/* Row 4 */}
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

      {/* Results Dashboard ... (Same as before) ... */}
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
      </div>
    </CalculatorView>
  );
}