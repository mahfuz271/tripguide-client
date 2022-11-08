import React from 'react';
import ServiceBlock from '../Services/ServiceBlock';

const Services = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-12 mt-5">
                    <ServiceBlock limit="9" title="Discover Our Courses" page="true"></ServiceBlock>
                </div >
            </div>
        </div>
    );
};

export default Services;