import { graphql } from '@/shared/api/generated';

export const GetInterests = graphql(`
  query GetInterests {
    interests {
      id
      name
    }
  }
`);
