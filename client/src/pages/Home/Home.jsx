import React, { Suspense } from 'react';
import Row from '../../components/Row/Row.jsx';
const Hero = React.lazy(() => import('../../components/Hero/Hero'));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Hero Component...</div>}>
        <Hero />
        <Row/>
      </Suspense>
    </div>
  )
}

export default Home;