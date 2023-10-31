import React from 'react';
import Navigation  from '../../src/components/tempo/Navigation';
import '../../src/assets/css/tempo.css';
import 'font-awesome/css/font-awesome.css';

export const HomeScreen = () =>  {
  return (
    <React.Fragment>
      <section className="home_main">
        <Navigation/>
      </section>
    </React.Fragment>
  );
}

export default HomeScreen;