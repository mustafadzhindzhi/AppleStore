import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Navigation from "/node_modules/swiper/modules/navigation.mjs";

import style from "./NewProducts.module.scss";
import Item from "../Item/Item.jsx";

const NewProducts = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className={style.new}>
      <div className={style.itemList}>
        <h2>New Products</h2>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={4}
          spaceBetween={30}
          className={style.swiperContainer}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div data-aos="fade-right" data-aos-delay={`${index * 100}`}>
                <Item />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
