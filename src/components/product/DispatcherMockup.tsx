// Faithful "screenshot-style" recreation of Toster's dispatcher board, built
// from the real admin courier statuses (AVAILABLE / ON_DELIVERY / BREAK /
// OFFLINE) with fictional demo couriers — no real data. Pure presentational.

interface DemoCourier {
  name: string;
  initials: string;
  status: 'ON_DELIVERY' | 'AVAILABLE' | 'BREAK';
  order?: number;
  eta?: string;
  today: number;
}

const STATUS_META: Record<DemoCourier['status'], { label: string; dot: string; pill: string }> = {
  ON_DELIVERY: { label: 'On delivery', dot: '#8b5cf6', pill: 'bg-violet-100 text-violet-700' },
  AVAILABLE: { label: 'Available', dot: '#22c55e', pill: 'bg-emerald-100 text-emerald-700' },
  BREAK: { label: 'Break', dot: '#f59e0b', pill: 'bg-amber-100 text-amber-700' },
};

const COURIERS: DemoCourier[] = [
  { name: 'Andriy P.', initials: 'AP', status: 'ON_DELIVERY', order: 1041, eta: '7 min', today: 12 },
  { name: 'Kasia M.', initials: 'KM', status: 'ON_DELIVERY', order: 1040, eta: '13 min', today: 9 },
  { name: 'Pavel D.', initials: 'PD', status: 'AVAILABLE', today: 15 },
  { name: 'Ihor V.', initials: 'IV', status: 'BREAK', today: 6 },
];

export function DispatcherMockup() {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-3 shadow-xl sm:p-4">
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — Dispatcher</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-[#525252]">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Live GPS
        </span>
      </div>

      {/* Summary stats */}
      <div className="mb-2 grid grid-cols-3 gap-2">
        {[
          { v: '2', l: 'On delivery' },
          { v: '1', l: 'Available' },
          { v: '9 min', l: 'Avg ETA' },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-[#E5E5E5] bg-white px-2 py-1.5">
            <p className="text-sm font-bold text-[#0A0A0A]">{s.v}</p>
            <p className="text-[10px] text-[#A3A3A3]">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Courier rows */}
      <div className="flex flex-col gap-1.5">
        {COURIERS.map((c) => {
          const m = STATUS_META[c.status];
          return (
            <div key={c.name} className="flex items-center gap-2.5 rounded-lg border border-[#E5E5E5] bg-white p-2">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD600]/20 text-[11px] font-bold text-[#0A0A0A]">
                {c.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[11px] font-semibold text-[#0A0A0A]">{c.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${m.pill}`}>{m.label}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-[#525252]">
                  {c.order ? <>Order #{c.order} · ETA {c.eta}</> : <>Waiting for assignment</>}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[11px] font-semibold text-[#0A0A0A]">{c.today}</p>
                <p className="text-[9px] text-[#A3A3A3]">today</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DispatcherMockup;
