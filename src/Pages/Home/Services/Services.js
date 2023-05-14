import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(_ => {
        fetch(`https://genius-car-server-woad-three.vercel.app/services`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <>
            <div className='text-center mb-6'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className="text-5xl font-bold p-5">Our Service Area</h2>
                <p>The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomized <br />Words Which Don't Look Slightly Believable</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                {services.map(service => <ServiceCard key={service._id} service={service} />)}
            </div>
        </>
    );
};

export default Services;