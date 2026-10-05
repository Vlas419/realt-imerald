import { LayoutGrid, List, Map, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState, PropertyCategory, DealType } from '../types/property';
import { MINSK_DISTRICTS, MINSK_METRO } from '../data/properties';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  totalFound: number;
}

export function FilterBar({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalFound,
}: FilterBarProps) {
  const handleCategoryChange = (category: PropertyCategory) => {
    onFilterChange({ ...filters, category });
  };

  const handleDealChange = (dealType: DealType) => {
    onFilterChange({ ...filters, dealType });
  };

  const toggleRoom = (roomNum: number) => {
    const current = filters.rooms;
    let next: number[];
    if (current.includes(roomNum)) {
      next = current.filter((r) => r !== roomNum);
    } else {
      next = [...current, roomNum];
    }
    onFilterChange({ ...filters, rooms: next });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      dealType: 'all',
      category: 'all',
      rooms: [],
      priceMin: 0,
      priceMax: 1000000,
      district: 'Все районы',
      metro: 'Все станции',
      isNewBuildingOnly: false,
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.dealType !== 'all' ||
    filters.category !== 'all' ||
    filters.rooms.length > 0 ||
    filters.district !== 'Все районы' ||
    filters.metro !== 'Все станции' ||
    filters.isNewBuildingOnly ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000000;

  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-3.5">
        {/* Top Filter Row: Category + Deal + Layout Modes + Total Count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 text-xs font-medium">
            {[
              { id: 'all', label: 'Все объекты' },
              { id: 'apartment', label: 'Квартиры' },
              { id: 'house', label: 'Дома и коттеджи' },
              { id: 'commercial', label: 'Коммерческая' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id as PropertyCategory)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.category === tab.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Section: View Mode & Sort */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="hidden sm:inline">Сортировка:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="featured">Рекомендуемые</option>
                <option value="price_asc">Сначала недорогие</option>
                <option value="price_desc">Сначала дорогие</option>
                <option value="area_desc">По площади (макс)</option>
                <option value="newest">Сначала новые</option>
              </select>
            </div>

            {/* Layout Toggle: Grid / List / Map */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg" role="group">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Сетка"
                aria-label="Вид сеткой"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Список"
                aria-label="Вид списком"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('map')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Карта Минска"
                aria-label="Вид на карте"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Filter Row: Deal Type, Rooms, District, Metro, New Building, Reset */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Deal Type Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
            <button
              type="button"
              onClick={() => handleDealChange('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                filters.dealType === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => handleDealChange('sale')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                filters.dealType === 'sale'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Продажа
            </button>
            <button
              type="button"
              onClick={() => handleDealChange('rent')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                filters.dealType === 'rent'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Аренда
            </button>
          </div>

          {/* Rooms Selector */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Комнат:</span>
            {[1, 2, 3, 4].map((r) => {
              const active = filters.rooms.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRoom(r)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md font-mono text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r === 4 ? '4+' : r}
                </button>
              );
            })}
          </div>

          {/* District selector */}
          <select
            value={filters.district}
            onChange={(e) => onFilterChange({ ...filters, district: e.target.value })}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 text-xs focus:ring-1 focus:ring-emerald-500"
          >
            {MINSK_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Metro selector */}
          <select
            value={filters.metro}
            onChange={(e) => onFilterChange({ ...filters, metro: e.target.value })}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 text-xs focus:ring-1 focus:ring-emerald-500"
          >
            {MINSK_METRO.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* New building checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={filters.isNewBuildingOnly}
              onChange={(e) =>
                onFilterChange({ ...filters, isNewBuildingOnly: e.target.checked })
              }
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Только новостройки</span>
          </label>

          {/* Active indicator & Reset */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-slate-500 font-mono tabular-nums text-xs">
              Найдено: <strong className="text-slate-900 font-semibold">{totalFound}</strong>
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сбросить</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
