import React, { useState } from 'react';
import CalculatorView from '../../CalculatorView';
import { Activity } from 'lucide-react';

const SWG_MAP = {
  '7/0 Gauge': 12.700, '6/0 Gauge': 11.786, '5/0 Gauge': 10.973, '4/0 Gauge': 10.160,
  '3/0 Gauge': 9.449, '2/0 Gauge': 8.839, '0 Gauge': 8.230, '1 Gauge': 7.620,
  '2 Gauge': 7.010, '3 Gauge': 6.401, '4 Gauge': 5.893, '5 Gauge': 5.385,
  '6 Gauge': 4.877, '7 Gauge': 4.470, '8 Gauge': 4.064, '9 Gauge': 3.658,
  '10 Gauge': 3.251, '11 Gauge': 2.946, '12 Gauge': 2.642, '13 Gauge': 2.337,
  '14 Gauge': 2.032, '15 Gauge': 1.829, '16 Gauge': 1.626, '17 Gauge': 1.422,
  '18 Gauge': 1.219, '19 Gauge': 1.016, '20 Gauge': 0.914, '21 Gauge': 0.813,
  '22 Gauge': 0.711, '23 Gauge': 0.610, '24 Gauge': 0.559, '25 Gauge': 0.508,
  '26 Gauge': 0.457, '27 Gauge': 0.417, '28 Gauge': 0.376, '29 Gauge': 0.345,
  '30 Gauge': 0.315, '31 Gauge': 0.295, '32 Gauge': 0.274, '33 Gauge': 0.254,
  '34 Gauge': 0.234, '35 Gauge': 0.213, '36 Gauge': 0.193, '37 Gauge': 0.173,
  '38 Gauge': 0.152, '39 Gauge': 0.132, '40 Gauge': 0.122, '41 Gauge': 0.112,
  '42 Gauge': 0.102, '43 Gauge': 0.091, '44 Gauge': 0.081, '45 Gauge': 0.071,
  '46 Gauge': 0.061, '47 Gauge': 0.051, '48 Gauge': 0.041, '49 Gauge': 0.031,
  '50 Gauge': 0.025,
};

export default function SwgToMmCalculator({ title, image }) {
  const [selectedGauge, setSelectedGauge] = useState('7/0 Gauge');

  const mmValue = SWG_MAP[selectedGauge] || 0.0;

  return (
    <CalculatorView title={title} image={image} description="Convert SWG (Standard Wire Gauge) to Millimeters.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Activity size={16} className="text-brand-blue" />
            Select Gauge
          </label>
          <select 
            value={selectedGauge} 
            onChange={(e) => setSelectedGauge(e.target.value)}
            className="w-full h-[50px] px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-slate-700 font-medium appearance-none"
          >
            {Object.keys(SWG_MAP).map(gauge => (
              <option key={gauge} value={gauge}>{gauge}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
          <span className="text-slate-500 text-sm font-semibold mb-1">Thickness in MM</span>
          <span className="text-3xl font-bold text-brand-blue">
            {mmValue.toFixed(3)} <span className="text-lg text-slate-400 font-medium">mm</span>
          </span>
        </div>
      </div>
    </CalculatorView>
  );
}