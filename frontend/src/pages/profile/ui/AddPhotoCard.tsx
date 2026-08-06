import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';

export function AddPhotoCard() {
  const [open, setOpen] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = () => {
    // TODO: загрузить выбранное фото
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="flex aspect-3/4 items-center justify-center rounded-2xl border border-dashed border-input bg-muted text-muted-foreground"
          >
            <Plus />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Добавить фото</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-2 px-4 pb-4">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                cameraInputRef.current?.click();
              }}
            >
              Камера
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                galleryInputRef.current?.click();
              }}
            >
              Галерея
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelected}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />
    </>
  );
}
