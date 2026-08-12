import { useRef, useState } from 'react';

const DOUBLE_TAP_DELAY_MS = 300;

type UseDoubleTapLikeOptions = {
  onLike: () => void;
  onSingleTap?: () => void;
};

export function useDoubleTapLike({ onLike, onSingleTap }: UseDoubleTapLikeOptions) {
  const [liked, setLiked] = useState(false);
  const lastTapRef = useRef(0);
  const singleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleLike = () => {
    setLiked(true);
    onLike();
  };

  const handleTap = () => {
    const now = Date.now();
    const sinceLastTap = now - lastTapRef.current;

    if (sinceLastTap > 0 && sinceLastTap < DOUBLE_TAP_DELAY_MS) {
      clearTimeout(singleTapTimeoutRef.current);
      lastTapRef.current = 0;
      handleLike();
    } else {
      lastTapRef.current = now;
      singleTapTimeoutRef.current = setTimeout(() => {
        onSingleTap?.();
      }, DOUBLE_TAP_DELAY_MS);
    }
  };

  return { liked, handleLike, handleTap };
}
