// Faithful "screenshot-style" recreation of Toster's Kitchen Display System,
// built from the real admin KitchenDisplayPage (dark screen, QUEUE/PREPARING/
// READY columns, per-ticket timer + progress bar, quantity circles) with
// fictional demo tickets — no real customer data. Pure presentational.

interface DemoTicket {
  n: number;
  customer: string;
  channel: 'Web' | 'Phone' | 'App' | 'Bot';
  items: { q: number; name: string }[];
  timer: string;
  state: 'queue' | 'preparing' | 'ready';
  progress?: number; // 0..100 for preparing
  late?: 'warn' | 'crit';
}

const COLUMNS: { key: string; label: string; tickets: DemoTicket[] }[] = [
  {
    key: 'QUEUE',
    label: 'Queue',
    tickets: [
      { n: 1051, customer: 'Olena K.', channel: 'Web', timer: '0:42', state: 'queue', items: [{ q: 2, name: 'Philadelphia roll' }, { q: 1, name: 'Edamame' }] },
      { n: 1052, customer: 'Marek W.', channel: 'Phone', timer: '1:10', state: 'queue', items: [{ q: 1, name: 'Dragon roll' }, { q: 1, name: 'Tom Yum' }] },
    ],
  },
  {
    key: 'PREPARING',
    label: 'Preparing',
    tickets: [
      { n: 1048, customer: 'Lena B.', channel: 'App', timer: '6:18', state: 'preparing', progress: 42, items: [{ q: 1, name: 'California set' }, { q: 1, name: 'Miso soup' }, { q: 1, name: 'Salmon nigiri' }] },
      { n: 1047, customer: 'Tomáš H.', channel: 'Web', timer: '12:05', state: 'preparing', progress: 80, late: 'warn', items: [{ q: 3, name: 'Spicy tuna roll' }] },
    ],
  },
  {
    key: 'READY',
    label: 'Ready',
    tickets: [
      { n: 1045, customer: 'Anna S.', channel: 'Bot', timer: '0:30', state: 'ready', items: [{ q: 1, name: 'Family set' }, { q: 2, name: 'Cola' }] },
    ],
  },
];

function timerColor(t: DemoTicket) {
  if (t.late === 'crit') return '#f87171';
  if (t.late === 'warn') return '#fbbf24';
  return '#ffffff';
}

export function KdsMockup() {
  return (
    <div className="rounded-2xl border border-[#1f2937] bg-[#0b0f17] p-3 shadow-xl sm:p-4">
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <div className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs font-medium text-gray-400">Toster — Kitchen Display</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-300">{col.label}</span>
              <span className="text-[10px] font-medium text-gray-500">{col.tickets.length}</span>
            </div>

            {col.tickets.map((t) => (
              <div key={t.n} className="rounded-xl bg-white/[0.07] p-2.5 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black tracking-tight text-white sm:text-xl">#{t.n}</span>
                  <span className="font-mono text-sm font-bold" style={{ color: timerColor(t) }}>{t.timer}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400">{t.customer}</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-gray-300">{t.channel}</span>
                </div>

                <div className="mt-2 space-y-1.5">
                  {t.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-white">
                        {it.q}
                      </span>
                      <span className="text-[11px] font-medium leading-tight text-gray-100">{it.name}</span>
                    </div>
                  ))}
                </div>

                {t.state === 'preparing' && (
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${t.progress ?? 0}%`, background: t.late === 'warn' ? '#fbbf24' : '#FFD600' }}
                    />
                  </div>
                )}
                {t.state === 'ready' && (
                  <div className="mt-2 rounded-md bg-green-500/15 py-1 text-center text-[10px] font-semibold text-green-400">
                    Ready for packing
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KdsMockup;
