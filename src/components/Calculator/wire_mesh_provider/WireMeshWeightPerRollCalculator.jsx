import React, { useState, useEffect } from 'react';
import CalculatorView from '../../CalculatorView';
import CustomInput from '../../CustomInput';
import SearchableMaterialSelector from '../../SearchableMaterialSelector';
import { materialsData } from '../../../data/materials';
import { Maximize, Activity, IndianRupee, Scissors } from 'lucide-react';

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

export default function WireMeshWeightPerRollCalculator({ title, image }) {
  const [materialId, setMaterialId] = useState('aluminium');

  // Inputs
  const [widthOpening, setWidthOpening] = useState('');
  const [lengthOpening, setLengthOpening] = useState('');
  const [wireDiaWidth, setWireDiaWidth] = useState('');
  const [wireDiaLength, setWireDiaLength] = useState('');
  
  const [rollWidth, setRollWidth] = useState('');
  const [rollLength, setRollLength] = useState('');
  
  const [crimpPercentage, setCrimpPercentage] = useState('0');
  const [wastage, setWastage] = useState('');
  const [cost, setCost] = useState('');

  // Units
  const [widthOpgUnit, setWidthOpgUnit] = useState('mm');
  const [lengthOpgUnit, setLengthOpgUnit] = useState('mm');
  const [wireDiaWidthUnit, setWireDiaWidthUnit] = useState('mm');
  const [wireDiaLengthUnit, setWireDiaLengthUnit] = useState('mm');
  const [rollWidthUnit, setRollWidthUnit] = useState('mm');
  const [rollLengthUnit, setRollLengthUnit] = useState('mm');

  // Results
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const selectedMaterial = materialsData.find(m => m.id === materialId) || materialsData[0];
    const density = selectedMaterial.density; // kg/m3

    // Convert all to meters for volume calculation
    const wOpgM = convertToMeters(widthOpening, widthOpgUnit);
    const lOpgM = convertToMeters(lengthOpening, lengthOpgUnit);
    const wwdM = convertToMeters(wireDiaWidth, wireDiaWidthUnit);
    const lwdM = convertToMeters(wireDiaLength, wireDiaLengthUnit);
    const widthM = convertToMeters(rollWidth, rollWidthUnit);
    const lengthM = convertToMeters(rollLength, rollLengthUnit);
    
    const wast = parseFloat(wastage) || 0;
    const costPerKg = parseFloat(cost) || 0;
    const crimp = parseFloat(crimpPercentage) || 0;

    const pitchWidthM = wOpgM + wwdM;
    const pitchLengthM = lOpgM + lwdM;

    if (pitchWidthM > 0 && pitchLengthM > 0 && widthM > 0 && lengthM > 0) {
      // Number of wires
      const numberOfLineWires = widthM / pitchWidthM;
      const numberOfCrossWires = lengthM / pitchLengthM;

      // Width wire volume
      const widthWireArea = (Math.PI * Math.pow(wwdM, 2)) / 4;
      const totalWidthWireLength = numberOfLineWires * lengthM;
      const widthWireVolume = totalWidthWireLength * widthWireArea;

      // Length wire volume
      const lengthWireArea = (Math.PI * Math.pow(lwdM, 2)) / 4;
      const totalLengthWireLength = numberOfCrossWires * widthM;
      const lengthWireVolume = totalLengthWireLength * lengthWireArea;

      // Total Volume & Base Weight
      const totalVolume = widthWireVolume + lengthWireVolume;
      const baseWeight = totalVolume * density;

      // Apply Crimp & Wastage
      const weightWithoutWastage = baseWeight * (1 + (crimp / 100));
      const weightWithWastage = weightWithoutWastage * (1 + (wast / 100));

      setTotalWeight(weightWithWastage);
      setTotalCost(weightWithWastage * costPerKg);
    } else {
      setTotalWeight(0); setTotalCost(0);
    }
  }, [materialId, widthOpening, lengthOpening, wireDiaWidth, wireDiaLength, rollWidth, rollLength, crimpPercentage, wastage, cost, widthOpgUnit, lengthOpgUnit, wireDiaWidthUnit, wireDiaLengthUnit, rollWidthUnit, rollLengthUnit]);

  const handleClear = () => {
    setWidthOpening(''); setLengthOpening(''); setWireDiaWidth(''); setWireDiaLength('');
    setRollWidth(''); setRollLength(''); setCrimpPercentage('0'); setWastage(''); setCost('');
  };

  return (
    <CalculatorView title={title} image={image} description="Calculate Weight Per Roll for Wire Mesh (with Crimp options).">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="md:col-span-2">
          <SearchableMaterialSelector label="Select Material" value={materialId} onChange={setMaterialId} options={materialsData} />
        </div>
        
        {/* Openings */}
        <CustomInput label="Width Opening" value={widthOpening} onChange={setWidthOpening} placeholder="e.g. 10" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={widthOpgUnit} onUnitChange={setWidthOpgUnit} />
        <CustomInput label="Length Opening" value={lengthOpening} onChange={setLengthOpening} placeholder="e.g. 10" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={lengthOpgUnit} onUnitChange={setLengthOpgUnit} />
        
        {/* Wire Diameters */}
        <CustomInput label="Wire Diameter (Width)" value={wireDiaWidth} onChange={setWireDiaWidth} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wireDiaWidthUnit} onUnitChange={setWireDiaWidthUnit} />
        <CustomInput label="Wire Diameter (Length)" value={wireDiaLength} onChange={setWireDiaLength} placeholder="e.g. 2" icon={Activity} unitOptions={COMMON_UNITS} selectedUnit={wireDiaLengthUnit} onUnitChange={setWireDiaLengthUnit} />
        
        {/* Roll Dimensions */}
        <CustomInput label="Roll Width" value={rollWidth} onChange={setRollWidth} placeholder="e.g. 1200" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={rollWidthUnit} onUnitChange={setRollWidthUnit} />
        <CustomInput label="Roll Length" value={rollLength} onChange={setRollLength} placeholder="e.g. 15000" icon={Maximize} unitOptions={COMMON_UNITS} selectedUnit={rollLengthUnit} onUnitChange={setRollLengthUnit} />
        
        {/* Select Crimp */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Scissors size={16} className="text-brand-blue" />
            Crimp Percentage
          </label>
          <select 
            value={crimpPercentage} 
            onChange={(e) => setCrimpPercentage(e.target.value)}
            className="w-full h-[50px] px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-slate-700 font-medium appearance-none"
          >
            <option value="0">NO CRIMP</option>
            <option value="2">2% CRIMP</option>
            <option value="5">5% CRIMP</option>
            <option value="9">9% CRIMP</option>
          </select>
        </div>
        
        <CustomInput label="Wastage (%)" value={wastage} onChange={setWastage} placeholder="e.g. 5" icon={Activity} unitOptions={['%']} selectedUnit="%" />
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