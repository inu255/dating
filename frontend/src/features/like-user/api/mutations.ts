import { graphql } from '@/shared/api/generated';

export const LikeUser = graphql(`
  mutation LikeUser($toUserId: ID!) {
    likeUser(toUserId: $toUserId) {
      match {
        id
      }
    }
  }
`);
