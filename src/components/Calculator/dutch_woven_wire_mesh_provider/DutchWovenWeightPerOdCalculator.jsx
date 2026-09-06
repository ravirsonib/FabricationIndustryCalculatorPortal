import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, Circle, IndianRupee } from 'lucide-react';

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

export default function DutchWovenWeightPerOdCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');

  // Inputs
  const [widthMesh, setWidthMesh] = useState('');
  const [lengthMesh, setLengthMesh] = useState('');
  const [wireDia1, setWireDia1] = useState('');
  const [wireDia2, setWireDia2] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [wastage, setWastage] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [wd1Unit, setWd1Unit] = useState('mm');
  const [wd2Unit, setWd2Unit] = useState('mm');
  const [odUnit, setOdUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const materialConstant = selectedMaterial.materialConstant || 67; // Assuming 67 as fallback as per dart code

    const widthMeshMm = parseFloat(widthMesh) || 0;
    const lengthMeshMm = parseFloat(lengthMesh) || 0;
    const wireDia1Mm = convertToMm(wireDia1, wd1Unit);
    const wireDia2Mm = convertToMm(wireDia2, wd2Unit);
    const outerDiameterMm = convertToMm(outerDiameter, odUnit);
    
    const wast = parseFloat(wastage) || 0;
    const costPerKg = parseFloat(cost) || 0;

    if (widthMeshMm > 0 && lengthMeshMm > 0 && wireDia1Mm > 0 && wireDia2Mm > 0 && outerDiameterMm > 0) {
      const factor1 = (materialConstant * wireDia1Mm * wireDia1Mm) / (widthMeshMm + wireDia1Mm);
      const factor2 = (materialConstant * wireDia2Mm * wireDia2Mm) / (lengthMeshMm + wireDia2Mm);

      const meshFactor = factor1 + factor2;
      let weight = meshFactor * (outerDiameterMm / 100);

      weight = weight * (1 + wast / 100);

      setTotalWeight(weight);
      setTotalCost(weight * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, widthMesh, lengthMesh, wireDia1, wireDia2, outerDiameter, wastage, cost, wd1Unit, wd2Unit, odUnit]);

  const handleClear = () => {
    setWidthMesh(''); setLengthMesh(''); setWireDia1(''); setWireDia2('');
    setOuterDiameter(''); setWastage(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Weight Per OD for Dutch Woven Wire Mesh.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        <CustomInput label="Mesh Opening Width (mm)" value={widthMesh} onChange={setWidthMesh} placeholder="e.g. 5" icon={Maximize} />
        <CustomInput label="Mesh Opening Length (mm)" value={lengthMesh} onChange={setLengthMesh} placeholder="e.g. 5" icon={Maximize} />
        
        <CustomInput label="Wire Diameter 1" value={wireDia1} onChange={setWireDia1} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wd1Unit} onUnitChange={setWd1Unit} />
        <CustomInput label="Wire Diameter 2" value={wireDia2} onChange={setWireDia2} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wd2Unit} onUnitChange={setWd2Unit} />
        
        <CustomInput label="Outer Diameter (OD)" value={outerDiameter} onChange={setOuterDiameter} placeholder="e.g. 500" icon={Circle} unitOptions={COMMON_UNITS} selectedUnit={odUnit} onUnitChange={setOdUnit} />
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
        <button onClick={handleClear} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand-red hover:border-brand-red font-semibold rounded-xl transition-all">Clear Data</button>
      </div>
    </CalculatorView>
  );
}