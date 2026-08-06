import { useMutation, useQuery } from '@apollo/client/react';

import { useFragment } from '@/shared/api/generated';
import type { DateTimeString } from '@/shared/api/scalars';

import { ProfileFields } from '../api/fragments';
import { UpdateProfile } from '../api/mutations';
import { GetMyProfile } from '../api/queries';
import { EditableField } from './EditableField';
import { PhotoGrid } from './PhotoGrid';
import { ProfileHeader } from './ProfileHeader';

function toDateInputValue(birthDate: string) {
  return birthDate.slice(0, 10);
}

function toIsoBirthDate(dateInputValue: string): DateTimeString {
  return `${dateInputValue}T00:00:00.000Z` as DateTimeString;
}

export function ProfilePage() {
  const { data, loading, error } = useQuery(GetMyProfile);
  const [updateProfile] = useMutation(UpdateProfile);
  const profile = useFragment(ProfileFields, data?.me.profile);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  if (!profile) return null;

  const sortedPhotos = profile.photos.toSorted((a, b) => a.position - b.position);

  return (
    <div>
      <ProfileHeader
        photoUrl={sortedPhotos[0]?.url}
        displayName={profile.displayName}
        age={profile.age}
        city={profile.city}
      />
      <div className="px-4">
        <div className="text-muted-foreground">Основное</div>
        <EditableField
          label="Имя"
          value={profile.displayName}
          onSave={(displayName) => updateProfile({ variables: { input: { displayName } } })}
        />
        <EditableField
          label="Дата рождения"
          inputType="date"
          value={toDateInputValue(profile.birthDate)}
          onSave={(date) =>
            updateProfile({ variables: { input: { birthDate: toIsoBirthDate(date) } } })
          }
        />
        <EditableField
          label="Город"
          value={profile.city ?? ''}
          onSave={(city) => updateProfile({ variables: { input: { city } } })}
        />
      </div>
      <PhotoGrid photos={sortedPhotos} />
    </div>
  );
}
