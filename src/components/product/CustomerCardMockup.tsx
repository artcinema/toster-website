// Faithful "screenshot-style" recreation of Toster's CRM customer card
// (RFM segment, LTV, loyalty balance, recent orders), built from the real admin
// CustomerDetailPage with fictional demo data — no real customer data.

const STATS = [
  { label: 'Orders', value: '14' },
  { label: 'Lifetime value', value: '€1,240' },
  { label: 'Bonus balance', value: '€12.40' },
];

const HISTORY = [
  { n: 1041, items: 'California set · Miso soup', total: '€31.00', when: '2 days ago' },
  { n: 1012, items: 'Philadelphia ×2 · Edamame', total: '€19.80', when: '1 week ago' },
  { n: 988, items: 'Family set · Cola ×2', total: '€44.90', when: '2 weeks ago' },
];

export function CustomerCardMockup() {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-3 shadow-xl sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — Customer</span>
      </div>

      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD600]/20 text-sm font-bold text-[#0A0A0A]">
            OK
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#0A0A0A]">Olena K.</p>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700">Loyal · RFM 545</span>
            </div>
            <p className="text-[11px] text-[#A3A3A3]">Kyiv · customer since 2024 · web + app</p>
          </div>
          <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-[9px] font-medium text-[#525252]">Low churn risk</span>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-md bg-[#F5F5F5] px-2 py-1.5">
              <p className="text-[9px] text-[#A3A3A3]">{s.label}</p>
              <p className="text-xs font-bold text-[#0A0A0A]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <p className="mb-1.5 mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#A3A3A3]">Recent orders</p>
        <div className="flex flex-col divide-y divide-[#F0F0F0]">
          {HISTORY.map((o) => (
            <div key={o.n} className="flex items-center gap-2 py-1.5">
              <span className="text-[11px] font-semibold text-[#0A0A0A]">#{o.n}</span>
              <span className="flex-1 truncate text-[10px] text-[#525252]">{o.items}</span>
              <span className="text-[10px] font-medium text-[#0A0A0A]">{o.total}</span>
              <span className="w-16 text-right text-[9px] text-[#A3A3A3]">{o.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerCardMockup;
