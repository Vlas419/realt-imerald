import { useState } from 'react';
import {
  FileDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

export function LeadMagnetAndContacts() {
  const [phone, setPhone] = useState('');
  const [messenger, setMessenger] = useState<'telegram' | 'viber' | 'whatsapp'>('telegram');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contacts-and-lead" className="bg-[#0F172A] text-white py-16 sm:py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Экран 4: Лид-магнит + Блок контактов */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Левая колонка (7 cols): ЛИД-МАГНИТ */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Закрытый инвест-каталог • Доходность до 14.2% годовых
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                ТОП-15 инвестиционных объектов Минска с ценой ниже рынка на 7–12%
              </h2>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
                Эксклюзивный PDF-каталог ликвидных квартир и коммерческих помещений с готовой финансовой моделью окупаемости (Cap Rate), расчётом арендного потока и 100% юридической экспертизой.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Расчёт доходности и ROI (9.8% – 14.2% годовых)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Дисконт от срочных продавцов и застройщиков</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Проверенная юридическая чистота по ЕГРНИ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Мгновенный PDF-отчёт в выбранный мессенджер</span>
                </div>
              </div>
            </div>

            {/* Форма захвата (Лид-магнит) */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Каталог успешно отправлен!</h4>
                  <p className="text-xs text-slate-300">
                    Мы выслали PDF-подборку на номер <span className="font-mono text-emerald-400">{phone}</span> в {messenger}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Выбор мессенджера */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 mr-1">Куда отправить:</span>
                    {(['telegram', 'viber', 'whatsapp'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMessenger(m)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                          messenger === m
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m === 'telegram' ? 'Telegram' : m === 'viber' ? 'Viber' : 'WhatsApp'}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+375 (__) ___-__-__"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer shrink-0"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Получить инвест-каталог (PDF)</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных по закону РБ № 99-З.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Правая колонка (5 cols): БЛОК КОНТАКТОВ */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Связь с нами
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Офис и служба поддержки
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Поможем подобрать объект, бесплатно оценить вашу квартиру или разместить объявление.
              </p>

              {/* Контактные данные */}
              <div className="mt-6 space-y-4 text-xs">
                {/* Телефон */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Единая линия поддержки (РБ):</span>
                    <a
                      href="tel:+375173887070"
                      className="font-mono text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      +375 (17) 388-70-70
                    </a>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      +375 (29) 600-02-02 (А1 / МТС)
                    </span>
                  </div>
                </div>

                {/* Адрес */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Главный офис:</span>
                    <p className="font-semibold text-white">г. Минск, пр-т Победителей, 103</p>
                    <span className="text-[11px] text-slate-400">Бизнес-центр «Виктория Олимп», оф. 412</span>
                  </div>
                </div>

                {/* График работы */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Время работы консультантов:</span>
                    <p className="font-semibold text-white">Пн – Вс: 09:00 – 20:00</p>
                    <span className="text-[11px] text-slate-400">Онлайн-заявки принимаются круглосуточно 24/7</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Электронная почта:</span>
                    <a
                      href="mailto:support@realt-imerald.by"
                      className="font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      support@realt-imerald.by
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Лицензия Минюста № 02240/288</span>
              <span className="text-emerald-400 font-semibold">● Операторы онлайн</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
