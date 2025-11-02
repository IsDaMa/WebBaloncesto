// src/components/InstagramCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { InstagramEmbed } from "react-social-media-embed";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/InstagramCarousel.css";

const InstagramCarousel = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="instagram-empty text-center text-gray-600">
        No hay publicaciones disponibles.
      </div>
    );
  }

  return (
    <div className="instagram-carousel-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        loop={true}
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="social-card">
              <div className="social-embed">
                <InstagramEmbed url={post.url} width={350} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstagramCarousel;
