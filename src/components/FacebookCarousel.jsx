import React, { Suspense, lazy } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/FacebookCarousel.css";

const FacebookEmbed = lazy(() =>
  import("react-social-media-embed").then((mod) => ({
    default: mod.FacebookEmbed,
  }))
);

const FacebookCarousel = ({ posts }) => {
  return (
    <div className="facebook-carousel-container bg-white rounded-lg shadow-md p-4 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        loop
      >
        {posts.map((post) => (
          <SwiperSlide key={post.url}>
            <div className="flex justify-center">
              <div className="facebook-post-wrapper w-full md:w-96 lg:w-full bg-green-50 rounded-lg shadow-sm p-2">
                <Suspense fallback={<p>Cargando publicación...</p>}>
                  <FacebookEmbed url={post.url} width="100%" height={500} />
                </Suspense>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FacebookCarousel;
