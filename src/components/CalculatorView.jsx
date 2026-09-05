import React from 'react';

export default function CalculatorView({ title }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-12 text-center max-w-4xl mx-auto">
      <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
        {title} Calculator
      </h2>
      <p className="text-slate-500 text-base md:text-lg max-w-lg">
        Input fields and mathematical logic for <strong className="text-slate-700">{title}</strong> will be implemented here.
      </p>
    </div>
  );
}