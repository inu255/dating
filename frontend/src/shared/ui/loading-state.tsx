import { Spinner } from '@/shared/ui/spinner';

export function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
