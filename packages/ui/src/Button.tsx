"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "radix-ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return <Comp ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
