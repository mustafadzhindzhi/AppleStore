import React, { useState, useEffect } from "react";
import style from "./Hero.module.scss";

const images = [
  "https://i.pinimg.com/originals/b6/b1/dd/b6b1dd61c339d36c460c698101284cb7.jpg",
  "https://appletoolbox.com/wp-content/uploads/2022/03/Set-Wallpaper-on-Apple-Watch-Customize-Watch-Face-scaled.jpg",
  "https://nofilmschool.com/media-library/iphone-15-pro-max.jpg?id=38612388&width=1245&height=700&quality=90&coordinates=0%2C0%2C0%2C0",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={style.multislider}>
      <div className={style["slider-layer"]} id="slider-layer">
        <img src={images[currentImageIndex]} alt={`Slider ${currentImageIndex + 1}`} />
      </div>
      <div className={style["multislider-inner"]}>
        {images.map((_, index) => (
          <button key={index} onClick={() => changeImage(index)} className={`${style.navButton} ${currentImageIndex === index ? style.active : ""}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;