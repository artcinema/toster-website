'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#FFD600] text-[#0A0A0A] hover:bg-[#E6C200] active:scale-[0.98]',
        secondary: 'border border-[#E5E5E5] bg-white text-[#0A0A0A] hover:bg-[#F5F5F5] active:scale-[0.98]',
        ghost: 'text-[#0A0A0A] hover:bg-[#F5F5F5] active:scale-[0.98]',
        link: 'text-[#0A0A0A] underline-offset-4 hover:underline p-0 h-auto',
        'primary-dark': 'bg-[#FFD600] text-[#0A0A0A] hover:bg-[#E6C200] active:scale-[0.98]',
        'secondary-dark': 'border border-white/20 bg-white/10 text-white hover:bg-white/20 active:scale-[0.98]',
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
