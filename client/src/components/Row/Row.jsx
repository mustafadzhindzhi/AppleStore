import React from 'react';
import style from './Row.module.scss';
import laptop from '../../assets/laptop.jpg';
import airPods from '../../assets/AirPods.jpeg';
import iphone from '../../assets/iphone.jpg';
import apple_products from '../../assets/apple-products.png';

const Row = () => {
  return (
    <div className={style.row}>
      <div className={style.laptop}>
        <div className={style["laptop-content"]}>
          <h2>MacBook Pro</h2>
          <img src={laptop} alt="Description for Block 1" />
          <button className={style.button}>BUY NOW</button>
        </div>
      </div>

      <div className={style.airpods}>
        <div className={style["airpods-content"]}>
          <h2>AirPods Pro</h2>
          <p>Completely renewed sound.</p>
          <button className={style.button}>BUY NOW</button>
        </div>
        <div className={style["aripods-image"]}>
        <img src={airPods} alt="Description for Block 2" />
        </div>
      </div>

      <div className={style.block}>
  <div className={style["iphone-image"]}>
    <img src={iphone} alt="Description for Block 3" />
  </div>
  <div className={style.iphone}>
    <div className={style["iphone-content"]}>
      <h2>Iphone 15 Pro</h2>
      <p>Top Technology</p>
      <button className={style.button}>BUY NOW</button>
    </div>
  </div>
</div>


      <div className={style.infor}>
        <div className={style["infor-content"]}>
          <h2>Apple Products</h2>
          <p>Look more 10 000 products from the best brand Apple</p>
          <button className={style.button}>SEE MORE</button>
        </div>
        <img src={apple_products} alt="Description for Block 4" />
      </div>
    </div>
  )
}

export default Row;