import React, { Suspense } from 'react';
import Row from '../components/Row/Row.jsx';
const Hero = React.lazy(() => import('../components/Hero/Hero.jsx'));
import PromoProducts from '../components/PromoProducts/PromoProducts.jsx';
import OurSuggestion from '../components/OurSuggestion/OurSuggestion.jsx';
import NewProducts from '../components/NewProducts/NewProducts.jsx';
import AboutUs from '../components/AboutUs/AboutUs.jsx';
import Subscribe from '../components/Subscribe/Subscribe.jsx';

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Hero Component...</div>}>
        <Hero />
        <Row/>
        <PromoProducts/>
        <OurSuggestion/>
        <NewProducts/>
        <AboutUs/>
        <Subscribe/>
      </Suspense>
    </div>
  )
}

export default Home;