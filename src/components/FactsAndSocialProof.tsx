import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Star,
  Building,
  Users,
  Compass,
  FileCheck2,
  Lock,
  ThumbsUp,
  Quote,
  Sparkles,
  TrendingUp,
  BadgeCheck,
} from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  dealTag: string;
  propertyTitle: string;
  text: string;
  category: 'buyer' | 'renter' | 'agency';
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Алексей и Дарья Морозовы',
    role: 'Покупатели квартиры',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '3 дня назад',
    dealTag: 'Проверено ЕГРНИ',
    propertyTitle: 'Евротрёшка 78 м² в Новой Боровой',
    text: 'Искали жильё для семьи почти полгода. На Realt подкупила честная цена за м² без скрытых надбавок и мгновенный пересчёт в рубли по курсу НБРБ. Оформили сделку за 5 дней, все документы проверили через кадастровую базу прямо на платформе.',
    category: 'buyer',
  },
  {
    id: 'r2',
    author: 'Максим Ковалёв',
    role: 'IT-специалист, арендатор',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '1 неделя назад',
    dealTag: 'Прямой договор',
    propertyTitle: 'Апартаменты на пр. Победителей (Немига)',
    text: 'Очень удобная интерактивная карта с радиусом до метро и ресторанов. Фотографии и планировка совпали на 100%, владелец подтвердил бронирование за 10 минут. Никаких серых схем — всё прозрачно и безопасно.',
    category: 'renter',
  },
  {
    id: 'r3',
    author: 'Инна Григорьева',
    role: 'Ведущий риелтор АН «Центральное»',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '2 недели назад',
    dealTag: 'Аккредитованный партнёр',
    propertyTitle: 'Партнёр Realt с 2017 года',
    text: 'Работаем с Realt уже более 7 лет. Для белорусского рынка это безусловный эталон чистоты базы и целевого трафика. Инструменты проверки объектов и модерация отсеивают 100% сомнительных объявлений.',
    category: 'agency',
  },
];

export function FactsAndSocialProof() {
  const [activeTab, setActiveTab] = useState<'all' | 'buyer' | 'renter' | 'agency'>('all');

  const filteredReviews =
    activeTab === 'all'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.category === activeTab);

  return (
    <section id="about-and-reviews" className="bg-white border-t border-b border-slate-200 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ==================================================================== */}
        {/* ЧАСТЬ 1: БЛОК ФАКТОВ (50/50: 3 про продукт, 3 про компанию)          */}
        {/* ==================================================================== */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Цифры и факты
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Факты, которым доверяет вся Беларусь
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Открытые стандарты работы платформы и многолетняя история развития крупнейшего классифайда жилья в стране.
            </p>
          </div>

          {/* 50 / 50 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Колонка 1 (50%): ТРИ ФАКТА ПРО ПРОДУКТ */}
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500 text-white rounded-xl shadow-xs">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">О продукте Realt Imerald</h3>
                      <p className="text-xs text-slate-500">Технологии и стандарты платформы</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                    Продукт
                  </span>
                </div>

                <div className="space-y-6 pt-6">
                  {/* Факт о продукте 1 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-bold font-mono text-sm shadow-xs">
                      01
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        100% верификация каждого объекта и кадастра
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Сверка адресов и кадастровых номеров с Национальным кадастровым агентством РБ. Исключаем дубли, неактуальные цены и несуществующие планировки.
                      </p>
                    </div>
                  </div>

                  {/* Факт о продукте 2 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-bold font-mono text-sm shadow-xs">
                      02
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        Честный мультивалютный расчёт и цена за м²
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Мгновенный автоматический пересчёт стоимости в BYN (по официальному курсу НБРБ), USD и EUR. Никаких скрытых комиссий и навязанных платежей.
                      </p>
                    </div>
                  </div>

                  {/* Факт о продукте 3 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 font-bold font-mono text-sm shadow-xs">
                      03
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        Интерактивная карта инфраструктуры Минска
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Прямая привязка к станциям метро, парковым зонам, школам и поликлиникам с точным позиционированием и сравнением характеристик объектов на одном экране.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Актуальная база объявлений
                </span>
                <span className="font-mono font-bold text-slate-900">32 400+ предложений</span>
              </div>
            </div>

            {/* Колонка 2 (50%): ТРИ ФАКТА ПРО КОМПАНИЮ */}
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xs">
                      <Building className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">О компании Realt</h3>
                      <p className="text-xs text-slate-500">Флагман рынка недвижимости с 2005 года</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-md">
                    Компания
                  </span>
                </div>

                <div className="space-y-6 pt-6">
                  {/* Факт о компании 1 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold font-mono text-sm shadow-xs">
                      01
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        18+ лет на рынке недвижимости Беларуси
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Старейший и самый авторитетный цифровой портал страны. Запустились в 2005 году и стали главным ориентиром аналитики цен на первичном и вторичном рынке.
                      </p>
                    </div>
                  </div>

                  {/* Факт о компании 2 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold font-mono text-sm shadow-xs">
                      02
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        450 000+ успешных сделок и 120+ агентств
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Единая аккредитованная сеть проверенных агентств недвижимости и сертифицированных риелторов со всей Беларуси под строгим контролем стандартов качества.
                      </p>
                    </div>
                  </div>

                  {/* Факт о компании 3 */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold font-mono text-sm shadow-xs">
                      03
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        1 200 000+ пользователей каждый месяц
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Каждый второй житель Минска и областных центров ищет, покупает или снимает недвижимость через Realt. Высочайший охват аудитории и прозрачные условия.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  №1 классифайд Байнета
                </span>
                <span className="font-mono font-bold text-slate-900">Минск и вся Беларусь</span>
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* ЧАСТЬ 2: SOCIAL PROOF (Рейтинги, Отзывы, Сертификаты)                */}
        {/* ==================================================================== */}
        <div className="space-y-12">
          
          {/* Header Social Proof */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Social Proof & Доверие
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Отзывы, рейтинги и сертификаты качества
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Реальные истории новосёлов, высокие оценки пользователей и официальные государственные свидетельства надёжности.
            </p>
          </div>

          {/* Рейтинги и ключевые показатели (Trust Metrics Bar) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 text-center border border-slate-800 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                4.9 <span className="text-lg text-slate-400 font-normal">/ 5.0</span>
              </p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Рейтинг в App Store и Google</p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">28 400+ оценок</p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 text-center border border-slate-800 shadow-sm">
              <div className="flex items-center justify-center text-emerald-400 mb-1">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                99.4%
              </p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Сделок без претензий</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Полная юр. защита</p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 text-center border border-slate-800 shadow-sm">
              <div className="flex items-center justify-center text-emerald-400 mb-1">
                <Award className="w-5 h-5" />
              </div>
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                № 1
              </p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Портал недвижимости РБ</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Народная марка 2024</p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 text-center border border-slate-800 shadow-sm">
              <div className="flex items-center justify-center text-emerald-400 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                120+
              </p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Аттестованных агентств</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Официальные партнёры</p>
            </div>
          </div>

          {/* Фильтры отзывов */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Все отзывы (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('buyer')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'buyer'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Покупатели квартир
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('renter')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'renter'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Аренда жилья
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('agency')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'agency'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Агентства и риелторы
            </button>
          </div>

          {/* Карточки отзывов */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <BadgeCheck className="w-3 h-3 text-emerald-600" />
                      {review.dealTag}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                    «{review.propertyTitle}»
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{review.author}</h4>
                    <p className="text-[11px] text-slate-500">{review.role}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-slate-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Официальные сертификаты и юридические гарантии */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  Государственные сертификаты и юридические гарантии
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Полное соответствие законодательству Республики Беларусь и защита прав потребителей
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shrink-0">
                100% Legal Safe
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Сертификат 1 */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Регламент Минюста РБ</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Соблюдение требований Закона РБ «О риелторской деятельности» и стандартов оформления договоров.
                  </p>
                </div>
              </div>

              {/* Сертификат 2 */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Защита данных (НЦЗПД)</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Аттестованная система защиты персональных данных согласно Закону РБ № 99-З от 07.05.2021.
                  </p>
                </div>
              </div>

              {/* Сертификат 3 */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Членство в БелАН</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Официальный технологический партнёр Белорусской ассоциации риелторов и агентств недвижимости.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
