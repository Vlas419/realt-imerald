import { useState, useId } from 'react';
import { X, Calculator, ShieldCheck, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { Currency } from '../types/property';
import { convertPrice, formatPrice } from '../utils/formatters';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialPriceUSD?: number;
}

const BANK_PROGRAMS = [
  { name: 'Беларусбанк («Ипотека Экспресс»)', rate: 14.4, maxTerm: 20 },
  { name: 'Белгазпромбанк («Скоро новоселье»)', rate: 14.9, maxTerm: 20 },
  { name: 'Приорбанк («Дружная семья»)', rate: 15.1, maxTerm: 15 },
  { name: 'Белагропромбанк («Партнерский»)', rate: 14.2, maxTerm: 25 },
];

export function MortgageCalculatorModal({
  isOpen,
  onClose,
  currency,
  initialPriceUSD = 120000,
}: MortgageCalculatorModalProps) {
  const propertyCostId = useId();
  const downPaymentId = useId();
  const loanTermId = useId();
  const interestRateId = useId();

  if (!isOpen) return null;

  // Initial values converted to the selected currency
  const defaultCost = convertPrice(initialPriceUSD, currency);

  const [propertyCost, setPropertyCost] = useState(defaultCost);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(14.4);

  // Calculations
  const downPaymentAmount = Math.round((propertyCost * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, propertyCost - downPaymentAmount);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyPayment =
    monthlyRate > 0 && totalMonths > 0 && loanAmount > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const requiredIncome = Math.round(monthlyPayment / 0.5); // Bank standard: payment <= 50% income

  const fmt = (num: number) => new Intl.NumberFormat('ru-RU').format(num);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl w-full max-w-4xl my-auto shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Ипотечный калькулятор (Беларусь)
              </h2>
              <p className="text-xs text-slate-500">
                Расчёт платежей по программам кредитования жилья ведущих банков РБ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto max-h-[82vh]">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Bank Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Партнерские программы банков РБ:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BANK_PROGRAMS.map((bank) => {
                  const active = interestRate === bank.rate;
                  return (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() => {
                        setInterestRate(bank.rate);
                        if (years > bank.maxTerm) setYears(bank.maxTerm);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        active
                          ? 'border-emerald-600 bg-emerald-50 text-slate-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <p className="truncate">{bank.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {bank.rate}% годовых · до {bank.maxTerm} лет
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Cost */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label htmlFor={propertyCostId} className="font-semibold text-slate-700">Стоимость объекта ({currency})</label>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {fmt(propertyCost)} {currency}
                </span>
              </div>
              <input
                id={propertyCostId}
                type="range"
                min={10000}
                max={currency === 'BYN' ? 3000000 : 1000000}
                step={currency === 'BYN' ? 5000 : 2000}
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label htmlFor={downPaymentId} className="font-semibold text-slate-700">
                  Первоначальный взнос ({downPaymentPercent}%)
                </label>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {fmt(downPaymentAmount)} {currency}
                </span>
              </div>
              <input
                id={downPaymentId}
                type="range"
                min={10}
                max={90}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>10%</span>
                <span>30%</span>
                <span>50%</span>
                <span>90%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label htmlFor={loanTermId} className="font-semibold text-slate-700">Срок кредита</label>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {years} лет ({years * 12} мес.)
                </span>
              </div>
              <input
                id={loanTermId}
                type="range"
                min={3}
                max={25}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>3 года</span>
                <span>10 лет</span>
                <span>20 лет</span>
                <span>25 лет</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label htmlFor={interestRateId} className="font-semibold text-slate-700">Процентная ставка (% годовых)</label>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {interestRate.toFixed(1)}%
                </span>
              </div>
              <input
                id={interestRateId}
                type="range"
                min={8.0}
                max={20.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Результаты расчёта
              </span>

              {/* Monthly payment highlighted */}
              <div className="mt-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 block">Ежемесячный платеж</span>
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-600 tabular-nums mt-0.5">
                  {fmt(monthlyPayment)} {currency}
                </p>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Аннуитетный график погашения
                </span>
              </div>

              {/* Details table */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Сумма кредита:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {fmt(loanAmount)} {currency}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Собственные средства:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {fmt(downPaymentAmount)} {currency}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Переплата за {years} лет:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {fmt(totalInterest)} {currency}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">Рекомендуемый доход:</span>
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    от {fmt(requiredIncome)} {currency}/мес
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Расчёт носит информационный характер в соответствии с требованиями Нацбанка РБ. Окончательные условия подтверждаются кредитным комитетом выбранного банка.
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Вернуться к объектам
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
