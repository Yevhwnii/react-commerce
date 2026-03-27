"use client";

import { ReactNode } from "react";
import { Dialog } from "radix-ui";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
}

export function DialogComponent({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  contentClassName,
  overlayClassName,
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClassName} />
        <Dialog.Content className={contentClassName}>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && <Dialog.Description>{description}</Dialog.Description>}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const DialogClose = Dialog.Close;
