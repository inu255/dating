import { useNavigate } from 'react-router';

import { ProfileFields } from '@/entities/profile/api/fragments';
import { useDoubleTapLike } from '@/features/like-user/model/useDoubleTapLike';
import { shareProfile } from '@/features/share-profile/lib/shareProfile';
import { type FragmentType, useFragment } from '@/shared/api/generated';
import { ProfileCard } from '@/widgets/profile-card';

type FeedCardProps = {
  profile: FragmentType<typeof ProfileFields>;
  onLike: (profileId: string) => void;
};

export function FeedCard({ profile: profileRef, onLike }: FeedCardProps) {
  const profile = useFragment(ProfileFields, profileRef);
  const navigate = useNavigate();

  const { liked, handleLike, handleTap } = useDoubleTapLike({
    onLike: () => onLike(profile.id),
    onSingleTap: () => navigate(`/profile/${profile.id}`),
  });

  return (
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
  );
}
