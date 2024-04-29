import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import style from './Row.module.scss';
import { FaApple } from 'react-icons/fa';
import laptop from '../../assets/laptop.jpg';
import airPods from '../../assets/AirPods.jpeg';
import iphone from '../../assets/iphone.jpg';
import apple_products from '../../assets/apple-products.png';

const Row = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,  
      once: true,  
    });
  }, []);
  
  return (
    <div className={style.row}>
      <div className={style.laptop} data-aos="fade-up">
        <div className={style["laptop-content"]}>
          <h2><FaApple className={style.appleIcon} /> MacBook Pro</h2>
          <img src={laptop} alt="MacBook Pro" />
          <button className={style.button}>BUY NOW</button>
        </div>
      </div>
  
      <div className={style.airpods} data-aos="fade-up">
        <div className={style["airpods-content"]}>
          <h2><FaApple className={style.appleIcon} /> AirPods Pro</h2>
          <p>Completely renewed sound.</p>
          <button className={style.button}>BUY NOW</button>
        </div>
        <div className={style["aripods-image"]}>
          <img src={airPods} alt="AirPods Pro" />
        </div>
      </div>
  
      <div className={style.block} data-aos="fade-up">
        <div className={style["iphone-image"]}>
          <img src={iphone} alt="iPhone 15 Pro" />
        </div>
        <div className={style.iphone}>
          <div className={style["iphone-content"]}>
            <h2><FaApple className={style.appleIcon} /> iPhone 15 Pro</h2>
            <p>Top Technology</p>
            <button className={style.button}>BUY NOW</button>
          </div>
        </div>
      </div>
  
      <div className={style.infor} data-aos="fade-up">
        <div className={style["infor-content"]}>
          <h2><FaApple className={style.appleIcon} /> Apple Products</h2>
          <p>Look more 10,000 products from the best brand Apple</p>
          <button className={style.button}>SEE MORE</button>
        </div>
        <img src={apple_products} alt="Apple Products" />
      </div>
    </div>
  );
  
}

export default Row;