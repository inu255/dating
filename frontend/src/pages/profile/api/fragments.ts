import { graphql } from '@/shared/api/generated';

export const ProfileFields = graphql(`
  fragment ProfileFields on Profile {
    id
    displayName
    birthDate
    age
    gender
    relationshipStatus
    city
    photos {
      id
      url
      type
      position
    }
  }
`);
