// src/components/TwitterCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { TwitterEmbed } from "react-social-media-embed";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/TwitterCarousel.css";

const TwitterCarousel = ({ tweets = [] }) => {
  if (tweets.length === 0) {
    return (
      <div className="text-center text-gray-600 italic py-4">
        No hay tweets disponibles.
      </div>
    );
  }

  return (
    <div className="twitter-carousel-container max-w-[400px] mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        loop
      >
        {tweets.map((tweet, index) => (
          <SwiperSlide key={index}>
            <div className="social-card flex justify-center">
              <div className="social-embed">
                <TwitterEmbed
                  url={tweet.url}
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

export default TwitterCarousel;
