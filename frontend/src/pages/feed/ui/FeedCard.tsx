import { useRef, useState } from 'react';

import { ProfileFields } from '@/entities/profile/api/fragments';
import { type FragmentType, useFragment } from '@/shared/api/generated';
import { ProfileCard } from '@/widgets/profile-card';

type FeedCardProps = {
  profile: FragmentType<typeof ProfileFields>;
  onLike: (profileId: string) => void;
};

const DOUBLE_TAP_DELAY_MS = 300;

export function FeedCard({ profile: profileRef, onLike }: FeedCardProps) {
  const profile = useFragment(ProfileFields, profileRef);
  const [liked, setLiked] = useState(false);
  const lastTapRef = useRef(0);
  const singleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleLike = () => {
    setLiked(true);
    onLike(profile.id);
  };

  const handleTap = () => {
    const now = Date.now();
    const sinceLastTap = now - lastTapRef.current;

    if (sinceLastTap > 0 && sinceLastTap < DOUBLE_TAP_DELAY_MS) {
      clearTimeout(singleTapTimeoutRef.current);
      lastTapRef.current = 0;
      handleLike();
    } else {
      lastTapRef.current = now;
      singleTapTimeoutRef.current = setTimeout(() => {
        // TODO: открыть профиль пользователя (отдельный экран, делаем позже)
      }, DOUBLE_TAP_DELAY_MS);
    }
  };

  return (
    <ProfileCard
      profile={profile}
      liked={liked}
      onTap={handleTap}
      onLike={handleLike}
      onMessage={() => {
        // TODO: открыть переписку
      }}
      onShare={() => {
        // TODO: поделиться анкетой
      }}
    />
  );
}
