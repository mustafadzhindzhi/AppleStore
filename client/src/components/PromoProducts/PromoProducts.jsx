import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Navigation from "/node_modules/swiper/modules/navigation.mjs";
import style from "./PromoProducts.module.scss";
import Item from "../Item/Item.jsx";

const PromoProducts = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className={style.promo}>
    <div className={style.itemList}>
      <h2>Promo Products</h2>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={4}
        spaceBetween={30}
        className={style.swiperContainer}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        onSlideChange={() => AOS.refresh()}
        onInit={() => {
          AOS.refresh();
        }}
        onUpdate={() => {
          AOS.refresh();
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div data-aos="fade-right" data-aos-delay={`${index * 100}`}>
              <Item showPromo={true} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default PromoProducts;