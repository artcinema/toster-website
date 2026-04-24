import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'yellow' | 'dark';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        {
          'bg-[#F5F5F5] text-[#525252]': variant === 'default',
          'bg-[#FFD600]/20 text-[#0A0A0A]': variant === 'yellow',
          'bg-white/10 text-white': variant === 'dark',
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
