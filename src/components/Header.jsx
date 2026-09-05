import { ChevronLeft, Home, Calculator } from 'lucide-react';

export default function Header({ path, onBack, onHome }) {
  const currentTitle = path.length > 0 ? path[path.length - 1] : "Fabric Calculator";

  return (
    <header className="bg-white sticky top-0 z-50 w-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-orange to-brand-red"></div>
      
      <div className="flex items-center px-6 py-4 max-w-screen-2xl mx-auto">
        {/* Back Button */}
        {path.length > 0 && (
          <button 
            onClick={onBack} 
            className="mr-4 p-2 text-slate-500 hover:text-brand-orange hover:bg-orange-50 rounded-full transition-all duration-200"
            title="Go Back"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        )}
        
        {/* Logo/Icon & Title */}
        <div className="flex items-center flex-1 gap-3 overflow-hidden">
          <div className="bg-blue-50 p-2 rounded-lg text-brand-blue">
            <Calculator size={22} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 truncate">
            {currentTitle}
          </h1>
        </div>
        
        {/* Home Button */}
        {path.length > 0 && (
          <button 
            onClick={onHome} 
            className="ml-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-blue hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <Home size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Home</span>
          </button>
        )}
      </div>
    </header>
  );
}