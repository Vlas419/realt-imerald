import { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { CompareModal } from './components/CompareModal';
import { InteractiveMap } from './components/InteractiveMap';
import { AddListingModal } from './components/AddListingModal';
import { FactsAndSocialProof } from './components/FactsAndSocialProof';
import { Footer } from './components/Footer';
import { INITIAL_PROPERTIES } from './data/properties';
import { Property, Currency, FilterState, DealType, PropertyCategory } from './types/property';
import { Heart, SearchX, Sparkles, Building2, MapPin } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'realt_favorites_v1';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['realt-101'];
    } catch {
      return ['realt-101'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Compared IDs
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [showingFavoritesOnly, setShowingFavoritesOnly] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
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

  const catalogRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    setViewMode('map');
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFacts = () => {
    factsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle compare
  const handleToggleCompare = (id: string) => {
    setComparedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearCompare = () => setComparedIds([]);

  // Add listing
  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  // Filter and sort items
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (showingFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (filters.dealType !== 'all') {
      result = result.filter((p) => p.dealType === filters.dealType);
    }

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.rooms.length > 0) {
      result = result.filter((p) => {
        if (filters.rooms.includes(4)) {
          return p.rooms >= 4 || filters.rooms.includes(p.rooms);
        }
        return filters.rooms.includes(p.rooms);
      });
    }

    if (filters.district !== 'Все районы') {
      result = result.filter((p) => p.district === filters.district);
    }

    if (filters.metro !== 'Все станции') {
      result = result.filter((p) => p.metro === filters.metro);
    }

    if (filters.isNewBuildingOnly) {
      result = result.filter((p) => p.isNewBuilding);
    }

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          (p.metro && p.metro.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price_desc':
        result.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'area_desc':
        result.sort((a, b) => b.totalArea - a.totalArea);
        break;
      case 'newest':
        result.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
        break;
      case 'featured':
      default:
        // natural default
        break;
    }

    return result;
  }, [properties, filters, showingFavoritesOnly, favorites]);

  // Compared objects list
  const comparedProperties = useMemo(() => {
    return properties.filter((p) => comparedIds.includes(p.id));
  }, [properties, comparedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-slate-900">
      {/* Top Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        favoritesCount={favorites.length}
        compareCount={comparedIds.length}
        onOpenFavorites={() => {
          setShowingFavoritesOnly(true);
          scrollToCatalog();
        }}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        onScrollToCatalog={() => {
          setShowingFavoritesOnly(false);
          scrollToCatalog();
        }}
        onScrollToMap={scrollToMap}
        onScrollToFacts={scrollToFacts}
      />

      {/* Hero Section */}
      <Hero
        onSearch={({ query, dealType, category }) => {
          setFilters((prev) => ({
            ...prev,
            searchQuery: query,
            dealType,
            category,
          }));
          setShowingFavoritesOnly(false);
          scrollToCatalog();
        }}
        onSelectPreset={(preset) => {
          setFilters((prev) => ({
            ...prev,
            searchQuery: preset,
            dealType: 'all',
            category: 'all',
          }));
          setShowingFavoritesOnly(false);
          scrollToCatalog();
        }}
        onOpenAdvancedFilters={() => scrollToCatalog()}
      />

      {/* Main Content Area */}
      <main className="flex-1" ref={catalogRef}>
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalFound={filteredProperties.length}
        />

        {/* Catalog Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={mapRef}>
          {/* Favorites Only Banner */}
          {showingFavoritesOnly && (
            <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-900">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>Отображаются только избранные объекты ({filteredProperties.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setShowingFavoritesOnly(false)}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 hover:underline cursor-pointer"
              >
                Показать весь каталог
              </button>
            </div>
          )}

          {/* Interactive Map View */}
          {viewMode === 'map' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Интерактивная карта недвижимости Минска
                  </h2>
                  <p className="text-xs text-slate-500">
                    Нажмите на метку с ценой, чтобы увидеть мини-карточку объекта
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  Вернуться к списку
                </button>
              </div>

              <InteractiveMap
                properties={filteredProperties}
                currency={currency}
                onSelectProperty={(p) => setSelectedProperty(p)}
              />
            </div>
          ) : (
            <>
              {/* Properties Grid or List */}
              {filteredProperties.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      currency={currency}
                      isFavorite={favorites.includes(prop.id)}
                      isCompared={comparedIds.includes(prop.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onToggleCompare={handleToggleCompare}
                      onSelect={(p) => setSelectedProperty(p)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
                  <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-900">
                    По вашему запросу ничего не найдено
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Попробуйте ослабить параметры фильтрации или выберите другой район Минска.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({
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
                      setShowingFavoritesOnly(false);
                    }}
                    className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Screen 3: Блок фактов (50/50: продукт / компания) и Social Proof (отзывы, рейтинги, сертификаты) */}
      <div ref={factsRef}>
        <FactsAndSocialProof />
      </div>

      {/* Footer */}
      <Footer
        onOpenAddListing={() => setIsAddListingOpen(true)}
        onSelectDistrict={(district) => {
          setFilters((prev) => ({ ...prev, district }));
          scrollToCatalog();
        }}
      />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        currency={currency}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        isCompared={selectedProperty ? comparedIds.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleCompare={handleToggleCompare}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        properties={comparedProperties}
        currency={currency}
        onRemoveFromCompare={handleToggleCompare}
        onClearCompare={handleClearCompare}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddListingOpen}
        onClose={() => setIsAddListingOpen(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
}
