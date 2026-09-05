import React, { useState } from 'react';
import { appData } from '../data/data';
import Header from '../components/Header';
import CategoryGrid from '../components/CategoryGrid';
import CalculatorView from '../components/CalculatorView';

export default function App() {
  const [path, setPath] = useState([]);

  // Find current data level based on path
  let currentChildren = appData;
  path.forEach(key => {
    currentChildren = currentChildren[key].children;
  });

  const isCalculator = currentChildren === null;
  const currentTitle = path.length > 0 ? path[path.length - 1] : "Fabric Industry Calculator";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      <Header 
        path={path}
        onBack={() => setPath(path.slice(0, -1))}
        onHome={() => setPath([])}
      />

      {/* Main Content Area - Full screen responsive width */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {!isCalculator ? (
          <CategoryGrid 
            items={currentChildren} 
            onNavigate={(key) => setPath([...path, key])} 
          />
        ) : (
          <CalculatorView title={currentTitle} />
        )}
      </main>
      
    </div>
  );
}