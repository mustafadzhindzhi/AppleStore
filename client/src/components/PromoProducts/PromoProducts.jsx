import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation"; 

import Navigation from "/node_modules/swiper/modules/navigation.mjs";

import style from "./PromoProducts.module.scss";
import Item from "../Item/Item.jsx";

const PromoProducts = () => {
    return (
      <div className={style.itemList}>
        <h2>Promo Products</h2>
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
              <Item />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default PromoProducts;