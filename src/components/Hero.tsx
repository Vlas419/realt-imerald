import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowRight } from 'lucide-react';
import heroMinskImage from '../assets/images/hero_minsk_architecture_1791211852989.jpg';
import { DealType, PropertyCategory } from '../types/property';

interface HeroProps {
  onSearch: (filters: {
    query: string;
    dealType: DealType;
    category: PropertyCategory;
  }) => void;
  onSelectPreset: (query: string) => void;
  onOpenAdvancedFilters: () => void;
}

export function Hero({ onSearch, onSelectPreset, onOpenAdvancedFilters }: HeroProps) {
  const [dealType, setDealType] = useState<DealType>('sale');
  const [category, setCategory] = useState<PropertyCategory>('apartment');
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, dealType, category });
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Architectural Photo with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroMinskImage}
          alt="Современный жилой квартал в Минске"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Natural human editorial numbering / kicker */}
          <p className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            01. Белорусский портал недвижимости
          </p>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Честная недвижимость Беларуси без лишнего шума
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Актуальные квартиры, готовые загородные дома, премиальные пентхаусы и коммерческие пространства в Минске с прямой проверкой цен и метража по стандартам realt.by.
          </p>
        </div>

        {/* Integrated Search Box */}
        <div className="mt-10 max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-900 border border-white/20">
          {/* Segmented Controls for Deal & Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Deal Type Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDealType('sale')}
                className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dealType === 'sale'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Купить
              </button>
              <button
                type="button"
                onClick={() => setDealType('rent')}
                className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dealType === 'rent'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Снять
              </button>
            </div>

            {/* Category Switcher */}
            <div className="flex items-center gap-1 text-xs font-medium">
              {[
                { id: 'apartment', label: 'Квартиры' },
                { id: 'house', label: 'Дома и коттеджи' },
                { id: 'commercial', label: 'Коммерческая' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id as PropertyCategory)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    category === tab.id
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Inputs Row */}
          <form onSubmit={handleSearchSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Минск, метро Немига, ЖК D3, Новая Боровая..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAdvancedFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>Фильтры</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-md cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Найти</span>
              </button>
            </div>
          </form>

          {/* Quick presets */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Быстрый подбор:</span>
            {[
              'ЖК «D3» и Лебяжий',
              'Новая Боровая',
              'Минск Мир',
              'Офисы Немига',
              'Коттеджи в Тарасово',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setQuery(preset);
                  onSelectPreset(preset);
                }}
                className="text-slate-600 hover:text-emerald-700 hover:underline transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Claim-to-Proof Adjacency */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
          <div>
            <p className="font-mono text-2xl font-bold text-white tabular-nums">32 400+</p>
            <p className="text-xs text-slate-400 mt-0.5">Актуальных объектов</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-white tabular-nums">3.28</p>
            <p className="text-xs text-slate-400 mt-0.5">Курс пересчета BYN/ €</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-white tabular-nums">100%</p>
            <p className="text-xs text-slate-400 mt-0.5">Проверка цены за м²</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">24 / 7</p>
            <p className="text-xs text-slate-400 mt-0.5">Обновление объявлений</p>
          </div>
        </div>
      </div>
    </section>
  );
}
