import React, { useContext, useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';

const ServiceSingle = () => {
    const location = useLocation();
    const service = useLoaderData();
    useDocumentTitle(service.title);
    const { user, logOut, setLoading, loading } = useContext(AuthContext);

    const [reviews, setReviews] = useState([1, 2])


    const handleRatingClick = event => {
        const el = event.target;
        let allBtn = document.querySelectorAll(".rating_star");
        let rate_value = parseInt(el.getAttribute("value"));
        for (let key = 0; key < allBtn.length; key++) {
            let current = parseInt(allBtn[key].getAttribute("value"));
            if (current <= rate_value) {
                allBtn[key].classList.add("checked");
            } else {
                allBtn[key].classList.remove("checked");
            }
        }
        document.getElementById("rating_star").value = rate_value;
    }

    const handleReview = event => {
        event.preventDefault();
        const form = event.target;
        const service_id = form.service_id.value;
        const rating = parseInt(form.rating.value);
        const comment = form.comment.value;
        if (rating < 1) {
            toast('Please rate our service');
            return false;
        }
        const review = {
            service_id,
            comment,
            rating,
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + `/addReview`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('logged-token')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    setLoading(false);
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast('Review successfully');
                } else {
                    toast('Error');
                }
                form.reset();
                setLoading(false);
                document.querySelector('#modalCloseBs')?.click();
                document.querySelector(".modal-backdrop")?.remove("show");
                document.body.classList.remove("modal-open");
            })
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-12 mt-5">
                    <div className="row rounded services me-lg-1 ms-lg-1">
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
                            <p className="fw-bolder fs-4 mb-0">Price : ${service.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 mx-auto my-5">
                    <div className='d-flex justify-content-between'>
                        <h2 className='m-0 p-0'>Reviews&nbsp;<span>({reviews.length})</span></h2>
                        {
                            (user?.email) ?
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" type='button' className="btn btn-primary btn-sm">Write a review</button> :
                                <Link to={{
                                        pathname: "/login",
                                        state: { from: location }
                                    }} className="text-info">Please login to Write a review</Link>
                        }
                    </div>
                </div>
                <div className="col-sm-12 mx-auto">
                    {reviews.map(r => {
                        return <div className="review-block" key={r}>
                            <div className="row">
                                <div className="col-sm-3 col-lg-1">
                                    <img height="60" width="60" src="//dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded" />
                                    <div className="review-block-name text-primary">nktailor</div>
                                    <div className="review-block-date">January 29, 2016</div>
                                </div>
                                <div className="col-sm-9 col-lg-11">
                                    <div className="review-block-rate">
                                        <i className="fa fa-star checked" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                    <div className="review-block-title">this was nice in buy</div>
                                    <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>
            </div>
            {
                (user?.email) &&
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={handleReview}>
                            <div className="modal-header">
                                <h5 className="modal-title">Write a review</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-start">
                                <input type="hidden" name="service_id" value={service._id} />
                                <div className="form-group mt-4">
                                    <label className="form-label text-primary">Comment</label>
                                    <textarea className="form-control" name='comment' required></textarea>
                                </div>
                                <div className="form-group my-3">
                                    <div className="row m-0">
                                        <input type="hidden" name="rating" id="rating_star" value="0" />
                                        <div className="col-12 text-center" onClick={handleRatingClick}>
                                            <span className="fa fa-star rating_star" value="1"></span>
                                            <span className="fa fa-star rating_star" value="2"></span>
                                            <span className="fa fa-star rating_star" value="3"></span>
                                            <span className="fa fa-star rating_star" value="4"></span>
                                            <span className="fa fa-star rating_star" value="5"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id='modalCloseBs' data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default ServiceSingle;