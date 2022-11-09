import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../Layout/useDocumentTitle';
import { Link } from 'react-router-dom';

//Manage MyReviews
const MyReviews = () => {
    useDocumentTitle("Manage MyReviews");
    const { user, logOut, setLoading, loading, handleRatingClick } = useContext(AuthContext);

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `/MyReviews?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('logged-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                setReviews(data);
            })
    }, [user?.email, logOut])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete');
        if (proceed) {
            fetch(process.env.REACT_APP_SERVER_URL + `/MyReviews/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('logged-token')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return logOut();
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Deleted successfully');
                        const remaining = reviews.filter(odr => odr._id !== id);
                        setReviews(remaining);
                    }
                })
        }
    }

    const handleModify = id => {
        const current = reviews.find(odr => odr._id === id);
        let form = document.getElementById('updateform');
        form._id.value = id;
        form.title.value = current?.title || '';
        form.comment.value = current?.comment || '';
        form.rating.value = current?.rating || '';
        if (current?.rating) {
            document.querySelectorAll('.rating_star')[current.rating - 1].click();
        }
    }

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const id = form._id.value;
        const title = form.title.value;
        const comment = form.comment.value;
        const rating = form.rating.value;

        const review = {
            title,
            comment,
            rating,
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + `/MyReviews/${id}`, {
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
                if (data.modifiedCount > 0) {
                    const remaining = reviews.filter(odr => odr._id !== id);
                    const updated = reviews.find(odr => odr._id === id);
                    updated.title = title
                    updated.comment = comment
                    updated.rating = rating

                    const newreviews = [updated, ...remaining];
                    setReviews(newreviews);
                    toast('Updated successfully');
                }
                form.reset();
                setLoading(false);
                document.querySelector('#modalCloseBs')?.click();
                document.querySelector(".modal-backdrop")?.remove("show");
                document.body.classList.remove("modal-open");
            })
    }

    return (
        <div className='my-5 text-center container'>
            <h2 className='mb-5'>You have {reviews.length} reviews</h2>
            <div className="overflow-x-auto w-full row">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th className='text-start'>Title</th>
                            <th className='text-start'>Rating</th>
                            <th>Date</th>
                            <th>Service</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reviews.map(s => {
                                return <tr key={s._id}>
                                    <th>
                                        <button onClick={() => handleDelete(s._id)} className='btn btn-danger'>X</button>
                                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleModify(s._id)} className='btn btn-info ms-2'><i className="fa fa-edit"></i></button>
                                    </th>
                                    <td className='text-start'>{s.title}</td>
                                    <td className='text-start'>{s.rating}</td>
                                    <td>{s?.created}</td>
                                    <td><Link to={`/services/${s.service_id}`}>Go to service</Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div><div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleUpdate} id="updateform">
                        <div className="modal-header">
                            <h5 className="modal-title">Update review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <input type="hidden" name="_id" id='_id' />
                            <div className="form-group">
                                <label className="form-label text-primary" htmlFor="title">Title</label>
                                <input className="form-control" id="title" name='title' type="text" placeholder="" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary">Comment</label>
                                <textarea className="form-control" id='comment' name='comment' required></textarea>
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
        </div>
    );
};

export default MyReviews;