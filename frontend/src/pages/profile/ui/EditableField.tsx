import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';

type EditableFieldProps = {
  label: string;
  value: string;
  inputType?: 'text' | 'date';
  onSave: (value: string) => void;
};

export function EditableField({ label, value, inputType = 'text', onSave }: EditableFieldProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(value);
    }
    setOpen(nextOpen);
  };

  const handleSave = () => {
    onSave(draft);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between border-b py-3 text-left last:border-b-0"
        >
          <span className="font-bold">{label}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            {value}
            <ChevronRight className="size-6" />
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{label}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Input
            type={inputType}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-9"
          />
        </div>
        <DrawerFooter>
          <Button size="lg" onClick={handleSave}>
            Сохранить
          </Button>
          <DrawerClose asChild>
            <Button size="lg" variant="outline">
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
