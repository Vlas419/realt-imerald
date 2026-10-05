import { useState } from 'react';
import { Heart, Scale, MapPin, Eye, Building2, Phone } from 'lucide-react';
import { Property, Currency } from '../types/property';
import { formatPrice, formatPricePerMeter } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (property: Property) => void;
  viewMode?: 'grid' | 'list';
}

export function PropertyCard({
  property,
  currency,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onSelect,
  viewMode = 'grid',
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const priceMain = formatPrice(property.priceUSD, currency, property.dealType);
  const pricePerMeter =
    property.dealType === 'sale'
      ? formatPricePerMeter(property.priceUSD, property.totalArea, currency)
      : null;

  const roomText =
    property.category === 'house'
      ? `${property.rooms} комнат`
      : property.category === 'commercial'
      ? `${property.totalArea} м² офис`
      : `${property.rooms}-комн.`;

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(property)}
        className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 p-4 flex flex-col md:flex-row gap-5 cursor-pointer shadow-xs hover:shadow-md"
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-64 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 bg-slate-100">
          {!imageError ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4">
              <Building2 className="w-8 h-8 mb-2 stroke-1" />
              <span className="text-xs text-center">{property.title}</span>
            </div>
          )}

          {/* Action buttons on image */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-emerald-600'
              }`}
              title={isCompared ? 'Убрать из сравнения' : 'Сравнить объект'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Unboxed clean metadata line */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span>{roomText}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{property.totalArea} м²</span>
              {property.floor && property.totalFloors && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {property.floor}/{property.totalFloors} этаж
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{property.year} г.</span>
              {property.isNewBuilding && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">Новостройка</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {property.title}
            </h3>

            {/* Address & Metro */}
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.address}, {property.district}</span>
              {property.metro && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-700 font-medium">ст. м. {property.metro}</span>
                  {property.metroDistance && (
                    <span className="text-slate-400 hidden sm:inline">({property.metroDistance})</span>
                  )}
                </>
              )}
            </div>

            {/* Snippet */}
            <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Bottom Bar: Price & Contact */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-slate-950 tabular-nums">
                  {priceMain}
                </span>
                {pricePerMeter && (
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    {pricePerMeter}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {property.seller.agency || property.seller.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPhone(!showPhone);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showPhone ? property.seller.phone : 'Показать телефон'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(property);
                }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <span>Подробнее</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div
      onClick={() => onSelect(property)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Image Container with 4:3 Aspect */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {!imageError ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4">
              <Building2 className="w-8 h-8 mb-2 stroke-1" />
              <span className="text-xs text-center">{property.title}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-emerald-600'
              }`}
              title={isCompared ? 'Убрать из сравнения' : 'Сравнить объект'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Clean unboxed metadata: NO PILLS */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <span>{roomText}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{property.totalArea} м²</span>
            {property.floor && property.totalFloors && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {property.floor}/{property.totalFloors} эт.
                </span>
              </>
            )}
            {property.isNewBuilding && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Новостройка</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            {property.title}
          </h3>

          {/* Address & Metro */}
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          {property.metro && (
            <p className="mt-0.5 text-xs text-slate-600 truncate pl-4">
              м. {property.metro}
              {property.metroDistance ? ` · ${property.metroDistance}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Footer / Price & Contact */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <p className="font-mono text-lg font-bold text-slate-950 tabular-nums">
              {priceMain}
            </p>
            {pricePerMeter && (
              <p className="font-mono text-xs text-slate-500 tabular-nums">
                {pricePerMeter}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(property);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}
