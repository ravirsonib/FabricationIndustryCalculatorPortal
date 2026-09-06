import React from 'react';
import { Wrench } from 'lucide-react';
import CalculatorView from './CalculatorView';

// --- Root Calculators ---
import ChainLinkCalculator from './Calculator/ChainLinkCalculator';
import ExpandedMetalCalculator from './Calculator/ExpandedMetalCalculator';
import HexagonalWiremeshCalculator from './Calculator/HexagonalWiremeshCalculator';

// --- Open Area (%) Calculators ---
import CapsuleCenterToCenterCalculator from './Calculator/open_area_calculation_provider/CapsuleCenterToCenterCalculator';
import CapsuleStaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/CapsuleStaggeredTriangularCalculator';
import HexagonalStaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/HexagonalStaggeredTriangularCalculator';
import RectangularCenterToCenterCalculator from './Calculator/open_area_calculation_provider/RectangularCenterToCenterCalculator';
import RectangularStaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/RectangularStaggeredTriangularCalculator';
import Round45StaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/Round45StaggeredTriangularCalculator';
import Round60StaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/Round60StaggeredTriangularCalculator';
import Round90CenterToCenterCalculator from './Calculator/open_area_calculation_provider/Round90CenterToCenterCalculator';
import SquareCenterToCenterCalculator from './Calculator/open_area_calculation_provider/SquareCenterToCenterCalculator';
import SquareStaggeredTriangularCalculator from './Calculator/open_area_calculation_provider/SquareStaggeredTriangularCalculator';

// --- Weight Per Roll (WPR) Calculators ---
import CapsuleCenterToCenterWprCalculator from './Calculator/weight_per_roll_provider/CapsuleCenterToCenterWprCalculator';
import CapsuleStaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/CapsuleStaggeredTriangularWprCalculator';
import HexagonalStaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/HexagonalStaggeredTriangularWprCalculator';
import RectangularCenterToCenterWprCalculator from './Calculator/weight_per_roll_provider/RectangularCenterToCenterWprCalculator';
import Round45StaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/Round45StaggeredTriangularWprCalculator';
import Round60StaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/Round60StaggeredTriangularWprCalculator';
import Round90CenterToCenterWprCalculator from './Calculator/weight_per_roll_provider/Round90CenterToCenterWprCalculator';
import SquareCenterToCenterWprCalculator from './Calculator/weight_per_roll_provider/SquareCenterToCenterWprCalculator';
import SquareStaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/SquareStaggeredTriangularWprCalculator';
import RectangularStaggeredTriangularWprCalculator from './Calculator/weight_per_roll_provider/RectangularStaggeredTriangularWprCalculator ';

export default function CalculatorRenderer({ title, image, path }) {
  // Parent category check karne ke liye taaki duplicate titles resolve ho sakein
  const parentCategory = path && path.length > 1 ? path[path.length - 2] : null;

  // 1. Capsule Center to Center Hole
  if (title === "Capsule Center to Center Hole") {
    if (parentCategory === "Open Area (%) Calculation") return <CapsuleCenterToCenterCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <CapsuleCenterToCenterWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 2. Capsule Staggered Triangular Hole
  if (title === "Capsule Staggered Triangular Hole") {
    if (parentCategory === "Open Area (%) Calculation") return <CapsuleStaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <CapsuleStaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 3. Hexagonal Staggered Triangular
  if (title === "Hexagonal Staggered Triang...") {
    if (parentCategory === "Open Area (%) Calculation") return <HexagonalStaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <HexagonalStaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 4. Rectangular Center to Center
  if (title === "Rectangular Center to Center ...") {
    if (parentCategory === "Open Area (%) Calculation") return <RectangularCenterToCenterCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <RectangularCenterToCenterWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 5. Rectangular Staggered Triangular
  if (title === "Rectangular Staggered Triang...") {
    if (parentCategory === "Open Area (%) Calculation") return <RectangularStaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <RectangularStaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 6. Round 45 deg. Staggered
  if (title === "Round 45 deg. Staggered Trian...") {
    if (parentCategory === "Open Area (%) Calculation") return <Round45StaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <Round45StaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 7. Round 60 deg. Staggered
  if (title === "Round 60 deg. Staggered Triang.") {
    if (parentCategory === "Open Area (%) Calculation") return <Round60StaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <Round60StaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 8. Round 90 deg center to center
  if (title === "Round 90 deg center to center hole") {
    if (parentCategory === "Open Area (%) Calculation") return <Round90CenterToCenterCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <Round90CenterToCenterWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 9. Square Center to Center
  if (title === "Square Center to Center Hole") {
    if (parentCategory === "Open Area (%) Calculation") return <SquareCenterToCenterCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <SquareCenterToCenterWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 10. Square Staggered Triangular
  if (title === "Square Staggered Triangular Hole") {
    if (parentCategory === "Open Area (%) Calculation") return <SquareStaggeredTriangularCalculator title={title} image={image} />;
    if (parentCategory === "Weight Per Roll") return <SquareStaggeredTriangularWprCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // --- Normal / Root Level Calculators ---
  switch (title) {
    case "Chain Link":
      return <ChainLinkCalculator title={title} image={image} />;
    case "Expanded Metal":
      return <ExpandedMetalCalculator title={title} image={image} />;
    case "Hexagonal Wiremesh":
      return <HexagonalWiremeshCalculator title={title} image={image} />;
    default:
      return <ComingSoon title={title} image={image} />;
  }
}

// Fallback component
function ComingSoon({ title, image }) {
  return (
    <CalculatorView title={title} image={image} description="Module under development.">
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <Wrench size={48} strokeWidth={1.5} className="mb-4 text-slate-300" />
        <h3 className="text-xl font-bold text-slate-700">Coming Soon</h3>
        <p className="text-slate-500 mt-2 text-center max-w-sm">
          The mathematical logic and input fields for <strong>{title}</strong> are currently being built.
        </p>
      </div>
    </CalculatorView>
  );
}