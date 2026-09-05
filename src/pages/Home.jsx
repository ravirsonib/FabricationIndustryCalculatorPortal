import React, { useState } from 'react';
import { appData } from '../data/data';
import Header from '../components/Header';
import CategoryGrid from '../components/CategoryGrid';
import CalculatorRenderer from '../components/CalculatorRenderer'; // Naya import

export default function App() {
  const [path, setPath] = useState([]);

  // Find current data level based on path
  let currentChildren = appData;
  let currentImage = null;

  // Path traverse karte waqt image bhi fetch kar lo taaki calculator me dikha sakein
  if (path.length === 0) {
    currentImage = null; // Root par koi ek image nahi hoti
  } else {
    let node = appData;
    for (let i = 0; i < path.length; i++) {
      node = i === 0 ? node[path[i]] : node.children[path[i]];
      currentImage = node.image;
    }
  }

  path.forEach(key => {
    currentChildren = currentChildren[key] ? currentChildren[key].children : currentChildren.children[key].children;
  });

  const isCalculator = currentChildren === null;
  const currentTitle = path.length > 0 ? path[path.length - 1] : "Fabric Calculator";

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      
      <Header 
        path={path}
        onBack={() => setPath(path.slice(0, -1))}
        onHome={() => setPath([])}
      />

      <main className="flex-1 w-full overflow-y-auto">
        {!isCalculator ? (
          <CategoryGrid 
            items={currentChildren} 
            onNavigate={(key) => setPath([...path, key])} 
          />
        ) : (
          <CalculatorRenderer title={currentTitle} image={currentImage} path={path} />
        )}
      </main>
      
    </div>
  );
}