import React from "react";
import { Wrench } from "lucide-react";
import CalculatorView from "./CalculatorView";

// --- Root Calculators ---
import ChainLinkCalculator from "./Calculator/ChainLinkCalculator";
import ExpandedMetalCalculator from "./Calculator/ExpandedMetalCalculator";
import HexagonalWiremeshCalculator from "./Calculator/HexagonalWiremeshCalculator";

// --- Open Area (%) Calculators ---
import CapsuleCenterToCenterCalculator from "./Calculator/open_area_calculation_provider/CapsuleCenterToCenterCalculator";
import CapsuleStaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/CapsuleStaggeredTriangularCalculator";
import HexagonalStaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/HexagonalStaggeredTriangularCalculator";
import RectangularCenterToCenterCalculator from "./Calculator/open_area_calculation_provider/RectangularCenterToCenterCalculator";
import RectangularStaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/RectangularStaggeredTriangularCalculator";
import Round45StaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/Round45StaggeredTriangularCalculator";
import Round60StaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/Round60StaggeredTriangularCalculator";
import Round90CenterToCenterCalculator from "./Calculator/open_area_calculation_provider/Round90CenterToCenterCalculator";
import SquareCenterToCenterCalculator from "./Calculator/open_area_calculation_provider/SquareCenterToCenterCalculator";
import SquareStaggeredTriangularCalculator from "./Calculator/open_area_calculation_provider/SquareStaggeredTriangularCalculator";

// --- Weight Per Roll (WPR) Calculators ---
import CapsuleCenterToCenterWprCalculator from "./Calculator/weight_per_roll_provider/CapsuleCenterToCenterWprCalculator";
import CapsuleStaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/CapsuleStaggeredTriangularWprCalculator";
import HexagonalStaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/HexagonalStaggeredTriangularWprCalculator";
import RectangularCenterToCenterWprCalculator from "./Calculator/weight_per_roll_provider/RectangularCenterToCenterWprCalculator";
import Round45StaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/Round45StaggeredTriangularWprCalculator";
import Round60StaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/Round60StaggeredTriangularWprCalculator";
import Round90CenterToCenterWprCalculator from "./Calculator/weight_per_roll_provider/Round90CenterToCenterWprCalculator";
import SquareCenterToCenterWprCalculator from "./Calculator/weight_per_roll_provider/SquareCenterToCenterWprCalculator";
import SquareStaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/SquareStaggeredTriangularWprCalculator";

// --- Weight Per OD (WPO) Calculators ---
import CapsuleCenterToCenterWpoCalculator from "./Calculator/weight_per_od_provider/CapsuleCenterToCenterWpoCalculator";
import CapsuleStaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/CapsuleStaggeredTriangularWpoCalculator";
import HexagonalStaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/HexagonalStaggeredTriangularWpoCalculator";
import RectangularCenterToCenterWpoCalculator from "./Calculator/weight_per_od_provider/RectangularCenterToCenterWpoCalculator";
import RectangularStaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/RectangularStaggeredTriangularWpoCalculator";
import Round45StaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/Round45StaggeredTriangularWpoCalculator";
import Round60StaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/Round60StaggeredTriangularWpoCalculator";
import Round90CenterToCenterWpoCalculator from "./Calculator/weight_per_od_provider/Round90CenterToCenterWpoCalculator";
import SquareCenterToCenterWpoCalculator from "./Calculator/weight_per_od_provider/SquareCenterToCenterWpoCalculator";
import SquareStaggeredTriangularWpoCalculator from "./Calculator/weight_per_od_provider/SquareStaggeredTriangularWpoCalculator";

// --- Weight Per OD Less ID (WPOLI) Calculators ---
import CapsuleCenterToCenterWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/CapsuleCenterToCenterWpoliCalculator";
import CapsuleStaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/CapsuleStaggeredTriangularWpoliCalculator";
import HexagonalStaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/HexagonalStaggeredTriangularWpoliCalculator";
import RectangularCenterToCenterWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/RectangularCenterToCenterWpoliCalculator";
import RectangularStaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/RectangularStaggeredTriangularWpoliCalculator";
import Round45StaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/Round45StaggeredTriangularWpoliCalculator";
import Round60StaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/Round60StaggeredTriangularWpoliCalculator";
import Round90CenterToCenterWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/Round90CenterToCenterWpoliCalculator";
import SquareCenterToCenterWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/SquareCenterToCenterWpoliCalculator";
import SquareStaggeredTriangularWpoliCalculator from "./Calculator/weight_per_od_less_id_provider/SquareStaggeredTriangularWpoliCalculator";
import RectangularStaggeredTriangularWprCalculator from "./Calculator/weight_per_roll_provider/RectangularStaggeredTriangularWprCalculator ";

// --- Dutch Woven Wire Mesh Calculators ---
import DutchWovenWeightPerRollCalculator from "./Calculator/dutch_woven_wire_mesh_provider/DutchWovenWeightPerRollCalculator";
import DutchWovenWeightPerOdCalculator from "./Calculator/dutch_woven_wire_mesh_provider/DutchWovenWeightPerOdCalculator";
import DutchWovenWeightPerOdLessIdCalculator from "./Calculator/dutch_woven_wire_mesh_provider/DutchWovenWeightPerOdLessIdCalculator";

import HarpWireMeshOpenAreaCalculator from "./Calculator/wire_mesh_provider/open_area_calculation_provider/HarpWireMeshOpenAreaCalculator";
import RectangularWireMeshOpenAreaCalculator from "./Calculator/wire_mesh_provider/open_area_calculation_provider/RectangularWireMeshOpenAreaCalculator";
import SquareWireMeshOpenAreaCalculator from "./Calculator/wire_mesh_provider/open_area_calculation_provider/SquareWireMeshOpenAreaCalculator";
import MeshCalculation from "./Calculator/wire_mesh_provider/mesh_opening_pitch_calculation_provider/MeshCalculation";
import OpeningCalculation from "./Calculator/wire_mesh_provider/mesh_opening_pitch_calculation_provider/OpeningCalculation";
import PitchCalculation from "./Calculator/wire_mesh_provider/mesh_opening_pitch_calculation_provider/PitchCalculation";
import WireMeshWeightPerRollCalculator from "./Calculator/wire_mesh_provider/WireMeshWeightPerRollCalculator";

import HexagonalWireCalculator from "./Calculator/wire_provider/HexagonalWireCalculator";
import OctagonalWireCalculator from "./Calculator/wire_provider/OctagonalWireCalculator";
import ReEnforcedBarCalculator from "./Calculator/wire_provider/ReEnforcedBarCalculator";
import RectangleWireCalculator from "./Calculator/wire_provider/RectangleWireCalculator";
import RoundWireCalculator from "./Calculator/wire_provider/RoundWireCalculator";
import SquareWireCalculator from "./Calculator/wire_provider/SquareWireCalculator";
import SwgToMmCalculator from "./Calculator/wire_provider/SwgToMmCalculator";

// --- Unit Converter Calculators ---
import AreaConverter from "./Calculator/unit_converter_provider/AreaConverter";
import LengthConverter from "./Calculator/unit_converter_provider/LengthConverter";
import WeightConverter from "./Calculator/unit_converter_provider/WeightConverter";
import AreaToAreaPriceCalculator from "./Calculator/unit_converter_provider/price_provider/AreaToAreaPriceCalculator";
import AreaToRunningPriceCalculator from "./Calculator/unit_converter_provider/price_provider/AreaToRunningPriceCalculator";

import WeightPerRollWwCalculator from './Calculator/welded_wire_provider/WeightPerRollWwCalculator';
import WeightPerOdWwCalculator from './Calculator/welded_wire_provider/WeightPerOdWwCalculator';
import WeightPerOdLessIdWwCalculator from './Calculator/welded_wire_provider/WeightPerOdLessIdWwCalculator';
import WiresRequiredWwCalculator from './Calculator/welded_wire_provider/WiresRequiredWwCalculator';
import MeshComparisonChart from "./Calculator/MeshComparisonChart";




export default function CalculatorRenderer({ title, image, path }) {
  // Parent category check karne ke liye (taaki duplicate titles resolve ho sakein)
  const parentCategory = path && path.length > 1 ? path[path.length - 2] : null;

  // Helfer function to safely match parent category variations
  const isCategory = (matchString) =>
    parentCategory &&
    parentCategory.toLowerCase().includes(matchString.toLowerCase());

  // 1. Capsule Center to Center Hole
  if (title === "Capsule Center to Center Hole") {
    if (isCategory("Open Area"))
      return <CapsuleCenterToCenterCalculator title={title} image={image} />;
    if (isCategory("Weight Per Roll"))
      return <CapsuleCenterToCenterWprCalculator title={title} image={image} />;
    if (isCategory("Less ID"))
      return (
        <CapsuleCenterToCenterWpoliCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per 0D"))
      return <CapsuleCenterToCenterWpoCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 2. Capsule Staggered Triangular Hole
  if (title === "Capsule Staggered Triangular Hole") {
    if (isCategory("Open Area"))
      return (
        <CapsuleStaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <CapsuleStaggeredTriangularWprCalculator title={title} image={image} />
      );
    if (isCategory("Less ID"))
      return (
        <CapsuleStaggeredTriangularWpoliCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <CapsuleStaggeredTriangularWpoCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 3. Hexagonal Staggered Triangular
  if (title === "Hexagonal Staggered Triangular Hole") {
    if (isCategory("Open Area"))
      return (
        <HexagonalStaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <HexagonalStaggeredTriangularWprCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Less ID"))
      return (
        <HexagonalStaggeredTriangularWpoliCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <HexagonalStaggeredTriangularWpoCalculator
          title={title}
          image={image}
        />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 4. Rectangular Center to Center
  if (title === "Rectangular Center to Center Hole") {
    if (isCategory("Open Area"))
      return (
        <RectangularCenterToCenterCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <RectangularCenterToCenterWprCalculator title={title} image={image} />
      );
    if (isCategory("Less ID"))
      return (
        <RectangularCenterToCenterWpoliCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <RectangularCenterToCenterWpoCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 5. Rectangular Staggered Triangular
  if (title === "Rectangular Staggered Triangular Hole") {
    if (isCategory("Open Area"))
      return (
        <RectangularStaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <RectangularStaggeredTriangularWprCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Less ID"))
      return (
        <RectangularStaggeredTriangularWpoliCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <RectangularStaggeredTriangularWpoCalculator
          title={title}
          image={image}
        />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 6. Round 45 deg. Staggered
  if (title === "Round 45° Staggered Triangular Hole.") {
    if (isCategory("Open Area"))
      return (
        <Round45StaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <Round45StaggeredTriangularWprCalculator title={title} image={image} />
      );
    if (isCategory("Less ID"))
      return (
        <Round45StaggeredTriangularWpoliCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <Round45StaggeredTriangularWpoCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 7. Round 60 deg. Staggered
  if (title === "Round 60° Staggered Triangular Hole") {
    if (isCategory("Open Area"))
      return (
        <Round60StaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <Round60StaggeredTriangularWprCalculator title={title} image={image} />
      );
    if (isCategory("Less ID"))
      return (
        <Round60StaggeredTriangularWpoliCalculator
          title={title}
          image={image}
        />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <Round60StaggeredTriangularWpoCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 8. Round 90 deg center to center
  if (title === "Round 90° Center To Center Hole") {
    if (isCategory("Open Area"))
      return <Round90CenterToCenterCalculator title={title} image={image} />;
    if (isCategory("Weight Per Roll"))
      return <Round90CenterToCenterWprCalculator title={title} image={image} />;
    if (isCategory("Less ID"))
      return (
        <Round90CenterToCenterWpoliCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per 0D"))
      return <Round90CenterToCenterWpoCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 9. Square Center to Center
  if (title === "Square Center to Center Hole") {
    if (isCategory("Open Area"))
      return <SquareCenterToCenterCalculator title={title} image={image} />;
    if (isCategory("Weight Per Roll"))
      return <SquareCenterToCenterWprCalculator title={title} image={image} />;
    if (isCategory("Less ID"))
      return (
        <SquareCenterToCenterWpoliCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per 0D"))
      return <SquareCenterToCenterWpoCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  // 10. Square Staggered Triangular
  if (title === "Square Staggered Triangular Hole") {
    if (isCategory("Open Area"))
      return (
        <SquareStaggeredTriangularCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per Roll"))
      return (
        <SquareStaggeredTriangularWprCalculator title={title} image={image} />
      );
    if (isCategory("Less ID"))
      return (
        <SquareStaggeredTriangularWpoliCalculator title={title} image={image} />
      );
    if (isCategory("Weight Per 0D"))
      return (
        <SquareStaggeredTriangularWpoCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (title.includes("Micron/MM/B.S.S") || title.includes("Tyler")) {
    return <MeshComparisonChart title={title} image={image} />;
  }

  if (isCategory("Dutch Woven Wire Mesh")) {
    if (title === "Weight Per Role") {
      return <DutchWovenWeightPerRollCalculator title={title} image={image} />;
    }
    if (title === "Weight Per OD") {
      return <DutchWovenWeightPerOdCalculator title={title} image={image} />;
    }
    if (title.toLowerCase().includes("less id")) {
      return (
        <DutchWovenWeightPerOdLessIdCalculator title={title} image={image} />
      );
    }
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (title === "Weight Per Role") {
    if (isCategory("Wire Mesh"))
      return <WireMeshWeightPerRollCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (title === "Harp Wire Mesh") {
    if (isCategory("Open Area (%) Calculation"))
      return <HarpWireMeshOpenAreaCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (title === "Rectangular Wire Mesh") {
    if (isCategory("Open Area (%) Calculation"))
      return (
        <RectangularWireMeshOpenAreaCalculator title={title} image={image} />
      );
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (title === "Square Wire Mesh") {
    if (isCategory("Open Area (%) Calculation"))
      return <SquareWireMeshOpenAreaCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (isCategory("Mesh/Opening/Pitch Calculation")) {
    if (title === "Mesh")
      return <MeshCalculation title={title} image={image} />;
    if (title === "Opening")
      return <OpeningCalculation title={title} image={image} />;
    if (title === "Pitch (P)")
      return <PitchCalculation title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (isCategory("Wire Mesh") && title === "Weight per role") {
    return <WireMeshWeightPerRollCalculator title={title} image={image} />;
  }

  // --- Wire Category ---
  if (isCategory("Wire")) {
    if (title === "Hexagonal Wire")
      return <HexagonalWireCalculator title={title} image={image} />;
    if (title === "Octagonal Wire")
      return <OctagonalWireCalculator title={title} image={image} />;
    if (title === "Re-Enforced Bar")
      return <ReEnforcedBarCalculator title={title} image={image} />;
    if (title === "Rectangle Wire")
      return <RectangleWireCalculator title={title} image={image} />;
    if (title === "Round Wire")
      return <RoundWireCalculator title={title} image={image} />;
    if (title === "Square Wire")
      return <SquareWireCalculator title={title} image={image} />;
    if (title === "SWG to MM")
      return <SwgToMmCalculator title={title} image={image} />;
  }

  if (isCategory("Unit Calculator")) {
    if (title === "Area") return <AreaConverter title={title} image={image} />;
    if (title === "Length")
      return <LengthConverter title={title} image={image} />;
    if (title === "Weight")
      return <WeightConverter title={title} image={image} />;

    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (isCategory("Price")) {
    if (title === "Area to Area")
      return <AreaToAreaPriceCalculator title={title} image={image} />;
    if (title === "Area to Running Length")
      return <AreaToRunningPriceCalculator title={title} image={image} />;
    return <ComingSoon title={`${title} (${parentCategory})`} image={image} />;
  }

  if (isCategory("Welded Wiremesh")) {
    if (title.toLowerCase().includes("less id")) return <WeightPerOdLessIdWwCalculator title={title} image={image} />;
    if (title === "Weight Per OD") return <WeightPerOdWwCalculator title={title} image={image} />;
    if (title === "Weight Per Roll") return <WeightPerRollWwCalculator title={title} image={image} />;
    if (title === "Wires Required") return <WiresRequiredWwCalculator title={title} image={image} />;
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
    <CalculatorView
      title={title}
      image={image}
      description="Module under development."
    >
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <Wrench size={48} strokeWidth={1.5} className="mb-4 text-slate-300" />
        <h3 className="text-xl font-bold text-slate-700">Coming Soon</h3>
        <p className="text-slate-500 mt-2 text-center max-w-sm">
          The module for <strong>{title}</strong> is currently being built.
        </p>
      </div>
    </CalculatorView>
  );
}
