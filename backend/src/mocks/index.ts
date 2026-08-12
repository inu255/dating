import { faker } from '@faker-js/faker';
import type { IMocks, IMockStore, Ref } from '@graphql-tools/mock';


function randomBirthDate(): Date {
  return faker.date.birthdate({ min: 18, max: 45, mode: 'age' });
}

function ageFromBirthDate(birthDate: Date): number {
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export const mocks: IMocks = {
  DateTime: () => faker.date.recent({ days: 30 }),

  Profile: () => {
    const birthDate = randomBirthDate();
    return {
      id: faker.string.uuid(),
      displayName: faker.person.firstName(),
      birthDate,
      age: ageFromBirthDate(birthDate),
      bio: faker.helpers.maybe(() => faker.person.bio(), { probability: 0.8 }),
      city: faker.location.city(),
    };
  },

  Photo: () => ({
    id: faker.string.uuid(),
    url: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/720/1280`,
    position: faker.number.int({ min: 0, max: 5 }),
  }),

  Interest: () => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Музыка', 'Кино', 'Спорт', 'Путешествия', 'Готовка',
      'Игры', 'Книги', 'Фотография', 'Йога', 'Хайкинг',
    ]),
  }),

  User: () => ({
    id: faker.string.uuid(),
    email: faker.internet.email().toLowerCase(),
  }),

  Preference: () => ({
    id: faker.string.uuid(),
    ageMin: 18,
    ageMax: faker.number.int({ min: 25, max: 45 }),
  }),

  PageInfo: () => ({
    hasNextPage: true,
    endCursor: Buffer.from(faker.string.uuid()).toString('base64'),
  }),

  ProfileEdge: () => ({
    cursor: Buffer.from(faker.string.uuid()).toString('base64'),
  }),

  Query: () => ({
    matches: () => Array.from({ length: 5 }, () => ({})),
    interests: () => Array.from({ length: 10 }, () => ({})),
  }),

  Mutation: () => ({
    likeUser: () => ({
      like: {},
      match: faker.helpers.maybe(() => ({}), { probability: 0.3 }),
    }),
  }),
};

type UpdateProfileInputArgs = Partial<{
  displayName: string;
  birthDate: string;
  gender: string;
  relationshipStatus: string;
  bio: string;
  city: string;
  interestIds: string[];
}>;

/**
 * Резолверы, которым нужен доступ к MockStore напрямую — чтобы мутация/запрос
 * реально работали с той же сущностью, что уже закэширована в сторе (например,
 * анкета, которую store сгенерировал для ленты), а не просто возвращали
 * случайно сгенерированный Profile при каждом вызове (как обычный авто-мок).
 */
export function createStatefulResolvers(store: IMockStore) {
  return {
    Query: {
      profile: (_parent: unknown, args: { id: string }) => store.get('Profile', args.id),
    },
    Mutation: {
      updateProfile: (_parent: unknown, args: { input: UpdateProfileInputArgs }) => {
        const meRef = store.get('Query', 'ROOT', 'me') as Ref;
        const profileRef = store.get(meRef, 'profile') as Ref;
        const { birthDate, ...rest } = args.input;

        for (const [field, value] of Object.entries(rest)) {
          if (value != null) {
            store.set(profileRef, field, value);
          }
        }

        if (birthDate) {
          const parsedBirthDate = new Date(birthDate);
          store.set(profileRef, 'birthDate', parsedBirthDate);
          store.set(profileRef, 'age', ageFromBirthDate(parsedBirthDate));
        }

        return profileRef;
      },
    },
  };
}
