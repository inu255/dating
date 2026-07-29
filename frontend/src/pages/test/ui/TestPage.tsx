import { useQuery } from '@apollo/client/react';

import { GetInterests } from '../api/queries';

export function TestPage() {
  const { data, loading, error } = useQuery(GetInterests);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {data?.interests.map((interest) => <li key={interest.id}>{interest.name}</li>)}
    </ul>
  );
}
