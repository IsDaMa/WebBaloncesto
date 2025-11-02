// src/components/FacebookCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FacebookEmbed } from "react-social-media-embed";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/FacebookCarousel.css";

const FacebookCarousel = ({ posts }) => {
  return (
    <div className="facebook-carousel-container bg-white rounded-lg shadow-md p-4 relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        loop={true}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.url}>
            <div className="flex justify-center">
              {/* Contenedor del post con estilo de tarjeta */}
              <div className="facebook-post-wrapper w-full md:w-96 lg:w-full bg-green-50 rounded-lg shadow-sm p-2">
                <FacebookEmbed
                  url={post.url}
                  width="100%"
                  height={500}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FacebookCarousel;
