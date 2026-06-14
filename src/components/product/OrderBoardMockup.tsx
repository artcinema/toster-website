// Faithful "screenshot-style" recreation of Toster's order Kanban board, built
// from the real admin design (status palette from getOrderStatusHex) with
// fictional demo orders — no real customer data. Pure presentational, no JS.

interface DemoOrder {
  n: number;
  channel: 'Web' | 'Phone' | 'App' | 'Bot';
  customer: string;
  items: string;
  total: string;
  age: string;
}

const COLUMNS: { key: string; label: string; hex: string; orders: DemoOrder[] }[] = [
  {
    key: 'NEW',
    label: 'New',
    hex: '#3b82f6',
    orders: [
      { n: 1048, channel: 'Web', customer: 'Olena K.', items: 'Philadelphia ×2 · Edamame', total: '€19.80', age: '1m' },
      { n: 1049, channel: 'Phone', customer: 'Marek W.', items: 'Dragon roll · Tom Yum', total: '€27.40', age: '2m' },
    ],
  },
  {
    key: 'COOKING',
    label: 'Cooking',
    hex: '#f59e0b',
    orders: [
      { n: 1045, channel: 'App', customer: 'Lena B.', items: 'California set · Miso soup', total: '€31.00', age: '6m' },
      { n: 1046, channel: 'Web', customer: 'Tomáš H.', items: 'Spicy tuna roll ×3', total: '€22.50', age: '9m' },
    ],
  },
  {
    key: 'PACKING',
    label: 'Packing',
    hex: '#84cc16',
    orders: [
      { n: 1043, channel: 'Bot', customer: 'Anna S.', items: 'Family set · Cola ×2', total: '€44.90', age: '12m' },
    ],
  },
  {
    key: 'DELIVERY',
    label: 'On delivery',
    hex: '#8b5cf6',
    orders: [
      { n: 1041, channel: 'App', customer: 'Jonas R.', items: 'Salmon nigiri ×4', total: '€18.00', age: '21m' },
      { n: 1040, channel: 'Web', customer: 'Petra N.', items: 'Veggie set · Mango sticky rice', total: '€29.60', age: '24m' },
    ],
  },
];

function ChannelPill({ channel }: { channel: DemoOrder['channel'] }) {
  return (
    <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-[10px] font-medium text-[#525252]">
      {channel}
    </span>
  );
}

export function OrderBoardMockup() {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-3 shadow-xl sm:p-4">
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — Orders</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-[#525252]">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-0.5">
              <span className="h-2 w-2 rounded-full" style={{ background: col.hex }} />
              <span className="text-[11px] font-semibold text-[#0A0A0A]">{col.label}</span>
              <span className="ml-auto text-[10px] font-medium text-[#A3A3A3]">{col.orders.length}</span>
            </div>

            {col.orders.map((o) => (
              <div
                key={o.n}
                className="rounded-lg border border-[#E5E5E5] bg-white p-2.5 shadow-sm"
                style={{ borderLeft: `3px solid ${col.hex}` }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A0A0A]">#{o.n}</span>
                  <ChannelPill channel={o.channel} />
                </div>
                <p className="text-[11px] font-medium text-[#0A0A0A]">{o.customer}</p>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-[#525252]">{o.items}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0A0A0A]">{o.total}</span>
                  <span className="text-[10px] text-[#A3A3A3]">{o.age}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderBoardMockup;
