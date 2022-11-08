import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';

const AllServices = () => {
    const { user, logOut, setLoading, loading } = useContext(AuthContext);

    const [services, setServices] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `/AllServices?email=${user?.email}`, {
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
                setServices(data);
            })
    }, [user?.email, logOut])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if (proceed) {
            fetch(process.env.REACT_APP_SERVER_URL + `/AllServices/${id}`, {
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
                        const remaining = services.filter(odr => odr._id !== id);
                        setServices(remaining);
                    }
                })
        }
    }

    const handleModify = id => {
        const current = services.find(odr => odr._id === id);
        let form = document.getElementById('updateform');
        form._id.value = id;
        form.image.value = current?.image || '';
        form.title.value = current?.title || '';
        form.price.value = current?.price || '';
        form.description.value = current?.description || '';
    }

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const id = form._id.value;
        const title = form.title.value;
        const image = form.image.value;
        const price = form.price.value;
        const description = form.description.value;

        const service = {
            title,
            image,
            price,
            description
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + `/AllServices/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('logged-token')}`
            },
            body: JSON.stringify(service)
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
                    const remaining = services.filter(odr => odr._id !== id);
                    const updated = services.find(odr => odr._id === id);
                    updated.title = title
                    updated.image = image
                    updated.price = price
                    updated.description = description

                    const newServices = [updated, ...remaining];
                    setServices(newServices);
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
            <h2 className='mb-5'>You have {services.length} Services</h2>
            <div className="overflow-x-auto w-full row">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Image</th>
                            <th className='text-start'>Title</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            services.map(s => {
                                return <tr key={s._id}>
                                    <th>
                                        <button onClick={() => handleDelete(s._id)} className='btn btn-danger'>X</button>
                                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleModify(s._id)} className='btn btn-info ms-2'><i className="fa fa-edit"></i></button>
                                    </th>
                                    <td><img src={s.image} className="img-rounded" width="50" /></td>
                                    <td className='text-start'>{s.title}</td>
                                    <td>${s?.price}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleUpdate} id="updateform">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Service</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <div className="form-group">
                                <input type="hidden" id="_id" name="_id" />
                                <label className="form-label text-primary" htmlFor="title">Title</label>
                                <input className="form-control" id="title" name='title' type="text" placeholder="" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary">Price</label>
                                <input className="form-control" name='price' type="number" placeholder="" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary" htmlFor="image">Image URL</label>
                                <input className="form-control" id="image" name='image' type="text" placeholder="" required="" />
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label text-primary">Description</label>
                                <textarea className="form-control" name='description' required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='modalCloseBs' data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AllServices;