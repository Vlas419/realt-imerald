import { useState } from 'react';
import { MapPin, Navigation, Eye, Building2, Layers } from 'lucide-react';
import { Property, Currency } from '../types/property';
import { formatPrice } from '../utils/formatters';

interface InteractiveMapProps {
  properties: Property[];
  currency: Currency;
  onSelectProperty: (property: Property) => void;
}

export function InteractiveMap({
  properties,
  currency,
  onSelectProperty,
}: InteractiveMapProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    properties[0]?.id || null
  );

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  // Minsk center approx lat 53.9045, lng 27.5615
  // Map bounds: lat [53.85, 54.06], lng [27.35, 27.75]
  const minLat = 53.85;
  const maxLat = 54.08;
  const minLng = 27.35;
  const maxLng = 27.76;

  const getPositionStyle = (lat: number, lng: number) => {
    // Project to percentage
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert y because latitude increases upwards
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    // Clamping to visible area
    const clampedX = Math.max(8, Math.min(92, x));
    const clampedY = Math.max(8, Math.min(90, y));

    return { left: `${clampedX}%`, top: `${clampedY}%` };
  };

  return (
    <div className="relative w-full h-[580px] bg-[#E5EBE8] rounded-2xl overflow-hidden border border-slate-300 shadow-inner select-none">
      {/* Map Graphic Background representing Minsk districts, water bodies (Svisloch, Drozdy, Zaslavskoe), and MKAD */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* MKAD ring road approximation */}
        <ellipse
          cx="50%"
          cy="52%"
          rx="38%"
          ry="34%"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="3"
          strokeDasharray="6 4"
        />

        {/* Svisloch River & Reservoirs curve */}
        <path
          d="M 28% 18% Q 40% 32% 48% 46% T 54% 62% T 68% 85%"
          fill="none"
          stroke="#93C5FD"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Water Reservoirs (Drozdy, Komsomolskoe) */}
        <ellipse cx="36%" cy="28%" rx="5%" ry="3%" fill="#BAE6FD" />
        <ellipse cx="46%" cy="44%" rx="3%" ry="2%" fill="#BAE6FD" />

        {/* Metro Lines */}
        {/* Blue Line (Moskovskaya: Uruchye -> Kamennaya Gorka) */}
        <path
          d="M 80% 28% L 50% 50% L 20% 58%"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Red Line (Avtozavodskaya: Mogilevskaya -> Nemiga -> Kamennaya Gorka) */}
        <path
          d="M 75% 75% L 50% 50% L 35% 35%"
          fill="none"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Green Line (Zelenoluzhskaya: Aerodromnaya -> Yubileynaya) */}
        <path
          d="M 52% 70% L 49% 48%"
          fill="none"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Map Control overlay info */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
        <Layers className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-semibold text-slate-800">
          Минск и окрестности · МКАД
        </span>
        <span className="text-slate-400 text-xs">|</span>
        <span className="text-xs text-slate-500 font-mono tabular-nums">
          {properties.length} на карте
        </span>
      </div>

      {/* Metro legend */}
      <div className="hidden sm:flex absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-xs items-center gap-3 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span>Московская линия</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span>Автозаводская</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span>Зеленолужская</span>
        </div>
      </div>

      {/* Pins on Map */}
      {properties.map((p) => {
        const isSelected = p.id === selectedPropertyId;
        const pos = getPositionStyle(p.coordinates.lat, p.coordinates.lng);
        const priceLabel = formatPrice(p.priceUSD, currency, p.dealType);

        return (
          <div
            key={p.id}
            style={pos}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-110"
            onClick={() => setSelectedPropertyId(p.id)}
          >
            <div
              className={`px-2.5 py-1 rounded-full shadow-md font-mono text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                isSelected
                  ? 'bg-slate-950 text-white ring-4 ring-emerald-500/40 scale-105'
                  : 'bg-white text-slate-900 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-300'
              }`}
            >
              <MapPin
                className={`w-3 h-3 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}
              />
              <span>{priceLabel}</span>
            </div>
          </div>
        );
      })}

      {/* Selected Property Preview Popup Card */}
      {selectedProperty && (
        <div className="absolute top-4 right-4 z-30 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in">
          <div className="relative h-36 bg-slate-100">
            <img
              src={selectedProperty.imageUrl}
              alt={selectedProperty.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-mono">
              {formatPrice(selectedProperty.priceUSD, currency, selectedProperty.dealType)}
            </div>
          </div>

          <div className="p-3.5 space-y-2">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>{selectedProperty.rooms}-комн.</span>
              <span>·</span>
              <span className="font-mono tabular-nums">{selectedProperty.totalArea} м²</span>
              <span>·</span>
              <span>{selectedProperty.district}</span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
              {selectedProperty.title}
            </h4>

            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{selectedProperty.address}</span>
            </p>

            <button
              type="button"
              onClick={() => onSelectProperty(selectedProperty)}
              className="w-full mt-2 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Посмотреть объект</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
