import { Heart, Mail, Share } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

type ProfileActionsProps = {
  liked?: boolean;
  onLike: () => void;
  onMessage?: () => void;
  onShare?: () => void;
};

const actionButtonClassName = 'size-12 rounded-full bg-transparent text-white hover:bg-transparent';

export function ProfileActions({ liked, onLike, onMessage, onShare }: ProfileActionsProps) {
  return (
    <div className="absolute top-1/2 right-4 z-10 flex flex-col gap-3">
      <Button type="button" size="icon" variant="ghost" onClick={onLike} className={actionButtonClassName}>
        <Heart
          className={cn(
            'size-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]',
            liked && 'fill-primary text-primary',
          )}
        />
      </Button>
      <Button type="button" size="icon" variant="ghost" onClick={onMessage} className={actionButtonClassName}>
        <Mail className="size-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
      </Button>
      <Button type="button" size="icon" variant="ghost" onClick={onShare} className={actionButtonClassName}>
        <Share className="size-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" />
      </Button>
    </div>
  );
}
