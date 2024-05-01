import React, { useState, useEffect } from 'react';
import style from './Subscribe.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Subscribe = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true, 
    });
  }, []);

  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Subscribed email:', email);
    setEmail('');
  };

  return (
    <div className={style.subscribeSection} data-aos="zoom-in">
      <form className={style.subscribeForm} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="500">
        <h2>SUBSCRIBE FOR THE NEWSLETTER</h2>
        <p>Get 5% off your first Mac order when you subscribe to the MacStore newsletter!</p>
        <div className={style.formRow}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;