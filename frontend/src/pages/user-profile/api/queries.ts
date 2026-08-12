import { graphql } from '@/shared/api/generated';

export const GetProfile = graphql(`
  query GetProfile($id: ID!) {
    profile(id: $id) {
      ...ProfileFields
    }
  }
`);
