import React from 'react';
import { Link } from 'react-router-dom';
import Services from '../Services/Services';

const Homepage = () => {
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