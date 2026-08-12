import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

type Photo = {
  id: string;
  url: string;
};

type PhotoSwiperProps = {
  photos: Photo[];
  onTap?: () => void;
  onActiveIndexChange?: (index: number) => void;
};

export function PhotoSwiper({ photos, onTap, onActiveIndexChange }: PhotoSwiperProps) {
  return (
    <Swiper
      className="size-full"
      slidesPerView={1}
      onClick={() => onTap?.()}
      onSlideChange={(swiper) => onActiveIndexChange?.(swiper.activeIndex)}
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <img src={photo.url} alt="" className="size-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
