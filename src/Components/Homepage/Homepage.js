import React from 'react';
import ServiceBlock from '../Services/ServiceBlock';
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
                                <h1 className="banner-heading">Adventure Begins Here</h1>
                                <p className="banner-brief text-secondary mt-3 my-md-4 pt-1 py-3 pe-md-5">
                                    See the world with TripGuide. Discover how you can offset your adventure's carbon emissions and support the sustainable initiatives practiced by our operators worldwide.
                                </p>
                                <Link to="/services" className="btn btn-primary text-uppercase p-3">Explore Destinations</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='container'>
                <div className='row'>
                    <div className="col-md-12 mt-5 mb-0">
                        <ServiceBlock title="Explore Destinations"></ServiceBlock>
                    </div>
                    <div className="col-md-12 text-center">
                        <Link to="/services" className="btn btn-primary text-uppercase p-3">Show All</Link>
                    </div>
                </div>
            </div>
            <section className="index-banner position-relative mt-5 sec">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 col-lg-6">
                            <iframe width="100%" height="400" src="//www.youtube.com/embed/zHcr32gRRCs?modestbranding=0&autohide=1&showinfo=0&controls=0" title="BALI | Cinematic video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="col-md-7 col-lg-6 d-flex align-items-center">
                            <div className="banner-content text-center text-md-start">
                                <h1 className="banner-heading text-light">Travel Videos from Around the World</h1>
                                <p className="banner-brief text-secondary mt-3 my-md-4 pt-1 py-3 pe-md-5 text-light">
                                    Traveling is always a good idea. Watch a collection of breathtaking videos from our thankful clients to get some travel inspiration.
                                </p>
                                <Link to="/services" className="btn btn-primary text-uppercase p-3">Explore Destinations</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row d-flex justify-content-center align-items-center rows mt-5 p-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="text-center">
                            <img src="https://i.imgur.com/Dh7U4bp.png" alt='' width="200" />
                            <span className="d-block mt-3">If you want to know more about how travelling works,<br/> sign up for my free newsletter full of tips and great travel ideas.</span>
                            <div className="mx-5">
                                <div className="input-group mb-3 mt-4">
                                    <input type="text" className="form-control" placeholder="Enter email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <button className="btn btn-success border-rad" type="button" id="button-addon2">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Homepage;