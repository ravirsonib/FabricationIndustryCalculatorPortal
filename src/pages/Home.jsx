import { Link } from "react-router";
import Header from "../components/Header";

const categories = [
  { id: 'chain-link', name: 'CHAIN LINK', image: 'chain_link.png' },
  { id: 'expanded-metal', name: 'EXPANDED METAL', image: 'expanded_metal.png' },
  { id: 'hexagonal', name: 'HEXAGONAL WIREMESH', image: 'hexagonal_wiremesh.png' },
  { id: 'perforated', name: 'PERFORATED SHEET', image: 'perforatedSheet.png' },
  { id: 'wire-mesh', name: 'WIRE MESH', image: 'wire_mesh_2.png' },
  { id: 'wire', name: 'WIRE', image: '/assets/wire.png' },
  { id: 'unit-calculator', name: 'UNIT CALCULATOR', image: '/assets/unit_converter.png' },
  { id: 'welded', name: 'WELDED WIREMESH', image: '/assets/WW/welded_wiremesh__ww.jpeg' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <Header title="VMI Calculator" showMenu={true} />
      
      <div className="grid grid-cols-2 gap-4 p-4 max-w-md mx-auto mt-2">
        {categories.map((item) => (
          <Link 
            key={item.id} 
            to={`/calculator/${item.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <div className="p-4 h-32 w-full flex items-center justify-center">
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                <img src={`/images/${item.image}`} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full text-center p-3 border-t border-gray-100">
              <h2 className="text-[#4a2c3a] font-bold text-sm tracking-wide">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}