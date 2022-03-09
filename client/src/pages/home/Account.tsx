import React from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../../assets/images/homeImg.png'

const Account = () => {
    return (
        <>
            <section className="welcome-screen d-flex justify-content-center">
                <div className='content-box m-1 d-flex flex-column'>
                    <h1 className='m-1 loggedin-title'>
                        WELCOME TO CREWBITE!
                    </h1>
                    <img className="m-1 mt-4 ms-5 justify-center illustration" src={HomeImg} aria-hidden alt="Crewbite Home Page Illustration" />
                    <p className='m-1 mt-4'>Hang in there a bit more! Let's set up your account to get the most benefit of Crewbite. </p>

                    <Link to='/' className="btn btn-primary mt-3" role="button">Account Setup</Link>

                </div>
            </section>
        </>
    )
};

export default Account;
