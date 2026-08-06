import { Plus } from 'lucide-react';

const MAX_PHOTOS = 9;

type Photo = {
  id: string;
  url: string;
};

type PhotoGridProps = {
  photos: Photo[];
};

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="px-4 py-4">
      <div className="mb-2 flex items-center justify-between text-muted-foreground">
        <span>Фото</span>
        <span>
          {photos.length}/{MAX_PHOTOS}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-3/4 overflow-hidden rounded-2xl bg-muted">
            <img src={photo.url} alt="" className="size-full object-cover" />
          </div>
        ))}
        <button
          type="button"
          className="flex aspect-3/4 items-center justify-center rounded-2xl border border-dashed border-input bg-muted text-muted-foreground"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
