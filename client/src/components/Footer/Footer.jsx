import React, { useState, useEffect } from 'react';
import style from './Footer.module.scss';
import {
  FaPhone, FaTruck, FaCreditCard, FaAward, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaCcMastercard, FaCcVisa, FaApplePay
} from 'react-icons/fa';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const footerItems = [
    { icon: <FaPhone />, text: "Expert Service" },
    { icon: <FaTruck />, text: "Express Delivery" },
    { icon: <FaCreditCard />, text: "Secure Payment Methods" },
    { icon: <FaAward />, text: "The Most Award-Winning Apple Service in Europe" }
  ];

  const sections = [
    {
      title: "MACSTORE BULGARIA",
      content: [
        { type: "text", text: "We are a Bulgarian distributor and authorized service provider for Apple products." }
      ]
    },
    {
      title: "ONLINE SHOP",
      content: [
        { type: "text", text: "Reliability" },
        { type: "text", text: "Terms of delivery" },
        { type: "text", text: "Payment methods" },
        { type: "text", text: "Privacy statement" }
      ]
    },
    {
      title: "PRODUCTS",
      content: [
        { type: "text", text: "Mac" },
        { type: "text", text: "iPhone" },
        { type: "text", text: "iPad" },
        { type: "text", text: "Watch" },
        { type: "text", text: "AirPods" },
        { type: "text", text: "Accessories" }
      ]
    },
    {
      title: "CONTACTS",
      content: [
        { type: "text", text: "Call us at: +359 123 456 789" },
        { type: "text", text: "Email us: support@macstore.bg" },
        {
          type: "map",
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.0396713886756!2d23.333273615777013!3d42.69575397916336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85b6ed9a2a5b%3A0x546574c4bb277fd5!2sSt%20Alexander%20Nevsky%20Cathedral!5e0!3m2!1sen!2sbg!4v1644167789422"
        },
        { type: "social", links: [
          { icon: <FaFacebookF />, url: "https://facebook.com" },
          { icon: <FaInstagram />, url: "https://instagram.com" },
          { icon: <FaLinkedinIn />, url: "https://linkedin.com" }
        ]}
      ]
    }
  ];

  return (
    <div className={style.footer}>
      <div className={style.footerContent}>
        {footerItems.map((item, index) => (
          <div key={index} className={`${style.footerItem} ${index === activeIndex ? style.active : ''}`} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      {isMobile && (
        <div className={style.dots}>
          {footerItems.map((item, index) => (
            <span 
              key={index} 
              className={`${style.dot} ${index === activeIndex ? style.dotActive : ''}`} 
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
      <div className={style.extensions}>
        {sections.map((section, index) => (
          <div key={index} className={style.section}>
            <h3 className={style.title}>{section.title}</h3>
            <ul>
              {section.content.map((item, idx) => (
                <li key={idx} className={style.item}>
                  {item.type === "text" && item.text}
                  {item.type === "map" && (
                    <iframe
                      src={item.src}
                      width="100%"
                      height="150"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                      aria-hidden="false"
                      tabIndex="0"
                    ></iframe>
                  )}
                  {item.type === "social" && (
                    <div className={style.socialLinks}>
                      {item.links.map((link, linkIdx) => (
                        <a key={linkIdx} href={link.url} className={style.socialLink}>
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={style.footerBottom}>
      <p className={style.rights}>© 2024 All rights reserved | MACSTORE BULGARIA</p>
        <div className={style.paymentMethods}>
          <FaCcMastercard />
          <FaCcVisa />
          <FaApplePay />
        </div>
      </div>
    </div>
  );
}

export default Footer;