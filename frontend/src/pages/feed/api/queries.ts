import { graphql } from '@/shared/api/generated';

export const GetFeed = graphql(`
  query GetFeed($first: Int, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ProfileFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
