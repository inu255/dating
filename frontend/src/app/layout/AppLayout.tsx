import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="flex min-h-dvh justify-center bg-muted">
      <div className="min-h-dvh w-full max-w-(--content-width) bg-background">
        <Outlet />
      </div>
    </div>
  );
}
