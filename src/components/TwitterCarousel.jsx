// src/components/TwitterCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { TwitterEmbed } from "react-social-media-embed";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/TwitterCarousel.css";

const TwitterCarousel = ({ tweets }) => {
  if (!tweets || tweets.length === 0) {
    return (
      <div className="twitter-empty text-center text-gray-600">
        No hay tweets disponibles.
      </div>
    );
  }

  return (
    <div className="twitter-carousel-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        loop={true}
      >
        {tweets.map((tweet, index) => (
          <SwiperSlide key={index}>
            <div className="social-card">
              <div className="social-embed">
                <TwitterEmbed url={tweet.url} width={350} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TwitterCarousel;
