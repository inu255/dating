import { useMutation, useQuery } from '@apollo/client/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LikeUser } from '@/features/like-user/api/mutations';
import { ErrorState } from '@/shared/ui/error-state';
import { LoadingState } from '@/shared/ui/loading-state';

import { GetFeed } from '../api/queries';
import { FeedCard } from './FeedCard';

const PAGE_SIZE = 10;

export function FeedPage() {
  const { data, loading, error, fetchMore } = useQuery(GetFeed, {
    variables: { first: PAGE_SIZE },
  });
  const [likeUser] = useMutation(LikeUser);

  const edges = data?.feed.edges ?? [];
  const pageInfo = data?.feed.pageInfo;

  const handleReachEnd = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({ variables: { first: PAGE_SIZE, after: pageInfo.endCursor } });
    }
  };

  if (loading && edges.length === 0) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <Swiper direction="vertical" slidesPerView={1} className="h-dvh" onReachEnd={handleReachEnd}>
      {edges.map((edge) => (
        <SwiperSlide key={edge.cursor}>
          <FeedCard
            profile={edge.node}
            onLike={(toUserId) => likeUser({ variables: { toUserId } })}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
