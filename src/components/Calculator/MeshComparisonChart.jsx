import React from 'react';
import CalculatorView from '../CalculatorView';

export default function MeshComparisonChart({ title, image }) {
  return (
    <CalculatorView 
      title={title} 
      image={image} 
      description="Reference chart for Micron, MM, B.S.S, A.S.T.M, I.S.S, Tyler, and Dutch Weaves."
    >
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 w-full flex flex-col items-center">
        
        {/* Instruction text */}
        <p className="text-slate-500 text-sm font-medium mb-4 w-full text-center">
          Pinch to zoom or scroll to view the complete mesh equivalent details.
        </p>

        {/* Image Container */}
        <div className="w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm" style={{ maxHeight: '70vh' }}>
          <img 
            src="/images/dutch_mesh_pdf.jpeg" 
            alt="Mesh Conversion Chart" 
            className="w-full h-auto object-contain min-w-[600px]"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x800?text=Please+Add+Chart+Image+In+Public+Folder';
            }}
          />
        </div>
        
      </div>
    </CalculatorView>
  );
}