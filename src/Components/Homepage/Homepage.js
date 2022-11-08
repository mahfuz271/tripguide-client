import React from 'react';
import Services from '../Services/Services';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../Layout/useDocumentTitle';

const Homepage = () => {
    useDocumentTitle("TripGuide");
    return (
        <div>
            <section className="index-banner position-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 col-lg-6">
                        </div>
                        <div className="col-md-7 col-lg-6 d-flex align-items-center">
                            <div className="banner-content text-center text-md-start">
                                <h1 className="banner-heading">My Daily Travel Blog To Inspire And Get You Motivated!</h1>
                                <p className="banner-brief text-secondary mt-3 my-md-4 pt-1 py-3 pe-md-5">Hi! I'm <b>Paul Harrington</b> — an adventure travel photographer,
                                    professional blogger, and digital nomad.</p>
                                <Link to="/services" className="btn btn-primary text-uppercase p-3">Explore Destinations</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='container'>
                <div className='row'>
                    <div className="col-md-12 mt-5">
                        <Services limit="3" title="Explore Destinations" page="false"></Services>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;