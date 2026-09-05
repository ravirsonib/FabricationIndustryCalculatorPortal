const DEFAULT_IMAGE = "https://placehold.co/150x150/eff6ff/1d4ed8?text=Image";

const createNode = (children = null, image = DEFAULT_IMAGE) => ({
  image,
  children
});

const perforatedHoleTypes = {
  "Capsule Center to Center Hole": createNode(null, '/images/capsule_center_to_center_hole.jpeg'),
  "Capsule Staggered Triangular Hole": createNode(),
  "Hexagonal Staggered Triang...": createNode(),
  "Rectangular Center to Center ...": createNode(),
  "Rectangular Staggered Triang...": createNode(),
  "Round 45 deg. Staggered Trian...": createNode(),
  "Round 60 deg. Staggered Triang.": createNode(),
  "Round 90 deg center to center hole": createNode(),
  "Square Center to Center Hole": createNode(),
  "Square Staggered Triangular Hole": createNode()
};

export const appData = {
  "Chain Link": createNode(null, '/images/chain_link.png'),
  "Expanded Metal": createNode(null, '/images/expanded_metal.png'),
  "Hexagonal Wiremesh": createNode(null, '/images/hexagonal_wiremesh.png'),
  "Perforated Sheet": createNode({
    "Open Area (%) Calculation": createNode(perforatedHoleTypes, '/images/openAreaCalculation.png'),
    "Weight Per Roll": createNode(perforatedHoleTypes),
    "Weight Per 0D": createNode(perforatedHoleTypes),
    "Weight Per OD less ID": createNode(perforatedHoleTypes)
  }, '/images/perforatedSheet.png',),
  "Wire Mesh": createNode({
    "Dutch Woven Wire Mesh": createNode({ 
      "Weight Per Role": createNode(), 
      "Weight Per OD": createNode(), 
      "Weight Per OD Less ID": createNode() 
    }),
    "Weight Per Role": createNode(),
    "Micron/MM/B.S.S/A.S.T.M/I.S.S/TYLER...": createNode(),
    "Open Area (%) Calculation": createNode({ 
      "Harp Wire Mesh": createNode(), 
      "Rectangular Wire Mesh": createNode(), 
      "Square Wire Mesh": createNode() 
    }),
    "Mesh/Opening/Pitch Calculation": createNode({ 
      "Mesh": createNode(), 
      "Opening": createNode(), 
      "Pitch (P)": createNode() 
    })
  }, '/images/wire_mesh_2.png'),
  "Wire": createNode({
    "Hexagonal Wire": createNode(),
    "Octagonal Wire": createNode(),
    "Re-Enforced Bar": createNode(),
    "Rectangle Wire": createNode(),
    "Round Wire": createNode(),
    "Square Wire": createNode(),
    "SWG to MM": createNode()
  }, '/images/wire.png'),
  "Unit Calculator": createNode({
    "Area": createNode(),
    "Length": createNode(),
    "Weight": createNode(),
    "Price": createNode({ 
      "Area to Area": createNode(), 
      "Area to Running Length": createNode() 
    })
  }, '/images/unit_converter.jpeg'),
  "Welded Wiremesh": createNode({
    "Mesh/Opening/Pitch Calculations": createNode({ 
      "Opening": createNode(), 
      "Pitch (P)": createNode(), 
      "Mesh": createNode() 
    }),
    "Weight Per Role": createNode(),
    "Weight Per OD": createNode(),
    "Weight Per OD Less ID": createNode(),
    "Wire Required": createNode()
  }, '/images/WW/welded_wiremesh__ww.jpeg')
};