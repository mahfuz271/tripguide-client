import React from 'react';
import ServiceBlock from '../Services/ServiceBlock';
import useDocumentTitle from '../../Layout/useDocumentTitle';

const Services = () => {
    useDocumentTitle("Services");
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-12 mt-5">
                    <ServiceBlock title="Discover Our Courses"></ServiceBlock>
                </div >
            </div>
        </div>
    );
};

export default Services;