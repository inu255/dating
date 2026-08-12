import { PhotoIndicatorDots } from './PhotoIndicatorDots';

type ProfileInfoProps = {
  photoCount: number;
  activeIndex: number;
  displayName: string;
  age: number;
  city?: string | null;
};

export function ProfileInfo({ photoCount, activeIndex, displayName, age, city }: ProfileInfoProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-linear-to-t from-black/70 to-transparent p-4 text-white">
      <PhotoIndicatorDots count={photoCount} activeIndex={activeIndex} />
      <div>
        <div className="text-xl font-semibold">
          {displayName}, {age}
        </div>
        {city && <div>{city}</div>}
      </div>
    </div>
  );
}
