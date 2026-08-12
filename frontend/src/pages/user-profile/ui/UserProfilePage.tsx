import { useMutation, useQuery } from '@apollo/client/react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { ProfileFields } from '@/entities/profile/api/fragments';
import { LikeUser } from '@/features/like-user/api/mutations';
import { useDoubleTapLike } from '@/features/like-user/model/useDoubleTapLike';
import { shareProfile } from '@/features/share-profile/lib/shareProfile';
import { useFragment } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { ErrorState } from '@/shared/ui/error-state';
import { LoadingState } from '@/shared/ui/loading-state';
import { ProfileCard } from '@/widgets/profile-card';

import { GetProfile } from '../api/queries';

export function UserProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GetProfile, {
    variables: { id: id ?? '' },
    skip: !id,
  });
  const [likeUser] = useMutation(LikeUser);
  const profile = useFragment(ProfileFields, data?.profile);

  const { liked, handleLike, handleTap } = useDoubleTapLike({
    onLike: () => {
      if (profile) likeUser({ variables: { toUserId: profile.id } });
    },
  });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!profile) return null;

  return (
    <div className="relative">
      <Button
        type="button"
        size="icon-lg"
        variant="ghost"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 rounded-full bg-gray-500/60 text-white hover:bg-gray-500/70"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div className="h-[90vh]">
        <ProfileCard
          profile={profile}
          liked={liked}
          onTap={handleTap}
          onLike={handleLike}
          onMessage={() => {
            // TODO: открыть переписку
          }}
          onShare={() => shareProfile(profile.id, profile.displayName)}
        />
      </div>
      <div className="p-4 text-muted-foreground">Здесь будет дополнительная информация</div>
    </div>
  );
}
