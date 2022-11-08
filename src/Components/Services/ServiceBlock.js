import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ServiceBlock = ({ title }) => {
    let services = useLoaderData();
    return (
        <div>
            <h2 className="h1 text-center colormain">{title}</h2>
            <p className="text-center">We offer you our low-budget travel plans and guides from around the world, full of versatile itinerary ideas, priceless travel tips, and recommendations for places to go.
            </p>
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mt-3 mb-5 mx-0 gy-5">
                {services.map((c) => {
                    return (<div className="col align-self-stretch" key={c._id}>
                        <Link to={`/services/${c._id}`} className="link-dark row rounded services me-md-1 text-decoration-none">
                            <div className="col-12 px-0">
                                <img src={`${c.image}`} className="rounded w-100 h-100" alt="" />
                            </div>
                            <div className="col-12 align-self-center py-3 ps-4">
                                <h4>{c.title}</h4>
                                <p>{c.description.slice(0, 150)}</p>
                                <p className="fw-bolder prices fs-4">Price : {c.price}$</p>
                            </div>
                        </Link>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default ServiceBlock;