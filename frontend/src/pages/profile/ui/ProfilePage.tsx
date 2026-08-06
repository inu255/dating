import { useMutation, useQuery } from '@apollo/client/react';

import { useFragment } from '@/shared/api/generated';
import type { Gender, RelationshipStatus } from '@/shared/api/generated/graphql';
import type { DateTimeString } from '@/shared/api/scalars';

import { ProfileFields } from '../api/fragments';
import { UpdateProfile } from '../api/mutations';
import { GetMyProfile } from '../api/queries';
import { EditableField } from './EditableField';
import { PhotoGrid } from './PhotoGrid';
import { ProfileHeader } from './ProfileHeader';
import { SelectableField } from './SelectableField';

function toDateInputValue(birthDate: string) {
  return birthDate.slice(0, 10);
}

function toIsoBirthDate(dateInputValue: string): DateTimeString {
  return `${dateInputValue}T00:00:00.000Z` as DateTimeString;
}

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: 'Мужчина' },
  { value: 'FEMALE', label: 'Женщина' },
  { value: 'OTHER', label: 'Небинар' },
];

const RELATIONSHIP_STATUS_OPTIONS: { value: RelationshipStatus; label: string }[] = [
  { value: 'SINGLE', label: 'Без пары' },
  { value: 'IN_RELATIONSHIP', label: 'В отношениях' },
  { value: 'MARRIED', label: 'В браке' },
  { value: 'OPEN_RELATIONSHIP', label: 'В открытых отношениях' },
  { value: 'COMPLICATED', label: 'Всё сложно' },
  { value: 'ACTIVELY_LOOKING', label: 'В активном поиске' },
];

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
        <SelectableField
          label="Пол"
          value={profile.gender}
          valueLabel={GENDER_OPTIONS.find((option) => option.value === profile.gender)?.label ?? ''}
          options={GENDER_OPTIONS}
          onSave={(gender) => updateProfile({ variables: { input: { gender } } })}
        />
        <SelectableField
          label="Статус"
          value={profile.relationshipStatus}
          valueLabel={
            RELATIONSHIP_STATUS_OPTIONS.find((option) => option.value === profile.relationshipStatus)
              ?.label ?? 'Не указано'
          }
          options={RELATIONSHIP_STATUS_OPTIONS}
          onSave={(relationshipStatus) =>
            updateProfile({ variables: { input: { relationshipStatus } } })
          }
        />
      </div>
      <PhotoGrid photos={sortedPhotos} />
    </div>
  );
}
