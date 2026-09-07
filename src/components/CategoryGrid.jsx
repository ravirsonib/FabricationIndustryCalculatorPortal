import React, { useState } from 'react';
import {
  ArrowRight,
  Grid3x3,
  Diamond,
  Hexagon,
  CircleDot,
  Cable,
  RefreshCw,
  LayoutGrid,
  Box,
} from 'lucide-react';

/**
 * Fallback icon + accent per material, used only when an item has no
 * `image` supplied. Real product photos always win (see renderMedia below).
 * Colors are drawn from one small industrial palette so the grid stays
 * cohesive even when icons differ.
 */
const MATERIAL_STYLES = [
  { match: /chain/i, Icon: Diamond, accent: '#1D5D9B' },
  { match: /expanded/i, Icon: Grid3x3, accent: '#8A5A2B' },
  { match: /hex/i, Icon: Hexagon, accent: '#1D5D9B' },
  { match: /perforat/i, Icon: CircleDot, accent: '#8A5A2B' },
  { match: /welded/i, Icon: LayoutGrid, accent: '#1D5D9B' },
  { match: /wire\s*mesh/i, Icon: Grid3x3, accent: '#1D5D9B' },
  { match: /^wire$/i, Icon: Cable, accent: '#8A5A2B' },
  { match: /unit/i, Icon: RefreshCw, accent: '#3E6B52' },
];

function resolveStyle(key) {
  const found = MATERIAL_STYLES.find((m) => m.match.test(key));
  return found || { Icon: Box, accent: '#1D5D9B' };
}

/** Catalog-style code, e.g. "Chain Link" -> "CL-01" */
function makeCode(key, index) {
  const initials = key
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
  return `${initials}-${String(index + 1).padStart(2, '0')}`;
}

function CornerMark({ position, color }) {
  const positions = {
    tl: 'top-2 left-2 border-t-2 border-l-2',
    tr: 'top-2 right-2 border-t-2 border-r-2',
    bl: 'bottom-2 left-2 border-b-2 border-l-2',
    br: 'bottom-2 right-2 border-b-2 border-r-2',
  };
  return (
    <span
      style={{ borderColor: color }}
      className={`absolute w-3 h-3 opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 ${positions[position]}`}
    />
  );
}

export default function CategoryGrid({ items, onNavigate }) {
  const keys = Object.keys(items || {});

  return (
    <div className="w-full bg-[#F4F6F8] px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {keys.map((key, index) => {
            const item = items[key];
            const { Icon, accent } = resolveStyle(key);
            const code = makeCode(key, index);

            return (
              <button
                key={key}
                onClick={() => onNavigate && onNavigate(key)}
                className="group relative flex flex-col text-left bg-white rounded-xl border border-[#E1E4EA] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(20,30,45,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5D9B] focus-visible:ring-offset-2"
                style={{ '--accent': accent }}
              >
                {/* Media area */}
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden transition-colors duration-300"
                  style={{
                    backgroundColor: '#FAFBFC',
                    backgroundImage:
                      'linear-gradient(#EAEDF1 1px, transparent 1px), linear-gradient(90deg, #EAEDF1 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                  }}
                >
                  <CornerMark position="tl" color={accent} />
                  <CornerMark position="tr" color={accent} />
                  <CornerMark position="bl" color={accent} />
                  <CornerMark position="br" color={accent} />

                  {item?.image ? (
                    <img
                      src={item.image}
                      alt={key}
                      className="w-full h-full object-contain p-1 sm:p-1 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon
                        size={56}
                        strokeWidth={1.4}
                        color={accent}
                        className="transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                </div>

                {/* Border that lights up on hover, sits between media and label */}
                <div
                  className="h-px w-full transition-colors duration-300"
                  style={{ backgroundColor: 'var(--accent)', opacity: 0 }}
                />

                {/* Label area */}
                <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-3 sm:py-3.5 border-t border-[#E1E4EA] transition-colors duration-300 group-hover:border-[color:var(--accent)]">
                  <div className="min-w-0">
                    <span
                      className="block font-mono text-[10px] sm:text-[11px] tracking-wider mb-0.5 transition-colors duration-300"
                      style={{ color: accent }}
                    >
                      {code}
                    </span>
                    <span className="block font-semibold text-[13.5px] sm:text-[15px] leading-snug text-[#1A2233] truncate">
                      {key}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    style={{ color: accent }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo wrapper — only used for preview. Delete when dropping          */
/* CategoryGrid into your real app; pass your own `items` + `onNavigate`. */
/* ------------------------------------------------------------------ */
export function Demo() {
  const [selected, setSelected] = useState(null);

  const items = {
    'Chain Link': {},
    'Expanded Metal': {},
    'Hexagonal Wiremesh': {},
    'Perforated Sheet': {},
    'Wire Mesh': {},
    Wire: {},
    'Unit Calculator': {},
    'Welded Wiremesh': {},
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <div className="flex items-center gap-3 px-4 sm:px-6 md:px-10 py-5 bg-white border-b border-[#E1E4EA]">
        <div className="w-8 h-8 rounded-md bg-[#1D5D9B]/10 flex items-center justify-center">
          <Grid3x3 size={18} color="#1D5D9B" />
        </div>
        <h1 className="font-semibold text-[#1A2233] text-lg">Fabric Calculator</h1>
        {selected && (
          <span className="ml-auto text-sm text-[#5B6472]">
            Opened: <span className="font-medium text-[#1A2233]">{selected}</span>
          </span>
        )}
      </div>
      <CategoryGrid items={items} onNavigate={setSelected} />
    </div>
  );
}