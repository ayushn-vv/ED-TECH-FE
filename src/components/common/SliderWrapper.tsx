import { useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { SwiperSlide } from "swiper/react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ReactSwiper from "components/base/ReactSwiper";
import IconifyIcon from "components/base/IconifyIcon";
import useResizeObserver from "components/hooks/useResizeObserver";

interface HasId {
  id: string | number;
}

interface SliderWrapperProps<T> {
  title: string;
  SliderCard: React.ComponentType<{ data: T }>;
  data: T[];
}

const SliderWrapper = <T extends HasId>({
  title,
  SliderCard,
  data,
}: SliderWrapperProps<T>) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerSize = useResizeObserver(containerRef);
  const [isSlideBegin, setIsSlideBegin] = useState(true);
  const [isSlideEnd, setIsSlideEnd] = useState(false);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const slidesPerView =
    containerSize > 1440 ? 4 : containerSize > 1024 ? 3 : containerSize > 720 ? 1.9 : 1.975;

  return (
    <Stack ref={containerRef} direction="column" spacing={2} width={1}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <IconButton onClick={handlePrev} disabled={isSlideBegin} size="small">
            <IconifyIcon icon="oui:arrow-left" />
          </IconButton>

          <IconButton onClick={handleNext} disabled={isSlideEnd} size="small">
            <IconifyIcon icon="oui:arrow-right" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Slider */}
      <ReactSwiper
        slidesPerView={slidesPerView}
        gap={20}
        style={{ paddingRight: "18px" }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          setIsSlideBegin(swiper.isBeginning);
          setIsSlideEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsSlideBegin(swiper.isBeginning);
          setIsSlideEnd(swiper.isEnd);
        }}
        className="mentor-swiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="mentor-slide">
            <SliderCard data={item} />
          </SwiperSlide>
        ))}
      </ReactSwiper>
    </Stack>
  );
};

export default SliderWrapper;
