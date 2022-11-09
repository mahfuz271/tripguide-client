import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ServiceBlock = ({ title }) => {
    let services = useLoaderData();
    return (
        <div>
            <h2 className="h1 text-center colormain">{title}</h2>
            <p className="text-center">Got the urge to get away? We’ve got you covered. Check out the tours below, then get booking today!
            </p>
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mt-3 mb-5 mx-0 gy-5">
                {services.map((c) => {
                    return (<div className="col align-self-stretch" key={c._id}>
                        <div className="link-dark row rounded services me-md-1 text-decoration-none">
                            <div className="col-12 px-0 position-relative">
                                <PhotoProvider>
                                    <PhotoView src={`${c.image}`}>
                                        <img src={`${c.image}`} className="rounded w-100 h-100" alt="" />
                                    </PhotoView>
                                </PhotoProvider>
                                <p className="fw-bolder prices fs-4 position-absolute">${c.price}</p>
                            </div>
                            <div className="col-12 align-self-center py-3 ps-4">
                                <h4>{c.title}</h4>
                                <p>{c.description.slice(0, 150)}</p>
                                <Link to={`/services/${c._id}`} className="btn btn-primary">
                                    View details <i class="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default ServiceBlock;