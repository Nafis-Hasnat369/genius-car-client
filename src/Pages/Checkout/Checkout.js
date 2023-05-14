import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = e => {
        e.preventDefault();
        const form = e.target;
        const name = `${form?.firstName?.value} ${form?.lastName?.value}`;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        const phone = form.phone.value;

        const order = {
            service: _id,
            serviceName: title,
            customer: name,
            price, email, phone, message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('genius-token')}` },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order placed successfully!');
                    form.reset();
                }
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl">You are about to order: <span className='text-orange-600'>{title}</span></h2>
                <h4 className="text-3xl">Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 m-10'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full " required />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full  " />
                    <input name='phone' type="number" placeholder="Your Phone" className="input input-bordered w-full " required />
                    <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>
                <input className='btn btn-success' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;