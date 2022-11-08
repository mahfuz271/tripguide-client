import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ServiceSingle = () => {
    const service = useLoaderData();
    useDocumentTitle(service.title);
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-12 mt-5">
                    <div className="row rounded services me-lg-1">
                        <div className="col-12 col-sm-4 px-0">
                            <PhotoProvider>
                                <PhotoView src={`${service.image}`}>
                                    <img src={`${service.image}`} className="rounded w-100 h-100" alt="" />
                                </PhotoView>
                            </PhotoProvider>
                        </div>
                        <div className="col-12 col-sm-8 py-3 ps-4">
                            <h3>{service.title}</h3>
                            <p>{service.description} </p>
                            <p className="fw-bolder prices fs-4 mb-0">Price : {service.price}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceSingle;