"use client";

import { ReactNode } from "react";
import { DropdownMenu } from "radix-ui";

interface DropdownMenuItemDef {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

interface DropdownMenuGroup {
  items: DropdownMenuItemDef[];
}

interface DropdownMenuProps {
  trigger: ReactNode;
  groups: DropdownMenuGroup[];
  contentClassName?: string;
  itemClassName?: string;
  separatorClassName?: string;
}

export function DropdownMenuComponent({
  trigger,
  groups,
  contentClassName,
  itemClassName,
  separatorClassName,
}: DropdownMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={contentClassName}>
          {groups.map((group, gi) => (
            <>
              {gi > 0 && <DropdownMenu.Separator className={separatorClassName} />}
              <DropdownMenu.Group key={gi}>
                {group.items.map((item) => (
                  <DropdownMenu.Item
                    key={item.label}
                    disabled={item.disabled}
                    onSelect={item.onSelect}
                    className={itemClassName}
                  >
                    {item.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>
            </>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
