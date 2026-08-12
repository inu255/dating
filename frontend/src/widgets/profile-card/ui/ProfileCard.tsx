import { useState } from 'react';

import { PhotoSwiper } from './PhotoSwiper';
import { ProfileActions } from './ProfileActions';
import { ProfileInfo } from './ProfileInfo';

type ProfileCardProfile = {
  displayName: string;
  age: number;
  city?: string | null;
  photos: { id: string; url: string }[];
};

type ProfileCardProps = {
  profile: ProfileCardProfile;
  liked?: boolean;
  onTap?: () => void;
  onLike: () => void;
  onMessage?: () => void;
  onShare?: () => void;
};

export function ProfileCard({ profile, liked, onTap, onLike, onMessage, onShare }: ProfileCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative size-full">
      <PhotoSwiper photos={profile.photos} onTap={onTap} onActiveIndexChange={setActiveIndex} />
      <ProfileActions liked={liked} onLike={onLike} onMessage={onMessage} onShare={onShare} />
      <ProfileInfo
        photoCount={profile.photos.length}
        activeIndex={activeIndex}
        displayName={profile.displayName}
        age={profile.age}
        city={profile.city}
      />
    </div>
  );
}
