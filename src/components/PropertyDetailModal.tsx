import { useState } from 'react';
import {
  X,
  Heart,
  Scale,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Phone,
  Clock,
  Sparkles,
  Calculator,
  Send,
} from 'lucide-react';
import { Property, Currency } from '../types/property';
import { formatPrice, formatPricePerMeter, convertPrice } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: Currency;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onClose: () => void;
  onOpenMortgageWithPrice: (priceUSD: number) => void;
}

export function PropertyDetailModal({
  property,
  currency,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onClose,
  onOpenMortgageWithPrice,
}: PropertyDetailModalProps) {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-10-08');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const images = property.galleryUrls.length > 0 ? property.galleryUrls : [property.imageUrl];
  const activeImage = images[activeImageIndex] || property.imageUrl;

  const priceFormatted = formatPrice(property.priceUSD, currency, property.dealType);
  const pricePerMeter =
    property.dealType === 'sale'
      ? formatPricePerMeter(property.priceUSD, property.totalArea, currency)
      : null;

  // Approximate monthly mortgage calculation in selected currency
  const convertedPrice = convertPrice(property.priceUSD, currency);
  const loanAmount = convertedPrice * 0.8; // 80% loan
  const monthlyRate = 0.145 / 12; // 14.5% annual
  const months = 240; // 20 years
  const approxMonthly = Math.round(
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setBookingSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl w-full max-w-5xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 truncate">
              {property.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.address}, {property.city} ({property.district})</span>
              {property.metro && (
                <>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">м. {property.metro}</span>
                  {property.metroDistance && <span>({property.metroDistance})</span>}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Избранное"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              type="button"
              onClick={() => onToggleCompare(property.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Сравнить"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-7">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-100">
              <img
                src={activeImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Фото ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Key Callouts */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {property.dealType === 'sale' ? 'Стоимость объекта' : 'Стоимость аренды'}
              </p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-mono text-3xl font-extrabold text-slate-950 tabular-nums">
                  {priceFormatted}
                </span>
                {pricePerMeter && (
                  <span className="font-mono text-sm text-slate-500 tabular-nums">
                    {pricePerMeter}
                  </span>
                )}
              </div>
            </div>

            {property.dealType === 'sale' && (
              <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-lg border border-slate-200">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Кредит от банков РБ</p>
                  <p className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                    от {new Intl.NumberFormat('ru-RU').format(approxMonthly)} {currency}/мес
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenMortgageWithPrice(property.priceUSD)}
                  className="ml-auto text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Рассчитать
                </button>
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Характеристики объекта
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Общая площадь</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {property.totalArea} м²
                </span>
              </div>
              {property.livingArea && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Жилая площадь</span>
                  <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                    {property.livingArea} м²
                  </span>
                </div>
              )}
              {property.kitchenArea && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Кухня</span>
                  <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                    {property.kitchenArea} м²
                  </span>
                </div>
              )}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Количество комнат</span>
                <span className="font-bold text-slate-900 text-sm">{property.rooms}</span>
              </div>
              {property.floor && property.totalFloors && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Этаж / Этажность</span>
                  <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                    {property.floor} из {property.totalFloors}
                  </span>
                </div>
              )}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Год постройки</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {property.year} г.
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Тип здания</span>
                <span className="font-bold text-slate-900 text-sm truncate block">
                  {property.buildingType}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Ремонт</span>
                <span className="font-bold text-slate-900 text-sm">{property.renovation}</span>
              </div>
              {property.ceilingHeight && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Высота потолков</span>
                  <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                    {property.ceilingHeight} м
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Описание объекта
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
              {property.description}
            </p>
          </div>

          {/* Amenities / Features */}
          {property.features.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Особенности и инфраструктура
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {property.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller & Viewing Booking Module */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            {/* Seller Contact Card */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-lg">
                    {property.seller.name.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{property.seller.name}</span>
                      {property.seller.verified && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Проверен Realt
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {property.seller.agency || 'Частное лицо'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Специалист готов ответить на вопросы по объекту, организовать оперативный показ и предоставить полный пакет правоустанавливающих документов.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>
                    {showPhone ? property.seller.phone : 'Показать номер телефона'}
                  </span>
                </button>
              </div>
            </div>

            {/* Viewing Appointment Form */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Записаться на просмотр</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Выберите удобное время для визита на объект
              </p>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">
                    Заявка на просмотр успешно отправлена!
                  </p>
                  <p className="text-xs text-emerald-700">
                    Риелтор {property.seller.name} свяжется с вами по номеру {clientPhone} для подтверждения.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Дата
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-500 block mb-1">
                        Время
                      </label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+375 (__) ___-__-__"
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Забронировать просмотр</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
