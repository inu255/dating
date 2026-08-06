type ProfileHeaderProps = {
  photoUrl?: string;
  displayName: string;
  age: number;
  city?: string | null;
};

export function ProfileHeader({ photoUrl, displayName, age, city }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-6">
      <div className="aspect-square w-1/3 shrink-0 overflow-hidden rounded-full bg-muted">
        {photoUrl && (
          <img src={photoUrl} alt={displayName} className="size-full object-cover" />
        )}
      </div>
      <div>
        <div className="text-lg font-medium">
          {displayName}, {age}
        </div>
        {city && <div className="text-muted-foreground">{city}</div>}
      </div>
    </div>
  );
}
