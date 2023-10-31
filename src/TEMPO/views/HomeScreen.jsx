import React from 'react';
import Navigation  from '../../components/tempo/Navigation';
import '../../../src/assets/css/tempo.css';

export const HomeScreen = () =>  {
  console.log("HomeScreen");
  return (
    <React.Fragment>
      <section className="home_main">
        <Navigation/>
      </section>
    </React.Fragment>
  );
}

export default HomeScreen;