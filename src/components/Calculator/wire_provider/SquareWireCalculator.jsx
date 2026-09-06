import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, IndianRupee } from 'lucide-react';

const convertToMeters = (value, unit) => {
  const v = parseFloat(value) || 0;
  switch (unit) {
    case 'mm': return v / 1000;
    case 'cm': return v / 100;
    case 'inch': return (v * 25.4) / 1000;
    case 'ft': return (v * 304.8) / 1000;
    case 'm': return v;
    default: return v / 1000;
  }
};

const COMMON_UNITS = ['mm', 'cm', 'inch', 'm', 'ft'];

export default function SquareWireCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');

  // Inputs
  const [thickness, setThickness] = useState('');
  const [length, setLength] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [thicknessUnit, setThicknessUnit] = useState('mm');
  const [lengthUnit, setLengthUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density; // kg/m3

    const tM = convertToMeters(thickness, thicknessUnit);
    const lM = convertToMeters(length, lengthUnit);
    const costPerKg = parseFloat(cost) || 0;

    if (tM > 0 && lM > 0) {
      // Area of Square
      const area = tM * tM;
      
      const volume = area * lM;
      const weight = volume * density;

      setTotalWeight(weight);
      setTotalCost(weight * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, thickness, length, cost, thicknessUnit, lengthUnit]);

  const handleClear = () => {
    setThickness(''); setLength(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate weight for Square Wire.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        <CustomInput label="Thickness" value={thickness} onChange={setThickness} placeholder="e.g. 10" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={thicknessUnit} onUnitChange={setThicknessUnit} />
        <CustomInput label="Length" value={length} onChange={setLength} placeholder="e.g. 1000" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lengthUnit} onUnitChange={setLengthUnit} />
        
        <div className="md:col-span-2 mt-2">
          <CustomInput label="Cost per Kg (Optional)" value={cost} onChange={setCost} placeholder="e.g. 150" icon={IndianRupee} unitOptions={['/ kg']} selectedUnit="/ kg" />
        </div>
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
        <button onClick={handleClear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}