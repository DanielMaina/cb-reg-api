import React from 'react';
import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/loggedoutHomeImg.png'


const Landing = () => {
  return (
    <section className="welcome-screen d-flex justify-content-center">
      <div className="img-container hero">
        <img src={heroImg} alt="Crewbite Landing" className="hero__image" />
      </div>
      <div className="content-box hero__content d-flex flex-column">
        <h1 className="hero__title mb-4">WELCOME TO CREWBITE</h1>
        <p className="hero__text">
          Crewbite is your place to find and be found in film industry.
          Whether you are a Production Manager, Camera Person, or even caterer,
          Crewbite is where you can be connected with the right person.
        </p>
        <Link to="/register" className="btn btn-primary btn-signup mt-3" role="button">
          Sign up here!
        </Link>
      </div>
    </section>
  )
};

export default Landing;
