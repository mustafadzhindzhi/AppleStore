import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import style from './AboutUs.module.scss';
import store from "../../assets/store.png";
import store2 from "../../assets/store2.png";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, 
    });
  }, []);

  return (
    <div className={style.aboutUs}>
      <div className={style.section} style={{backgroundColor: 'black', color: 'white'}}>
        <div className={style.imageContainer} data-aos="fade-right">
          <img src={store} alt="Our Team" />
        </div>
        <div className={style.textContainer} data-aos="fade-left">
          <h2>About Our Company</h2>
          <p>We are a specialist store for all products manufactured by Apple. Our offices are staffed with experienced staff specializing in Apple products,
from whom you can get expert information, guidance and help in choosing the right products. Our product range also includes a wide range of services: training, consulting, installation, maintenance and support services.</p>
        </div>
      </div>
      <div className={style.section} style={{backgroundColor: 'white', color: 'black'}}>
      <div className={style.imageContainer} data-aos="fade-left">
          <img src={store2} alt="Our Mission" />
        </div>
        <div className={style.textContainer} data-aos="fade-right">
          <h2>Our Mission</h2>
          <p>Our mission is to empower Apple product users through expert guidance and comprehensive support services. We aim to enhance every customer's experience by providing personalized solutions and in-depth training tailored to their needs. At MacStore Bulgaria, we believe in making every interaction with technology insightful and enriching.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;