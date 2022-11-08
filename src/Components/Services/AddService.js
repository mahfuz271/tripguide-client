import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';

const AddService = () => {

    const { user, setLoading, loading } = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = user?.displayName;
        const email = user?.email || 'unregistered';
        const title = form.title.value;
        const image = form.title.image;

        const order = {
            title,
            image,
            customer: name,
            email
        }

        setLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + '/myServices', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('logged-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    toast("Service added!")
                    form.reset();

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
                    <label className="form-label text-primary" htmlFor="exampleFormControlInput2">Image URL</label>
                    <input className="form-control" id="exampleFormControlInput2" name='image' type="url" placeholder="" required="" />
                </div>
                <button className="btn btn-primary w-100 mt-5 submit-btn" type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default AddService;