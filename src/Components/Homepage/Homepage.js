import React from 'react';
import Services from '../Services/Services';
import useDocumentTitle from '../../Layout/useDocumentTitle';

const Homepage = () => {
    useDocumentTitle("TripGuide");
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12 mt-5">
                        <Services limit="3" title="Discover Our Popular Courses" page="false"></Services>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;