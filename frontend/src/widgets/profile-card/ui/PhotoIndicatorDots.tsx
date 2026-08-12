import { cn } from '@/shared/lib/utils';

type PhotoIndicatorDotsProps = {
  count: number;
  activeIndex: number;
};

export function PhotoIndicatorDots({ count, activeIndex }: PhotoIndicatorDotsProps) {
  if (count <= 1) return null;

  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn('size-1.5 rounded-full', index === activeIndex ? 'bg-white' : 'bg-white/40')}
        />
      ))}
    </div>
  );
}
