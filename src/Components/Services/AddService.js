import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddService = () => {
    const navigate = useNavigate();
    const { user, setLoading, loading, logOut } = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = user?.displayName;
        const email = user?.email || 'unregistered';
        const title = form.title.value;
        const image = form.image.value;
        const price = form.price.value;
        const description = form.description.value;

        const service = {
            title,
            image,
            customer: name,
            email,
            price,
            description
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + '/allServices', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('logged-token')}`
            },
            body: JSON.stringify(service)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    toast("Service added!")
                    form.reset();
                    navigate("/allServices", { replace: true });
                }
            })
            .catch(er => { setLoading(false); toast(er.message); });


    }
    return (
        <div className="m-auto col-md-6 mt-5">
            <h2>Add a service</h2>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                    <label className="form-label text-primary" htmlFor="exampleFormControlInput1">Title</label>
                    <input className="form-control" id="exampleFormControlInput1" name='title' type="text" placeholder="" required="" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary">Price</label>
                    <input className="form-control" name='price' type="number" placeholder="" required="" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary" htmlFor="exampleFormControlInput2">Image URL</label>
                    <input className="form-control" id="exampleFormControlInput2" name='image' type="text" placeholder="" required="" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label text-primary">Description</label>
                    <textarea className="form-control" name='description' required></textarea>
                </div>
                <button className="btn btn-primary w-100 mt-5 submit-btn" type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default AddService;