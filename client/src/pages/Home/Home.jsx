import React, { Suspense } from 'react';
const Hero = React.lazy(() => import('../../components/Hero/Hero'));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Hero Component...</div>}>
        <Hero />
      </Suspense>
    </div>
  )
}

export default Home;