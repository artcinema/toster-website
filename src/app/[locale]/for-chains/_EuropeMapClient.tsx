'use client';

import * as React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import geoData from '@/data/countries-110m.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GEO_URL = geoData as any;

// ISO 3166-1 numeric — UA=804, PL=616, CZ=203, DE=276
const HIGHLIGHTED = new Set([804, 616, 203, 276, 724, 784]); // UA, PL, CZ, DE, ES, UAE

interface Pin {
  name: string;
  coordinates: [number, number];
  active: boolean;
  stat: string;
}

const PINS: Pin[] = [
  { name: 'Kyiv',      coordinates: [30.52, 50.45], active: true,  stat: '200+ orders/day' },
  { name: 'Kharkiv',   coordinates: [36.23, 49.99], active: true,  stat: '50+ orders/day' },
  { name: 'Odessa',    coordinates: [30.73, 46.48], active: true,  stat: '90+ orders/day' },
  { name: 'Warsaw',    coordinates: [21.01, 52.23], active: true,  stat: '80+ orders/day' },
  { name: 'Krakow',    coordinates: [19.94, 50.06], active: true,  stat: '60+ orders/day' },
  { name: 'Prague',    coordinates: [14.42, 50.08], active: true,  stat: '40+ orders/day' },
  { name: 'Berlin',    coordinates: [13.40, 52.52], active: true,  stat: '30+ orders/day' },
  { name: 'Dnipro',    coordinates: [35.04, 48.46], active: true,  stat: '70+ orders/day' },
  { name: 'Munich',    coordinates: [11.58, 48.14], active: false, stat: 'Expanding soon' },
  { name: 'Dubai',     coordinates: [55.27, 25.20], active: false, stat: 'Expanding soon' },
  { name: 'Valencia',  coordinates: [-0.38, 39.47], active: false, stat: 'Expanding soon' },
  { name: 'Madrid',    coordinates: [-3.70, 40.42], active: false, stat: 'Expanding soon' },
  { name: 'Barcelona', coordinates: [2.17,  41.39], active: false, stat: 'Expanding soon' },
  { name: 'Zürich',    coordinates: [8.54,  47.37], active: false, stat: 'Expanding soon' },
];

interface EuropeMapProps {
  active: string;
  expanding: string;
  hint: string;
}

export function EuropeMapClient({ active, expanding, hint }: EuropeMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<Pin | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full select-none"
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [22, 44], scale: 480 }}
        height={320}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={6} center={[22, 44]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const hi = HIGHLIGHTED.has(Number(geo.id));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={hi ? '#FFF9C4' : '#F0F0F0'}
                    stroke={hi ? '#FFD600' : '#D4D4D4'}
                    strokeWidth={hi ? 1 : 0.4}
                    style={{
                      default: { outline: 'none' },
                      hover:   { fill: hi ? '#FFE566' : '#E8E8E8', outline: 'none', cursor: 'grab' },
                      pressed: { outline: 'none', cursor: 'grabbing' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {PINS.map((pin, i) => (
            <Marker
              key={pin.name}
              coordinates={pin.coordinates}
              onMouseEnter={() => setHovered(pin)}
              onMouseLeave={() => setHovered(null)}
            >
              {pin.active && (
                <circle r={10} fill="#FFD600" opacity={0.2}>
                  <animate attributeName="r" values="5;14;5" dur="2.5s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.5s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle
                r={hovered?.name === pin.name ? 7 : 5}
                fill={pin.active ? '#FFD600' : '#D4D4D4'}
                stroke={pin.active ? '#0A0A0A' : '#888'}
                strokeWidth={1.5}
                style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {hovered && (
        <div
          className="pointer-events-none absolute z-50 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 shadow-lg"
          style={{ left: mousePos.x + 14, top: mousePos.y - 48, whiteSpace: 'nowrap' }}
        >
          <p className="text-sm font-semibold text-[#0A0A0A]">{hovered.name}</p>
          <p className="text-xs text-[#525252]">{hovered.stat}</p>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-[#525252]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD600] ring-1 ring-[#0A0A0A]/20" />
          {active}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4D4] ring-1 ring-[#888]/20" />
          {expanding}
        </span>
        <span className="text-[#A3A3A3]">{hint}</span>
      </div>
    </div>
  );
}
