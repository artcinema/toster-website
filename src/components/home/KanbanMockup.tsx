'use client';

import { motion, useReducedMotion } from 'framer-motion';

const STATUSES = ['NEW', 'COOKING', 'PACKING', 'DELIVERY'] as const;
const STATUS_COLORS: Record<string, string> = {
  NEW: '#FFD600',
  COOKING: '#FB923C',
  PACKING: '#60A5FA',
  DELIVERY: '#34D399',
};

export function KanbanMockup() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] p-4 shadow-xl">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-medium text-[#A3A3A3]">Toster — Orders</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {STATUSES.map((status) => (
          <div key={status} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: STATUS_COLORS[status] }}
              />
              <span className="text-[10px] font-semibold text-[#525252]">{status}</span>
            </div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-lg border border-[#E5E5E5] bg-white p-2 shadow-sm"
                animate={shouldReduceMotion ? {} : { y: [0, -2, 0] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                <div className="mb-1.5 h-1.5 w-3/4 rounded-full bg-[#E5E5E5]" />
                <div className="mb-1 h-1.5 w-1/2 rounded-full bg-[#F5F5F5]" />
                <div
                  className="mt-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-[#0A0A0A]"
                  style={{ background: STATUS_COLORS[status] + '33' }}
                >
                  #{100 + i + STATUSES.indexOf(status) * 3}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
