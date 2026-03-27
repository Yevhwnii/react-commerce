"use client";

import { ReactNode } from "react";
import { Select } from "radix-ui";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  groups: SelectGroup[];
  disabled?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  icon?: ReactNode;
}

export function SelectComponent({
  value,
  onValueChange,
  placeholder,
  groups,
  disabled,
  triggerClassName,
  contentClassName,
  itemClassName,
  icon,
}: SelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Select.Trigger className={triggerClassName}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>{icon}</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={contentClassName}>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {groups.map((group, gi) => (
              <>
                {gi > 0 && <Select.Separator />}
                <Select.Group key={gi}>
                  {group.label && <Select.Label>{group.label}</Select.Label>}
                  {group.options.map((opt) => (
                    <Select.Item
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                      className={itemClassName}
                    >
                      <Select.ItemText>{opt.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
