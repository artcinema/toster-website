// Faithful "screenshot-style" recreation of Toster's analytics dashboard
// (metric cards + orders-by-hour chart + live status breakdown), built from the
// real admin DashboardPage with fictional demo numbers — no real data.

const METRICS = [
  { label: 'Revenue today', value: '€4,820', delta: '+12%', up: true },
  { label: 'Orders', value: '214', delta: '+8%', up: true },
  { label: 'Avg order', value: '€22.50', delta: '+3%', up: true },
  { label: 'Couriers online', value: '6', delta: '2 idle', up: true },
];

// Orders by hour (10:00 → 22:00), fictional — dinner peak.
const HOURS = [
  { h: '10', v: 18 }, { h: '11', v: 26 }, { h: '12', v: 48 }, { h: '13', v: 52 },
  { h: '14', v: 31 }, { h: '15', v: 20 }, { h: '16', v: 24 }, { h: '17', v: 38 },
  { h: '18', v: 64 }, { h: '19', v: 88 }, { h: '20', v: 76 }, { h: '21', v: 49 }, { h: '22', v: 27 },
];

const STATUS = [
  { label: 'New', n: 7, hex: '#3b82f6' },
  { label: 'Cooking', n: 12, hex: '#f59e0b' },
  { label: 'Packing', n: 5, hex: '#84cc16' },
  { label: 'On delivery', n: 9, hex: '#8b5cf6' },
];

export function AnalyticsDashboardMockup() {
  const max = Math.max(...HOURS.map((x) => x.v));
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-3 shadow-xl sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — Dashboard</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-[#525252]">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Live
        </span>
      </div>

      {/* Metric cards */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-lg border border-[#E5E5E5] bg-white p-2.5">
            <p className="text-[10px] text-[#A3A3A3]">{m.label}</p>
            <p className="mt-0.5 text-base font-bold text-[#0A0A0A]">{m.value}</p>
            <p className="text-[10px] font-medium text-emerald-600">{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {/* Orders by hour */}
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-3 sm:col-span-2">
          <p className="mb-2 text-[11px] font-semibold text-[#0A0A0A]">Orders by hour</p>
          <div className="flex h-28 items-end gap-1">
            {HOURS.map((x) => (
              <div key={x.h} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm"
                  style={{ height: `${Math.round((x.v / max) * 88)}px`, background: x.v === max ? '#FFD600' : '#E5E5E5' }}
                />
                <span className="text-[8px] text-[#A3A3A3]">{x.h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live status breakdown */}
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
          <p className="mb-2 text-[11px] font-semibold text-[#0A0A0A]">Active now</p>
          <div className="flex flex-col gap-2">
            {STATUS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.hex }} />
                <span className="text-[11px] text-[#525252]">{s.label}</span>
                <span className="ml-auto text-[11px] font-semibold text-[#0A0A0A]">{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboardMockup;
