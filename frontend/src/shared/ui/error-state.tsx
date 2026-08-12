import { TriangleAlert } from 'lucide-react';

type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
      <TriangleAlert className="size-6" />
      <p>{message}</p>
    </div>
  );
}
