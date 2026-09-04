export default function ParameterInput({ 
  label, 
  value, 
  onChange, 
  hasUnit = true, 
  unitValue, 
  onUnitChange, 
  unitOptions = ["mm", "inch", "m"] 
}) {
  return (
    <div className="flex items-center justify-between bg-[#f1f3f4] rounded-2xl p-1 mb-4 shadow-sm">
      {/* Input Field */}
      <input
        type="number"
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-none outline-none px-4 py-3 text-gray-700 font-medium placeholder-gray-500"
      />

      {/* Unit Dropdown (Optional) */}
      {hasUnit && (
        <div className="relative flex items-center pr-3 border-l border-gray-300 pl-2">
          <select
            value={unitValue}
            onChange={onUnitChange}
            className="bg-transparent font-bold text-gray-800 outline-none appearance-none pr-4 cursor-pointer"
          >
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          {/* Custom Dropdown Arrow */}
          <svg className="w-4 h-4 text-gray-600 absolute right-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
}