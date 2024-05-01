import React from 'react';
import style from "./Item.module.scss";
import laptop from '../../assets/laptop.jpg';

const Item = ({ showPromo }) => {
  return (
    <div className={style.item}>
        <div className={style["item-image"]}>
            <img src={laptop} alt="Laptop" />
        </div>
        <h2>Contactless mouse Apple Magic Mouse 3 - Black</h2>
        <div className={style.prices}>
            {showPromo ? (
              <>
                <p className={style.oldPrice}>65.00$</p> 
                <p className={style.newPrice}>45.00$</p> 
              </>
            ) : (
              <p>65.00$</p>  
            )}
        </div>
        <p>In Store</p>
        <button>BUY NOW</button>
    </div>
  ); 
}

export default Item;