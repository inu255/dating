import { faker } from '@faker-js/faker';
import type { IMocks } from '@graphql-tools/mock';


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
