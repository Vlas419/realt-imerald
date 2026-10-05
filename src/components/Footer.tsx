import { RealtLogo } from './RealtLogo';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAddListing: () => void;
  onSelectDistrict: (district: string) => void;
}

export function Footer({
  onOpenAddListing,
  onSelectDistrict,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <RealtLogo className="text-white brightness-125" />
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Современный архитектурный портал недвижимости Республики Беларусь. Все цены, метраж, планировки и условия соответствуют стандартам каталога realt.by.
            </p>
          </div>

          {/* Districts Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Районы Минска
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Центральный', 'Первомайский', 'Советский', 'Октябрьский', 'Минский район'].map(
                (d) => (
                  <li key={d}>
                    <button
                      type="button"
                      onClick={() => onSelectDistrict(d)}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {d}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Сервисы
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenAddListing}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Подать объявление
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Каталог проверенных объектов
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Rates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Финансовый базис
            </h4>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Курс НБРБ (USD):</span>
                <span className="font-mono text-white font-bold tabular-nums">~3.28 BYN</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Курс НБРБ (EUR):</span>
                <span className="font-mono text-white font-bold tabular-nums">~3.56 BYN</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Ставка кредита:</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">от 14.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Realt Neo. Контент и структура вдохновлены каталогом realt.by.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
