import { graphql } from '@/shared/api/generated';

export const GetMyProfile = graphql(`
  query GetMyProfile {
    me {
      id
      profile {
        ...ProfileFields
      }
    }
  }
`);
