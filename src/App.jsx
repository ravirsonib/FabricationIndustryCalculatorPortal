import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import CalculatorRenderer from './components/CalculatorRenderer';
import { appData } from './data/data'; // Ensure this path is correct

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. URL path ko array me split karo
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // 2. Har segment ko decode karo taaki '%20' wapas space ' ' ban jaye
  const decodedPathArray = pathSegments.map(decodeURIComponent);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      
      {/* Ab Header me decoded (clean) naam jayenge */}
      <Header 
        path={decodedPathArray}
        onBack={() => navigate(-1)}
        onHome={() => navigate('/')}
      />

      <main className="flex-1 w-full overflow-y-auto">
        <Routes>
          {/* Main Home Route */}
          <Route 
            path="/" 
            element={
              <CategoryGrid 
                items={appData} 
                onNavigate={(key) => navigate(`/${encodeURIComponent(key)}`)} 
              />
            } 
          />

          {/* Catch-all Route for Infinite Nesting (using /* ) */}
          <Route 
            path="/*" 
            element={<CalculatorWrapper decodedPathArray={decodedPathArray} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

// Wrapper component jo decoded array read karke sahi component render karega
function CalculatorWrapper({ decodedPathArray }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  let currentData = appData;
  let currentImage = null;
  let isCalculator = false;

  try {
    // Array ko traverse karke deeply nested category dhundo
    decodedPathArray.forEach(key => {
      if (currentData[key]) {
        currentImage = currentData[key].image;
        if (currentData[key].children === null) {
          isCalculator = true;
        } else {
          currentData = currentData[key].children;
        }
      } else {
        // Agar loop me koi invalid key aayi toh error throw karega
        throw new Error("Category Not Found");
      }
    });
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Category Not Found</h2>
        <p>The calculation module you are looking for does not exist.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-6 py-2 bg-brand-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
          Go Back Home
        </button>
      </div>
    );
  }

  // Last clicked item ka naam
  const currentTitle = decodedPathArray[decodedPathArray.length - 1];

  // Agar leaf node hai (no children), toh form render karo
  if (isCalculator) {
    return <CalculatorRenderer title={currentTitle} image={currentImage} path={decodedPathArray} />;
  }

  // Warna sub-category ka grid dikhao
  return (
    <CategoryGrid 
      items={currentData} 
      onNavigate={(key) => {
        // Safe navigation to next deep level
        const currentPath = location.pathname === '/' ? '' : location.pathname;
        navigate(`${currentPath}/${encodeURIComponent(key)}`);
      }} 
    />
  );
}