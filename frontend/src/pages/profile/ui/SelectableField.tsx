import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer';

type Option<T extends string> = {
  value: T;
  label: string;
};

type SelectableFieldProps<T extends string> = {
  label: string;
  value: T | null | undefined;
  valueLabel: string;
  options: Option<T>[];
  onSave: (value: T) => void;
};

export function SelectableField<T extends string>({
  label,
  value,
  valueLabel,
  options,
  onSave,
}: SelectableFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const handleSelect = (nextValue: T) => {
    onSave(nextValue);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between border-b py-3 text-left last:border-b-0"
        >
          <span className="font-bold">{label}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            {valueLabel}
            <ChevronRight className="size-6" />
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{label}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 px-4 pb-4">
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="lg"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full',
                option.value === value
                  ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
