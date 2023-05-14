import React from 'react';
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';


const About = () => {
    return (
        <div className="hero my-32">
            <div className="hero-content flex-col lg:flex-row">
                <div className='relative W-1/2'>
                    <img alt='img' src={person} className="w-4/5 rounded-lg shadow-2xl" />
                    <img alt='img' src={parts} className="w-3/5 absolute right-5 top-1/2 border-8 rounded-lg shadow-2xl" />
                </div>
                <div className='W-1/2'>
                    <p className="my-5 text-2xl text-orange-600 font-bold">About Us</p>
                    <h1 className="my-5 text-5xl font-bold">We are qualified <br /> & of experience <br />in this field</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-info">Get more info</button>
                </div>
            </div>
        </div>
    );
};

export default About;