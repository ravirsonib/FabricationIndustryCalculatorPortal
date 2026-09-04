import { useState } from "react";
import Header from "../components/Header";
import ParameterInput from "../components/ParameterInput";

export default function ChainLinkCalculator() {
  // State for our form (you will use these later for the actual math)
  const [material, setMaterial] = useState("Aluminium");
  const [formData, setFormData] = useState({
    opening: "",
    wireDiameter: "",
    width: "",
    length: "",
    wastage: "",
  });

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <Header title="Chain Link Calculator" showBack={true} />

      <div className="max-w-md mx-auto px-5 mt-6">
        {/* Diagram Placeholder */}
        <div className="w-full flex justify-center mb-4">
          <div className="w-64 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
            [Chain Link Diagram Image]
          </div>
        </div>

        <h2 className="text-center font-bold text-gray-800 mb-6 text-lg tracking-wide">
          Chain Link Fence Parameters
        </h2>

        {/* Material Dropdown */}
        <div className="relative bg-[#f6f8f9] rounded-2xl p-1 mb-6 border border-gray-200">
          <select 
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full bg-transparent outline-none px-4 py-3 text-gray-400 font-medium appearance-none cursor-pointer"
          >
            <option value="Aluminium">Aluminium</option>
            <option value="Steel">Steel</option>
            <option value="Galvanized Iron">Galvanized Iron</option>
          </select>
          <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Input Fields */}
        <ParameterInput 
          label="Opening (OPG)" 
          value={formData.opening} 
          onChange={(e) => handleInputChange(e, 'opening')} 
        />
        
        <ParameterInput 
          label="Wire Diameter(WD)" 
          value={formData.wireDiameter} 
          onChange={(e) => handleInputChange(e, 'wireDiameter')} 
        />
        
        <ParameterInput 
          label="Width (W)" 
          value={formData.width} 
          onChange={(e) => handleInputChange(e, 'width')} 
        />
        
        <ParameterInput 
          label="Length (L)" 
          value={formData.length} 
          onChange={(e) => handleInputChange(e, 'length')} 
        />
        
        <ParameterInput 
          label="Wastage (%)" 
          value={formData.wastage} 
          onChange={(e) => handleInputChange(e, 'wastage')} 
          hasUnit={false} 
        />
      </div>
    </div>
  );
}