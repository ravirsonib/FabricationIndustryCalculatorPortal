const DEFAULT_IMAGE = "https://placehold.co/150x150/eff6ff/1d4ed8?text=Image";

const createNode = (children = null, image = DEFAULT_IMAGE) => ({
  image,
  children,
});

const perforatedHoleTypes = {
  "Capsule Center to Center Hole": createNode(
    null,
    "/images/capsule_center_to_center_hole.jpeg",
  ),
  "Capsule Staggered Triangular Hole": createNode(),
  "Hexagonal Staggered Triangular Hole": createNode(),
  "Rectangular Center to Center Hole": createNode(),
  "Rectangular Staggered Triangular Hole": createNode(),
  "Round 45° Staggered Triangular Hole.": createNode(),
  "Round 60° Staggered Triangular Hole": createNode(),
  "Round 90° Center To Center Hole": createNode(),
  "Square Center to Center Hole": createNode(),
  "Square Staggered Triangular Hole": createNode(),
};

export const appData = {
  "Chain Link": createNode(null, "/images/chain_link.png"),
  "Expanded Metal": createNode(null, "/images/expanded_metal.png"),
  "Hexagonal Wiremesh": createNode(null, "/images/hexagonal_wiremesh.png"),
  "Perforated Sheet": createNode(
    {
      "Open Area (%) Calculation": createNode(
        {
          "Capsule Center to Center Hole": createNode(
            null,
            "/images/capsule_center_to_center_hole.jpeg",
          ),
          "Capsule Staggered Triangular Hole": createNode(
            null,
            "/images/capsule_center_to_center_hole.jpeg",
          ),
          "Hexagonal Staggered Triangular Hole": createNode(
            null,
            "/images/hexagonal_staggered_triangular_hole.jpeg",
          ),
          "Rectangular Center to Center Hole": createNode(
            null,
            "/images/rectangular_center_to_center_hole.jpeg",
          ),
          "Rectangular Staggered Triangular Hole": createNode(
            null,
            "/images/rectangular_staggered_triangular_hole.jpeg",
          ),
          "Round 45° Staggered Triangular Hole.": createNode(
            null,
            "/images/round_45_staggered_triangular_hole.jpeg",
          ),
          "Round 60° Staggered Triangular Hole": createNode(
            null,
            "/images/round_60_staggered_triangular_hole.jpeg",
          ),
          "Round 90° Center To Center Hole": createNode(
            null,
            "/images/round_90_center_to_center_hole.jpeg",
          ),
          "Square Center to Center Hole": createNode(
            null,
            "/images/square_center_to_center_hole.jpeg",
          ),
          "Square Staggered Triangular Hole": createNode(
            null,
            "/images/square_staggered_triangular_hole.jpeg",
          ),
        },
        "/images/openAreaCalculation.png",
      ),
      "Weight Per Roll": createNode(
        {
          "Capsule Center to Center Hole": createNode(
            null,
            "/images/WPR/capsule_center_to_center_hole.jpeg",
          ),

          "Capsule Staggered Triangular Hole": createNode(
            null,
            "/images/WPR/capsule_staggered_triangular_hole.jpeg",
          ),

          "Hexagonal Staggered Triangular Hole": createNode(
            null,
            "/images/WPR/hexagonal_staggered_triangular_hole.jpeg",
          ),

          "Rectangular Center to Center Hole": createNode(
            null,
            "/images/WPR/rectangular_center_to_center_hole.jpeg",
          ),

          "Rectangular Staggered Triangular Hole": createNode(
            null,
            "/images/WPR/rectangular_staggered_triangular_hole.jpeg",
          ),

          "Round 45° Staggered Triangular Hole.": createNode(
            null,
            "/images/WPR/round_45_staggered_triangular_hole.jpeg",
          ),

          "Round 60° Staggered Triangular Hole": createNode(
            null,
            "/images/WPR/round_60_staggered_triangular_hole.jpeg",
          ),

          "Round 90° Center To Center Hole": createNode(
            null,
            "/images/WPR/round_90_center_to_center_hole.jpeg",
          ),

          "Square Center to Center Hole": createNode(
            null,
            "/images/WPR/square_center_to_center_hole.jpeg",
          ),

          "Square Staggered Triangular Hole": createNode(
            null,
            "/images/WPR/square_staggered_triangular_hole.jpeg",
          ),
        },
        "/images/weight_per_roll.png",
      ),
      "Weight Per 0D": createNode(
        {
          "Capsule Center to Center Hole": createNode(
            null,
            "/images/WPO/capsule_center_to_center_hole_wpo.jpeg",
          ),

          "Capsule Staggered Triangular Hole": createNode(
            null,
            "/images/WPO/capsule_staggered_triangular_hole_wpo.jpeg",
          ),

          "Hexagonal Staggered Triangular Hole": createNode(
            null,
            "/images/WPO/hexagonal_staggered_triangular_hole_wpo.jpeg",
          ),

          "Rectangular Center to Center Hole": createNode(
            null,
            "/images/WPO/rectangular_center_to_center_hole_wpo.jpeg",
          ),

          "Rectangular Staggered Triangular Hole": createNode(
            null,
            "/images/WPO/rectangular_staggered_triangular_hole_wpo.jpeg",
          ),

          "Round 45° Staggered Triangular Hole.": createNode(
            null,
            "/images/WPO/round_45_staggered_triangular_hole_wpo.jpeg",
          ),

          "Round 60° Staggered Triangular Hole": createNode(
            null,
            "/images/WPO/round_60_staggered_triangular_hole_wpo.jpeg",
          ),

          "Round 90° Center To Center Hole": createNode(
            null,
            "/images/WPO/round_90_center_to_center_hole_wpo.jpeg",
          ),

          "Square Center to Center Hole": createNode(
            null,
            "/images/WPO/square_cenetr_to_center_hole.jpeg",
          ),

          "Square Staggered Triangular Hole": createNode(
            null,
            "/images/WPO/square_staggered_triangular_hole_wpo.jpeg",
          ),
        },
        "/images/weight_per_od.png",
      ),
      "Weight Per OD less ID": createNode(
        {
          "Capsule Center to Center Hole": createNode(
            null,
            "/images/WPOLI/capsule_center_to_center_hole_wpoli.jpeg",
          ),

          "Capsule Staggered Triangular Hole": createNode(
            null,
            "/images/WPOLI/capsule_staggered_triangular_hole_wpoli.jpeg",
          ),

          "Hexagonal Staggered Triangular Hole": createNode(
            null,
            "/images/WPOLI/hexagonal_staggered_triangular_hole_wpoli.jpeg",
          ),

          "Rectangular Center to Center Hole": createNode(
            null,
            "/images/WPOLI/rectangular_center_to_center_hole_wpoli.jpeg",
          ),

          "Rectangular Staggered Triangular Hole": createNode(
            null,
            "/images/WPOLI/rectangular_staggered_triangular_hole_wpoli.jpeg",
          ),

          "Round 45° Staggered Triangular Hole.": createNode(
            null,
            "/images/WPOLI/round_45_staggered_triangular_hole_wpoli.jpeg",
          ),

          "Round 60° Staggered Triangular Hole": createNode(
            null,
            "/images/WPOLI/round_60_staggered_triangular_hole_wpoli.jpeg",
          ),

          "Round 90° Center To Center Hole": createNode(
            null,
            "/images/WPOLI/round_90_center_to_center_hole_wpoli.jpeg",
          ),

          "Square Center to Center Hole": createNode(
            null,
            "/images/WPOLI/square_center_to_center_hole_wpoli.jpeg",
          ),

          "Square Staggered Triangular Hole": createNode(
            null,
            "/images/WPOLI/square_staggered_triangular_hole_wpoli.jpeg",
          ),
        },
        "/images/weight_per_od_less_id.png",
      ),
    },
    "/images/perforatedSheet.png",
  ),
  "Wire Mesh": createNode(
    {
      "Dutch Woven Wire Mesh": createNode({
        "Weight Per Role": createNode(null, "/images/weight_per_role2.png"),
        "Weight Per OD": createNode(null, "/images/weight_per_od_2.png"),
        "Weight Per OD Less ID": createNode(null, "/images/weight_per_od_less_id_2.png"),
      }, "/images/dutch_woven_wire_mesh_2.png"),
      "Weight Per Role": createNode(null, "/images/weight_per_role.png"),
      "Micron/MM/B.S.S/A.S.T.M/I.S.S/Tyler/Twill Dutch/Reverse Plain Dutch/Plain Dutch Mesh":
        createNode(),
      "Open Area (%) Calculation": createNode({
        "Harp Wire Mesh": createNode(),
        "Rectangular Wire Mesh": createNode(),
        "Square Wire Mesh": createNode(),
      }),
      "Mesh/Opening/Pitch Calculation": createNode({
        Mesh: createNode(),
        Opening: createNode(),
        "Pitch (P)": createNode(),
      }),
    },
    "/images/wire_mesh_2.png",
  ),
  Wire: createNode(
    {
      "Hexagonal Wire": createNode(),
      "Octagonal Wire": createNode(),
      "Re-Enforced Bar": createNode(),
      "Rectangle Wire": createNode(),
      "Round Wire": createNode(),
      "Square Wire": createNode(),
      "SWG to MM": createNode(),
    },
    "/images/wire.png",
  ),
  "Unit Calculator": createNode(
    {
      Area: createNode(),
      Length: createNode(),
      Weight: createNode(),
      Price: createNode({
        "Area to Area": createNode(),
        "Area to Running Length": createNode(),
      }),
    },
    "/images/unit_converter.jpeg",
  ),
  "Welded Wiremesh": createNode(
    {
      "Mesh/Opening/Pitch Calculations": createNode({
        Opening: createNode(),
        "Pitch (P)": createNode(),
        Mesh: createNode(),
      }),
      "Weight Per Roll": createNode(),
      "Weight Per OD": createNode(),
      "Weight Per OD Less ID": createNode(),
      "Wires Required": createNode(),
    },
    "/images/WW/welded_wiremesh__ww.jpeg",
  ),
};
