import { useState } from 'react';
import { Heart, Scale, PlusCircle, Menu, X } from 'lucide-react';
import { RealtLogo } from './RealtLogo';
import { Currency } from '../types/property';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenAddListing: () => void;
  onScrollToCatalog: () => void;
  onScrollToMap: () => void;
  onScrollToFacts: () => void;
}

export function Header({
  currency,
  onCurrencyChange,
  favoritesCount,
  compareCount,
  onOpenFavorites,
  onOpenCompare,
  onOpenAddListing,
  onScrollToCatalog,
  onScrollToMap,
  onScrollToFacts,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title, single element */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
            aria-label="Realt — главная страница"
          >
            <RealtLogo theme="light" />
          </a>

          {/* Zone 2: nav links, clean portal navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={onScrollToCatalog}
              className="hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Каталог
            </button>
            <button
              onClick={onScrollToMap}
              className="hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Карта объектов
            </button>
            <button
              onClick={onScrollToFacts}
              className="hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Факты и отзывы
            </button>
            <button
              onClick={onOpenFavorites}
              className="flex items-center gap-1.5 hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Избранное</span>
              {favoritesCount > 0 && (
                <span className="font-mono text-xs tabular-nums text-slate-500">
                  ({favoritesCount})
                </span>
              )}
            </button>
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 hover:text-slate-950 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Сравнение</span>
                <span className="font-mono text-xs tabular-nums text-slate-500">
                  ({compareCount})
                </span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1–2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Currency segmented control */}
            <div
              className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium"
              role="group"
              aria-label="Выбор валюты"
            >
              {(['USD', 'BYN', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2.5 py-1 rounded-md transition-colors font-mono tabular-nums ${
                    currency === c
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenAddListing}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Подать объявление</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md focus-visible:outline-none"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 text-sm font-medium">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToCatalog();
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-slate-950"
          >
            Каталог недвижимости
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToMap();
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-slate-950"
          >
            Интерактивная карта
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToFacts();
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-slate-950"
          >
            Факты о компании и отзывы
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFavorites();
            }}
            className="flex items-center justify-between w-full py-2 text-slate-700 hover:text-slate-950"
          >
            <span>Избранное</span>
            <span className="font-mono text-xs tabular-nums text-slate-500">{favoritesCount}</span>
          </button>
          {compareCount > 0 && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare();
              }}
              className="flex items-center justify-between w-full py-2 text-slate-700 hover:text-slate-950"
            >
              <span>Сравнение объектов</span>
              <span className="font-mono text-xs tabular-nums text-slate-500">{compareCount}</span>
            </button>
          )}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddListing();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Подать объявление</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
