import React from 'react';
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";
import Navigation from '../../components/tempo/Navigation';
import '../../../src/assets/css/tempo.css';

export const HomeScreen = () => {
  console.log("HomeScreen");
  return (
    <React.Fragment>
      <section className="header_main">
        <Header name={"TEMPO"} />
      </section>
      <section className="dash_main">
        <div className='dash_menu'>
        <Navigation />
        </div>
      </section>
      <section className="footer_main">
                <Footer />
            </section>
    </React.Fragment>
  );
}

export default HomeScreen;