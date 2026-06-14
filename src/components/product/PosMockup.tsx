// Faithful "screenshot-style" recreation of Toster's built-in POS terminal
// (menu grid + cart/checkout), built from the real admin PosPage with fictional
// demo data — no real data. Pure presentational.

const CATS = ['Rolls', 'Sets', 'Soups', 'Drinks'];

const MENU = [
  { name: 'Philadelphia', price: '€8.90' },
  { name: 'California', price: '€7.50' },
  { name: 'Dragon roll', price: '€11.00' },
  { name: 'Spicy tuna', price: '€8.20' },
  { name: 'Salmon nigiri', price: '€6.40' },
  { name: 'Edamame', price: '€4.50' },
];

const CART = [
  { q: 1, name: 'California set', price: '€15.50' },
  { q: 1, name: 'Miso soup', price: '€3.20' },
  { q: 2, name: 'Cola', price: '€4.40' },
];

export function PosMockup() {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-3 shadow-xl sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — POS</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Menu side */}
        <div className="col-span-3">
          <div className="mb-2 flex gap-1.5">
            {CATS.map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  i === 1 ? 'bg-[#FFD600] text-[#0A0A0A]' : 'bg-white text-[#525252] border border-[#E5E5E5]'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {MENU.map((m) => (
              <div key={m.name} className="rounded-lg border border-[#E5E5E5] bg-white p-2">
                <div className="mb-2 h-8 rounded-md bg-[#F5F5F5]" />
                <p className="truncate text-[10px] font-medium text-[#0A0A0A]">{m.name}</p>
                <p className="text-[10px] font-semibold text-[#525252]">{m.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart / checkout side */}
        <div className="col-span-2 flex flex-col rounded-lg border border-[#E5E5E5] bg-white p-2.5">
          <p className="mb-2 text-[11px] font-semibold text-[#0A0A0A]">Order #1052</p>
          <div className="flex flex-1 flex-col gap-1.5">
            {CART.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-[#F5F5F5] text-[9px] font-bold text-[#0A0A0A]">
                  {c.q}
                </span>
                <span className="flex-1 truncate text-[10px] text-[#0A0A0A]">{c.name}</span>
                <span className="text-[10px] font-medium text-[#525252]">{c.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-[#E5E5E5] pt-2">
            <div className="flex items-center justify-between text-[10px] text-[#A3A3A3]">
              <span>Subtotal</span><span>€23.10</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-[#0A0A0A]">
              <span>Total</span><span>€23.10</span>
            </div>
            <div className="mt-2 rounded-lg bg-[#FFD600] py-2 text-center text-[11px] font-semibold text-[#0A0A0A]">
              Charge €23.10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosMockup;
