import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from "./Hero.module.scss";
import mac1 from "../../assets/Mac.png";
import mac2 from "../../assets/Mac (1).png";
import mac3 from "../../assets/Mac (2).png";

const images = [
  { id: 1, src: mac1, alt: "Description of Image 1", path: "/page1" },
  { id: 2, src: mac2, alt: "Description of Image 2", path: "/page2" },
  { id: 3, src: mac3, alt: "Description of Image 3", path: "/page3" },
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 7000); 
    return () => clearInterval(interval);
  }, []);

  const changeImage = (id) => {
    const newIndex = images.findIndex(image => image.id === id);
    setCurrentImageIndex(newIndex);
  };

  const handleImageClick = () => {
    const path = images[currentImageIndex].path;
    navigate(path);
  };

  return (
    <div className={style.multislider}>
      <div className={style["slider-layer"]} onClick={handleImageClick}>
        <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
      </div>
      <div className={style["multislider-inner"]}>
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => changeImage(image.id)}
            className={`${style.navButton} ${index === currentImageIndex ? style.active : ""}`}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;