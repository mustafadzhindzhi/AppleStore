import React, { Suspense } from 'react';
import Row from '../../components/Row/Row.jsx';
const Hero = React.lazy(() => import('../../components/Hero/Hero'));
import PromoProducts from '../../components/PromoProducts/PromoProducts.jsx';
import OurSuggestion from '../../components/OurSuggestion/OurSuggestion.jsx';
import NewProducts from '../../components/NewProducts/NewProducts.jsx';

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Hero Component...</div>}>
        <Hero />
        <Row/>
        <PromoProducts/>
        <OurSuggestion/>
        <NewProducts/>
      </Suspense>
    </div>
  )
}

export default Home;