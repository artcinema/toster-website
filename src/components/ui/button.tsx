'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Animation matches the Toster Check guest-flow "Zavolat obsluhu" CTA
// (client/assets/css/check-guest.css): yellow glow halo, lift on hover,
// diagonal white shimmer sweep, scale-down on press.
//
// Implementation notes:
// • `group` + `before:` pseudo-element drives the shimmer via translate-x
// • `overflow-hidden` clips the sweep so it stays inside the button shape
// • `transition-[transform,box-shadow,filter,background-color]` so the
//   default `transition-all` doesn't accidentally tween the shimmer
const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded-lg font-medium transition-[transform,box-shadow,filter,background-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] before:-translate-x-full before:transition-transform before:duration-[600ms] before:ease-out hover:before:translate-x-full',
  {
    variants: {
      variant: {
        primary:
          'bg-[#FFD600] text-[#0A0A0A] shadow-[0_4px_14px_rgba(253,216,53,0.30)] hover:-translate-y-0.5 hover:bg-[#E6C200] hover:brightness-105 hover:shadow-[0_8px_28px_rgba(253,216,53,0.45),0_2px_6px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(253,216,53,0.35)] active:duration-100',
        secondary:
          'border border-[#E5E5E5] bg-white text-[#0A0A0A] hover:-translate-y-0.5 hover:bg-[#F5F5F5] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.97] active:duration-100',
        ghost:
          'text-[#0A0A0A] hover:-translate-y-0.5 hover:bg-[#F5F5F5] active:translate-y-0 active:scale-[0.97] active:duration-100',
        link:
          'text-[#0A0A0A] underline-offset-4 hover:underline p-0 h-auto before:hidden',
        'primary-dark':
          'bg-[#FFD600] text-[#0A0A0A] shadow-[0_4px_14px_rgba(253,216,53,0.30)] hover:-translate-y-0.5 hover:bg-[#E6C200] hover:brightness-105 hover:shadow-[0_8px_28px_rgba(253,216,53,0.45),0_2px_6px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(253,216,53,0.35)] active:duration-100',
        'secondary-dark':
          'border border-white/20 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_6px_20px_rgba(255,255,255,0.12)] active:translate-y-0 active:scale-[0.97] active:duration-100',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
