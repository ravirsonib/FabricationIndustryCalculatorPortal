import React from 'react';
import ChainLinkCalculator from './Calculator/ChainLinkCalculator';
import ExpandedMetalCalculator from './Calculator/ExpandedMetalCalculator';
import HexagonalWiremeshCalculator from './Calculator/HexagonalWiremeshCalculator';
import CapsuleCenterToCenterCalculator from './Calculator/CapsuleCenterToCenterCalculator';
import CalculatorView from './CalculatorView';
import { Wrench } from 'lucide-react';

export default function CalculatorRenderer({ title, image, path }) {
  // Parent category nikalne ke liye path ka second-last item check karenge
  const parentCategory = path && path.length > 1 ? path[path.length - 2] : null;

  // Pehle unique parent-child combinations check karenge
  if (title === "Capsule Center to Center Hole") {
    if (parentCategory === "Open Area (%) Calculation") {
      return <CapsuleCenterToCenterCalculator title={title} image={image} />;
    } else if (parentCategory === "Weight Per Roll") {
      // Yahan future me 'Weight Per Roll' wala component aayega
      return (
        <CalculatorView title={`${title} (Weight)`} image={image} description="Weight Per Roll calculation module under development.">
           <ComingSoon title={title} />
        </CalculatorView>
      );
    } else {
      // For OD, OD less ID etc.
      return (
        <CalculatorView title={`${title} (${parentCategory})`} image={image} description="Module under development.">
           <ComingSoon title={title} />
        </CalculatorView>
      );
    }
  }

  // Baaki unique titles ke liye normal switch case
  switch (title) {
    case "Chain Link":
      return <ChainLinkCalculator title={title} image={image} />;
      
    case "Expanded Metal":
      return <ExpandedMetalCalculator title={title} image={image} />;
      
    case "Hexagonal Wiremesh":
      return <HexagonalWiremeshCalculator title={title} image={image} />;
      
    default:
      return (
        <CalculatorView title={title} image={image} description="Module under development.">
          <ComingSoon title={title} />
        </CalculatorView>
      );
  }
}

// Chhota helper component UI clean rakhne ke liye
function ComingSoon({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <Wrench size={48} strokeWidth={1.5} className="mb-4 text-slate-300" />
      <h3 className="text-xl font-bold text-slate-700">Coming Soon</h3>
      <p className="text-slate-500 mt-2 text-center max-w-sm">
        The mathematical logic and input fields for <strong>{title}</strong> are currently being built.
      </p>
    </div>
  );
}