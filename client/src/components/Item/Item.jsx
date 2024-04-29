import React from 'react';
import style from "./Item.module.scss";
import laptop from '../../assets/laptop.jpg';

const Item = () => {
  return (
    <div className={style.item}>
        <div className={style["item-image"]}>
        </div>
            <img src={laptop} alt="" />
            <h2>Contacless mouse Apple Magic Mouse 3 - Black</h2>
            <p>65.00$</p>
            <p>In Store</p>
            <button>BUY NOW</button>
    </div>
  ) 
}

export default Item
