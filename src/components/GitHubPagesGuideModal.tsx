import { useState } from 'react';
import { X, Copy, Check, ExternalLink, Terminal, GitBranch, Globe, Sparkles } from 'lucide-react';

interface GitHubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubPagesGuideModal({ isOpen, onClose }: GitHubPagesGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCommand = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: 'Шаг 1. Создание репозитория на GitHub',
      desc: 'Создайте новый публичный репозиторий в вашем профиле GitHub.',
      code: null,
      notes: [
        'Перейдите на https://github.com/new',
        'Укажите имя репозитория, например: realt-belarus',
        'Обязательно оставьте тип репозитория «Public» (Публичный)',
        'Не инициализируйте README, .gitignore — они уже настроены в проекте',
      ],
    },
    {
      title: 'Шаг 2. Загрузка кода в GitHub',
      desc: 'Выполните следующие команды в терминале папки проекта для отправки кода:',
      code: `git init
git add .
git commit -m "feat: initial commit of Realt portal"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ.git
git push -u origin main`,
      notes: [
        'Замените ВАШ_ЛОГИН и ВАШ_РЕПОЗИТОРИЙ на реальные данные из адресной строки вашего репозитория.',
      ],
    },
    {
      title: 'Шаг 3. Включение GitHub Pages в один клик',
      desc: 'Активируйте автоматический деплой через настроенный GitHub Actions.',
      code: null,
      notes: [
        'В вашем репозитории на GitHub нажмите вкладку Settings (Настройки ⚙️)',
        'В левой боковой панели выберите Pages',
        'В блоке Build and deployment в поле Source выберите «GitHub Actions»',
        'Готово! Файл .github/workflows/deploy.yml автоматически соберёт проект за 60 секунд',
      ],
    },
    {
      title: 'Шаг 4. Получение публичной ссылки для людей',
      desc: 'Через минуту ваш сайт станет доступен всему миру по ссылке:',
      code: `https://ВАШ_ЛОГИН.github.io/ВАШ_РЕПОЗИТОРИЙ/`,
      notes: [
        'Эту ссылку можно отправлять друзьям, клиентам, заказчикам или вставлять в портфолио.',
        'Все относительные пути (base: "./") и статические ресурсы уже сконфигурированы в vite.config.ts и никогда не выдадут 404 ошибки.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl w-full max-w-3xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Как опубликовать сайт на GitHub Pages
              </h2>
              <p className="text-xs text-slate-500">
                Пошаговое руководство, чтобы любой человек мог открыть ваш сайт по ссылке
              </p>
            </div>
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Important readiness banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-950 text-xs">
                Проект уже на 100% готов к GitHub Pages!
              </h3>
              <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                Мы уже добавили относительный базовый путь (<code className="bg-emerald-100 px-1 py-0.5 rounded font-mono">base: &apos;./&apos;</code>) в <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono">vite.config.ts</code> и создали готовый пайплайн <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono">.github/workflows/deploy.yml</code>. При отправке кода в репозиторий сайт опубликуется без дополнительных правок.
              </p>
            </div>
          </div>

          {/* Troubleshooting for red failed workflow */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
              <span>⚠️ Если при первой сборке появился красный крестик (Failed):</span>
            </h4>
            <ul className="space-y-1 text-[11px] text-amber-900 list-disc pl-4 leading-relaxed">
              <li>
                В репозитории GitHub перейдите в <strong>Settings ➔ Pages</strong> и убедитесь, что в поле <strong>Source</strong> выбрано именно <strong>GitHub Actions</strong> (а не Deploy from a branch).
              </li>
              <li>
                В <strong>Settings ➔ Actions ➔ General</strong> в самом низу в <strong>Workflow permissions</strong> выберите <strong>Read and write permissions</strong>.
              </li>
              <li>
                В терминале отправьте исправленные файлы: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">git add . && git commit -m &quot;fix workflow&quot; && git push</code>, затем нажмите <strong>Re-run all jobs</strong>.
              </li>
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                  <span className="font-mono text-[11px] text-slate-400">0{idx + 1}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>

                {s.code && (
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed">
                      {s.code}
                    </pre>
                    <button
                      type="button"
                      onClick={() => copyCommand(s.code!, idx)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-1 cursor-pointer text-[10px]"
                      title="Копировать команды"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <ul className="space-y-1 text-[11px] text-slate-500 list-disc pl-4">
                  {s.notes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">
              Полный текст инструкции также сохранён в файле README.md репозитория.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
            >
              Понятно, закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
