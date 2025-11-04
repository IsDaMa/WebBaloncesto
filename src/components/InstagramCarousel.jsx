// src/components/InstagramCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { InstagramEmbed } from "react-social-media-embed";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/InstagramCarousel.css";

const InstagramCarousel = ({ posts = [] }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600 italic py-4">
        No hay publicaciones disponibles.
      </div>
    );
  }

  return (
    <div className="instagram-carousel-container max-w-[400px] mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        loop
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="social-card flex justify-center">
              <div className="social-embed">
                <InstagramEmbed
                  url={post.url}
                  width={350}
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstagramCarousel;
