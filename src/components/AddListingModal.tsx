import { useState } from 'react';
import { X, PlusCircle, CheckCircle2, Upload, Building2 } from 'lucide-react';
import { Property, DealType, PropertyCategory } from '../types/property';
import { MINSK_DISTRICTS, MINSK_METRO } from '../data/properties';
import heroMinsk from '../assets/images/hero_minsk_architecture_1791211852989.jpg';
import aptPenthouse from '../assets/images/apt_panoramic_penthouse_1791211864478.jpg';
import cottagePine from '../assets/images/cottage_pine_terrace_1791211876329.jpg';
import aptDesigner from '../assets/images/apt_designer_interior_1791211886912.jpg';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

export function AddListingModal({
  isOpen,
  onClose,
  onAddProperty,
}: AddListingModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<DealType>('sale');
  const [category, setCategory] = useState<PropertyCategory>('apartment');
  const [priceUSD, setPriceUSD] = useState<number>(95000);
  const [rooms, setRooms] = useState<number>(2);
  const [totalArea, setTotalArea] = useState<number>(58.5);
  const [floor, setFloor] = useState<number>(7);
  const [totalFloors, setTotalFloors] = useState<number>(16);
  const [year, setYear] = useState<number>(2023);
  const [district, setDistrict] = useState<string>('Центральный');
  const [address, setAddress] = useState('');
  const [metro, setMetro] = useState<string>('Немига');
  const [renovation, setRenovation] = useState<Property['renovation']>('Евроремонт');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('+375 (29) ');
  const [selectedImage, setSelectedImage] = useState<string>(aptDesigner);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !address || !sellerName) return;

    const newProperty: Property = {
      id: `realt-user-${Date.now()}`,
      title,
      dealType: dealType === 'all' ? 'sale' : dealType,
      category: category === 'all' ? 'apartment' : category,
      priceUSD: Number(priceUSD),
      rooms: Number(rooms),
      totalArea: Number(totalArea),
      floor: Number(floor),
      totalFloors: Number(totalFloors),
      year: Number(year),
      city: 'Минск',
      district,
      address,
      metro: metro !== 'Все станции' ? metro : undefined,
      metroDistance: '7 мин пешком',
      renovation,
      buildingType: 'Монолитно-каркасный',
      description: description || 'Светлая уютная недвижимость с качественным ремонтом и удобной транспортной развязкой.',
      features: ['Новое объявление', 'Лифт', 'Стеклопакеты', 'Развитая инфраструктура'],
      imageUrl: selectedImage,
      galleryUrls: [selectedImage, heroMinsk],
      coordinates: { lat: 53.905 + (Math.random() - 0.5) * 0.08, lng: 27.56 + (Math.random() - 0.5) * 0.12 },
      isNewBuilding: year >= 2021,
      seller: {
        name: sellerName,
        agency: 'Частное объявление',
        phone: sellerPhone,
        verified: true,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProperty(newProperty);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl w-full max-w-2xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Подать объявление о недвижимости
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">
                Объявление успешно опубликовано!
              </h3>
              <p className="text-xs text-slate-500">
                Оно моментально добавлено в каталог и доступно для просмотра на карте и в поиске.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Deal & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Тип сделки</label>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value as DealType)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="sale">Продажа</option>
                    <option value="rent">Аренда</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Категория</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="apartment">Квартира</option>
                    <option value="house">Дом / Коттедж</option>
                    <option value="commercial">Коммерческая</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Заголовок объявления *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: 2-комнатная квартира в ЖК «Левада» с панорамным видом"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Price, Rooms, Area */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Цена в $ (USD) *
                  </label>
                  <input
                    type="number"
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Комнат</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Площадь (м²) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={totalArea}
                    onChange={(e) => setTotalArea(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Address & District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Адрес (улица, дом) *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ул. Нововиленская, 38"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Район Минска</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  >
                    {MINSK_DISTRICTS.filter((d) => d !== 'Все районы').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Metro & Renovation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ближайшее метро</label>
                  <select
                    value={metro}
                    onChange={(e) => setMetro(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  >
                    {MINSK_METRO.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ремонт</label>
                  <select
                    value={renovation}
                    onChange={(e) => setRenovation(e.target.value as Property['renovation'])}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Дизайнерский">Дизайнерский</option>
                    <option value="Евроремонт">Евроремонт</option>
                    <option value="Современный">Современный</option>
                    <option value="Без отделки">Без отделки</option>
                  </select>
                </div>
              </div>

              {/* Photo template selection */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Выберите главное фото объекта
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { img: aptDesigner, label: 'Интерьер' },
                    { img: aptPenthouse, label: 'Пентхаус' },
                    { img: cottagePine, label: 'Коттедж' },
                    { img: heroMinsk, label: 'ЖК / Фасад' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(item.img)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === item.img
                          ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.img}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-16 object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[10px] text-center py-0.5">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Подробное описание
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите планировку, вид из окон, отделку и инфраструктуру..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Ваше имя или агентство *
                  </label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Иван Петров"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Опубликовать объявление на Realt
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
