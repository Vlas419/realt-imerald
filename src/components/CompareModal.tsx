import { X, Trash2, ExternalLink } from 'lucide-react';
import { Property, Currency } from '../types/property';
import { formatPrice, formatPricePerMeter } from '../utils/formatters';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  currency: Currency;
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectProperty: (property: Property) => void;
}

export function CompareModal({
  isOpen,
  onClose,
  properties,
  currency,
  onRemoveFromCompare,
  onClearCompare,
  onSelectProperty,
}: CompareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl w-full max-w-6xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Сравнение объектов недвижимости ({properties.length})
            </h2>
            <p className="text-xs text-slate-500">
              Наглядное сопоставление характеристик, площадей и стоимости
            </p>
          </div>

          <div className="flex items-center gap-2">
            {properties.length > 0 && (
              <button
                type="button"
                onClick={onClearCompare}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded cursor-pointer"
              >
                Очистить всё
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto p-6">
          {properties.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Нет объектов для сравнения. Нажмите на значок весов на карточке любого объекта, чтобы добавить его сюда.
            </div>
          ) : (
            <table className="w-full text-xs text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-3 w-44 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                    Параметр
                  </th>
                  {properties.map((p) => (
                    <th key={p.id} className="p-3 min-w-[200px] align-top">
                      <div className="relative group">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-28 object-cover rounded-lg mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-md shadow-xs transition-colors cursor-pointer"
                          title="Удалить"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProperty(p);
                          }}
                          className="font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer"
                        >
                          {p.title}
                        </h4>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-medium text-slate-500">Стоимость</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-mono font-bold text-slate-950 tabular-nums">
                      {formatPrice(p.priceUSD, currency, p.dealType)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Цена за м²</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-mono text-slate-700 tabular-nums">
                      {formatPricePerMeter(p.priceUSD, p.totalArea, currency) || '—'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Общая площадь</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-mono font-semibold text-slate-900 tabular-nums">
                      {p.totalArea} м²
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Комнат</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-medium text-slate-800">
                      {p.rooms}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Этаж</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-mono text-slate-700 tabular-nums">
                      {p.floor && p.totalFloors ? `${p.floor} / ${p.totalFloors}` : '—'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Год постройки</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 font-mono text-slate-700 tabular-nums">
                      {p.year} г.
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Тип дома</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700">
                      {p.buildingType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Ремонт</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700">
                      {p.renovation}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Метро</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 text-slate-700">
                      {p.metro ? `ст. м. ${p.metro} (${p.metroDistance || ''})` : '—'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-500">Особенности</td>
                  {properties.map((p) => (
                    <td key={p.id} className="p-3 text-slate-600">
                      <ul className="list-disc pl-3 space-y-0.5 text-[11px]">
                        {p.features.slice(0, 4).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
